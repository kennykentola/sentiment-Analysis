import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Lightbulb } from 'lucide-react';

const mockTrendData = [
  { date: '2026-05-01', positive: 4000, neutral: 2400, negative: 2400 },
  { date: '2026-05-08', positive: 3000, neutral: 1398, negative: 8210 },
  { date: '2026-05-15', positive: 2000, neutral: 9800, negative: 22900 },
  { date: '2026-05-22', positive: 2780, neutral: 3908, negative: 20000 },
  { date: '2026-05-29', positive: 1890, neutral: 4800, negative: 15810 },
  { date: '2026-06-05', positive: 2390, neutral: 3800, negative: 12000 },
  { date: '2026-06-12', positive: 3490, neutral: 4300, negative: 8000 },
];

export default function SentimentTrends() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500 max-w-7xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-white mb-1">Macro Sentiment Trends</h1>
        <p className="text-zinc-400">A read-only executive overview of public opinion shifts over time.</p>
      </div>

      <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-xl p-6 flex gap-4">
        <Lightbulb className="w-6 h-6 text-indigo-400 flex-shrink-0" />
        <div>
          <h3 className="text-indigo-400 font-semibold mb-1">Executive Insight</h3>
          <p className="text-zinc-300">
            Negative sentiment peaked mid-May following the joint fee hike announcements from federal institutions. 
            However, public outrage has steadily declined over the past 3 weeks after the Ministry of Education's 
            press release promising student loans and bursary interventions.
          </p>
        </div>
      </div>

      <Card className="bg-zinc-900 border-zinc-800 text-white shadow-lg">
        <CardHeader>
          <CardTitle>30-Day Sentiment Trajectory</CardTitle>
          <CardDescription className="text-zinc-400">Aggregated volume of classified social posts (Positive vs Negative)</CardDescription>
        </CardHeader>
        <CardContent className="h-[450px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={mockTrendData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorNegative" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#e11d48" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#e11d48" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorPositive" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="date" stroke="#a1a1aa" tickLine={false} />
              <YAxis stroke="#a1a1aa" tickLine={false} />
              <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', borderRadius: '0.5rem', color: '#fff' }} 
                itemStyle={{ color: '#fff' }}
              />
              <Legend />
              <Area type="monotone" dataKey="negative" stroke="#e11d48" fillOpacity={1} fill="url(#colorNegative)" name="Negative Mentions" />
              <Area type="monotone" dataKey="positive" stroke="#10b981" fillOpacity={1} fill="url(#colorPositive)" name="Positive Mentions" />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
