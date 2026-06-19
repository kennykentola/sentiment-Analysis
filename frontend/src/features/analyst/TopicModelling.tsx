import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ScatterChart, Scatter, XAxis, YAxis, ZAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, Cell } from 'recharts';
import { Download, Filter } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { AnalyticsAPI } from '@/services/api';
import { Button } from '@/components/ui/button';

// Topics injected via API

const topKeywords = [
  { word: "increase", count: 45210, sentiment: -0.8 },
  { word: "affordable", count: 12400, sentiment: 0.6 },
  { word: "protest", count: 32100, sentiment: -0.9 },
  { word: "struggle", count: 28450, sentiment: -0.7 },
  { word: "support", count: 18200, sentiment: 0.8 },
];

export default function TopicModelling() {
  const { data: mockBubbleData, isLoading } = useQuery({
    queryKey: ['topics'],
    queryFn: AnalyticsAPI.getTopics
  });

  if (isLoading) {
    return <div className="text-zinc-400 p-8">Loading semantic topic clusters...</div>;
  }

  const dataToUse = mockBubbleData || [];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">Topic Modelling</h1>
          <p className="text-zinc-400">Extract and analyze latent themes and keyword clusters from textual data.</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" className="bg-zinc-900 border-zinc-800 text-zinc-300 hover:bg-zinc-800 hover:text-white">
            <Filter className="mr-2 h-4 w-4" />
            Filters
          </Button>
          <Button variant="outline" className="bg-zinc-900 border-zinc-800 text-zinc-300 hover:bg-zinc-800 hover:text-white">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="bg-zinc-900 border-zinc-800 text-white lg:col-span-2">
          <CardHeader>
            <CardTitle>Topic Clusters</CardTitle>
            <CardDescription className="text-zinc-400">X-Axis: Semantic similarity. Y-Axis: Net Sentiment. Bubble Size: Volume.</CardDescription>
          </CardHeader>
          <CardContent className="h-[450px] w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
                <XAxis type="number" dataKey="x" name="Similarity" stroke="#71717a" tick={false} axisLine={false} />
                <YAxis type="number" dataKey="y" name="Sentiment" stroke="#71717a" domain={[-100, 100]} />
                <ZAxis type="number" dataKey="z" range={[100, 4000]} name="Volume" />
                <RechartsTooltip 
                  cursor={{ strokeDasharray: '3 3' }} 
                  contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', borderRadius: '8px', color: '#fff' }}
                  formatter={(value: any, name: any) => {
                    if (name === 'Volume') return [value, 'Total Mentions'];
                    if (name === 'Sentiment') return [`${value}%`, 'Net Sentiment'];
                    return [value, name];
                  }}
                  labelFormatter={() => ''}
                />
                <Scatter name="Topics" data={dataToUse} fill="#8884d8">
                  {dataToUse.map((entry: any, index: number) => (
                    <Cell key={`cell-${index}`} fill={entry.color} fillOpacity={0.8} />
                  ))}
                </Scatter>
              </ScatterChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-zinc-900 border-zinc-800 text-white">
          <CardHeader>
            <CardTitle>Top Extracted Keywords</CardTitle>
            <CardDescription className="text-zinc-400">Most frequent non-stop words.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topKeywords.map((kw, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-zinc-950/50 border border-zinc-800/50 hover:border-zinc-700 transition-colors">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-mono text-zinc-500 w-4">{i + 1}.</span>
                    <span className="font-medium text-zinc-200 capitalize">{kw.word}</span>
                  </div>
                  <div className="text-right flex flex-col">
                    <span className="text-sm text-zinc-400">{kw.count.toLocaleString()} posts</span>
                    <span className={`text-xs font-medium ${kw.sentiment < 0 ? 'text-rose-500' : 'text-emerald-500'}`}>
                      {kw.sentiment > 0 ? '+' : ''}{kw.sentiment} score
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-6 bg-transparent border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-800">
              View All Keywords
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
