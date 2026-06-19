import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ScatterChart, Scatter, XAxis, YAxis, ZAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, Cell } from 'recharts';
import { Download, Search, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';

// X: Topic similarity projection, Y: Sentiment Score, Z: Volume (size of bubble)
const mockBubbleData = [
  { name: 'Tuition Hike', x: 20, y: -80, z: 12000, color: '#f43f5e' },
  { name: 'Hostel Fees', x: 80, y: -65, z: 8500, color: '#f43f5e' },
  { name: 'Student Loans', x: 50, y: 30, z: 5400, color: '#14b8a6' },
  { name: 'Strike Action', x: 10, y: -90, z: 15000, color: '#e11d48' },
  { name: 'Scholarships', x: 90, y: 70, z: 3200, color: '#10b981' },
  { name: 'ASUU', x: 30, y: -40, z: 9800, color: '#f59e0b' },
  { name: 'Economy', x: 40, y: -75, z: 11000, color: '#ef4444' },
  { name: 'Federal Govt', x: 70, y: -20, z: 7600, color: '#f59e0b' },
];

const topKeywords = [
  { word: "increase", count: 45210, sentiment: -0.8 },
  { word: "affordable", count: 12400, sentiment: 0.6 },
  { word: "protest", count: 32100, sentiment: -0.9 },
  { word: "struggle", count: 28450, sentiment: -0.7 },
  { word: "support", count: 18200, sentiment: 0.8 },
];

export default function TopicModelling() {
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
                  formatter={(value: any, name: string, props: any) => {
                    if (name === 'Volume') return [value, 'Total Mentions'];
                    if (name === 'Sentiment') return [`${value}%`, 'Net Sentiment'];
                    return [value, name];
                  }}
                  labelFormatter={() => ''}
                />
                <Scatter name="Topics" data={mockBubbleData} fill="#8884d8">
                  {mockBubbleData.map((entry, index) => (
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
