import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export function ProtectedRoute() {
  const { session, loading } = useAuth();
  if (loading) return <div className="center-page"><div className="spinner" /></div>;
  return session ? <Outlet /> : <Navigate to="/login" replace />;
}

export function AdminRoute() {
  const { profile, loading } = useAuth();
  if (loading) return <div className="center-page"><div className="spinner" /></div>;
  return profile?.role === 'admin' ? <Outlet /> : <Navigate to="/" replace />;
}
