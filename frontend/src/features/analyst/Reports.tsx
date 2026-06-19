import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { FileText, Download, Calendar, Mail, FileBarChart, Database } from 'lucide-react';
import { Button } from '@/components/ui/button';

const mockReports = [
  { id: 'REP-001', name: 'Weekly Sentiment Summary', type: 'PDF', generated: '2024-06-18', size: '2.4 MB' },
  { id: 'REP-002', name: 'University Comparison Q2', type: 'Excel', generated: '2024-06-15', size: '1.1 MB' },
  { id: 'REP-003', name: 'Topic Extraction: Student Loans', type: 'CSV', generated: '2024-06-10', size: '4.8 MB' },
  { id: 'REP-004', name: 'Monthly Regional Demographics', type: 'PDF', generated: '2024-06-01', size: '3.2 MB' },
];

export default function Reports() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">Reports Generator</h1>
          <p className="text-zinc-400">Generate, schedule, and download automated analytical reports.</p>
        </div>
        <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
          <FileBarChart className="mr-2 h-4 w-4" />
          Create New Report
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="bg-zinc-900 border-zinc-800 text-white p-6 rounded-xl hover:border-zinc-700 transition-colors cursor-pointer group">
          <div className="flex items-start justify-between">
            <div className="h-10 w-10 bg-indigo-500/10 text-indigo-400 rounded-lg flex items-center justify-center group-hover:bg-indigo-500/20 transition-colors">
              <FileBarChart className="w-5 h-5" />
            </div>
            <Button variant="ghost" size="sm" className="text-zinc-400 hover:text-white">Configure</Button>
          </div>
          <h3 className="font-semibold text-lg mt-4 mb-1 text-white">Executive Summary</h3>
          <p className="text-sm text-zinc-400 mb-4">High-level overview of global sentiment and key trends.</p>
          <div className="flex items-center text-xs text-zinc-500">
            <Calendar className="w-3 h-3 mr-1" />
            Scheduled: Weekly (Monday)
          </div>
        </Card>

        <Card className="bg-zinc-900 border-zinc-800 text-white p-6 rounded-xl hover:border-zinc-700 transition-colors cursor-pointer group">
          <div className="flex items-start justify-between">
            <div className="h-10 w-10 bg-emerald-500/10 text-emerald-400 rounded-lg flex items-center justify-center group-hover:bg-emerald-500/20 transition-colors">
              <Database className="w-5 h-5" />
            </div>
            <Button variant="ghost" size="sm" className="text-zinc-400 hover:text-white">Configure</Button>
          </div>
          <h3 className="font-semibold text-lg mt-4 mb-1 text-white">Raw Data Export</h3>
          <p className="text-sm text-zinc-400 mb-4">Full dataset export containing indexed posts and scores.</p>
          <div className="flex items-center text-xs text-zinc-500">
            <Calendar className="w-3 h-3 mr-1" />
            Scheduled: Monthly (1st)
          </div>
        </Card>

        <Card className="bg-zinc-900 border-zinc-800 text-white p-6 rounded-xl bg-indigo-600/5 border-indigo-500/20">
          <div className="h-full flex flex-col justify-center items-center text-center">
            <div className="h-12 w-12 bg-zinc-800 rounded-full flex items-center justify-center mb-4 text-zinc-400">
              <Mail className="w-6 h-6" />
            </div>
            <h3 className="font-medium text-white mb-2">Automated Email Delivery</h3>
            <p className="text-sm text-zinc-400 mb-4">Send scheduled reports directly to stakeholders.</p>
            <Button variant="outline" className="w-full bg-zinc-900 border-zinc-700 text-white hover:bg-zinc-800">
              Manage Recipients
            </Button>
          </div>
        </Card>
      </div>

      <Card className="bg-zinc-900 border-zinc-800 text-white overflow-hidden">
        <CardHeader>
          <CardTitle>Recent Reports</CardTitle>
          <CardDescription className="text-zinc-400">History of manually generated and scheduled reports.</CardDescription>
        </CardHeader>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-zinc-400 uppercase bg-zinc-950/50 border-y border-zinc-800">
              <tr>
                <th className="px-6 py-4 font-medium">Report Name</th>
                <th className="px-6 py-4 font-medium">Format</th>
                <th className="px-6 py-4 font-medium">Generated On</th>
                <th className="px-6 py-4 font-medium">Size</th>
                <th className="px-6 py-4 font-medium text-right">Download</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/50">
              {mockReports.map((report) => (
                <tr key={report.id} className="hover:bg-zinc-800/20 transition-colors">
                  <td className="px-6 py-4 font-medium text-white flex items-center">
                    <FileText className="w-4 h-4 mr-3 text-zinc-500" />
                    {report.name}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      report.type === 'PDF' ? 'bg-rose-500/10 text-rose-500' :
                      report.type === 'Excel' ? 'bg-emerald-500/10 text-emerald-500' :
                      'bg-indigo-500/10 text-indigo-400'
                    }`}>
                      {report.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-zinc-400">{report.generated}</td>
                  <td className="px-6 py-4 text-zinc-500">{report.size}</td>
                  <td className="px-6 py-4 text-right">
                    <Button variant="ghost" size="sm" className="text-zinc-400 hover:text-white" title="Download Report">
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

