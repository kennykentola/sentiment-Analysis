import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Database, Plus, RefreshCw, AlertCircle, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

const mockSources = [
  { id: 'SRC-001', name: 'Twitter (X) API', type: 'Social Media', status: 'active', lastSync: '10 mins ago', records: '2.5M' },
  { id: 'SRC-002', name: 'Nairaland Scraper', type: 'Forum', status: 'active', lastSync: '1 hour ago', records: '850K' },
  { id: 'SRC-003', name: 'Facebook Graph API', type: 'Social Media', status: 'warning', lastSync: '5 hours ago', records: '1.2M' },
  { id: 'SRC-004', name: 'News API (Nigerian Vanguard)', type: 'News Media', status: 'error', lastSync: '2 days ago', records: '45K' },
  { id: 'SRC-005', name: 'Instagram Basic Display', type: 'Social Media', status: 'active', lastSync: '30 mins ago', records: '620K' },
];

export default function DataSources() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">Data Sources</h1>
          <p className="text-zinc-400">Manage your active API connections and scraping endpoints.</p>
        </div>
        <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
          <Plus className="mr-2 h-4 w-4" />
          Add Data Source
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-zinc-900 border-zinc-800 text-white p-6 rounded-xl border-l-4 border-l-emerald-500">
            <h3 className="text-zinc-400 text-sm font-medium mb-2">Active Integrations</h3>
            <p className="text-3xl font-bold text-white mb-1">4</p>
            <p className="text-sm text-emerald-500 flex items-center">
              <CheckCircle2 className="w-4 h-4 mr-1" />
              Healthy status
            </p>
        </Card>
        <Card className="bg-zinc-900 border-zinc-800 text-white p-6 rounded-xl border-l-4 border-l-rose-500">
            <h3 className="text-zinc-400 text-sm font-medium mb-2">Failing Endpoints</h3>
            <p className="text-3xl font-bold text-white mb-1">1</p>
            <p className="text-sm text-rose-500 flex items-center">
              <AlertCircle className="w-4 h-4 mr-1" />
              Check API Rate Limits
            </p>
        </Card>
        <Card className="bg-zinc-900 border-zinc-800 text-white p-6 rounded-xl">
            <h3 className="text-zinc-400 text-sm font-medium mb-2">Total Indexed Records</h3>
            <p className="text-3xl font-bold text-white mb-1">5.2M</p>
            <p className="text-sm text-zinc-500 flex items-center">
              <Database className="w-4 h-4 mr-1" />
              Across all platforms
            </p>
        </Card>
      </div>

      <Card className="bg-zinc-900 border-zinc-800 text-white overflow-hidden">
        <CardHeader>
          <CardTitle>Configured Endpoints</CardTitle>
          <CardDescription className="text-zinc-400">Real-time status of your scraping and ingestion pipelines.</CardDescription>
        </CardHeader>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-zinc-400 uppercase bg-zinc-950/50 border-y border-zinc-800">
              <tr>
                <th className="px-6 py-4 font-medium">Source Name</th>
                <th className="px-6 py-4 font-medium">Type</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium">Last Sync</th>
                <th className="px-6 py-4 font-medium">Indexed Records</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/50">
              {mockSources.map((source, i) => (
                <tr key={i} className="hover:bg-zinc-800/20 transition-colors">
                  <td className="px-6 py-4 font-medium text-white flex items-center">
                    <Database className="w-4 h-4 mr-3 text-zinc-500" />
                    {source.name}
                  </td>
                  <td className="px-6 py-4 text-zinc-400">{source.type}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                      source.status === 'active' ? 'bg-emerald-500/10 text-emerald-500' :
                      source.status === 'warning' ? 'bg-amber-500/10 text-amber-500' :
                      'bg-rose-500/10 text-rose-500'
                    }`}>
                      {source.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-zinc-300">{source.lastSync}</td>
                  <td className="px-6 py-4 text-zinc-300">{source.records}</td>
                  <td className="px-6 py-4 text-right">
                    <Button variant="ghost" size="sm" className="text-zinc-400 hover:text-white">
                      <RefreshCw className="w-4 h-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
