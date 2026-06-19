import { useQuery } from '@tanstack/react-query';
import { databases } from '@/services/appwrite';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Cell, Tooltip as PieTooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer } from 'recharts';

const DB_ID = 'sentiment_db';

export default function Analytics() {
  const { data, isLoading } = useQuery({
    queryKey: ['analyticsData'],
    queryFn: async () => {
      const res = await databases.getDocument(DB_ID, 'global_analytics', 'latest');
      return {
        distribution: JSON.parse(res.distribution),
        platformSentiment: JSON.parse(res.platformSentiment)
      };
    },
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-white">Advanced Analytics</h1>
        <p className="text-zinc-400">Deep dive into sentiment distribution and platform performance.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-zinc-900 border-zinc-800 text-white">
          <CardHeader>
            <CardTitle>Global Sentiment Distribution</CardTitle>
          </CardHeader>
          <CardContent className="h-[400px] min-h-[400px] w-full">
            {isLoading ? (
               <div className="h-full w-full bg-zinc-800/50 animate-pulse rounded" />
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data?.distribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={80}
                    outerRadius={120}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {data?.distribution.map((entry: any, index: number) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} stroke="rgba(0,0,0,0)" />
                    ))}
                  </Pie>
                  <PieTooltip contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', color: '#fff' }} itemStyle={{ color: '#fff' }} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>

        <Card className="bg-zinc-900 border-zinc-800 text-white">
          <CardHeader>
            <CardTitle>Sentiment Breakdown by Platform</CardTitle>
          </CardHeader>
          <CardContent className="h-[400px] min-h-[400px] w-full">
            {isLoading ? (
               <div className="h-full w-full bg-zinc-800/50 animate-pulse rounded" />
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data?.platformSentiment} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
                  <XAxis dataKey="platform" stroke="#a1a1aa" />
                  <YAxis stroke="#a1a1aa" />
                  <PieTooltip contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a' }} cursor={{ fill: '#27272a' }} />
                  <Legend />
                  <Bar dataKey="negative" stackId="a" fill="#f43f5e" name="Negative %" />
                  <Bar dataKey="neutral" stackId="a" fill="#94a3b8" name="Neutral %" />
                  <Bar dataKey="positive" stackId="a" fill="#14b8a6" name="Positive %" />
                </BarChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
