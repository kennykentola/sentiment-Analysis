import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Search, Building2, MapPin, TrendingDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

const mockUniData = [
  { name: 'OAU', negative: 65, neutral: 25, positive: 10, volume: 15400, region: 'South West' },
  { name: 'UNILAG', negative: 58, neutral: 22, positive: 20, volume: 18200, region: 'South West' },
  { name: 'ABU', negative: 45, neutral: 40, positive: 15, volume: 9800, region: 'North West' },
  { name: 'UNIBEN', negative: 72, neutral: 18, positive: 10, volume: 12500, region: 'South South' },
  { name: 'UNN', negative: 50, neutral: 35, positive: 15, volume: 11200, region: 'South East' },
  { name: 'University of Ibadan', negative: 48, neutral: 30, positive: 22, volume: 14100, region: 'South West' },
  { name: 'UNILORIN', negative: 42, neutral: 38, positive: 20, volume: 10500, region: 'North Central' },
  { name: 'FUTA', negative: 60, neutral: 25, positive: 15, volume: 8400, region: 'South West' },
];

export default function UniversityAnalysis() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">University Analysis</h1>
          <p className="text-zinc-400">Comparative sentiment breakdown across Nigerian higher institutions.</p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
            <input 
              type="text" 
              placeholder="Search universities..." 
              className="pl-9 pr-4 py-2 bg-zinc-900 border border-zinc-800 rounded-md text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
            Compare Selected
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-zinc-900 border-zinc-800 text-white p-6 rounded-xl">
            <h3 className="text-zinc-400 text-sm font-medium mb-2">Most Mentioned</h3>
            <p className="text-3xl font-bold text-white mb-1">UNILAG</p>
            <p className="text-sm text-zinc-500 flex items-center">
              <Building2 className="w-4 h-4 mr-1" />
              18.2k posts analyzed
            </p>
        </Card>
        <Card className="bg-zinc-900 border-zinc-800 text-white p-6 rounded-xl border-l-4 border-l-rose-500">
            <h3 className="text-zinc-400 text-sm font-medium mb-2">Highest Negativity</h3>
            <p className="text-3xl font-bold text-white mb-1">UNIBEN</p>
            <p className="text-sm text-rose-500 flex items-center">
              <TrendingDown className="w-4 h-4 mr-1" />
              72% Negative Sentiment
            </p>
        </Card>
        <Card className="bg-zinc-900 border-zinc-800 text-white p-6 rounded-xl">
            <h3 className="text-zinc-400 text-sm font-medium mb-2">Total Institutions</h3>
            <p className="text-3xl font-bold text-white mb-1">45</p>
            <p className="text-sm text-zinc-500 flex items-center">
              <MapPin className="w-4 h-4 mr-1" />
              Across 6 geopolitical zones
            </p>
        </Card>
      </div>

      <Card className="bg-zinc-900 border-zinc-800 text-white">
        <CardHeader>
          <CardTitle>Comparative Sentiment Distribution</CardTitle>
          <CardDescription className="text-zinc-400">100% stacked bar showing the breakdown of sentiment for the top 8 most mentioned institutions.</CardDescription>
        </CardHeader>
        <CardContent className="h-[450px] w-full pt-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={mockUniData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
              <XAxis dataKey="name" stroke="#a1a1aa" tickLine={false} axisLine={false} />
              <YAxis stroke="#a1a1aa" tickLine={false} axisLine={false} tickFormatter={(value) => `${value}%`} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', borderRadius: '8px' }} 
                cursor={{ fill: '#27272a' }} 
              />
              <Legend iconType="circle" />
              <Bar dataKey="negative" stackId="a" fill="#f43f5e" name="Negative %" radius={[0, 0, 4, 4]} />
              <Bar dataKey="neutral" stackId="a" fill="#94a3b8" name="Neutral %" />
              <Bar dataKey="positive" stackId="a" fill="#14b8a6" name="Positive %" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="bg-zinc-900 border-zinc-800 text-white overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-zinc-400 uppercase bg-zinc-950/50 border-b border-zinc-800">
              <tr>
                <th className="px-6 py-4 font-medium">Institution</th>
                <th className="px-6 py-4 font-medium">Region</th>
                <th className="px-6 py-4 font-medium">Post Volume</th>
                <th className="px-6 py-4 font-medium">Net Sentiment</th>
                <th className="px-6 py-4 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/50">
              {mockUniData.map((uni, i) => {
                const net = uni.positive - uni.negative;
                return (
                  <tr key={i} className="hover:bg-zinc-800/20 transition-colors">
                    <td className="px-6 py-4 font-medium text-white">{uni.name}</td>
                    <td className="px-6 py-4 text-zinc-400">{uni.region}</td>
                    <td className="px-6 py-4 text-zinc-300">{uni.volume.toLocaleString()}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${net < -30 ? 'bg-rose-500/10 text-rose-500' : net < 0 ? 'bg-orange-500/10 text-orange-500' : 'bg-emerald-500/10 text-emerald-500'}`}>
                        {net > 0 ? '+' : ''}{net}%
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${net < -30 ? 'bg-rose-500 animate-pulse' : 'bg-zinc-500'}`}></div>
                        <span className="text-zinc-400">{net < -30 ? 'High Risk' : 'Monitoring'}</span>
                      </span>
                    </td>
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
