import { Outlet, Link, Navigate } from 'react-router-dom';
import { LayoutDashboard, Users, Activity, LogOut, Menu, X, Database, FileText, TrendingUp, MessageSquare, Clock, GraduationCap, MapPin, Search, Bell, User, Settings, Layers, Save, Download } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

export function DashboardLayout() {
  const { user, role, isLoading, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  if (isLoading) return <div className="min-h-screen bg-zinc-950 flex items-center justify-center text-white">Loading...</div>;
  if (!user) return <Navigate to="/auth/login" replace />;

  const NavLinks = () => (
    <>
      {/* Super Admin & Admin */}
      {['super_admin'].includes(role) && (
        <>
          <Link onClick={() => setIsMobileMenuOpen(false)} to="/app/super-admin/dashboard" className="flex items-center space-x-3 px-3 py-2 text-zinc-400 hover:bg-zinc-800 rounded-md text-sm font-medium transition-colors">
            <LayoutDashboard size={18} />
            <span>Super Admin</span>
          </Link>
          <Link onClick={() => setIsMobileMenuOpen(false)} to="/app/super-admin/users" className="flex items-center space-x-3 px-3 py-2 text-zinc-400 hover:bg-zinc-800 rounded-md text-sm font-medium transition-colors">
            <Users size={18} />
            <span>Manage Users</span>
          </Link>
        </>
      )}

      {['super_admin', 'admin'].includes(role) && (
        <>
          <Link onClick={() => setIsMobileMenuOpen(false)} to="/app/admin/dashboard" className="flex items-center space-x-3 px-3 py-2 text-zinc-400 hover:bg-zinc-800 rounded-md text-sm font-medium transition-colors">
            <LayoutDashboard size={18} />
            <span>Admin</span>
          </Link>
          <Link onClick={() => setIsMobileMenuOpen(false)} to="/app/admin/universities" className="flex items-center space-x-3 px-3 py-2 text-zinc-400 hover:bg-zinc-800 rounded-md text-sm font-medium transition-colors">
            <Users size={18} />
            <span>Universities</span>
          </Link>
        </>
      )}

      {/* Analyst */}
      {['super_admin', 'analyst'].includes(role) && (
        <>
          <Link onClick={() => setIsMobileMenuOpen(false)} to="/app/analyst/dashboard" className="flex items-center space-x-3 px-3 py-2 text-zinc-400 hover:bg-zinc-800 rounded-md text-sm font-medium transition-colors">
            <LayoutDashboard size={18} />
            <span>Analyst Dashboard</span>
          </Link>
          <Link onClick={() => setIsMobileMenuOpen(false)} to="/app/analyst/analytics" className="flex items-center space-x-3 px-3 py-2 text-zinc-400 hover:bg-zinc-800 rounded-md text-sm font-medium transition-colors">
            <Activity size={18} />
            <span>Sentiment Analysis</span>
          </Link>
          <Link onClick={() => setIsMobileMenuOpen(false)} to="/app/analyst/topic-modelling" className="flex items-center space-x-3 px-3 py-2 text-zinc-400 hover:bg-zinc-800 rounded-md text-sm font-medium transition-colors">
            <MessageSquare size={18} />
            <span>Topic Modelling</span>
          </Link>
          <Link onClick={() => setIsMobileMenuOpen(false)} to="/app/analyst/trend-analysis" className="flex items-center space-x-3 px-3 py-2 text-zinc-400 hover:bg-zinc-800 rounded-md text-sm font-medium transition-colors">
            <TrendingUp size={18} />
            <span>Trend Analysis</span>
          </Link>
          <Link onClick={() => setIsMobileMenuOpen(false)} to="/app/analyst/data-sources" className="flex items-center space-x-3 px-3 py-2 text-zinc-400 hover:bg-zinc-800 rounded-md text-sm font-medium transition-colors">
            <Database size={18} />
            <span>Data Sources</span>
          </Link>
          <Link onClick={() => setIsMobileMenuOpen(false)} to="/app/analyst/collection-jobs" className="flex items-center space-x-3 px-3 py-2 text-zinc-400 hover:bg-zinc-800 rounded-md text-sm font-medium transition-colors">
            <Clock size={18} />
            <span>Collection Jobs</span>
          </Link>
          <Link onClick={() => setIsMobileMenuOpen(false)} to="/app/analyst/university-analysis" className="flex items-center space-x-3 px-3 py-2 text-zinc-400 hover:bg-zinc-800 rounded-md text-sm font-medium transition-colors">
            <GraduationCap size={18} />
            <span>University Analysis</span>
          </Link>
          <Link onClick={() => setIsMobileMenuOpen(false)} to="/app/analyst/regional-analysis" className="flex items-center space-x-3 px-3 py-2 text-zinc-400 hover:bg-zinc-800 rounded-md text-sm font-medium transition-colors">
            <MapPin size={18} />
            <span>Regional Analysis</span>
          </Link>
          <Link onClick={() => setIsMobileMenuOpen(false)} to="/app/analyst/search" className="flex items-center space-x-3 px-3 py-2 text-zinc-400 hover:bg-zinc-800 rounded-md text-sm font-medium transition-colors">
            <Search size={18} />
            <span>Search</span>
          </Link>
          <Link onClick={() => setIsMobileMenuOpen(false)} to="/app/analyst/reports" className="flex items-center space-x-3 px-3 py-2 text-zinc-400 hover:bg-zinc-800 rounded-md text-sm font-medium transition-colors">
            <FileText size={18} />
            <span>Reports</span>
          </Link>
          <Link onClick={() => setIsMobileMenuOpen(false)} to="/app/analyst/notifications" className="flex items-center space-x-3 px-3 py-2 text-zinc-400 hover:bg-zinc-800 rounded-md text-sm font-medium transition-colors">
            <Bell size={18} />
            <span>Notifications</span>
          </Link>
        </>
      )}

      {/* Researcher */}
      {['super_admin', 'researcher'].includes(role) && (
        <>
          <Link onClick={() => setIsMobileMenuOpen(false)} to="/app/researcher/dashboard" className="flex items-center space-x-3 px-3 py-2 text-zinc-400 hover:bg-zinc-800 rounded-md text-sm font-medium transition-colors">
            <LayoutDashboard size={18} />
            <span>Research Hub</span>
          </Link>
          <Link onClick={() => setIsMobileMenuOpen(false)} to="/app/researcher/projects" className="flex items-center space-x-3 px-3 py-2 text-zinc-400 hover:bg-zinc-800 rounded-md text-sm font-medium transition-colors">
            <Layers size={18} />
            <span>Research Projects</span>
          </Link>
          <Link onClick={() => setIsMobileMenuOpen(false)} to="/app/researcher/datasets" className="flex items-center space-x-3 px-3 py-2 text-zinc-400 hover:bg-zinc-800 rounded-md text-sm font-medium transition-colors">
            <Database size={18} />
            <span>Datasets</span>
          </Link>
          <Link onClick={() => setIsMobileMenuOpen(false)} to="/app/researcher/sentiment-analysis" className="flex items-center space-x-3 px-3 py-2 text-zinc-400 hover:bg-zinc-800 rounded-md text-sm font-medium transition-colors">
            <Activity size={18} />
            <span>Sentiment Analysis</span>
          </Link>
          <Link onClick={() => setIsMobileMenuOpen(false)} to="/app/researcher/topic-modelling" className="flex items-center space-x-3 px-3 py-2 text-zinc-400 hover:bg-zinc-800 rounded-md text-sm font-medium transition-colors">
            <MessageSquare size={18} />
            <span>Topic Modelling</span>
          </Link>
          <Link onClick={() => setIsMobileMenuOpen(false)} to="/app/researcher/trend-analysis" className="flex items-center space-x-3 px-3 py-2 text-zinc-400 hover:bg-zinc-800 rounded-md text-sm font-medium transition-colors">
            <TrendingUp size={18} />
            <span>Trend Analysis</span>
          </Link>
          <Link onClick={() => setIsMobileMenuOpen(false)} to="/app/researcher/university-analysis" className="flex items-center space-x-3 px-3 py-2 text-zinc-400 hover:bg-zinc-800 rounded-md text-sm font-medium transition-colors">
            <GraduationCap size={18} />
            <span>University Analysis</span>
          </Link>
          <Link onClick={() => setIsMobileMenuOpen(false)} to="/app/researcher/regional-analysis" className="flex items-center space-x-3 px-3 py-2 text-zinc-400 hover:bg-zinc-800 rounded-md text-sm font-medium transition-colors">
            <MapPin size={18} />
            <span>Regional Analysis</span>
          </Link>
          <Link onClick={() => setIsMobileMenuOpen(false)} to="/app/researcher/publications" className="flex items-center space-x-3 px-3 py-2 text-zinc-400 hover:bg-zinc-800 rounded-md text-sm font-medium transition-colors">
            <FileText size={18} />
            <span>Publications</span>
          </Link>
          <Link onClick={() => setIsMobileMenuOpen(false)} to="/app/researcher/reports" className="flex items-center space-x-3 px-3 py-2 text-zinc-400 hover:bg-zinc-800 rounded-md text-sm font-medium transition-colors">
            <FileText size={18} />
            <span>Reports</span>
          </Link>
          <Link onClick={() => setIsMobileMenuOpen(false)} to="/app/researcher/saved-queries" className="flex items-center space-x-3 px-3 py-2 text-zinc-400 hover:bg-zinc-800 rounded-md text-sm font-medium transition-colors">
            <Save size={18} />
            <span>Saved Queries</span>
          </Link>
          <Link onClick={() => setIsMobileMenuOpen(false)} to="/app/researcher/export-center" className="flex items-center space-x-3 px-3 py-2 text-zinc-400 hover:bg-zinc-800 rounded-md text-sm font-medium transition-colors">
            <Download size={18} />
            <span>Export Center</span>
          </Link>
        </>
      )}

      {/* Viewer */}
      {['viewer'].includes(role) && (
        <>
          <Link onClick={() => setIsMobileMenuOpen(false)} to="/app/viewer/dashboard" className="flex items-center space-x-3 px-3 py-2 text-zinc-400 hover:bg-zinc-800 rounded-md text-sm font-medium transition-colors">
            <LayoutDashboard size={18} />
            <span>Viewer Dashboard</span>
          </Link>
          <Link onClick={() => setIsMobileMenuOpen(false)} to="/app/viewer/sentiment-trends" className="flex items-center space-x-3 px-3 py-2 text-zinc-400 hover:bg-zinc-800 rounded-md text-sm font-medium transition-colors">
            <TrendingUp size={18} />
            <span>Sentiment Trends</span>
          </Link>
          <Link onClick={() => setIsMobileMenuOpen(false)} to="/app/viewer/universities" className="flex items-center space-x-3 px-3 py-2 text-zinc-400 hover:bg-zinc-800 rounded-md text-sm font-medium transition-colors">
            <GraduationCap size={18} />
            <span>Universities</span>
          </Link>
          <Link onClick={() => setIsMobileMenuOpen(false)} to="/app/viewer/regional-analysis" className="flex items-center space-x-3 px-3 py-2 text-zinc-400 hover:bg-zinc-800 rounded-md text-sm font-medium transition-colors">
            <MapPin size={18} />
            <span>Regional Analysis</span>
          </Link>
          <Link onClick={() => setIsMobileMenuOpen(false)} to="/app/viewer/topics" className="flex items-center space-x-3 px-3 py-2 text-zinc-400 hover:bg-zinc-800 rounded-md text-sm font-medium transition-colors">
            <MessageSquare size={18} />
            <span>Topics</span>
          </Link>
          <Link onClick={() => setIsMobileMenuOpen(false)} to="/app/viewer/reports" className="flex items-center space-x-3 px-3 py-2 text-zinc-400 hover:bg-zinc-800 rounded-md text-sm font-medium transition-colors">
            <FileText size={18} />
            <span>Public Reports</span>
          </Link>
        </>
      )}

      {/* Shared Bottom Links for everyone */}
      <div className="pt-4 mt-4 border-t border-zinc-800">
        <Link onClick={() => setIsMobileMenuOpen(false)} to="/app/viewer/profile" className="flex items-center space-x-3 px-3 py-2 text-zinc-400 hover:bg-zinc-800 rounded-md text-sm font-medium transition-colors">
          <User size={18} />
          <span>Profile</span>
        </Link>
        <Link onClick={() => setIsMobileMenuOpen(false)} to="/app/viewer/settings" className="flex items-center space-x-3 px-3 py-2 text-zinc-400 hover:bg-zinc-800 rounded-md text-sm font-medium transition-colors">
          <Settings size={18} />
          <span>Settings</span>
        </Link>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex">
      {/* Desktop Sidebar */}
      <aside className="w-64 bg-zinc-900 border-r border-zinc-800 hidden md:block">
        <div className="h-16 flex items-center px-6 border-b border-zinc-800">
          <span className="font-bold text-lg tracking-tight">Sentiment Hub</span>
        </div>
        <nav className="p-4 space-y-2">
          <NavLinks />
        </nav>
      </aside>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)} />
          <aside className="relative w-64 bg-zinc-900 h-full border-r border-zinc-800 flex flex-col">
            <div className="h-16 flex items-center justify-between px-6 border-b border-zinc-800">
              <span className="font-bold text-lg tracking-tight">Sentiment Hub</span>
              <button title="Close Menu" onClick={() => setIsMobileMenuOpen(false)} className="text-zinc-400 hover:text-white">
                <X size={20} />
              </button>
            </div>
            <nav className="p-4 space-y-2 flex-1 overflow-y-auto">
              <NavLinks />
            </nav>
          </aside>
        </div>
      )}

      <main className="flex-1 flex flex-col min-w-0">
        <header className="h-16 border-b border-zinc-800 flex items-center justify-between md:justify-end px-4 md:px-6 bg-zinc-950">
          <button 
            title="Open Menu"
            className="md:hidden text-zinc-400 hover:text-white"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu size={24} />
          </button>
          <div className="flex items-center space-x-4">
            <span className="text-sm font-medium hidden sm:inline-block">{user.name || user.email}</span>
            <div className="h-8 w-8 rounded-full bg-indigo-600 flex items-center justify-center font-bold text-sm">
              {(user.name || user.email || 'A').charAt(0).toUpperCase()}
            </div>
            <button onClick={logout} className="text-zinc-400 hover:text-white p-2" title="Logout" aria-label="Logout">
              <LogOut size={18} />
            </button>
          </div>
        </header>
        <div className="flex-1 p-4 md:p-6 overflow-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
