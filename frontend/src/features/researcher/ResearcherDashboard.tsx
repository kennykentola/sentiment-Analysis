import { useQuery } from '@tanstack/react-query';
import { Download, FileText, Hash, FileDown, Database, Loader2, BookOpen, Layers, LineChart as LineChartIcon, Activity } from 'lucide-react';
import { 
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  AreaChart, Area, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend 
} from 'recharts';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { account } from '@/services/appwrite';

const fetchLiveAnalytics = async () => {
  try {
    const session = await account.createJWT();
    const response = await fetch('http://localhost:8000/api/v1/analytics/latest', {
      headers: { 'x-appwrite-jwt': session.jwt }
    });
    if (!response.ok) throw new Error("API Error");
    return await response.json();
  } catch (error) {
    return null;
  }
};

export default function ResearcherDashboard() {
  const { isLoading } = useQuery({
    queryKey: ['researcherAnalytics'],
    queryFn: fetchLiveAnalytics,
    refetchInterval: 30000
  });

  const kpis = [
    { label: "Available Datasets", value: "14", icon: Database, color: "text-indigo-400", bg: "bg-indigo-500/10" },
    { label: "Research Projects", value: "3", icon: Layers, color: "text-amber-400", bg: "bg-amber-500/10" },
    { label: "Reports Generated", value: "120", icon: FileText, color: "text-emerald-400", bg: "bg-emerald-500/10" },
    { label: "Publications", value: "2", icon: BookOpen, color: "text-rose-400", bg: "bg-rose-500/10" },
  ];

  const sentimentEvolution = [
    { date: 'Jan 01', positive: 4000, negative: 2400, neutral: 2400 },
    { date: 'Feb 01', positive: 3000, negative: 1398, neutral: 2210 },
    { date: 'Mar 01', positive: 2000, negative: 9800, neutral: 2290 },
    { date: 'Apr 01', positive: 2780, negative: 3908, neutral: 2000 },
    { date: 'May 01', positive: 1890, negative: 4800, neutral: 2181 },
    { date: 'Jun 01', positive: 2390, negative: 3800, neutral: 2500 },
    { date: 'Jul 01', positive: 3490, negative: 4300, neutral: 2100 },
  ];

  const universityRadar = [
    { metric: 'Volatility', UNILAG: 120, OAU: 110, ABU: 80, fullMark: 150 },
    { metric: 'Negative Vol.', UNILAG: 98, OAU: 130, ABU: 90, fullMark: 150 },
    { metric: 'Protest Risk', UNILAG: 86, OAU: 130, ABU: 70, fullMark: 150 },
    { metric: 'Engagement', UNILAG: 99, OAU: 100, ABU: 120, fullMark: 150 },
    { metric: 'Total Posts', UNILAG: 85, OAU: 90, ABU: 140, fullMark: 150 },
  ];

  const topicEvolution = [
    { week: 'W1', sapa: 4000, strike: 2400, fees: 2400 },
    { week: 'W2', sapa: 3000, strike: 1398, fees: 2210 },
    { week: 'W3', sapa: 2000, strike: 9800, fees: 2290 },
    { week: 'W4', sapa: 2780, strike: 3908, fees: 2000 },
    { week: 'W5', sapa: 1890, strike: 4800, fees: 2181 },
  ];

  // GitHub Style Heatmap Mock (7 rows for days, 20 columns for weeks)
  const heatmapData = Array.from({ length: 7 * 20 }).map((_, i) => ({
    id: i,
    intensity: Math.floor(Math.random() * 5)
  }));

  const datasets = [
    { id: 'DS-2025-01', name: 'Q1 2025 Complete NLP Archive', records: '2.4M', size: '1.2 GB', format: 'JSONL', date: '2025-03-31' },
    { id: 'DS-2025-02', name: 'UNILAG Specific Sentiment Slice', records: '850K', size: '450 MB', format: 'CSV', date: '2025-04-15' },
    { id: 'DS-2025-03', name: 'OAU Strike Keywords Extracted', records: '320K', size: '180 MB', format: 'CSV', date: '2025-05-10' },
    { id: 'DS-2025-04', name: 'National Geopolitical Averages', records: '15K', size: '5 MB', format: 'JSON', date: '2025-06-01' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2 text-white flex items-center gap-3">
            Researcher Hub
            {isLoading && <Loader2 className="animate-spin text-indigo-400" size={20} />}
          </h1>
          <p className="text-zinc-400">Export datasets, compare institutions, and draft academic publications.</p>
        </div>
        <div className="flex gap-3">
          <Link to="/app/researcher/publications">
            <Button variant="outline" className="bg-zinc-900 border-zinc-700 text-zinc-300 hover:text-white hover:bg-zinc-800">
              <Layers size={16} className="mr-2" />
              New Project
            </Button>
          </Link>
          <Link to="/app/researcher/datasets">
            <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
              <FileDown size={16} className="mr-2" />
              Export Data
            </Button>
          </Link>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((kpi, idx) => (
          <div key={idx} className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl flex items-center gap-4">
            <div className={`h-12 w-12 rounded-xl flex items-center justify-center flex-shrink-0 ${kpi.bg} ${kpi.color}`}>
              <kpi.icon size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-zinc-400">{kpi.label}</p>
              <h2 className="text-2xl font-bold text-white">{kpi.value}</h2>
            </div>
          </div>
        ))}
      </div>

      {/* Top Row Charts */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Sentiment Evolution (Area) */}
        <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl">
          <div className="flex items-center gap-2 mb-6">
            <LineChartIcon className="text-indigo-400" size={20} />
            <h3 className="text-lg font-semibold text-white">Sentiment Evolution Timeline</h3>
          </div>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={sentimentEvolution} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorPos" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorNeg" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#e11d48" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#e11d48" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="date" stroke="#a1a1aa" tickLine={false} axisLine={false} />
                <YAxis stroke="#a1a1aa" tickLine={false} axisLine={false} />
                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                <Tooltip contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', borderRadius: '0.5rem' }} />
                <Legend />
                <Area type="monotone" dataKey="positive" stroke="#10b981" fillOpacity={1} fill="url(#colorPos)" name="Positive" />
                <Area type="monotone" dataKey="negative" stroke="#e11d48" fillOpacity={1} fill="url(#colorNeg)" name="Negative" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* University Comparison Matrix */}
        <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl">
          <div className="flex items-center gap-2 mb-6">
            <Activity className="text-teal-400" size={20} />
            <h3 className="text-lg font-semibold text-white">University Comparison Matrix</h3>
          </div>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="70%" data={universityRadar}>
                <PolarGrid stroke="#27272a" />
                <PolarAngleAxis dataKey="metric" tick={{ fill: '#a1a1aa', fontSize: 12 }} />
                <PolarRadiusAxis angle={30} domain={[0, 150]} tick={false} axisLine={false} />
                <Radar name="UNILAG" dataKey="UNILAG" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} />
                <Radar name="OAU" dataKey="OAU" stroke="#e11d48" fill="#e11d48" fillOpacity={0.3} />
                <Radar name="ABU" dataKey="ABU" stroke="#10b981" fill="#10b981" fillOpacity={0.3} />
                <Tooltip contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', borderRadius: '0.5rem' }} />
                <Legend />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Middle Row Charts */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        
        {/* Topic Streamgraph */}
        <div className="xl:col-span-2 bg-zinc-900 border border-zinc-800 p-6 rounded-2xl">
          <div className="flex items-center gap-2 mb-6">
            <Hash className="text-fuchsia-400" size={20} />
            <h3 className="text-lg font-semibold text-white">Topic Evolution (Stacked Area)</h3>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={topicEvolution} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                <XAxis dataKey="week" stroke="#a1a1aa" tickLine={false} axisLine={false} />
                <YAxis stroke="#a1a1aa" tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', borderRadius: '0.5rem' }} />
                <Legend />
                <Area type="monotone" dataKey="strike" stackId="1" stroke="#8b5cf6" fill="#8b5cf6" name="Strike Mentions" />
                <Area type="monotone" dataKey="fees" stackId="1" stroke="#f43f5e" fill="#f43f5e" name="Fees/Hikes" />
                <Area type="monotone" dataKey="sapa" stackId="1" stroke="#f59e0b" fill="#f59e0b" name="Sapa/Hunger" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Activity Heatmap */}
        <div className="xl:col-span-1 bg-zinc-900 border border-zinc-800 p-6 rounded-2xl flex flex-col">
          <div className="flex items-center gap-2 mb-6">
            <Database className="text-amber-400" size={20} />
            <h3 className="text-lg font-semibold text-white">Research Activity</h3>
          </div>
          <div className="flex-1 flex items-center justify-center">
            <div className="grid grid-rows-7 grid-flow-col gap-1.5">
              {heatmapData.map((cell) => (
                <div 
                  key={cell.id} 
                  className={`w-3 h-3 rounded-sm ${
                    cell.intensity === 0 ? 'bg-zinc-800' :
                    cell.intensity === 1 ? 'bg-indigo-900/40' :
                    cell.intensity === 2 ? 'bg-indigo-800/60' :
                    cell.intensity === 3 ? 'bg-indigo-600' :
                    'bg-indigo-400'
                  }`}
                  title={`Activity Level: ${cell.intensity}`}
                />
              ))}
            </div>
          </div>
          <div className="mt-4 flex justify-between items-center text-xs text-zinc-500">
            <span>Less</span>
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-sm bg-zinc-800"></div>
              <div className="w-3 h-3 rounded-sm bg-indigo-900/40"></div>
              <div className="w-3 h-3 rounded-sm bg-indigo-800/60"></div>
              <div className="w-3 h-3 rounded-sm bg-indigo-600"></div>
              <div className="w-3 h-3 rounded-sm bg-indigo-400"></div>
            </div>
            <span>More</span>
          </div>
        </div>
      </div>

      {/* Datasets Table */}
      <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl flex flex-col">
        <div className="flex items-center justify-between mb-6">
           <div>
             <h3 className="text-lg font-semibold text-white">Available Datasets Library</h3>
             <p className="text-sm text-zinc-400">High density tabular data ready for export</p>
           </div>
           <Button variant="outline" size="sm" className="bg-zinc-950 border-zinc-800 hover:bg-zinc-800 text-zinc-300 hover:text-white">
             View All
           </Button>
        </div>
        
        <div className="w-full overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-zinc-400 uppercase border-b border-zinc-800">
              <tr>
                <th className="px-4 py-3 font-medium">Dataset ID</th>
                <th className="px-4 py-3 font-medium">Name</th>
                <th className="px-4 py-3 font-medium">Date Generated</th>
                <th className="px-4 py-3 font-medium">Format</th>
                <th className="px-4 py-3 font-medium">Records</th>
                <th className="px-4 py-3 font-medium">Size</th>
                <th className="px-4 py-3 font-medium text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/50">
              {datasets.map((ds) => (
                <tr key={ds.id} className="hover:bg-zinc-800/30 transition-colors">
                  <td className="px-4 py-3 font-mono text-xs text-zinc-500">{ds.id}</td>
                  <td className="px-4 py-3 font-medium text-zinc-200">{ds.name}</td>
                  <td className="px-4 py-3 text-zinc-400">{ds.date}</td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-1 text-xs font-medium rounded-md bg-zinc-800 text-zinc-300">
                      {ds.format}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-zinc-400">{ds.records}</td>
                  <td className="px-4 py-3 text-zinc-400">{ds.size}</td>
                  <td className="px-4 py-3 text-right">
                    <Button variant="ghost" size="sm" className="text-indigo-400 hover:text-indigo-300 hover:bg-indigo-500/10">
                      <Download size={14} className="mr-2" />
                      Download
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
