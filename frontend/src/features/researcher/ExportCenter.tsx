import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Download, Database, CheckCircle2, AlertCircle, Clock, FileJson, FileSpreadsheet, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

const mockExports = [
  { id: 'EXP-8891', dataset: 'Full Corpus (Jan-Jun 2024)', format: 'JSONLines', size: '1.2 GB', status: 'completed', time: '2 mins ago' },
  { id: 'EXP-8890', dataset: 'South-West High Polarity Data', format: 'CSV', size: '45 MB', status: 'completed', time: '1 hour ago' },
  { id: 'EXP-8889', dataset: 'LDA Topic Distributions', format: 'JSON', size: '2.4 MB', status: 'failed', time: '3 hours ago' },
  { id: 'EXP-8888', dataset: 'UNIBEN Anomaly Cluster', format: 'CSV', size: '12 MB', status: 'completed', time: '1 day ago' },
];

export default function ExportCenter() {
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async () => {
    try {
      setIsExporting(true);
      const token = localStorage.getItem('appwrite_jwt');
      
      const response = await fetch('https://sentiment-analysis-vc31.onrender.com/api/v1/datasets/export', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'X-Appwrite-JWT': token || ''
        }
      });
      
      if (!response.ok) {
        throw new Error('Export failed');
      }
      
      // Convert to blob and download
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `sentiment_dataset_${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (err) {
      alert("Failed to export dataset. Please ensure you have Researcher access.");
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white flex items-center">
            Batch Export Center
          </h1>
          <p className="text-zinc-400">Manage large-scale data extracts for offline processing in SPSS, R, or Python.</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Button variant="outline" className="bg-zinc-900 border-zinc-800 text-zinc-300 hover:bg-zinc-800 hover:text-white">
            <Database className="mr-2 h-4 w-4" />
            Connect via API
          </Button>
          <Button 
            className="bg-indigo-600 hover:bg-indigo-700 text-white" 
            onClick={handleExport}
            disabled={isExporting}
          >
            {isExporting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Download className="mr-2 h-4 w-4" />}
            {isExporting ? "Generating CSV..." : "Export Live Dataset"}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-zinc-900 border-zinc-800 text-white p-6 rounded-xl">
            <h3 className="text-zinc-400 text-xs font-medium mb-1 uppercase tracking-wider">Storage Used</h3>
            <p className="text-3xl font-bold text-white mb-1">14.2 GB</p>
            <p className="text-sm text-zinc-500">Of 50 GB Quota</p>
            <div className="w-full bg-zinc-800 rounded-full h-1.5 mt-3">
              <div className="bg-indigo-500 h-1.5 rounded-full w-[28%]"></div>
            </div>
        </Card>
      </div>

      <Card className="bg-zinc-900 border-zinc-800 text-white overflow-hidden">
        <CardHeader>
          <CardTitle>Recent Export Jobs</CardTitle>
          <CardDescription className="text-zinc-400">History of requested data packages and their download statuses.</CardDescription>
        </CardHeader>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-zinc-400 uppercase bg-zinc-950/50 border-y border-zinc-800">
              <tr>
                <th className="px-6 py-4 font-medium">Job ID</th>
                <th className="px-6 py-4 font-medium">Dataset Source</th>
                <th className="px-6 py-4 font-medium">Format</th>
                <th className="px-6 py-4 font-medium">Est. Size</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/50">
              {mockExports.map((job) => (
                <tr key={job.id} className="hover:bg-zinc-800/20 transition-colors">
                  <td className="px-6 py-4 font-mono text-xs text-zinc-400">{job.id}</td>
                  <td className="px-6 py-4 font-medium text-white">{job.dataset}</td>
                  <td className="px-6 py-4">
                    <span className="flex items-center text-zinc-300">
                      {job.format.includes('JSON') ? <FileJson className="w-4 h-4 mr-2 text-amber-500" /> : <FileSpreadsheet className="w-4 h-4 mr-2 text-emerald-500" />}
                      {job.format}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-zinc-400">{job.size}</td>
                  <td className="px-6 py-4">
                    {job.status === 'completed' ? (
                      <span className="inline-flex items-center text-xs font-medium text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded">
                        <CheckCircle2 className="w-3 h-3 mr-1" /> Completed
                      </span>
                    ) : job.status === 'failed' ? (
                      <span className="inline-flex items-center text-xs font-medium text-rose-500 bg-rose-500/10 px-2 py-1 rounded">
                        <AlertCircle className="w-3 h-3 mr-1" /> Failed
                      </span>
                    ) : (
                      <span className="inline-flex items-center text-xs font-medium text-indigo-400 bg-indigo-500/10 px-2 py-1 rounded">
                        <Clock className="w-3 h-3 mr-1" /> Processing
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      disabled={job.status !== 'completed'}
                      className={job.status === 'completed' ? 'text-indigo-400 hover:text-white hover:bg-indigo-600' : 'text-zinc-600 cursor-not-allowed'}
                    >
                      <Download className="w-4 h-4" />
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
