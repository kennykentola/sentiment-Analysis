import { Outlet, Link, Navigate } from 'react-router-dom';
import { LayoutDashboard, Users, Activity, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export function DashboardLayout() {
  const { user, role, isLoading, logout } = useAuth();

  if (isLoading) return <div className="min-h-screen bg-zinc-950 flex items-center justify-center text-white">Loading...</div>;
  if (!user) return <Navigate to="/auth/login" replace />;

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex">
      <aside className="w-64 bg-zinc-900 border-r border-zinc-800 hidden md:block">
        <div className="h-16 flex items-center px-6 border-b border-zinc-800">
          <span className="font-bold text-lg tracking-tight">Sentiment Hub</span>
        </div>
        <nav className="p-4 space-y-2">
          {/* Super Admin & Admin */}
          {['super_admin'].includes(role) && (
            <>
              <Link to="/app/super-admin/dashboard" className="flex items-center space-x-3 px-3 py-2 text-zinc-400 hover:bg-zinc-800 rounded-md text-sm font-medium transition-colors">
                <LayoutDashboard size={18} />
                <span>Super Admin</span>
              </Link>
              <Link to="/app/super-admin/users" className="flex items-center space-x-3 px-3 py-2 text-zinc-400 hover:bg-zinc-800 rounded-md text-sm font-medium transition-colors">
                <Users size={18} />
                <span>Manage Users</span>
              </Link>
            </>
          )}

          {['super_admin', 'admin'].includes(role) && (
            <>
              <Link to="/app/admin/dashboard" className="flex items-center space-x-3 px-3 py-2 text-zinc-400 hover:bg-zinc-800 rounded-md text-sm font-medium transition-colors">
                <LayoutDashboard size={18} />
                <span>Admin</span>
              </Link>
              <Link to="/app/admin/universities" className="flex items-center space-x-3 px-3 py-2 text-zinc-400 hover:bg-zinc-800 rounded-md text-sm font-medium transition-colors">
                <Users size={18} />
                <span>Universities</span>
              </Link>
            </>
          )}

          {/* Analyst */}
          {['super_admin', 'analyst'].includes(role) && (
            <>
              <Link to="/app/analyst/dashboard" className="flex items-center space-x-3 px-3 py-2 text-zinc-400 hover:bg-zinc-800 rounded-md text-sm font-medium transition-colors">
                <LayoutDashboard size={18} />
                <span>Analyst Dashboard</span>
              </Link>
              <Link to="/app/analyst/analytics" className="flex items-center space-x-3 px-3 py-2 text-zinc-400 hover:bg-zinc-800 rounded-md text-sm font-medium transition-colors">
                <Activity size={18} />
                <span>Analytics</span>
              </Link>
            </>
          )}

          {/* Researcher */}
          {['super_admin', 'researcher'].includes(role) && (
            <Link to="/app/researcher/dashboard" className="flex items-center space-x-3 px-3 py-2 text-zinc-400 hover:bg-zinc-800 rounded-md text-sm font-medium transition-colors">
              <LayoutDashboard size={18} />
              <span>Research Hub</span>
            </Link>
          )}

          {/* Viewer */}
          {['viewer'].includes(role) && (
            <Link to="/app/viewer/dashboard" className="flex items-center space-x-3 px-3 py-2 text-zinc-400 hover:bg-zinc-800 rounded-md text-sm font-medium transition-colors">
              <LayoutDashboard size={18} />
              <span>Viewer Dashboard</span>
            </Link>
          )}
        </nav>
      </aside>
      <main className="flex-1 flex flex-col">
        <header className="h-16 border-b border-zinc-800 flex items-center justify-end px-6 bg-zinc-950">
           <div className="flex items-center space-x-4">
              <span className="text-sm font-medium">{user.name || user.email}</span>
              <div className="h-8 w-8 rounded-full bg-indigo-600 flex items-center justify-center font-bold">
                 {(user.name || user.email || 'A').charAt(0).toUpperCase()}
              </div>
              <button onClick={logout} className="text-zinc-400 hover:text-white p-2" title="Logout" aria-label="Logout">
                 <LogOut size={18} />
              </button>
           </div>
        </header>
        <div className="flex-1 p-6 overflow-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
