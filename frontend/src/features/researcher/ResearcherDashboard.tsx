import { useQuery } from '@tanstack/react-query';
import { Download, FileText, Map, Hash, FileDown, Database, Loader2 } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
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

  const topicData = [
    { name: 'Sapa', count: 12500 },
    { name: 'Hostel Fees', count: 9800 },
    { name: 'Acceptance', count: 8200 },
    { name: 'Protest', count: 7500 },
    { name: 'Strike', count: 5400 },
    { name: 'Management', count: 4200 },
    { name: 'Wifi', count: 3100 }
  ];

  const regionalData = [
    { region: 'South West', negative: 85, neutral: 10, positive: 5 },
    { region: 'South East', negative: 72, neutral: 18, positive: 10 },
    { region: 'South South', negative: 65, neutral: 25, positive: 10 },
    { region: 'North Central', negative: 55, neutral: 35, positive: 10 },
    { region: 'North West', negative: 40, neutral: 45, positive: 15 },
    { region: 'North East', negative: 38, neutral: 50, positive: 12 },
  ];

  const barColors = ['#6366f1', '#8b5cf6', '#d946ef', '#f43f5e', '#f97316', '#eab308', '#22c55e'];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2 text-white flex items-center gap-3">
            Research Intelligence
            {isLoading && <Loader2 className="animate-spin text-indigo-400" size={20} />}
          </h1>
          <p className="text-zinc-400">Export NLP datasets, explore historical trends, and draft academic publications.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="bg-zinc-900 border-zinc-700 text-zinc-300 hover:text-white hover:bg-zinc-800">
            <FileText size={16} className="mr-2" />
            Save Query
          </Button>
          <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
            <FileDown size={16} className="mr-2" />
            Export CSV
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl">
          <div className="flex items-center gap-2 mb-6">
            <Hash className="text-indigo-400" size={20} />
            <h3 className="text-lg font-semibold text-white">Top Extracted Keywords (Pidgin & English)</h3>
          </div>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={topicData} layout="vertical" margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" horizontal={false} />
                <XAxis type="number" stroke="#a1a1aa" />
                <YAxis dataKey="name" type="category" stroke="#a1a1aa" width={100} tick={{fill: '#e4e4e7'}} />
                <Tooltip 
                  cursor={{fill: '#27272a', opacity: 0.4}}
                  contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', color: '#fff', borderRadius: '0.5rem' }}
                />
                <Bar dataKey="count" radius={[0, 4, 4, 0]}>
                  {topicData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={barColors[index % barColors.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl">
          <div className="flex items-center gap-2 mb-6">
            <Map className="text-teal-400" size={20} />
            <h3 className="text-lg font-semibold text-white">Sentiment Intensity by Geopolitical Zone</h3>
          </div>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={regionalData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                <XAxis dataKey="region" stroke="#a1a1aa" tick={{fill: '#e4e4e7'}} angle={-45} textAnchor="end" height={60} />
                <YAxis stroke="#a1a1aa" />
                <Tooltip 
                  cursor={{fill: '#27272a', opacity: 0.4}}
                  contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', color: '#fff', borderRadius: '0.5rem' }}
                />
                <Bar dataKey="negative" stackId="a" fill="#e11d48" name="Negative %" />
                <Bar dataKey="neutral" stackId="a" fill="#64748b" name="Neutral %" />
                <Bar dataKey="positive" stackId="a" fill="#10b981" name="Positive %" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Database className="text-amber-400" size={20} />
            <h3 className="text-lg font-semibold text-white">Dataset Library</h3>
          </div>
          <Button variant="outline" size="sm" className="text-xs bg-zinc-950 border-zinc-800 hover:bg-zinc-800 text-zinc-300 hover:text-white">
            View All Archives
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[1, 2, 3].map((item) => (
            <div key={item} className="p-4 rounded-xl border border-zinc-800 bg-zinc-950 flex flex-col items-start hover:border-zinc-700 transition-colors cursor-pointer group">
              <div className="h-10 w-10 rounded-lg bg-indigo-500/10 text-indigo-400 flex items-center justify-center mb-4 group-hover:bg-indigo-500/20 transition-colors">
                <Download size={20} />
              </div>
              <h4 className="text-sm font-semibold text-white mb-1">Q{item} 2025 Sentiment Archive</h4>
              <p className="text-xs text-zinc-500 mb-4">2.4M rows • JSONL Format</p>
              <div className="mt-auto w-full pt-4 border-t border-zinc-800/50 text-xs font-medium text-indigo-400">
                Download Dataset →
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
