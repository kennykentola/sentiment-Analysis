import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth, type Role } from '@/contexts/AuthContext';
import { Loader2 } from 'lucide-react';

interface ProtectedRouteProps {
  allowedRoles?: Role[];
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles }) => {
  const { user, role, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-zinc-950 text-blue-500">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(role)) {
    // If user doesn't have the required role, redirect to their specific dashboard based on their role
    switch (role) {
      case 'super_admin': return <Navigate to="/app/super-admin/dashboard" replace />;
      case 'admin': return <Navigate to="/app/admin/dashboard" replace />;
      case 'analyst': return <Navigate to="/app/analyst/dashboard" replace />;
      case 'researcher': return <Navigate to="/app/researcher/dashboard" replace />;
      case 'viewer': return <Navigate to="/app/viewer/dashboard" replace />;
      default: return <Navigate to="/" replace />;
    }
  }

  if (!allowedRoles) {
    // We are at the index route. Redirect to the correct dashboard based on role.
    switch (role) {
      case 'super_admin': return <Navigate to="/app/super-admin/dashboard" replace />;
      case 'admin': return <Navigate to="/app/admin/dashboard" replace />;
      case 'analyst': return <Navigate to="/app/analyst/dashboard" replace />;
      case 'researcher': return <Navigate to="/app/researcher/dashboard" replace />;
      case 'viewer': return <Navigate to="/app/viewer/dashboard" replace />;
      default: return <Navigate to="/" replace />;
    }
  }

  return <Outlet />;
};
