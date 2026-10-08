import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import { ProtectedRoute, AdminRoute } from './components/ProtectedRoute';
import Home from './pages/Home';
import Auth from './pages/Auth';
import Profile from './pages/Profile';
import { Tours, Destinations } from './pages/Catalog';
import PackageDetails from './pages/PackageDetails';
import MyEnquiries from './pages/MyEnquiries';
import Admin from './pages/Admin';

export default function App() {
    return <BrowserRouter><Layout><Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Auth />} />
        <Route path="/signup" element={<Auth mode="signup" />} />
        <Route path="/destinations" element={<Destinations />} />
        <Route path="/tours" element={<Tours />} />
        <Route path="/spiritual" element={<Tours category="Spiritual" />} />
        <Route path="/packages/:id" element={<PackageDetails />} />
        <Route element={<ProtectedRoute />}><Route path="/profile" element={<Profile />} /><Route path="/my-enquiries" element={<MyEnquiries />} /></Route>
        <Route element={<AdminRoute />}><Route path="/admin" element={<Admin />} /></Route>
        <Route path="*" element={<Home />} />
    </Routes></Layout></BrowserRouter>
}
