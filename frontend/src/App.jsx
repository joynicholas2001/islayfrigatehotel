import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import MainLayout from './layouts/MainLayout';
import AdminLayout from './layouts/AdminLayout';
import Home from './pages/Home';
import Rooms from './pages/Rooms';
import Gallery from './pages/Gallery';
import FAQs from './pages/FAQs';
import Booking from './pages/Booking';
import Contact from './pages/Contact';
import ManageBooking from './pages/ManageBooking';
import RoomDetail from './pages/RoomDetail';
import AdminDashboard from './pages/AdminDashboard';
import AdminBookings from './pages/AdminBookings';
import AdminRooms from './pages/AdminRooms';
import About from './pages/About';

function App() {
  return (
    <Router>
      <Toaster position="top-center" />
      <Routes>
        {/* Guest Routes */}
        <Route path="/" element={<MainLayout><Home /></MainLayout>} />
        <Route path="/about" element={<MainLayout><About /></MainLayout>} />
        <Route path="/rooms" element={<MainLayout><Rooms /></MainLayout>} />
        <Route path="/rooms/:id" element={<MainLayout><RoomDetail /></MainLayout>} />
        <Route path="/gallery" element={<MainLayout><Gallery /></MainLayout>} />
        <Route path="/faqs" element={<MainLayout><FAQs /></MainLayout>} />
        <Route path="/contact" element={<MainLayout><Contact /></MainLayout>} />
        <Route path="/book" element={<MainLayout><Booking /></MainLayout>} />
        <Route path="/manage-booking" element={<MainLayout><ManageBooking /></MainLayout>} />

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout><AdminDashboard /></AdminLayout>} />
        <Route path="/admin/bookings" element={<AdminLayout><AdminBookings /></AdminLayout>} />
        <Route path="/admin/rooms" element={<AdminLayout><AdminRooms /></AdminLayout>} />
        <Route path="/admin/settings" element={<AdminLayout><div className="pt-24 text-center">Admin Settings</div></AdminLayout>} />
      </Routes>
    </Router>
  );
}

export default App;
