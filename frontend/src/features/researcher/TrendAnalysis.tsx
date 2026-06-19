import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, Legend } from 'recharts';
import { Calendar, Filter, FileSpreadsheet, BrainCircuit, Maximize2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Researcher Data has more variables (Moving Averages, Variance)
const mockTrendData = [
  { date: '2024-01', sentiment: -12.5, ma: -10.2, variance: 4.2 },
  { date: '2024-02', sentiment: -15.8, ma: -11.5, variance: 5.1 },
  { date: '2024-03', sentiment: -22.4, ma: -14.2, variance: 8.4 }, // Strike starts
  { date: '2024-04', sentiment: -45.6, ma: -25.8, variance: 15.6 }, // Fee hike announced
  { date: '2024-05', sentiment: -38.2, ma: -32.4, variance: 12.1 },
  { date: '2024-06', sentiment: -42.1, ma: -38.5, variance: 9.8 },
];

export default function TrendAnalysis() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white flex items-center">
            Trend Analysis Workspace
          </h1>
          <p className="text-zinc-400">Statistical time-series evaluation with moving averages and anomaly detection.</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Button variant="outline" className="bg-zinc-900 border-zinc-800 text-zinc-300 hover:bg-zinc-800 hover:text-white">
            <Filter className="mr-2 h-4 w-4" />
            Parameters
          </Button>
          <Button variant="outline" className="bg-zinc-900 border-zinc-800 text-zinc-300 hover:bg-zinc-800 hover:text-white">
            <BrainCircuit className="mr-2 h-4 w-4" />
            Run ML Smoothing
          </Button>
          <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
            <FileSpreadsheet className="mr-2 h-4 w-4" />
            Export CSV
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-zinc-900 border-zinc-800 text-white p-6 rounded-xl border-l-4 border-l-indigo-500">
            <h3 className="text-zinc-400 text-xs font-medium mb-1 uppercase tracking-wider">Statistical Mean (μ)</h3>
            <p className="text-3xl font-bold text-white mb-1">-29.43</p>
            <p className="text-sm text-zinc-500">Aggregate sentiment score</p>
        </Card>
        <Card className="bg-zinc-900 border-zinc-800 text-white p-6 rounded-xl border-l-4 border-l-amber-500">
            <h3 className="text-zinc-400 text-xs font-medium mb-1 uppercase tracking-wider">Variance (σ²)</h3>
            <p className="text-3xl font-bold text-white mb-1">15.6</p>
            <p className="text-sm text-amber-500">Peak volatility observed in April</p>
        </Card>
        <Card className="bg-zinc-900 border-zinc-800 text-white p-6 rounded-xl border-l-4 border-l-emerald-500">
            <h3 className="text-zinc-400 text-xs font-medium mb-1 uppercase tracking-wider">Confidence Interval</h3>
            <p className="text-3xl font-bold text-white mb-1">95%</p>
            <p className="text-sm text-emerald-500">p &lt; 0.05 threshold met</p>
        </Card>
      </div>

      <Card className="bg-zinc-900 border-zinc-800 text-white">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div>
            <CardTitle>Longitudinal Sentiment Shift</CardTitle>
            <CardDescription className="text-zinc-400">Plotting raw net sentiment against a 3-period moving average with critical event annotations.</CardDescription>
          </div>
          <Button variant="ghost" size="icon" className="text-zinc-500 hover:text-white">
            <Maximize2 className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent className="h-[500px] w-full pt-4">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={mockTrendData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
              <XAxis dataKey="date" stroke="#a1a1aa" tickLine={false} axisLine={false} />
              <YAxis stroke="#a1a1aa" tickLine={false} axisLine={false} domain={[-60, 0]} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', borderRadius: '8px' }} 
                cursor={{ stroke: '#52525b', strokeWidth: 1, strokeDasharray: '4 4' }} 
              />
              <Legend verticalAlign="top" height={36} iconType="plainline" />
              
              {/* Event Annotations */}
              <ReferenceLine x="2024-04" stroke="#f43f5e" strokeDasharray="3 3" label={{ position: 'insideTopRight', fill: '#f43f5e', value: 'Fee Hike Announcement', fontSize: 12 }} />
              
              <Line type="monotone" dataKey="sentiment" name="Raw Sentiment" stroke="#14b8a6" strokeWidth={2} dot={{ r: 4, fill: '#18181b', strokeWidth: 2 }} activeDot={{ r: 6 }} />
              <Line type="monotone" dataKey="ma" name="Moving Average (n=3)" stroke="#f59e0b" strokeWidth={2} strokeDasharray="5 5" dot={false} />
              <Line type="monotone" dataKey="variance" name="Volatility (Variance)" stroke="#8b5cf6" strokeWidth={1} dot={false} yAxisId={1} />
              <YAxis yAxisId={1} orientation="right" stroke="#8b5cf6" tickLine={false} axisLine={false} domain={[0, 20]} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="bg-zinc-900 border-zinc-800 text-white overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left font-mono">
            <thead className="text-xs text-zinc-400 uppercase bg-zinc-950/50 border-b border-zinc-800">
              <tr>
                <th className="px-6 py-4 font-medium">Timestamp (ISO)</th>
                <th className="px-6 py-4 font-medium">Raw Sentiment (Σ)</th>
                <th className="px-6 py-4 font-medium">Moving Average (μ)</th>
                <th className="px-6 py-4 font-medium">Variance (σ²)</th>
                <th className="px-6 py-4 font-medium">Delta (Δ)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/50">
              {mockTrendData.map((row, i) => {
                const prev = i > 0 ? mockTrendData[i - 1].sentiment : row.sentiment;
                const delta = (row.sentiment - prev).toFixed(2);
                return (
                  <tr key={i} className="hover:bg-zinc-800/20 transition-colors">
                    <td className="px-6 py-4 text-zinc-300">{row.date}-01T00:00:00Z</td>
                    <td className="px-6 py-4 text-indigo-400">{row.sentiment}</td>
                    <td className="px-6 py-4 text-amber-500">{row.ma}</td>
                    <td className="px-6 py-4 text-emerald-400">{row.variance}</td>
                    <td className="px-6 py-4">
                      <span className={`${Number(delta) < 0 ? 'text-rose-500' : 'text-emerald-500'}`}>
                        {Number(delta) > 0 ? '+' : ''}{delta}
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
