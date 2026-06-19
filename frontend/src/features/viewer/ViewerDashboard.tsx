import { useQuery } from '@tanstack/react-query';
import { Activity, AlertTriangle, MessageSquare, TrendingUp, Loader2, Clock } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend, LineChart, Line, XAxis, YAxis, CartesianGrid, BarChart, Bar } from 'recharts';
import { account } from '@/services/appwrite';
import { useAuth } from '@/contexts/AuthContext';

const fetchLiveAnalytics = async () => {
  try {
    const session = await account.createJWT();
    const response = await fetch('http://localhost:8000/api/v1/analytics/latest', {
      headers: { 'x-appwrite-jwt': session.jwt }
    });
    if (!response.ok) throw new Error("API Error");
    return await response.json();
  } catch (error) {
    return null;
  }
};

export default function ViewerDashboard() {
  const { user } = useAuth();
  const kycStatus = user?.prefs?.kyc_status;

  const { data, isLoading } = useQuery({
    queryKey: ['viewerAnalytics'],
    queryFn: fetchLiveAnalytics,
    refetchInterval: 30000
  });

  const kpis = [
    { label: "Total Posts Analyzed", value: data?.total_posts || "14.2M", change: "+12%", trend: "up", icon: MessageSquare, color: "text-indigo-400", bg: "bg-indigo-500/10" },
    { label: "Global Sentiment", value: "32% Negative", change: "-2%", trend: "down", icon: Activity, color: "text-rose-400", bg: "bg-rose-500/10" },
    { label: "Active Risk Alerts", value: "3", change: "Unchanged", trend: "neutral", icon: AlertTriangle, color: "text-amber-400", bg: "bg-amber-500/10" },
  ];

  const sentimentData = data?.distribution || [
    { name: 'Positive', value: 45, fill: '#10b981' }, 
    { name: 'Neutral', value: 23, fill: '#64748b' },  
    { name: 'Negative', value: 32, fill: '#e11d48' }, 
  ];

  const recentAlerts = [
    { id: 1, text: "Sudden spike in negative sentiment detected for 'University of Lagos'.", time: "10 mins ago", type: "high" },
    { id: 2, text: "Trending topic: 'Hostel accommodation fees' reaching viral threshold.", time: "1 hour ago", type: "medium" },
    { id: 3, text: "Weekly automated report generated for Ministry of Education.", time: "5 hours ago", type: "info" },
  ];

  const trendData = [
    { day: 'Mon', positive: 240, negative: 400 },
    { day: 'Tue', positive: 221, negative: 300 },
    { day: 'Wed', positive: 229, negative: 200 },
    { day: 'Thu', positive: 200, negative: 278 },
    { day: 'Fri', positive: 218, negative: 189 },
    { day: 'Sat', positive: 250, negative: 239 },
    { day: 'Sun', positive: 210, negative: 349 },
  ];

  const universityData = [
    { name: 'UNILAG', posts: 4200 },
    { name: 'OAU', posts: 3100 },
    { name: 'ABU Zaria', posts: 2800 },
    { name: 'UI', posts: 2100 },
    { name: 'UNN', posts: 1500 },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      
      {kycStatus === 'pending' && (
        <div className="bg-amber-500/10 border border-amber-500/50 rounded-xl p-4 flex items-start gap-4 mb-6">
          <Clock className="text-amber-400 mt-0.5 flex-shrink-0" size={20} />
          <div>
            <h4 className="text-amber-400 font-semibold mb-1">Account Pending Verification</h4>
            <p className="text-sm text-zinc-300">
              Your institutional ID is currently under review by a Super Administrator. 
              Once verified, your account will be upgraded to your requested role. 
              Until then, you have read-only access to global metrics.
            </p>
          </div>
        </div>
      )}

      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2 text-white flex items-center gap-3">
          Executive Dashboard
          {isLoading && <Loader2 className="animate-spin text-indigo-400" size={20} />}
        </h1>
        <p className="text-zinc-400">Read-only overview of platform metrics and recent alerts.</p>
      </div>

      {/* KPI Ribbon */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {kpis.map((kpi, idx) => (
          <div key={idx} className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-zinc-400 mb-1">{kpi.label}</p>
              <h2 className="text-3xl font-bold text-white mb-2">{kpi.value}</h2>
              <div className="flex items-center text-sm">
                {kpi.trend === 'up' && <TrendingUp size={16} className="text-emerald-500 mr-1" />}
                {kpi.trend === 'down' && <TrendingUp size={16} className="text-rose-500 mr-1 transform rotate-180" />}
                <span className={kpi.trend === 'up' ? 'text-emerald-500' : kpi.trend === 'down' ? 'text-rose-500' : 'text-zinc-500'}>
                  {kpi.change} from last week
                </span>
              </div>
            </div>
            <div className={`h-12 w-12 rounded-xl flex items-center justify-center ${kpi.bg} ${kpi.color}`}>
              <kpi.icon size={24} />
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sentiment Distribution Pie Chart */}
        <div className="lg:col-span-2 bg-zinc-900 border border-zinc-800 p-6 rounded-2xl">
          <h3 className="text-lg font-semibold text-white mb-6">Global Sentiment Distribution</h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={sentimentData}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={120}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {sentimentData.map((entry: any, index: number) => (
                    <Cell key={`cell-${index}`} fill={entry.fill || entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', color: '#fff', borderRadius: '0.5rem' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Legend verticalAlign="bottom" height={36} wrapperStyle={{ paddingTop: '20px' }}/>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Live Alert Feed */}
        <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl flex flex-col">
          <h3 className="text-lg font-semibold text-white mb-6">Recent Alerts</h3>
          <div className="flex-1 overflow-y-auto pr-2 space-y-4">
            {recentAlerts.map((alert) => (
              <div key={alert.id} className="p-4 rounded-xl bg-zinc-950 border border-zinc-800">
                <div className="flex items-center mb-2">
                  {alert.type === 'high' && <AlertTriangle size={16} className="text-rose-500 mr-2" />}
                  {alert.type === 'medium' && <AlertTriangle size={16} className="text-amber-500 mr-2" />}
                  {alert.type === 'info' && <Activity size={16} className="text-indigo-400 mr-2" />}
                  <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">{alert.time}</span>
                </div>
                <p className="text-sm text-zinc-300 leading-relaxed">{alert.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sentiment Trends */}
        <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl">
          <h3 className="text-lg font-semibold text-white mb-6">Sentiment Trends (7 Days)</h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                <XAxis dataKey="day" stroke="#a1a1aa" tickLine={false} />
                <YAxis stroke="#a1a1aa" tickLine={false} />
                <Tooltip contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', borderRadius: '0.5rem' }} />
                <Legend />
                <Line type="monotone" dataKey="negative" stroke="#e11d48" strokeWidth={2} dot={{ r: 4 }} name="Negative Sentiment" />
                <Line type="monotone" dataKey="positive" stroke="#10b981" strokeWidth={2} dot={{ r: 4 }} name="Positive Sentiment" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Universities Monitored */}
        <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl">
          <h3 className="text-lg font-semibold text-white mb-6">Top Universities Monitored</h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={universityData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                <XAxis dataKey="name" stroke="#a1a1aa" tickLine={false} axisLine={false} />
                <YAxis stroke="#a1a1aa" tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', borderRadius: '0.5rem' }} cursor={{ fill: '#27272a' }} />
                <Bar dataKey="posts" fill="#3b82f6" radius={[4, 4, 0, 0]} name="Mentions Volume" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
