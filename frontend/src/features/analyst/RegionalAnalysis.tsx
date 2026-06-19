import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Cell } from 'recharts';
import { Map, AlertTriangle } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { AnalyticsAPI } from '@/services/api';
import { Button } from '@/components/ui/button';

// Data fetched from API

export default function RegionalAnalysis() {
  const { data: rawRegionData, isLoading } = useQuery({
    queryKey: ['regional'],
    queryFn: AnalyticsAPI.getRegional
  });

  if (isLoading) {
    return <div className="text-zinc-400 p-8">Loading regional distributions...</div>;
  }

  const mockRegionData = rawRegionData || [];

  // Derive state volume mocks from region data for visual representation
  const mockVolumeByState = mockRegionData.map((r: any) => ({
    state: `${r.region} Hub`,
    volume: r.value,
    color: r.fill
  })).sort((a: any, b: any) => b.volume - a.volume);

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">Regional Analysis</h1>
          <p className="text-zinc-400">Geospatial breakdown and demographic distribution of public sentiment.</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" className="bg-zinc-900 border-zinc-800 text-zinc-300 hover:bg-zinc-800 hover:text-white">
            <Map className="mr-2 h-4 w-4" />
            Interactive Map View
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-zinc-900 border-zinc-800 text-white p-6 rounded-xl border-t-4 border-t-rose-500">
            <h3 className="text-zinc-400 text-sm font-medium mb-2 flex items-center">
              <AlertTriangle className="w-4 h-4 mr-2 text-rose-500" />
              Most Volatile Region
            </h3>
            <p className="text-2xl font-bold text-white mb-1">South West</p>
            <p className="text-sm text-zinc-500">
              Highest concentration of negative posts
            </p>
        </Card>
        <Card className="bg-zinc-900 border-zinc-800 text-white p-6 rounded-xl">
            <h3 className="text-zinc-400 text-sm font-medium mb-2">Most Active State</h3>
            <p className="text-2xl font-bold text-white mb-1">Lagos</p>
            <p className="text-sm text-zinc-500">
              45,000 recorded posts
            </p>
        </Card>
        <Card className="bg-zinc-900 border-zinc-800 text-white p-6 rounded-xl">
            <h3 className="text-zinc-400 text-sm font-medium mb-2">Most Neutral Region</h3>
            <p className="text-2xl font-bold text-white mb-1">North West</p>
            <p className="text-sm text-zinc-500">
              Highest ratio of neutral sentiment
            </p>
        </Card>
        <Card className="bg-zinc-900 border-zinc-800 text-white p-6 rounded-xl bg-indigo-600/10 border-indigo-500/20">
            <h3 className="text-indigo-300 text-sm font-medium mb-2">Generate Report</h3>
            <p className="text-sm text-indigo-100/70 mb-3">Download full geographical breakdown.</p>
            <Button size="sm" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white">
              Export PDF
            </Button>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-zinc-900 border-zinc-800 text-white">
          <CardHeader>
            <CardTitle>Sentiment Radars by Region</CardTitle>
            <CardDescription className="text-zinc-400">Relative distribution of emotions mapped across all 6 geopolitical zones.</CardDescription>
          </CardHeader>
          <CardContent className="h-[400px] w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="70%" data={mockRegionData}>
                <PolarGrid stroke="#27272a" />
                <PolarAngleAxis dataKey="region" tick={{ fill: '#a1a1aa', fontSize: 12 }} />
                <PolarRadiusAxis angle={30} domain={[0, 150]} tick={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', borderRadius: '8px' }} 
                  itemStyle={{ color: '#fff' }} 
                />
                <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px' }} />
                <Radar name="Negative" dataKey="negative" stroke="#f43f5e" fill="#f43f5e" fillOpacity={0.3} />
                <Radar name="Neutral" dataKey="neutral" stroke="#94a3b8" fill="#94a3b8" fillOpacity={0.3} />
                <Radar name="Positive" dataKey="positive" stroke="#14b8a6" fill="#14b8a6" fillOpacity={0.3} />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-zinc-900 border-zinc-800 text-white">
          <CardHeader>
            <CardTitle>Top Volume by State</CardTitle>
            <CardDescription className="text-zinc-400">Raw number of posts geo-tagged or associated with specific states.</CardDescription>
          </CardHeader>
          <CardContent className="h-[400px] w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mockVolumeByState} layout="vertical" margin={{ top: 0, right: 30, left: 20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" horizontal={true} vertical={false} />
                <XAxis type="number" stroke="#a1a1aa" tickLine={false} axisLine={false} tickFormatter={(v) => `${v/1000}k`} />
                <YAxis dataKey="state" type="category" stroke="#a1a1aa" tickLine={false} axisLine={false} />
                <Tooltip 
                  cursor={{ fill: '#27272a' }}
                  contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', borderRadius: '8px' }} 
                  formatter={(value: any) => [Number(value).toLocaleString(), 'Total Posts']}
                />
                <Bar dataKey="volume" radius={[0, 4, 4, 0]}>
                  {
                    mockVolumeByState.map((entry: any, index: number) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))
                  }
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
