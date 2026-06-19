import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Hash, Lightbulb } from 'lucide-react';

const mockTopics = [
  { name: 'Tuition Fees', mentions: 125000, fill: '#f43f5e' },
  { name: 'Hostel Accommodation', mentions: 84000, fill: '#f59e0b' },
  { name: 'Student Union Strike', mentions: 62000, fill: '#10b981' },
  { name: 'Cost of Living', mentions: 45000, fill: '#3b82f6' },
  { name: 'Government Bursary', mentions: 28000, fill: '#8b5cf6' },
];

export default function Topics() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500 max-w-7xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-white mb-1 flex items-center">
          <Hash className="mr-2 h-6 w-6 text-indigo-500" />
          Trending Discourse Topics
        </h1>
        <p className="text-zinc-400">High-level categorization of what the public is actually talking about.</p>
      </div>

      <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-xl p-6 flex gap-4">
        <Lightbulb className="w-6 h-6 text-indigo-400 flex-shrink-0" />
        <div>
          <h3 className="text-indigo-400 font-semibold mb-1">Executive Insight</h3>
          <p className="text-zinc-300">
            While "Tuition Fees" remains the absolute highest volume topic, discussions surrounding "Hostel Accommodation" 
            have surged by 45% this week. Many students indicate that the compound effect of increased tuition *and* 
            increased accommodation costs is the primary driver of strike threats.
          </p>
        </div>
      </div>

      <Card className="bg-zinc-900 border-zinc-800 text-white shadow-lg">
        <CardHeader>
          <CardTitle>Top 5 Conversation Drivers</CardTitle>
          <CardDescription className="text-zinc-400">Ranked by total mentions across X (Twitter) and Facebook (30 Days)</CardDescription>
        </CardHeader>
        <CardContent className="h-[450px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={mockTopics} margin={{ top: 20, right: 30, left: 0, bottom: 5 }} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#27272a" horizontal={true} vertical={false} />
              <XAxis type="number" stroke="#a1a1aa" tickFormatter={(val) => `${(val / 1000)}k`} />
              <YAxis dataKey="name" type="category" stroke="#a1a1aa" tickLine={false} width={180} />
              <Tooltip 
                cursor={{ fill: '#27272a' }}
                contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', borderRadius: '0.5rem', color: '#fff' }}
                formatter={(value: number) => [value.toLocaleString(), 'Total Mentions']}
              />
              <Bar dataKey="mentions" radius={[0, 4, 4, 0]}>
                {mockTopics.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
