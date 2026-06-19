import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Lightbulb, MapPin } from 'lucide-react';

const mockRegionData = [
  { name: 'South West', value: 45000, fill: '#f43f5e' },
  { name: 'South South', value: 32000, fill: '#f59e0b' },
  { name: 'North West', value: 18000, fill: '#10b981' },
  { name: 'North Central', value: 24000, fill: '#3b82f6' },
  { name: 'South East', value: 28000, fill: '#8b5cf6' },
  { name: 'North East', value: 12000, fill: '#64748b' },
];

export default function RegionalAnalysis() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500 max-w-7xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-white mb-1 flex items-center">
          <MapPin className="mr-2 h-6 w-6 text-indigo-500" />
          Regional Opinion Density
        </h1>
        <p className="text-zinc-400">Geospatial breakdown of public discourse across Nigerian geopolitical zones.</p>
      </div>

      <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-xl p-6 flex gap-4">
        <Lightbulb className="w-6 h-6 text-indigo-400 flex-shrink-0" />
        <div>
          <h3 className="text-indigo-400 font-semibold mb-1">Executive Insight</h3>
          <p className="text-zinc-300">
            The South West geopolitical zone continues to generate the highest volume of discourse, comprising over 28% of all 
            measured social media activity regarding fee hikes. This correlates strongly with the high concentration of federal 
            and state tertiary institutions in Lagos, Oyo, and Osun states.
          </p>
        </div>
      </div>

      <Card className="bg-zinc-900 border-zinc-800 text-white shadow-lg">
        <CardHeader>
          <CardTitle>Mentions by Geopolitical Zone</CardTitle>
          <CardDescription className="text-zinc-400">Total volume of fee-related discussions (30 days)</CardDescription>
        </CardHeader>
        <CardContent className="h-[500px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={mockRegionData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                outerRadius={160}
                fill="#8884d8"
                dataKey="value"
                stroke="#18181b"
                strokeWidth={2}
              >
                {mockRegionData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', borderRadius: '0.5rem', color: '#fff' }}
                itemStyle={{ color: '#fff' }}
              />
              <Legend verticalAlign="bottom" height={36} />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
