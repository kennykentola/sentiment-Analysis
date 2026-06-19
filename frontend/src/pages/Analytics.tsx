import { useQuery } from '@tanstack/react-query';
import { databases } from '@/services/appwrite';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { PieChart, Pie, Cell, Tooltip as PieTooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer } from 'recharts';
import { Download, Filter, MessageSquare, TrendingDown, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

const DB_ID = 'sentiment_db';

const fallbackDistribution = [
  { name: 'Negative', value: 65, fill: '#f43f5e' },
  { name: 'Neutral', value: 20, fill: '#94a3b8' },
  { name: 'Positive', value: 15, fill: '#14b8a6' },
];

const fallbackPlatformSentiment = [
  { platform: 'Twitter (X)', negative: 70, neutral: 20, positive: 10 },
  { platform: 'Facebook', negative: 55, neutral: 25, positive: 20 },
  { platform: 'Instagram', negative: 40, neutral: 35, positive: 25 },
  { platform: 'News Sites', negative: 30, neutral: 50, positive: 20 },
  { platform: 'Nairaland', negative: 85, neutral: 10, positive: 5 },
];

export default function Analytics() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['analyticsData'],
    queryFn: async () => {
      try {
        const res = await databases.getDocument(DB_ID, 'global_analytics', 'latest');
        return {
          distribution: JSON.parse(res.distribution),
          platformSentiment: JSON.parse(res.platformSentiment)
        };
      } catch (e) {
        throw new Error('Fallback to mock');
      }
    },
    retry: 1
  });

  const displayDist = (!isLoading && !isError && data?.distribution) ? data.distribution : fallbackDistribution;
  const displayPlat = (!isLoading && !isError && data?.platformSentiment) ? data.platformSentiment : fallbackPlatformSentiment;

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">Sentiment Analysis</h1>
          <p className="text-zinc-400">Deep dive into sentiment distribution and platform performance.</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" className="bg-zinc-900 border-zinc-800 text-zinc-300 hover:bg-zinc-800 hover:text-white">
            <Filter className="mr-2 h-4 w-4" />
            Filters
          </Button>
          <Button variant="outline" className="bg-zinc-900 border-zinc-800 text-zinc-300 hover:bg-zinc-800 hover:text-white">
            <Download className="mr-2 h-4 w-4" />
            Export Data
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-zinc-900 border-zinc-800 text-white p-6 rounded-xl col-span-1 md:col-span-2 lg:col-span-1">
            <h3 className="text-zinc-400 text-sm font-medium mb-2 flex items-center">
              <MessageSquare className="w-4 h-4 mr-2" />
              Total Analyzed
            </h3>
            <p className="text-3xl font-bold text-white mb-1">124.5k</p>
            <p className="text-sm text-emerald-500 flex items-center">
              <TrendingUp className="w-3 h-3 mr-1" />
              +12% this week
            </p>
        </Card>
        <Card className="bg-zinc-900 border-zinc-800 text-white p-6 rounded-xl col-span-1">
            <h3 className="text-zinc-400 text-sm font-medium mb-2 flex items-center">
              <TrendingDown className="w-4 h-4 mr-2 text-rose-500" />
              Net Sentiment
            </h3>
            <p className="text-3xl font-bold text-white mb-1">-45.2</p>
            <p className="text-sm text-rose-500 flex items-center">
              <TrendingDown className="w-3 h-3 mr-1" />
              Severely Negative
            </p>
        </Card>
        <Card className="bg-zinc-900 border-zinc-800 text-white p-6 rounded-xl col-span-1 md:col-span-2">
            <h3 className="text-zinc-400 text-sm font-medium mb-2">Dominant Emotion</h3>
            <p className="text-3xl font-bold text-white mb-1">Outrage / Anger</p>
            <p className="text-sm text-zinc-500 flex items-center">
              Accounts for 62% of negative posts
            </p>
        </Card>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <Card className="bg-zinc-900 border-zinc-800 text-white xl:col-span-1">
          <CardHeader>
            <CardTitle>Global Distribution</CardTitle>
            <CardDescription className="text-zinc-400">Total breakdown of all recorded posts.</CardDescription>
          </CardHeader>
          <CardContent className="h-[350px] w-full pt-4">
            {isLoading ? (
               <div className="h-full w-full bg-zinc-800/50 animate-pulse rounded" />
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={displayDist}
                    cx="50%"
                    cy="50%"
                    innerRadius={80}
                    outerRadius={110}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {displayDist.map((entry: any, index: number) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} stroke="rgba(0,0,0,0)" />
                    ))}
                  </Pie>
                  <PieTooltip 
                    contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', color: '#fff', borderRadius: '8px' }} 
                    itemStyle={{ color: '#fff' }} 
                  />
                  <Legend verticalAlign="bottom" height={36} iconType="circle"/>
                </PieChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>

        <Card className="bg-zinc-900 border-zinc-800 text-white xl:col-span-2">
          <CardHeader>
            <CardTitle>Sentiment by Platform</CardTitle>
            <CardDescription className="text-zinc-400">100% stacked bar comparison across major social networks.</CardDescription>
          </CardHeader>
          <CardContent className="h-[350px] w-full pt-4">
            {isLoading ? (
               <div className="h-full w-full bg-zinc-800/50 animate-pulse rounded" />
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={displayPlat} margin={{ top: 0, right: 0, left: -20, bottom: 0 }} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#27272a" horizontal={true} vertical={false} />
                  <XAxis type="number" hide />
                  <YAxis dataKey="platform" type="category" stroke="#a1a1aa" tickLine={false} axisLine={false} />
                  <PieTooltip 
                    contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', borderRadius: '8px' }} 
                    cursor={{ fill: '#27272a' }} 
                  />
                  <Legend verticalAlign="top" height={36} iconType="circle"/>
                  <Bar dataKey="negative" stackId="a" fill="#f43f5e" name="Negative" radius={[0, 0, 0, 0]} />
                  <Bar dataKey="neutral" stackId="a" fill="#94a3b8" name="Neutral" radius={[0, 0, 0, 0]} />
                  <Bar dataKey="positive" stackId="a" fill="#14b8a6" name="Positive" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
