import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const api = axios.create({
    baseURL: API_URL,
});

export const fetchRooms = () => api.get('/rooms');
export const createBooking = (bookingData) => api.post('/bookings', bookingData);
export const checkHealth = () => api.get('/health');

// Payment endpoints
export const createRazorpayOrder = (data) => api.post('/payments/razorpay/order', data);
export const verifyRazorpayPayment = (data) => api.post('/payments/razorpay/verify', data);
export const createStripeIntent = (data) => api.post('/payments/stripe/create-intent', data);

// Guest management
export const fetchGuestBooking = (bookingId, email) => api.get(`/guest/booking/${bookingId}?email=${email}`);

// Admin endpoints
export const fetchAdminBookings = () => api.get('/admin/bookings');
export const updateBookingStatus = (id, status) => api.patch(`/admin/bookings/${id}/status`, { status });
export const fetchAdminStats = () => api.get('/admin/stats');

export default api;
