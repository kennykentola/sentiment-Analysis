import { useQuery } from '@tanstack/react-query';
import { databases } from '@/services/appwrite';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer } from 'recharts';
import { Activity, AlertTriangle, MessageSquare, TrendingDown } from 'lucide-react';

const DB_ID = 'sentiment_db';

export default function Dashboard() {
  const { data: trendData, isLoading: trendLoading } = useQuery({
    queryKey: ['trendData'],
    queryFn: async () => {
      const res = await databases.listDocuments(DB_ID, 'system_metrics');
      return res.documents;
    },
  });

  const { data: kpiData, isLoading: kpiLoading } = useQuery({
    queryKey: ['dashboardKPIs'],
    queryFn: async () => {
      // Mocking KPI summary based on live metrics data if needed, or static for now
      return [
        { title: 'Total Mentions', value: '84,302', trend: '+12%', isPositive: true, icon: MessageSquare },
        { title: 'Avg Negative Sentiment', value: '62%', trend: '+5%', isPositive: false, icon: TrendingDown },
        { title: 'Critical Alerts', value: '14', trend: '-2', isPositive: true, icon: AlertTriangle },
        { title: 'Active Sources', value: '4', trend: '0', isPositive: true, icon: Activity },
      ];
    },
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-white">Executive Summary</h1>
        <p className="text-zinc-400">Real-time overview of public opinion.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiLoading ? (
           Array(4).fill(0).map((_, i) => <Card key={i} className="bg-zinc-900 border-zinc-800 h-32 animate-pulse" />)
        ) : (
          kpiData?.map((kpi, idx) => {
            const Icon = kpi.icon;
            return (
              <Card key={idx} className="bg-zinc-900 border-zinc-800 text-white">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-zinc-400">{kpi.title}</CardTitle>
                  <Icon className="h-4 w-4 text-zinc-400" />
                </CardHeader>
                <CardContent>
                  <div className={`text-2xl font-bold ${kpi.title.includes('Negative') ? 'text-rose-500' : ''}`}>{kpi.value}</div>
                  <p className={`text-xs mt-1 ${kpi.isPositive ? 'text-teal-500' : 'text-rose-500'}`}>
                    {kpi.trend} from last month
                  </p>
                </CardContent>
              </Card>
            );
          })
        )}
      </div>

      <Card className="bg-zinc-900 border-zinc-800 text-white col-span-4">
        <CardHeader>
          <CardTitle>Sentiment Trend (7 Days)</CardTitle>
        </CardHeader>
        <CardContent className="h-[400px] min-h-[400px] w-full">
          {trendLoading ? (
            <div className="h-full w-full bg-zinc-800/50 animate-pulse rounded" />
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
                <XAxis dataKey="date" stroke="#a1a1aa" />
                <YAxis stroke="#a1a1aa" />
                <RechartsTooltip contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a' }} />
                <Area type="monotone" dataKey="negative" stroke="#f43f5e" fill="#f43f5e" fillOpacity={0.2} strokeWidth={2} />
                <Area type="monotone" dataKey="positive" stroke="#14b8a6" fill="#14b8a6" fillOpacity={0.2} strokeWidth={2} />
                <Area type="monotone" dataKey="neutral" stroke="#94a3b8" fill="#94a3b8" fillOpacity={0.2} strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
