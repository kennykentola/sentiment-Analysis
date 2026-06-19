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
import DatasetLibrary from '../features/researcher/DatasetLibrary';
import PublicationWorkspace from '../features/researcher/PublicationWorkspace';
import UserManagement from '../features/super-admin/UserManagement';
import ViewerDashboard from '../features/viewer/ViewerDashboard';
import { ProtectedRoute } from '../components/auth/ProtectedRoute';

// Analyst Pages
import TopicModelling from '../features/analyst/TopicModelling';
import TrendAnalysis from '../features/analyst/TrendAnalysis';
import DataSources from '../features/analyst/DataSources';
import CollectionJobs from '../features/analyst/CollectionJobs';
import UniversityAnalysis from '../features/analyst/UniversityAnalysis';
import RegionalAnalysis from '../features/analyst/RegionalAnalysis';
import Search from '../features/analyst/Search';
import Reports from '../features/analyst/Reports';

// Viewer Pages
import SentimentTrends from '../features/viewer/SentimentTrends';
import UniversitiesViewer from '../features/viewer/Universities';
import RegionalAnalysisViewer from '../features/viewer/RegionalAnalysis';
import Topics from '../features/viewer/Topics';
import PublicReports from '../features/viewer/PublicReports';

// Shared Pages
import ProfileSettings from '../features/shared/ProfileSettings';
import Notifications from '../features/shared/Notifications';

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
          { path: 'analytics', element: <Analytics /> },
          { path: 'topic-modelling', element: <TopicModelling /> },
          { path: 'trend-analysis', element: <TrendAnalysis /> },
          { path: 'data-sources', element: <DataSources /> },
          { path: 'collection-jobs', element: <CollectionJobs /> },
          { path: 'university-analysis', element: <UniversityAnalysis /> },
          { path: 'regional-analysis', element: <RegionalAnalysis /> },
          { path: 'search', element: <Search /> },
          { path: 'reports', element: <Reports /> },
          { path: 'notifications', element: <Notifications /> },
          { path: 'profile', element: <ProfileSettings /> },
          { path: 'settings', element: <ProfileSettings /> }
        ]
      },

      // Researcher Routes
      { 
        path: 'researcher', 
        element: <ProtectedRoute allowedRoles={['researcher', 'super_admin']} />,
        children: [
          { path: 'dashboard', element: <ResearcherDashboard /> },
          { path: 'datasets', element: <DatasetLibrary /> },
          { path: 'publications', element: <PublicationWorkspace /> }
        ]
      },

      // Viewer Routes
      { 
        path: 'viewer', 
        element: <ProtectedRoute allowedRoles={['viewer', 'super_admin', 'admin', 'analyst', 'researcher']} />,
        children: [
          { path: 'dashboard', element: <ViewerDashboard /> },
          { path: 'sentiment-trends', element: <SentimentTrends /> },
          { path: 'universities', element: <UniversitiesViewer /> },
          { path: 'regional-analysis', element: <RegionalAnalysisViewer /> },
          { path: 'topics', element: <Topics /> },
          { path: 'reports', element: <PublicReports /> },
          { path: 'profile', element: <ProfileSettings /> },
          { path: 'settings', element: <ProfileSettings /> }
        ]
      }
    ],
  }
]);
