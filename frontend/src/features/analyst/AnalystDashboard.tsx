import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { PieChart, Pie, Cell, Tooltip as PieTooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import { MessageCircle, MessageSquare, Globe, Filter, MoreHorizontal, ArrowUpRight, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { account } from '@/services/appwrite';

// Fetch live data from our FastAPI backend
const fetchLiveAnalytics = async () => {
  try {
    // 1. Get the current user's session JWT from Appwrite
    const jwt = await account.createJWT();
    
    // 2. Fetch the analytics from FastAPI
    const response = await fetch('http://localhost:8000/api/v1/analytics/latest', {
      headers: {
        'x-appwrite-jwt': jwt.jwt,
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.ok) {
      throw new Error("Failed to fetch analytics");
    }
    
    return await response.json();
  } catch (error) {
    console.warn("Backend unavailable, falling back to mock data.", error);
    // Graceful fallback if backend is offline
    return {
      distribution: [
        { name: 'Positive', value: 25, fill: '#10b981' },
        { name: 'Neutral', value: 35, fill: '#64748b' },
        { name: 'Negative', value: 40, fill: '#e11d48' }
      ],
      platformSentiment: [
        { platform: 'Twitter', positive: 20, neutral: 30, negative: 50 },
        { platform: 'Facebook', positive: 35, neutral: 45, negative: 20 },
        { platform: 'Forums', positive: 15, neutral: 25, negative: 60 }
      ],
      total_posts: 0
    };
  }
};

export default function AnalystDashboard() {
  const { data, isLoading } = useQuery({
    queryKey: ['liveAnalytics'],
    queryFn: fetchLiveAnalytics,
    refetchInterval: 30000 // Poll every 30 seconds
  });

  const trendData = [
    { day: 'Mon', negative: 400, neutral: 240, positive: 240 },
    { day: 'Tue', negative: 300, neutral: 139, positive: 221 },
    { day: 'Wed', negative: 200, neutral: 980, positive: 229 },
    { day: 'Thu', negative: 278, neutral: 390, positive: 200 },
    { day: 'Fri', negative: 189, neutral: 480, positive: 218 },
    { day: 'Sat', negative: 239, neutral: 380, positive: 250 },
    { day: 'Sun', negative: 349, neutral: 430, positive: 210 },
  ];

  const feedData = [
    { id: 1, text: "Omo this 150k increment at UNILAG is wild! Where are we supposed to see this money? #Sapa", platform: "Twitter", sentiment: "Negative", conf: "0.98" },
    { id: 2, text: "The new portal for fee payment is actually quite fast compared to last year.", platform: "Facebook", sentiment: "Positive", conf: "0.85" },
    { id: 3, text: "When will ASUU call off this strike so we can even pay the fees? Tired of staying home.", platform: "Twitter", sentiment: "Negative", conf: "0.91" },
    { id: 4, text: "I heard the management is discussing installment payments. Hope it's true.", platform: "Forums", sentiment: "Neutral", conf: "0.75" },
    { id: 5, text: "This administration is completely detached from the reality of average students.", platform: "Twitter", sentiment: "Negative", conf: "0.99" },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-bold tracking-tight text-white flex items-center gap-3">
            Analyst Command Center
            {isLoading && <Loader2 className="animate-spin text-indigo-400" size={20} />}
          </h1>
          <p className="text-zinc-400">Deep NLP insights, sentiment trends, and live data feeds.</p>
        </div>
        <Button variant="outline" className="bg-zinc-900 border-zinc-700 text-zinc-300 hover:text-white hover:bg-zinc-800">
          <Filter size={16} className="mr-2" />
          Advanced Filters
        </Button>
      </div>

      {/* High-Level Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { title: "Total Posts Analyzed", value: "14,293", trend: "+12% this week" },
          { title: "Avg Confidence Score", value: "92.4%", trend: "+1.2% accuracy" },
          { title: "Negative Shift (24h)", value: "+4.1%", trend: "Warning: Spike detected", alert: true },
          { title: "Active Topics", value: "18", trend: "3 emerging topics" }
        ].map((metric, i) => (
          <Card key={i} className="bg-zinc-900 border-zinc-800 text-white shadow-none">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-zinc-400">{metric.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
              <p className={`text-xs mt-1 ${metric.alert ? 'text-rose-400' : 'text-emerald-400'}`}>
                {metric.trend}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Middle Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="bg-zinc-900 border-zinc-800 text-white lg:col-span-1 shadow-none">
          <CardHeader>
            <CardTitle>Global Sentiment</CardTitle>
            <CardDescription className="text-zinc-400">Overall distribution across all sources</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px] w-full">
            {isLoading && !data ? (
              <div className="w-full h-full flex items-center justify-center">
                <Loader2 className="animate-spin text-zinc-500" />
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data?.distribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {data?.distribution?.map((entry: any, index: number) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} stroke="rgba(0,0,0,0)" />
                    ))}
                  </Pie>
                  <PieTooltip contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', color: '#fff', borderRadius: '0.5rem' }} itemStyle={{ color: '#fff' }} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>

        <Card className="bg-zinc-900 border-zinc-800 text-white lg:col-span-2 shadow-none">
          <CardHeader>
            <CardTitle>Platform Sentiment Breakdown</CardTitle>
            <CardDescription className="text-zinc-400">Negative volume is spiking on Twitter</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px] w-full">
            {isLoading && !data ? (
              <div className="w-full h-full flex items-center justify-center">
                <Loader2 className="animate-spin text-zinc-500" />
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data?.platformSentiment} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                  <XAxis dataKey="platform" stroke="#a1a1aa" tickLine={false} axisLine={false} />
                  <YAxis stroke="#a1a1aa" tickLine={false} axisLine={false} />
                  <PieTooltip contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', borderRadius: '0.5rem' }} cursor={{ fill: '#27272a' }} />
                  <Legend />
                  <Bar dataKey="negative" stackId="a" fill="#e11d48" name="Negative %" radius={[0, 0, 4, 4]} />
                  <Bar dataKey="neutral" stackId="a" fill="#64748b" name="Neutral %" />
                  <Bar dataKey="positive" stackId="a" fill="#10b981" name="Positive %" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sentiment Trajectory Line Chart */}
        <Card className="bg-zinc-900 border-zinc-800 text-white shadow-none">
          <CardHeader>
            <CardTitle>Sentiment Trajectory</CardTitle>
            <CardDescription className="text-zinc-400">7-day moving average</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                <XAxis dataKey="day" stroke="#a1a1aa" tickLine={false} />
                <YAxis stroke="#a1a1aa" tickLine={false} />
                <PieTooltip contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', borderRadius: '0.5rem' }} />
                <Legend />
                <Line type="monotone" dataKey="negative" stroke="#e11d48" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} name="Negative Volume" />
                <Line type="monotone" dataKey="neutral" stroke="#64748b" strokeWidth={2} dot={false} name="Neutral Volume" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Live Feed Table */}
        <Card className="bg-zinc-900 border-zinc-800 text-white shadow-none flex flex-col">
          <CardHeader className="flex flex-row justify-between items-center pb-2">
            <div>
              <CardTitle>Live AI Feed</CardTitle>
              <CardDescription className="text-zinc-400">Latest ingested posts</CardDescription>
            </div>
            <Button variant="ghost" size="icon" className="text-zinc-400 hover:text-white">
              <MoreHorizontal size={18} />
            </Button>
          </CardHeader>
          <CardContent className="flex-1 overflow-auto">
            <div className="w-full">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-zinc-400 uppercase border-b border-zinc-800">
                  <tr>
                    <th className="px-4 py-3 font-medium">Source</th>
                    <th className="px-4 py-3 font-medium">Content</th>
                    <th className="px-4 py-3 font-medium text-right">Confidence</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800/50">
                  {feedData.map((post) => (
                    <tr key={post.id} className="hover:bg-zinc-800/50 transition-colors">
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          {post.platform === 'Twitter' && <MessageCircle size={14} className="text-sky-400" />}
                          {post.platform === 'Facebook' && <MessageSquare size={14} className="text-blue-500" />}
                          {post.platform === 'Forums' && <Globe size={14} className="text-zinc-400" />}
                        </div>
                      </td>
                      <td className="px-4 py-4 max-w-[200px] truncate text-zinc-300">
                        {post.text}
                      </td>
                      <td className="px-4 py-4 text-right whitespace-nowrap">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border ${
                          post.sentiment === 'Negative' ? 'bg-rose-500/10 text-rose-400 border-rose-500/20' : 
                          post.sentiment === 'Positive' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 
                          'bg-zinc-500/10 text-zinc-400 border-zinc-500/20'
                        }`}>
                          {post.conf}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-4 flex justify-center">
              <Button variant="link" className="text-indigo-400 hover:text-indigo-300 text-xs">
                View Full Feed <ArrowUpRight size={14} className="ml-1" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

    </div>
  );
}
