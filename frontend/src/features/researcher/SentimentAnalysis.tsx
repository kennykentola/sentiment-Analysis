import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Download, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const mockData = [
  { name: 'Jan', positive: 4000, neutral: 2400, negative: 8000 },
  { name: 'Feb', positive: 3000, neutral: 1398, negative: 9800 },
  { name: 'Mar', positive: 2000, neutral: 9800, negative: 12000 },
  { name: 'Apr', positive: 2780, neutral: 3908, negative: 25000 },
  { name: 'May', positive: 1890, neutral: 4800, negative: 18000 },
  { name: 'Jun', positive: 2390, neutral: 3800, negative: 15000 },
];

export default function SentimentAnalysis() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white flex items-center">
            Sentiment Analysis Deep-Dive
          </h1>
          <p className="text-zinc-400">Deep-dive into sentiment metrics and comparative sentiment research.</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Button variant="outline" className="bg-zinc-900 border-zinc-800 text-zinc-300 hover:bg-zinc-800 hover:text-white">
            <Filter className="mr-2 h-4 w-4" />
            Confidence Filter
          </Button>
          <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
            <Download className="mr-2 h-4 w-4" />
            Export Matrix
          </Button>
        </div>
      </div>

      <Card className="bg-zinc-900 border-zinc-800 text-white">
        <CardHeader>
          <CardTitle>Polarity Distribution Over Time</CardTitle>
          <CardDescription className="text-zinc-400">Monthly breakdown of classified documents across polarity classes.</CardDescription>
        </CardHeader>
        <CardContent className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={mockData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
              <XAxis dataKey="name" stroke="#a1a1aa" tickLine={false} axisLine={false} />
              <YAxis stroke="#a1a1aa" tickLine={false} axisLine={false} />
              <Tooltip 
                cursor={{ fill: '#27272a' }}
                contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', borderRadius: '8px' }}
              />
              <Bar dataKey="negative" stackId="a" fill="#f43f5e" radius={[0, 0, 4, 4]} />
              <Bar dataKey="neutral" stackId="a" fill="#94a3b8" />
              <Bar dataKey="positive" stackId="a" fill="#10b981" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
