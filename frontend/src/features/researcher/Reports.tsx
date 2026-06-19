import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { FileText, Download, FileJson, Copy, Bookmark, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';

const mockReports = [
  { id: 'REP-2024-001', title: 'Quantitative Analysis of Sentiment Disparities Across Federal Universities', type: 'Cross-Sectional Study', date: '2024-06-15', format: 'PDF', size: '4.2 MB', citation: 'Kentola, K. (2024). Quantitative Analysis of Sentiment Disparities Across Federal Universities. Sentiment Hub. Retrieved from https://hub.sentiment/rep/2024-001' },
  { id: 'REP-2024-002', title: 'Longitudinal Impact of Policy Announcements on Student Union Discourse', type: 'Time-Series Analysis', date: '2024-05-28', format: 'PDF', size: '3.8 MB', citation: 'Kentola, K. (2024). Longitudinal Impact of Policy Announcements on Student Union Discourse. Sentiment Hub. Retrieved from https://hub.sentiment/rep/2024-002' },
  { id: 'REP-2024-003', title: 'Latent Dirichlet Allocation applied to Strike Mobilization Vectors', type: 'Topic Modelling', date: '2024-05-10', format: 'JSON', size: '12.4 MB', citation: 'Kentola, K. (2024). Latent Dirichlet Allocation applied to Strike Mobilization Vectors. Sentiment Hub. Retrieved from https://hub.sentiment/rep/2024-003' },
];

export default function Reports() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white flex items-center">
            Academic Reports & Citations
          </h1>
          <p className="text-zinc-400">Generate structured academic reports with standardized citation formats.</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Button variant="outline" className="bg-zinc-900 border-zinc-800 text-zinc-300 hover:bg-zinc-800 hover:text-white">
            <Bookmark className="mr-2 h-4 w-4" />
            Citation Style: APA 7th
          </Button>
          <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
            <FileText className="mr-2 h-4 w-4" />
            Generate New Report
          </Button>
        </div>
      </div>

      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-500" />
        <input 
          title="Search publications"
          placeholder="Search by title, author, or keywords..." 
          className="w-full bg-zinc-900 border border-zinc-800 rounded-lg pl-10 pr-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <div className="space-y-4">
        {mockReports.map((report) => (
          <Card key={report.id} className="bg-zinc-900 border-zinc-800 text-white hover:border-zinc-700 transition-colors">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-6 justify-between items-start md:items-center">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded text-xs font-mono bg-zinc-800 text-zinc-400 border border-zinc-700">
                      {report.id}
                    </span>
                    <span className={`px-2 py-0.5 rounded text-xs font-medium border ${report.format === 'PDF' ? 'bg-rose-500/10 text-rose-500 border-rose-500/20' : 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'}`}>
                      {report.format}
                    </span>
                    <span className="text-xs text-zinc-500">{report.size}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-white leading-tight">
                    {report.title}
                  </h3>
                  <p className="text-sm text-indigo-400">{report.type} &bull; Generated: {report.date}</p>
                </div>
                
                <div className="flex flex-col gap-2 w-full md:w-auto">
                  <Button variant="outline" className="bg-zinc-950 border-zinc-800 text-zinc-300 hover:bg-zinc-800 hover:text-white w-full md:w-auto justify-start md:justify-center">
                    <Copy className="mr-2 h-4 w-4" />
                    Copy Citation
                  </Button>
                  <Button className="bg-indigo-600 hover:bg-indigo-700 text-white w-full md:w-auto justify-start md:justify-center">
                    <Download className="mr-2 h-4 w-4" />
                    Download {report.format}
                  </Button>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-zinc-950 border border-zinc-800 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">APA Citation</span>
                </div>
                <p className="text-sm text-zinc-300 font-serif italic">
                  {report.citation}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
