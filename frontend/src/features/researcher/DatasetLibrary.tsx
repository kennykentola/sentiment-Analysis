import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Database, Download, FileJson, FileSpreadsheet, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function DatasetLibrary() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white flex items-center">
            Dataset Library
          </h1>
          <p className="text-zinc-400">Access raw, pre-processed, and annotated datasets for offline analysis.</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
            <Database className="mr-2 h-4 w-4" />
            Upload Dataset
          </Button>
        </div>
      </div>

      <div className="p-4 bg-indigo-500/10 border border-indigo-500/20 rounded-lg">
        <h2 className="text-sm font-semibold text-indigo-400 uppercase tracking-wide mb-1">System Core Context</h2>
        <p className="text-white font-medium">DESIGN AND IMPLEMENTATION OF A SENTIMENT ANALYSIS SYSTEM OF PUBLIC OPINIONS ON SCHOOL FEES HIKES IN NIGERIAN TERTIARY INSTITUTION</p>
      </div>

      <Card className="bg-zinc-900 border-zinc-800 text-white">
        <CardHeader>
          <CardTitle>Available Data Sources</CardTitle>
          <CardDescription className="text-zinc-400">Validated data aggregates prepared for academic export.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-zinc-950 border border-zinc-800 rounded-lg">
              <div>
                <h4 className="font-medium text-white mb-1">Primary Corpus (X & Facebook)</h4>
                <p className="text-sm text-zinc-400">124,500 records &bull; Verified</p>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="bg-zinc-900 border-zinc-700 text-zinc-300">
                  <FileJson className="w-4 h-4 mr-2 text-amber-500" /> JSON
                </Button>
                <Button size="sm" variant="outline" className="bg-zinc-900 border-zinc-700 text-zinc-300">
                  <FileSpreadsheet className="w-4 h-4 mr-2 text-emerald-500" /> CSV
                </Button>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-zinc-950 border border-zinc-800 rounded-lg">
              <div>
                <h4 className="font-medium text-white mb-1">Annotated Sentiment Training Set</h4>
                <p className="text-sm text-zinc-400">10,000 records &bull; Ground Truth</p>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="bg-zinc-900 border-zinc-700 text-zinc-300">
                  <FileJson className="w-4 h-4 mr-2 text-amber-500" /> JSON
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
