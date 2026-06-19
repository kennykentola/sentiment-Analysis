import { createBrowserRouter } from 'react-router-dom';
import { AuthLayout } from '../layouts/AuthLayout';
import { DashboardLayout } from '../layouts/DashboardLayout';
import Home from '../pages/Home';
import Login from '../pages/Login';

import Analytics from '../pages/Analytics';
import Universities from '../pages/Universities';
import ErrorBoundary from '../components/shared/ErrorBoundary';

import AnalystDashboard from '../features/analyst/AnalystDashboard';
import SuperAdminDashboard from '../features/super-admin/SuperAdminDashboard';
import AdminDashboard from '../features/admin/AdminDashboard';
import ResearcherDashboard from '../features/researcher/ResearcherDashboard';
import UserManagement from '../features/super-admin/UserManagement';
import ViewerDashboard from '../features/viewer/ViewerDashboard';
import { ProtectedRoute } from '../components/auth/ProtectedRoute';

import { PublicLayout } from '../layouts/PublicLayout';
import Register from '../pages/auth/Register';
import ForgotPassword from '../pages/auth/ForgotPassword';
import VerifyEmail from '../pages/auth/VerifyEmail';

import About from '../pages/public/About';
import Features from '../pages/public/Features';
import Pricing from '../pages/public/Pricing';
import Documentation from '../pages/public/Documentation';
import Contact from '../pages/public/Contact';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <PublicLayout />,
    errorElement: <ErrorBoundary />,
    children: [
      { index: true, element: <Home /> },
      { path: 'about', element: <About /> },
      { path: 'features', element: <Features /> },
      { path: 'pricing', element: <Pricing /> },
      { path: 'docs', element: <Documentation /> },
      { path: 'contact', element: <Contact /> },
    ]
  },
  {
    path: '/auth',
    element: <AuthLayout />,
    errorElement: <ErrorBoundary />,
    children: [
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
      { path: 'forgot-password', element: <ForgotPassword /> },
      { path: 'verify-email', element: <VerifyEmail /> },
    ],
  },
  {
    path: '/app',
    element: <DashboardLayout />,
    errorElement: <ErrorBoundary />,
    children: [
      // If a user just goes to /app, redirect them to their specific dashboard
      { index: true, element: <ProtectedRoute /> }, 
      
      // Super Admin Routes
      { 
        path: 'super-admin', 
        element: <ProtectedRoute allowedRoles={['super_admin']} />,
        children: [
          { path: 'dashboard', element: <SuperAdminDashboard /> },
          { path: 'users', element: <UserManagement /> }
        ]
      },
      
      // Admin Routes
      { 
        path: 'admin', 
        element: <ProtectedRoute allowedRoles={['admin', 'super_admin']} />,
        children: [
          { path: 'dashboard', element: <AdminDashboard /> },
          { path: 'universities', element: <Universities /> }
        ]
      },

      // Analyst Routes
      { 
        path: 'analyst', 
        element: <ProtectedRoute allowedRoles={['analyst', 'super_admin']} />,
        children: [
          { path: 'dashboard', element: <AnalystDashboard /> },
          { path: 'analytics', element: <Analytics /> }
        ]
      },

      // Researcher Routes
      { 
        path: 'researcher', 
        element: <ProtectedRoute allowedRoles={['researcher', 'super_admin']} />,
        children: [
          { path: 'dashboard', element: <ResearcherDashboard /> }
        ]
      },

      // Viewer Routes
      { 
        path: 'viewer', 
        element: <ProtectedRoute allowedRoles={['viewer', 'super_admin', 'admin', 'analyst', 'researcher']} />,
        children: [
          { path: 'dashboard', element: <ViewerDashboard /> }
        ]
      }
    ],
  }
]);
