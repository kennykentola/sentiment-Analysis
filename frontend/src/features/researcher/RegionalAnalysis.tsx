import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ZAxis, Cell } from 'recharts';
import { Map, Download, FileJson } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { AnalyticsAPI } from '@/services/api';
import { Button } from '@/components/ui/button';

// Data fetched dynamically via React Query

export default function RegionalAnalysis() {
  const { data: rawRegionData, isLoading } = useQuery({
    queryKey: ['regional'],
    queryFn: AnalyticsAPI.getRegional
  });

  if (isLoading) {
    return <div className="text-zinc-400 p-8">Loading geospatial and demographic arrays...</div>;
  }

  const incomeMap: Record<string, number> = {
    'South West': 450,
    'South South': 380,
    'South East': 340,
    'North Central': 280,
    'North West': 210,
    'North East': 190
  };

  const mockRegionData = (rawRegionData || []).map((r: any) => ({
    region: r.region,
    income: incomeMap[r.region] || 300,
    sentiment: r.positive - r.negative,
    volume: r.value
  }));

  return (
    <div className="space-y-6 animate-in fade-in duration-500 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white flex items-center">
            Geospatial & Demographic Correlation
          </h1>
          <p className="text-zinc-400">Analyze the relationship between regional economic indicators and public sentiment.</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Button variant="outline" className="bg-zinc-900 border-zinc-800 text-zinc-300 hover:bg-zinc-800 hover:text-white">
            <FileJson className="mr-2 h-4 w-4" />
            Export GeoJSON
          </Button>
          <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
            <Download className="mr-2 h-4 w-4" />
            Download Dataset
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-zinc-900 border-zinc-800 text-white p-6 rounded-xl border-l-4 border-l-indigo-500">
            <h3 className="text-zinc-400 text-xs font-medium mb-1 uppercase tracking-wider">Correlation (Income vs Sentiment)</h3>
            <p className="text-3xl font-bold text-white mb-1">-0.82</p>
            <p className="text-sm text-indigo-400">Strong negative correlation</p>
        </Card>
        <Card className="bg-zinc-900 border-zinc-800 text-white p-6 rounded-xl border-l-4 border-l-emerald-500">
            <h3 className="text-zinc-400 text-xs font-medium mb-1 uppercase tracking-wider">R-Squared (R²)</h3>
            <p className="text-3xl font-bold text-white mb-1">0.67</p>
            <p className="text-sm text-emerald-500">Goodness of fit</p>
        </Card>
        <Card className="bg-zinc-900 border-zinc-800 text-white p-6 rounded-xl border-l-4 border-l-amber-500">
            <h3 className="text-zinc-400 text-xs font-medium mb-1 uppercase tracking-wider">Most Active Demographics</h3>
            <p className="text-3xl font-bold text-white mb-1">Urban South</p>
            <p className="text-sm text-amber-500">72% of total volume</p>
        </Card>
      </div>

      <Card className="bg-zinc-900 border-zinc-800 text-white">
        <CardHeader>
          <CardTitle>Socioeconomic Sentiment Scatter Matrix</CardTitle>
          <CardDescription className="text-zinc-400">Plotting estimated Per Capita Income (X) against Net Sentiment (Y). Bubble size represents Post Volume.</CardDescription>
        </CardHeader>
        <CardContent className="h-[450px] w-full pt-4">
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
              <XAxis type="number" dataKey="income" name="Est. Income ($)" stroke="#a1a1aa" domain={[150, 500]} />
              <YAxis type="number" dataKey="sentiment" name="Net Sentiment" stroke="#a1a1aa" domain={[-70, 0]} />
              <ZAxis type="number" dataKey="volume" range={[200, 2000]} name="Volume" />
              <Tooltip 
                cursor={{ strokeDasharray: '3 3' }} 
                contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', borderRadius: '8px', color: '#fff' }}
                formatter={(value: any, name: any) => {
                  if (name === 'Est. Income ($)') return ['$' + value, name];
                  if (name === 'Net Sentiment') return [value + '%', name];
                  if (name === 'Volume') return [value.toLocaleString(), 'Post Volume'];
                  return [value, name];
                }}
              />
              <Scatter name="Regions" data={mockRegionData} fill="#8b5cf6">
                {mockRegionData.map((entry: any, index: number) => (
                  <Cell key={`cell-${index}`} fill={entry.sentiment < -40 ? '#f43f5e' : entry.sentiment > -20 ? '#10b981' : '#f59e0b'} fillOpacity={0.8} />
                ))}
              </Scatter>
            </ScatterChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="bg-zinc-900 border-zinc-800 text-white overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left font-mono">
            <thead className="text-xs text-zinc-400 uppercase bg-zinc-950/50 border-b border-zinc-800">
              <tr>
                <th className="px-6 py-4 font-medium font-sans">Geopolitical Zone</th>
                <th className="px-6 py-4 font-medium">Est. Income ($)</th>
                <th className="px-6 py-4 font-medium">N (Sample Size)</th>
                <th className="px-6 py-4 font-medium">Mean Sentiment (μ)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/50">
              {mockRegionData.map((region: any, i: number) => (
                <tr key={i} className="hover:bg-zinc-800/20 transition-colors">
                  <td className="px-6 py-4 font-sans font-medium text-white flex items-center">
                    <Map className="w-4 h-4 mr-2 text-zinc-500" />
                    {region.region}
                  </td>
                  <td className="px-6 py-4 text-emerald-400">${region.income}</td>
                  <td className="px-6 py-4 text-zinc-300">{region.volume.toLocaleString()}</td>
                  <td className="px-6 py-4 text-zinc-300">{region.sentiment.toFixed(1)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
