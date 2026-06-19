import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Play, Pause, AlertTriangle, Clock, Server, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

const mockJobs = [
  { id: 'JOB-901', target: 'Twitter Stream', schedule: 'Continuous', status: 'running', rate: '450 req/min', duration: '4d 12h' },
  { id: 'JOB-902', target: 'Nairaland Nightly', schedule: '02:00 AM Daily', status: 'completed', rate: '-', duration: '45m 12s' },
  { id: 'JOB-903', target: 'Facebook Historical', schedule: 'Manual', status: 'failed', rate: '0 req/min', duration: '2m 04s' },
  { id: 'JOB-904', target: 'News Archiver', schedule: 'Every 6 hours', status: 'running', rate: '20 req/min', duration: '1h 05m' },
];

export default function CollectionJobs() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">Collection Jobs</h1>
          <p className="text-zinc-400">Schedule and monitor background scraping and ingestion tasks.</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" className="bg-zinc-900 border-zinc-800 text-zinc-300 hover:bg-zinc-800 hover:text-white">
            <Clock className="mr-2 h-4 w-4" />
            Job History
          </Button>
          <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
            <Play className="mr-2 h-4 w-4" />
            New Job
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-zinc-900 border-zinc-800 text-white p-6 rounded-xl">
            <h3 className="text-zinc-400 text-sm font-medium mb-2">Active Jobs</h3>
            <p className="text-3xl font-bold text-white mb-1">2</p>
            <p className="text-sm text-emerald-500 flex items-center">
              <Server className="w-4 h-4 mr-1" />
              Consuming 1.2GB RAM
            </p>
        </Card>
        <Card className="bg-zinc-900 border-zinc-800 text-white p-6 rounded-xl">
            <h3 className="text-zinc-400 text-sm font-medium mb-2">Total Executions</h3>
            <p className="text-3xl font-bold text-white mb-1">1,402</p>
            <p className="text-sm text-zinc-500 flex items-center">
              <CheckCircle2 className="w-4 h-4 mr-1" />
              98% Success Rate
            </p>
        </Card>
        <Card className="bg-zinc-900 border-zinc-800 text-white p-6 rounded-xl bg-rose-500/10 border-rose-500/20 md:col-span-2">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-rose-400 text-sm font-medium mb-2 flex items-center">
                  <AlertTriangle className="w-4 h-4 mr-2" />
                  Failed Execution Detected
                </h3>
                <p className="text-white text-lg font-medium mb-1">JOB-903 (Facebook Historical)</p>
                <p className="text-sm text-rose-300/70">Error: Rate Limit Exceeded (HTTP 429). Retry scheduled in 15 mins.</p>
              </div>
              <Button size="sm" variant="outline" className="bg-rose-500 hover:bg-rose-600 text-white border-0 mt-2">
                View Logs
              </Button>
            </div>
        </Card>
      </div>

      <Card className="bg-zinc-900 border-zinc-800 text-white overflow-hidden">
        <CardHeader>
          <CardTitle>Job Queue</CardTitle>
          <CardDescription className="text-zinc-400">Current status of all scheduled and manual collection workers.</CardDescription>
        </CardHeader>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-zinc-400 uppercase bg-zinc-950/50 border-y border-zinc-800">
              <tr>
                <th className="px-6 py-4 font-medium">Job ID</th>
                <th className="px-6 py-4 font-medium">Target</th>
                <th className="px-6 py-4 font-medium">Schedule</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium">Ingestion Rate</th>
                <th className="px-6 py-4 font-medium">Duration</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/50">
              {mockJobs.map((job, i) => (
                <tr key={i} className="hover:bg-zinc-800/20 transition-colors">
                  <td className="px-6 py-4 font-mono text-zinc-500">{job.id}</td>
                  <td className="px-6 py-4 font-medium text-white">{job.target}</td>
                  <td className="px-6 py-4 text-zinc-400">{job.schedule}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium flex items-center w-max ${
                      job.status === 'running' ? 'bg-indigo-500/10 text-indigo-400' :
                      job.status === 'completed' ? 'bg-emerald-500/10 text-emerald-500' :
                      'bg-rose-500/10 text-rose-500'
                    }`}>
                      {job.status === 'running' && <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse mr-2"></div>}
                      {job.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-zinc-300 font-mono text-xs">{job.rate}</td>
                  <td className="px-6 py-4 text-zinc-300">{job.duration}</td>
                  <td className="px-6 py-4 text-right space-x-2">
                    {job.status === 'running' ? (
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-rose-400 hover:text-rose-300 hover:bg-rose-500/10">
                        <Pause className="w-4 h-4" />
                      </Button>
                    ) : (
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-400 hover:text-white">
                        <Play className="w-4 h-4" />
                      </Button>
                    )}
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
