import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { useQuery } from '@tanstack/react-query';
import { AnalyticsAPI } from '@/services/api';
import { Calendar, Filter, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';


export default function TrendAnalysis() {
  const { data: trendData, isLoading } = useQuery({
    queryKey: ['trends'],
    queryFn: AnalyticsAPI.getTrends
  });

  if (isLoading) {
    return <div className="text-zinc-400 p-8">Loading trend analytics...</div>;
  }

  const dataToUse = trendData || [];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">Trend Analysis</h1>
          <p className="text-zinc-400">Identify long-term shifts and historical patterns in public opinion.</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" className="bg-zinc-900 border-zinc-800 text-zinc-300 hover:bg-zinc-800 hover:text-white">
            <Calendar className="mr-2 h-4 w-4" />
            Last 12 Months
          </Button>
          <Button variant="outline" className="bg-zinc-900 border-zinc-800 text-zinc-300 hover:bg-zinc-800 hover:text-white">
            <Filter className="mr-2 h-4 w-4" />
            Filters
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <Card className="bg-zinc-900 border-zinc-800 text-white">
          <CardHeader>
            <CardTitle>Sentiment Evolution (12 Months)</CardTitle>
            <CardDescription className="text-zinc-400">Total volume of posts categorized by sentiment over time.</CardDescription>
          </CardHeader>
          <CardContent className="h-[500px] w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={dataToUse} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorPositive" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#14b8a6" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorNeutral" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#94a3b8" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#94a3b8" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorNegative" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#f43f5e" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="date" stroke="#71717a" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#71717a" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value / 1000}k`} />
                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', borderRadius: '8px', color: '#fff' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Legend iconType="circle" />
                <Area type="monotone" dataKey="positive" stroke="#14b8a6" fillOpacity={1} fill="url(#colorPositive)" name="Positive" strokeWidth={2} />
                <Area type="monotone" dataKey="neutral" stroke="#94a3b8" fillOpacity={1} fill="url(#colorNeutral)" name="Neutral" strokeWidth={2} />
                <Area type="monotone" dataKey="negative" stroke="#f43f5e" fillOpacity={1} fill="url(#colorNegative)" name="Negative" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-zinc-900 border-zinc-800 text-white p-6 rounded-xl">
            <h3 className="text-zinc-400 text-sm font-medium mb-2">Peak Negativity Month</h3>
            <p className="text-3xl font-bold text-white mb-1">June 2024</p>
            <p className="text-sm text-f43f5e flex items-center text-rose-500">
              <TrendingUp className="w-4 h-4 mr-1" />
              +24% vs previous month
            </p>
        </Card>
        <Card className="bg-zinc-900 border-zinc-800 text-white p-6 rounded-xl">
            <h3 className="text-zinc-400 text-sm font-medium mb-2">Overall Volume Trend</h3>
            <p className="text-3xl font-bold text-white mb-1">Increasing</p>
            <p className="text-sm text-f43f5e flex items-center text-rose-500">
              <TrendingUp className="w-4 h-4 mr-1" />
              +12% average MoM
            </p>
        </Card>
        <Card className="bg-zinc-900 border-zinc-800 text-white p-6 rounded-xl">
            <h3 className="text-zinc-400 text-sm font-medium mb-2">Sentiment Volatility</h3>
            <p className="text-3xl font-bold text-white mb-1">High</p>
            <p className="text-sm text-zinc-500 flex items-center">
              Major spikes in April & June
            </p>
        </Card>
      </div>
    </div>
  );
}
