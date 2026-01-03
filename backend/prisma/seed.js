const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    // Clear existing data
    await prisma.booking.deleteMany();
    await prisma.admin.deleteMany();
    await prisma.room.deleteMany();

    // Real Luxury Rooms from islayfrigatehotel.com
    const rooms = [
        {
            name: "Frigate Bird - King Suite",
            description: "Our premier king room offering breathtaking harbour views and a modern en-suite. Perfect for couples seeking a romantic getaway.",
            price: 180,
            capacity: 2,
            amenities: JSON.stringify(["Harbour View", "King Bed", "En-suite", "TV", "Tea/Coffee", "Hairdryer", "Desk"]),
            images: JSON.stringify(["https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&q=80"]),
        },
        {
            name: "Five Sisters - Family Room",
            description: "Spacious family accommodation with a double bed and two singles. Enjoy stunning views of the harbour directly from your window.",
            price: 240,
            capacity: 4,
            amenities: JSON.stringify(["Harbour View", "Double Bed", "2 Single Beds", "En-suite", "TV", "Tea/Coffee", "Desk"]),
            images: JSON.stringify(["https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80"]),
        },
        {
            name: "Caledonia - Double Room",
            description: "A bright and cozy double room with an en-suite bathroom and peaceful garden views. Newly renovated for maximum comfort.",
            price: 150,
            capacity: 2,
            amenities: JSON.stringify(["Garden View", "Double Bed", "En-suite", "TV", "Tea/Coffee", "Hairdryer"]),
            images: JSON.stringify(["https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80"]),
        },
        {
            name: "Nancy Glen - Single Room",
            description: "A charming single room with harbour views. Features a private (separate) bathroom for your exclusive use.",
            price: 110,
            capacity: 1,
            amenities: JSON.stringify(["Harbour View", "Single Bed", "Private Separate Bathroom", "TV", "Tea/Coffee", "Desk"]),
            images: JSON.stringify(["https://images.unsplash.com/photo-1505691938895-1758d7eaa511?auto=format&fit=crop&q=80"]),
        },
        {
            name: "Destiny - Twin Room",
            description: "Bright twin room with garden views and access to a shared bathroom. Ideal for friends or family members.",
            price: 130,
            capacity: 2,
            amenities: JSON.stringify(["Garden View", "Twin Beds", "Shared Bathroom", "TV", "Tea/Coffee", "Desk"]),
            images: JSON.stringify(["https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&q=80"]),
        },
        {
            name: "Village Belle - Double Room",
            description: "Enjoy classic sea views from this bright double room. Includes access to our well-maintained shared facilities.",
            price: 140,
            capacity: 2,
            amenities: JSON.stringify(["Sea View", "Double Bed", "Shared Bathroom", "TV", "Tea/Coffee", "Hairdryer"]),
            images: JSON.stringify(["https://images.unsplash.com/photo-1595576508898-0ad5c879a061?auto=format&fit=crop&q=80"]),
        },
    ];

    for (const room of rooms) {
        await prisma.room.create({ data: room });
    }

    // Create Admin
    await prisma.admin.create({
        data: {
            username: "admin",
            password: "password123",
        },
    });

    console.log('Database seeded with official hotel data.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
