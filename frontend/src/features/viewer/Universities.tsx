import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { AlertTriangle, Lightbulb } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { AnalyticsAPI } from '@/services/api';

// Computed dynamically from API

export default function Universities() {
  const { data: rawUniData, isLoading } = useQuery({
    queryKey: ['universities'],
    queryFn: AnalyticsAPI.getUniversities
  });

  if (isLoading) {
    return <div className="text-zinc-400 p-8">Loading executive university monitor...</div>;
  }

  const mockUniData = (rawUniData || []).map((row: any) => ({
    name: row.name,
    negative: row.negative, // Mocking API value, assume 0-100 scale here
    threshold: 75
  }));

  const criticalCount = mockUniData.filter((u: any) => u.negative >= u.threshold).length;

  return (
    <div className="space-y-6 animate-in fade-in duration-500 max-w-7xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-white mb-1">University Status Monitor</h1>
        <p className="text-zinc-400">High-level overview of sentiment criticality across monitored institutions.</p>
      </div>

      {criticalCount > 0 && (
        <div className="bg-rose-500/10 border border-rose-500/50 rounded-xl p-4 flex items-start gap-4">
          <AlertTriangle className="text-rose-500 mt-0.5 flex-shrink-0" size={24} />
          <div>
            <h4 className="text-rose-500 font-bold mb-1">Critical Sentiment Threshold Exceeded</h4>
            <p className="text-sm text-zinc-300">
              {criticalCount} institutions are currently experiencing negative sentiment volumes above the 75% critical threshold. 
              Immediate administrative review is recommended for UNIBEN, UNILAG, and OAU.
            </p>
          </div>
        </div>
      )}

      <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-xl p-6 flex gap-4">
        <Lightbulb className="w-6 h-6 text-indigo-400 flex-shrink-0" />
        <div>
          <h3 className="text-indigo-400 font-semibold mb-1">Executive Insight</h3>
          <p className="text-zinc-300">
            Federal Universities in the South-West are showing uniquely high negative responses compared to Northern counterparts, 
            driven primarily by differences in regional cost of living adjustments.
          </p>
        </div>
      </div>

      <Card className="bg-zinc-900 border-zinc-800 text-white shadow-lg">
        <CardHeader>
          <CardTitle>Negative Sentiment Severity</CardTitle>
          <CardDescription className="text-zinc-400">Percentage of total mentions flagged as negative per institution.</CardDescription>
        </CardHeader>
        <CardContent className="h-[450px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={mockUniData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#27272a" horizontal={true} vertical={false} />
              <XAxis type="number" domain={[0, 100]} stroke="#a1a1aa" tickFormatter={(v) => `${v}%`} />
              <YAxis dataKey="name" type="category" stroke="#a1a1aa" tickLine={false} width={150} />
              <Tooltip 
                cursor={{ fill: '#27272a' }}
                contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', borderRadius: '0.5rem', color: '#fff' }}
                formatter={(value: any) => [`${value}%`, 'Negative Mentions']}
              />
              <Bar dataKey="negative" radius={[0, 4, 4, 0]}>
                {mockUniData.map((entry: any, index: number) => (
                  <Cell key={`cell-${index}`} fill={entry.negative >= entry.threshold ? '#e11d48' : '#3b82f6'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
