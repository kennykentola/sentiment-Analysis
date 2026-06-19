import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Download, FileText, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

const reports = [
  { id: 1, title: 'Q1 2026 National University Sentiment Report', date: 'April 1, 2026', size: '2.4 MB', type: 'PDF' },
  { id: 2, title: 'Impact Analysis: May 15th Fee Adjustments', date: 'May 20, 2026', size: '1.1 MB', type: 'PDF' },
  { id: 3, title: 'South-West Geopolitical Zone Deep Dive', date: 'June 5, 2026', size: '3.5 MB', type: 'PDF' },
  { id: 4, title: 'Weekly Summary: Top Trending Topics', date: 'June 18, 2026', size: '0.8 MB', type: 'PDF' },
];

export default function PublicReports() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500 max-w-7xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-white mb-1">Generated Reports</h1>
        <p className="text-zinc-400">Download finalized executive summaries prepared by your Analyst and Researcher teams.</p>
      </div>

      <Card className="bg-zinc-900 border-zinc-800 text-white shadow-lg">
        <CardHeader>
          <CardTitle>Available Documents</CardTitle>
          <CardDescription className="text-zinc-400">All files are strictly for internal stakeholder review.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {reports.map((report) => (
              <div key={report.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-5 bg-zinc-950 border border-zinc-800 rounded-xl hover:border-zinc-700 transition-colors">
                <div className="flex items-start mb-4 sm:mb-0">
                  <div className="bg-rose-500/10 p-3 rounded-lg mr-4">
                    <FileText className="w-6 h-6 text-rose-500" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white text-lg">{report.title}</h4>
                    <div className="flex items-center text-sm text-zinc-500 mt-1 gap-3">
                      <span>{report.date}</span>
                      <span>&bull;</span>
                      <span>{report.size}</span>
                      <span>&bull;</span>
                      <span className="flex items-center text-emerald-500">
                        <CheckCircle2 className="w-3 h-3 mr-1" /> Validated
                      </span>
                    </div>
                  </div>
                </div>
                <Button className="bg-zinc-800 hover:bg-zinc-700 text-white border border-zinc-700 w-full sm:w-auto">
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
