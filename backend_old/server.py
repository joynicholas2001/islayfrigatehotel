from fastapi import FastAPI, APIRouter, HTTPException, Request, Header
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional, Dict, Any
import uuid
from datetime import datetime, timezone, timedelta
import razorpay
from emergentintegrations.payments.stripe.checkout import (
    StripeCheckout,
    CheckoutSessionResponse,
    CheckoutStatusResponse,
    CheckoutSessionRequest
)

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Payment clients
razorpay_client = razorpay.Client(auth=(os.environ.get('RAZORPAY_KEY_ID'), os.environ.get('RAZORPAY_KEY_SECRET')))

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Models
class Room(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    description: str
    price_per_night: float
    max_guests: int
    amenities: List[str]
    images: List[str]
    available: bool = True

class RoomCreate(BaseModel):
    name: str
    description: str
    price_per_night: float
    max_guests: int
    amenities: List[str]
    images: List[str]
    available: bool = True

class BookingCreate(BaseModel):
    room_id: str
    guest_name: str
    guest_email: EmailStr
    guest_phone: str
    check_in: str
    check_out: str
    guests: int
    special_requests: Optional[str] = None

class Booking(BaseModel):
    model_config = ConfigDict(extra="ignore")
    booking_id: str = Field(default_factory=lambda: str(uuid.uuid4())[:8].upper())
    room_id: str
    room_name: str
    guest_name: str
    guest_email: EmailStr
    guest_phone: str
    check_in: str
    check_out: str
    guests: int
    total_nights: int
    price_per_night: float
    subtotal: float
    tax: float
    total_amount: float
    status: str = "pending"
    special_requests: Optional[str] = None
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class BookingVerify(BaseModel):
    booking_id: str
    email: EmailStr

class BookingModify(BaseModel):
    check_in: Optional[str] = None
    check_out: Optional[str] = None
    guests: Optional[int] = None
    special_requests: Optional[str] = None

class ContactForm(BaseModel):
    name: str
    email: EmailStr
    phone: str
    message: str

class AdminLogin(BaseModel):
    username: str
    password: str

class RoomUpdate(BaseModel):
    price_per_night: Optional[float] = None
    available: Optional[bool] = None

class PaymentCreate(BaseModel):
    booking_id: str
    amount: float
    currency: str
    payment_method: str  # 'razorpay' or 'stripe'

# Room endpoints
@api_router.get("/rooms", response_model=List[Room])
async def get_rooms():
    rooms = await db.rooms.find({}, {"_id": 0}).to_list(1000)
    return rooms

@api_router.get("/rooms/{room_id}", response_model=Room)
async def get_room(room_id: str):
    room = await db.rooms.find_one({"id": room_id}, {"_id": 0})
    if not room:
        raise HTTPException(status_code=404, detail="Room not found")
    return room

@api_router.post("/rooms", response_model=Room)
async def create_room(room_data: RoomCreate):
    room = Room(**room_data.model_dump())
    await db.rooms.insert_one(room.model_dump())
    return room

# Booking endpoints
@api_router.post("/bookings", response_model=Booking)
async def create_booking(booking_data: BookingCreate):
    # Get room details
    room = await db.rooms.find_one({"id": booking_data.room_id}, {"_id": 0})
    if not room:
        raise HTTPException(status_code=404, detail="Room not found")
    
    if not room.get("available"):
        raise HTTPException(status_code=400, detail="Room not available")
    
    # Calculate dates and pricing
    check_in = datetime.fromisoformat(booking_data.check_in.replace('Z', '+00:00'))
    check_out = datetime.fromisoformat(booking_data.check_out.replace('Z', '+00:00'))
    total_nights = (check_out - check_in).days
    
    if total_nights < 1:
        raise HTTPException(status_code=400, detail="Invalid dates")
    
    price_per_night = room["price_per_night"]
    subtotal = price_per_night * total_nights
    tax = subtotal * 0.12  # 12% tax
    total_amount = subtotal + tax
    
    # Create booking
    booking = Booking(
        room_id=booking_data.room_id,
        room_name=room["name"],
        guest_name=booking_data.guest_name,
        guest_email=booking_data.guest_email,
        guest_phone=booking_data.guest_phone,
        check_in=booking_data.check_in,
        check_out=booking_data.check_out,
        guests=booking_data.guests,
        total_nights=total_nights,
        price_per_night=price_per_night,
        subtotal=subtotal,
        tax=tax,
        total_amount=total_amount,
        special_requests=booking_data.special_requests
    )
    
    booking_dict = booking.model_dump()
    booking_dict['created_at'] = booking_dict['created_at'].isoformat()
    await db.bookings.insert_one(booking_dict)
    
    return booking

@api_router.post("/bookings/verify")
async def verify_booking(verify_data: BookingVerify):
    booking = await db.bookings.find_one(
        {"booking_id": verify_data.booking_id, "guest_email": verify_data.email},
        {"_id": 0}
    )
    if not booking:
        raise HTTPException(status_code=404, detail="Booking not found")
    return booking

@api_router.get("/bookings/{booking_id}")
async def get_booking(booking_id: str, email: str):
    booking = await db.bookings.find_one(
        {"booking_id": booking_id, "guest_email": email},
        {"_id": 0}
    )
    if not booking:
        raise HTTPException(status_code=404, detail="Booking not found")
    return booking

@api_router.put("/bookings/{booking_id}")
async def modify_booking(booking_id: str, email: str, modify_data: BookingModify):
    booking = await db.bookings.find_one(
        {"booking_id": booking_id, "guest_email": email},
        {"_id": 0}
    )
    if not booking:
        raise HTTPException(status_code=404, detail="Booking not found")
    
    if booking["status"] == "cancelled":
        raise HTTPException(status_code=400, detail="Cannot modify cancelled booking")
    
    update_data = {k: v for k, v in modify_data.model_dump().items() if v is not None}
    
    if update_data:
        await db.bookings.update_one(
            {"booking_id": booking_id},
            {"$set": update_data}
        )
    
    updated_booking = await db.bookings.find_one({"booking_id": booking_id}, {"_id": 0})
    return updated_booking

@api_router.delete("/bookings/{booking_id}")
async def cancel_booking(booking_id: str, email: str):
    booking = await db.bookings.find_one(
        {"booking_id": booking_id, "guest_email": email},
        {"_id": 0}
    )
    if not booking:
        raise HTTPException(status_code=404, detail="Booking not found")
    
    await db.bookings.update_one(
        {"booking_id": booking_id},
        {"$set": {"status": "cancelled"}}
    )
    
    return {"message": "Booking cancelled successfully"}

# Payment endpoints
@api_router.post("/payments/razorpay/create-order")
async def create_razorpay_order(payment_data: PaymentCreate):
    # Verify booking exists
    booking = await db.bookings.find_one({"booking_id": payment_data.booking_id}, {"_id": 0})
    if not booking:
        raise HTTPException(status_code=404, detail="Booking not found")
    
    # Create Razorpay order
    amount_in_paise = int(payment_data.amount * 100)
    order_data = {
        "amount": amount_in_paise,
        "currency": payment_data.currency,
        "payment_capture": 1,
        "notes": {
            "booking_id": payment_data.booking_id
        }
    }
    
    try:
        order = razorpay_client.order.create(data=order_data)
        
        # Store transaction
        transaction = {
            "transaction_id": str(uuid.uuid4()),
            "booking_id": payment_data.booking_id,
            "order_id": order["id"],
            "amount": payment_data.amount,
            "currency": payment_data.currency,
            "payment_method": "razorpay",
            "status": "pending",
            "created_at": datetime.now(timezone.utc).isoformat()
        }
        await db.payment_transactions.insert_one(transaction)
        
        return {
            "order_id": order["id"],
            "amount": order["amount"],
            "currency": order["currency"],
            "key_id": os.environ.get('RAZORPAY_KEY_ID')
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Payment creation failed: {str(e)}")

@api_router.post("/payments/razorpay/verify")
async def verify_razorpay_payment(request: Request):
    data = await request.json()
    
    try:
        # Verify signature
        razorpay_client.utility.verify_payment_signature(data)
        
        # Update transaction status
        await db.payment_transactions.update_one(
            {"order_id": data["razorpay_order_id"]},
            {"$set": {
                "status": "completed",
                "payment_id": data["razorpay_payment_id"],
                "signature": data["razorpay_signature"]
            }}
        )
        
        # Update booking status
        transaction = await db.payment_transactions.find_one(
            {"order_id": data["razorpay_order_id"]},
            {"_id": 0}
        )
        if transaction:
            await db.bookings.update_one(
                {"booking_id": transaction["booking_id"]},
                {"$set": {"status": "confirmed", "payment_status": "paid"}}
            )
        
        return {"status": "success"}
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Payment verification failed: {str(e)}")

@api_router.post("/payments/stripe/checkout")
async def create_stripe_checkout(request: Request):
    data = await request.json()
    booking_id = data.get("booking_id")
    origin_url = data.get("origin_url")
    
    # Verify booking
    booking = await db.bookings.find_one({"booking_id": booking_id}, {"_id": 0})
    if not booking:
        raise HTTPException(status_code=404, detail="Booking not found")
    
    # Initialize Stripe
    stripe_api_key = os.environ.get('STRIPE_API_KEY')
    host_url = origin_url or str(request.base_url).rstrip('/')
    webhook_url = f"{host_url}/api/webhook/stripe"
    stripe_checkout = StripeCheckout(api_key=stripe_api_key, webhook_url=webhook_url)
    
    # Create checkout session
    success_url = f"{origin_url}/booking-success?session_id={{CHECKOUT_SESSION_ID}}"
    cancel_url = f"{origin_url}/booking"
    
    checkout_request = CheckoutSessionRequest(
        amount=float(booking["total_amount"]),
        currency="usd",
        success_url=success_url,
        cancel_url=cancel_url,
        metadata={
            "booking_id": booking_id,
            "guest_email": booking["guest_email"]
        }
    )
    
    try:
        session = await stripe_checkout.create_checkout_session(checkout_request)
        
        # Store transaction
        transaction = {
            "transaction_id": str(uuid.uuid4()),
            "booking_id": booking_id,
            "session_id": session.session_id,
            "amount": booking["total_amount"],
            "currency": "usd",
            "payment_method": "stripe",
            "status": "pending",
            "created_at": datetime.now(timezone.utc).isoformat()
        }
        await db.payment_transactions.insert_one(transaction)
        
        return {"url": session.url, "session_id": session.session_id}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Stripe checkout failed: {str(e)}")

@api_router.get("/payments/stripe/status/{session_id}")
async def get_stripe_payment_status(session_id: str):
    stripe_api_key = os.environ.get('STRIPE_API_KEY')
    webhook_url = "https://placeholder.com/webhook"
    stripe_checkout = StripeCheckout(api_key=stripe_api_key, webhook_url=webhook_url)
    
    try:
        status = await stripe_checkout.get_checkout_status(session_id)
        
        # Update transaction if paid
        if status.payment_status == "paid":
            transaction = await db.payment_transactions.find_one(
                {"session_id": session_id},
                {"_id": 0}
            )
            
            if transaction and transaction["status"] != "completed":
                await db.payment_transactions.update_one(
                    {"session_id": session_id},
                    {"$set": {"status": "completed", "payment_status": status.payment_status}}
                )
                
                await db.bookings.update_one(
                    {"booking_id": transaction["booking_id"]},
                    {"$set": {"status": "confirmed", "payment_status": "paid"}}
                )
        
        return status.model_dump()
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Status check failed: {str(e)}")

@api_router.post("/webhook/stripe")
async def stripe_webhook(request: Request, stripe_signature: str = Header(None)):
    body = await request.body()
    stripe_api_key = os.environ.get('STRIPE_API_KEY')
    webhook_url = "https://placeholder.com/webhook"
    stripe_checkout = StripeCheckout(api_key=stripe_api_key, webhook_url=webhook_url)
    
    try:
        webhook_response = await stripe_checkout.handle_webhook(body, stripe_signature)
        
        if webhook_response.payment_status == "paid":
            transaction = await db.payment_transactions.find_one(
                {"session_id": webhook_response.session_id},
                {"_id": 0}
            )
            
            if transaction:
                await db.payment_transactions.update_one(
                    {"session_id": webhook_response.session_id},
                    {"$set": {"status": "completed"}}
                )
                
                await db.bookings.update_one(
                    {"booking_id": transaction["booking_id"]},
                    {"$set": {"status": "confirmed", "payment_status": "paid"}}
                )
        
        return {"status": "success"}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

# Contact endpoint
@api_router.post("/contact")
async def submit_contact(form_data: ContactForm):
    contact_dict = form_data.model_dump()
    contact_dict["created_at"] = datetime.now(timezone.utc).isoformat()
    await db.contacts.insert_one(contact_dict)
    return {"message": "Thank you for contacting us! We'll get back to you soon."}

# Admin endpoints
@api_router.post("/admin/login")
async def admin_login(login_data: AdminLogin):
    admin_username = os.environ.get('ADMIN_USERNAME', 'admin')
    admin_password = os.environ.get('ADMIN_PASSWORD', 'admin123')
    
    if login_data.username == admin_username and login_data.password == admin_password:
        return {"success": True, "message": "Login successful"}
    
    raise HTTPException(status_code=401, detail="Invalid credentials")

@api_router.get("/admin/bookings")
async def get_all_bookings():
    bookings = await db.bookings.find({}, {"_id": 0}).to_list(1000)
    return bookings

@api_router.put("/admin/rooms/{room_id}")
async def update_room(room_id: str, update_data: RoomUpdate):
    update_dict = {k: v for k, v in update_data.model_dump().items() if v is not None}
    
    if update_dict:
        await db.rooms.update_one(
            {"id": room_id},
            {"$set": update_dict}
        )
    
    room = await db.rooms.find_one({"id": room_id}, {"_id": 0})
    return room

@api_router.delete("/admin/bookings/{booking_id}")
async def admin_cancel_booking(booking_id: str):
    await db.bookings.update_one(
        {"booking_id": booking_id},
        {"$set": {"status": "cancelled"}}
    )
    return {"message": "Booking cancelled successfully"}

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()

# Initialize sample data on startup
@app.on_event("startup")
async def initialize_data():
    # Check if rooms exist
    existing_rooms = await db.rooms.count_documents({})
    if existing_rooms == 0:
        sample_rooms = [
            {
                "id": str(uuid.uuid4()),
                "name": "Deluxe King Suite",
                "description": "Spacious suite with king-size bed, stunning city views, and premium amenities. Perfect for couples seeking luxury and comfort.",
                "price_per_night": 299.0,
                "max_guests": 2,
                "amenities": ["King Bed", "City View", "WiFi", "Mini Bar", "Air Conditioning", "Smart TV"],
                "images": [
                    "https://images.unsplash.com/photo-1629140727571-9b5c6f6267b4?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBob3RlbCUyMGJlZHJvb20lMjBpbnRlcmlvcnxlbnwwfHx8fDE3Njc0NjQzMTZ8MA&ixlib=rb-4.1.0&q=85"
                ],
                "available": True
            },
            {
                "id": str(uuid.uuid4()),
                "name": "Ocean View Suite",
                "description": "Breathtaking ocean views with a private balcony, perfect for watching sunsets. Includes luxury bedding and spa-like bathroom.",
                "price_per_night": 399.0,
                "max_guests": 2,
                "amenities": ["Ocean View", "Private Balcony", "WiFi", "Jacuzzi", "Coffee Maker", "Smart TV"],
                "images": [
                    "https://images.unsplash.com/photo-1766928210443-0be92ed5884a?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzd8MHwxfHNlYXJjaHwyfHxsdXh1cnklMjBob3RlbCUyMGJlZHJvb20lMjBpbnRlcmlvcnxlbnwwfHx8fDE3Njc0NjQzMTZ8MA&ixlib=rb-4.1.0&q=85"
                ],
                "available": True
            },
            {
                "id": str(uuid.uuid4()),
                "name": "Standard Double Room",
                "description": "Comfortable and elegant room with two double beds, ideal for families or friends traveling together.",
                "price_per_night": 199.0,
                "max_guests": 4,
                "amenities": ["Two Double Beds", "WiFi", "Air Conditioning", "TV", "Work Desk"],
                "images": [
                    "https://images.unsplash.com/photo-1759264244764-2cb80f1a67bd?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzd8MHwxfHNlYXJjaHw0fHxsdXh1cnklMjBob3RlbCUyMGJlZHJvb20lMjBpbnRlcmlvcnxlbnwwfHx8fDE3Njc0NjQzMTZ8MA&ixlib=rb-4.1.0&q=85"
                ],
                "available": True
            }
        ]
        await db.rooms.insert_many(sample_rooms)
        logger.info("Sample rooms initialized")