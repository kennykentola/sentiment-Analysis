import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ZAxis, ReferenceLine, Cell } from 'recharts';
import { Download, Calculator, Building2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Researcher Data (X: Volume, Y: Sentiment, Z: Std Dev)
const mockUniData = [
  { name: 'OAU', volume: 15400, sentiment: -55, stdDev: 12.5, region: 'South West' },
  { name: 'UNILAG', volume: 18200, sentiment: -38, stdDev: 18.2, region: 'South West' },
  { name: 'ABU', volume: 9800, sentiment: -5, stdDev: 8.4, region: 'North West' },
  { name: 'UNIBEN', volume: 12500, sentiment: -62, stdDev: 22.1, region: 'South South' },
  { name: 'UNN', volume: 11200, sentiment: -15, stdDev: 10.5, region: 'South East' },
  { name: 'University of Ibadan', volume: 14100, sentiment: -26, stdDev: 14.8, region: 'South West' },
];

export default function UniversityAnalysis() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white flex items-center">
            University Cross-Sectional Analysis
          </h1>
          <p className="text-zinc-400">Evaluate institutional sentiment disparities and calculate statistical significance.</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Button variant="outline" className="bg-zinc-900 border-zinc-800 text-zinc-300 hover:bg-zinc-800 hover:text-white">
            <Calculator className="mr-2 h-4 w-4" />
            Run ANOVA Test
          </Button>
          <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
            <Download className="mr-2 h-4 w-4" />
            Export Matrix
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-zinc-900 border-zinc-800 text-white p-6 rounded-xl border-l-4 border-l-rose-500">
            <h3 className="text-zinc-400 text-xs font-medium mb-1 uppercase tracking-wider">Highest Deviation (σ)</h3>
            <p className="text-3xl font-bold text-white mb-1">UNIBEN</p>
            <p className="text-sm text-zinc-500">σ = 22.1 (Highly polarized)</p>
        </Card>
        <Card className="bg-zinc-900 border-zinc-800 text-white p-6 rounded-xl border-l-4 border-l-indigo-500">
            <h3 className="text-zinc-400 text-xs font-medium mb-1 uppercase tracking-wider">Pearson Correlation (r)</h3>
            <p className="text-3xl font-bold text-white mb-1">-0.68</p>
            <p className="text-sm text-indigo-400">Volume vs Sentiment</p>
        </Card>
        <Card className="bg-zinc-900 border-zinc-800 text-white p-6 rounded-xl border-l-4 border-l-amber-500">
            <h3 className="text-zinc-400 text-xs font-medium mb-1 uppercase tracking-wider">F-Statistic (ANOVA)</h3>
            <p className="text-3xl font-bold text-white mb-1">14.2</p>
            <p className="text-sm text-amber-500">p &lt; 0.01 (Significant Variance)</p>
        </Card>
      </div>

      <Card className="bg-zinc-900 border-zinc-800 text-white">
        <CardHeader>
          <CardTitle>Institutional Sentiment vs Volume</CardTitle>
          <CardDescription className="text-zinc-400">Scatter plot assessing the correlation between discussion volume (X) and net sentiment (Y). Bubble size represents the standard deviation (polarity).</CardDescription>
        </CardHeader>
        <CardContent className="h-[450px] w-full pt-4">
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
              <XAxis type="number" dataKey="volume" name="Volume" stroke="#a1a1aa" domain={[8000, 20000]} tickFormatter={(v) => `${v/1000}k`} />
              <YAxis type="number" dataKey="sentiment" name="Net Sentiment" stroke="#a1a1aa" domain={[-80, 0]} />
              <ZAxis type="number" dataKey="stdDev" range={[100, 1000]} name="Std Deviation" />
              <Tooltip 
                cursor={{ strokeDasharray: '3 3' }} 
                contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', borderRadius: '8px', color: '#fff' }}
                formatter={(value: any, name: any) => {
                  if (name === 'Volume') return [value.toLocaleString(), 'Post Volume'];
                  if (name === 'Net Sentiment') return [value + '%', name];
                  return [value, name];
                }}
              />
              <ReferenceLine y={-33.5} stroke="#f43f5e" strokeDasharray="3 3" label={{ position: 'insideTopLeft', fill: '#f43f5e', value: 'Mean Sentiment (μ)', fontSize: 12 }} />
              <Scatter name="Universities" data={mockUniData} fill="#6366f1">
                {mockUniData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.sentiment < -40 ? '#f43f5e' : entry.sentiment > -20 ? '#10b981' : '#f59e0b'} fillOpacity={0.8} />
                ))}
              </Scatter>
            </ScatterChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="bg-zinc-900 border-zinc-800 text-white overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-zinc-400 uppercase bg-zinc-950/50 border-b border-zinc-800">
              <tr>
                <th className="px-6 py-4 font-medium">Institution</th>
                <th className="px-6 py-4 font-medium">N (Sample Size)</th>
                <th className="px-6 py-4 font-medium">Mean Sentiment (μ)</th>
                <th className="px-6 py-4 font-medium">Std Deviation (σ)</th>
                <th className="px-6 py-4 font-medium">Standard Error (SE)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/50 font-mono">
              {mockUniData.map((uni, i) => {
                const se = (uni.stdDev / Math.sqrt(uni.volume)).toFixed(4);
                return (
                  <tr key={i} className="hover:bg-zinc-800/20 transition-colors">
                    <td className="px-6 py-4 font-sans font-medium text-white flex items-center">
                      <Building2 className="w-4 h-4 mr-2 text-zinc-500" />
                      {uni.name}
                    </td>
                    <td className="px-6 py-4 text-zinc-400">{uni.volume.toLocaleString()}</td>
                    <td className="px-6 py-4 text-zinc-300">{uni.sentiment.toFixed(1)}</td>
                    <td className="px-6 py-4 text-zinc-300">{uni.stdDev.toFixed(1)}</td>
                    <td className="px-6 py-4 text-indigo-400">{se}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
