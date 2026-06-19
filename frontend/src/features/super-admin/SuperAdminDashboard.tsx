import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Terminal, ShieldAlert, Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer } from 'recharts';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { account } from '@/services/appwrite';

const fetchUsers = async () => {
  const session = await account.createJWT();
  const response = await fetch('http://localhost:8000/api/v1/users/', {
    headers: { 'x-appwrite-jwt': session.jwt }
  });
  if (!response.ok) throw new Error("Failed to fetch users");
  return await response.json();
};

const createUser = async (payload: any) => {
  const session = await account.createJWT();
  const response = await fetch('http://localhost:8000/api/v1/users/', {
    method: 'POST',
    headers: { 'x-appwrite-jwt': session.jwt, 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  if (!response.ok) throw new Error("Failed to create user");
  return await response.json();
};

export default function SuperAdminDashboard() {
  const queryClient = useQueryClient();
  const [showInvite, setShowInvite] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'analyst' });

  const { data: usersData, isLoading } = useQuery({
    queryKey: ['adminUsers'],
    queryFn: fetchUsers,
  });

  const mutation = useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminUsers'] });
      setShowInvite(false);
      setFormData({ name: '', email: '', password: '', role: 'analyst' });
    }
  });

  const handleInvite = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(formData);
  };

  const cpuData = [
    { time: '10:00', load: 45 }, { time: '10:05', load: 52 }, { time: '10:10', load: 48 },
    { time: '10:15', load: 70 }, { time: '10:20', load: 85 }, { time: '10:25', load: 60 },
    { time: '10:30', load: 55 },
  ];

  const auditLogs = [
    { id: 1, timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19), level: "INFO", action: "System metrics fetched", user: "system", ip: "localhost" },
    { id: 2, timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19), level: "INFO", action: "NLP Pipeline Worker check", user: "system", ip: "localhost" },
  ];

  const usersList = usersData?.users || [];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white flex items-center gap-2">
            <ShieldAlert className="text-rose-500" size={28} /> Global Command Center
          </h1>
          <p className="text-zinc-400">System health, global audit logs, and complete RBAC control.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* User Management */}
        <Card className="bg-zinc-900 border-zinc-800 text-white shadow-none">
          <CardHeader className="flex flex-row justify-between items-center pb-2">
            <div>
              <CardTitle>RBAC Control Matrix</CardTitle>
              <CardDescription className="text-zinc-400">Manage user roles and permissions</CardDescription>
            </div>
            <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700" onClick={() => setShowInvite(!showInvite)}>
              {showInvite ? 'Cancel' : 'Invite User'}
            </Button>
          </CardHeader>
          <CardContent className="overflow-auto max-h-[350px]">
            {showInvite && (
              <form onSubmit={handleInvite} className="mb-6 p-4 bg-zinc-950 border border-zinc-800 rounded-md space-y-3">
                <div className="text-sm font-medium text-white mb-2">Invite New User</div>
                <Input placeholder="Full Name" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="bg-zinc-900 border-zinc-700 text-white" />
                <Input placeholder="Email Address" type="email" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="bg-zinc-900 border-zinc-700 text-white" />
                <Input placeholder="Password (min 8 chars)" type="password" required minLength={8} value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} className="bg-zinc-900 border-zinc-700 text-white" />
                <select 
                  title="Role"
                  className="flex h-10 w-full items-center justify-between rounded-md border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-white"
                  value={formData.role}
                  onChange={e => setFormData({...formData, role: e.target.value})}
                >
                  <option value="super_admin">Super Admin</option>
                  <option value="admin">Administrator</option>
                  <option value="analyst">Analyst</option>
                  <option value="researcher">Researcher</option>
                  <option value="viewer">Viewer</option>
                </select>
                <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700" disabled={mutation.isPending}>
                  {mutation.isPending ? <Loader2 className="animate-spin" size={16} /> : 'Create User'}
                </Button>
              </form>
            )}

            {isLoading ? (
              <div className="flex justify-center p-4"><Loader2 className="animate-spin text-indigo-500" /></div>
            ) : (
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-zinc-400 uppercase border-b border-zinc-800 sticky top-0 bg-zinc-900">
                  <tr>
                    <th className="py-2 font-medium">User</th>
                    <th className="py-2 font-medium">Role</th>
                    <th className="py-2 font-medium text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800/50">
                  {usersList.map((user: any) => (
                    <tr key={user.$id} className="hover:bg-zinc-800/50 transition-colors">
                      <td className="py-2">
                        <div className="font-medium text-zinc-200">{user.name}</div>
                        <div className="text-xs text-zinc-500">{user.email}</div>
                      </td>
                      <td className="py-2">
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border bg-zinc-500/10 text-zinc-400 border-zinc-500/20">
                          {user.prefs?.role || 'viewer'}
                        </span>
                      </td>
                      <td className="py-2 text-right">
                        <span className="text-emerald-500 text-xs font-medium">Active</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </CardContent>
        </Card>

        {/* Real-time CPU Chart */}
        <Card className="bg-zinc-900 border-zinc-800 text-white shadow-none">
          <CardHeader>
            <CardTitle>FastAPI Cluster CPU Load</CardTitle>
            <CardDescription className="text-zinc-400">Real-time telemetry</CardDescription>
          </CardHeader>
          <CardContent className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={cpuData} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                <XAxis dataKey="time" stroke="#a1a1aa" tickLine={false} tick={{fontSize: 12}} />
                <YAxis stroke="#a1a1aa" tickLine={false} tick={{fontSize: 12}} domain={[0, 100]} />
                <RechartsTooltip contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', borderRadius: '0.5rem' }} />
                <Line type="monotone" dataKey="load" stroke="#f43f5e" strokeWidth={2} dot={{ r: 3 }} activeDot={{ r: 5 }} name="CPU %" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Terminal Audit Log */}
      <Card className="bg-black border-zinc-800 text-white font-mono shadow-none">
        <CardHeader className="border-b border-zinc-800 bg-zinc-950 pb-3 flex flex-row items-center gap-2">
          <Terminal size={18} className="text-zinc-400" />
          <CardTitle className="text-sm font-medium text-zinc-300">Live System Audit Log</CardTitle>
        </CardHeader>
        <CardContent className="p-4 overflow-x-auto">
          <div className="space-y-1 text-xs">
            {auditLogs.map((log) => (
              <div key={log.id} className="flex gap-4 whitespace-nowrap">
                <span className="text-zinc-500">[{log.timestamp}]</span>
                <span className={`w-16 ${
                  log.level === 'CRITICAL' ? 'text-rose-500 font-bold' :
                  log.level === 'WARN' ? 'text-amber-400' : 'text-sky-400'
                }`}>
                  {log.level}
                </span>
                <span className="text-zinc-300 w-64">{log.action}</span>
                <span className="text-indigo-400 w-48">{log.user}</span>
                <span className="text-zinc-600">{log.ip}</span>
              </div>
            ))}
            <div className="flex gap-4 whitespace-nowrap animate-pulse mt-2">
              <span className="text-zinc-500">[{new Date().toISOString().replace('T', ' ').substring(0, 19)}]</span>
              <span className="text-zinc-400">Waiting for incoming logs...</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
