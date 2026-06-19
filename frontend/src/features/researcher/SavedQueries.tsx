import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Save, Terminal, Play, Edit2, Trash2, Database, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';

const mockQueries = [
  { id: 1, name: 'South-West High Polarity Strike Posts', language: 'MongoDB Query', lastRun: '2 hours ago', count: 12450, query: 'db.posts.find({ \n  region: "South West", \n  sentiment_score: { $lt: -50 },\n  keywords: { $in: ["strike", "asuu", "protest"] }\n})' },
  { id: 2, name: 'Federal vs State Fee Mentions', language: 'SQL', lastRun: '1 day ago', count: 48200, query: 'SELECT university_type, AVG(sentiment_score)\nFROM corpus_data\nWHERE text LIKE "%fee hike%"\nGROUP BY university_type;' },
  { id: 3, name: 'P-Value Significance for UNIBEN', language: 'Python (Pandas)', lastRun: '3 days ago', count: 1250, query: 'stats.ttest_ind(\n  df[df["uni"] == "UNIBEN"]["sentiment"],\n  df[df["uni"] == "OAU"]["sentiment"]\n)' },
];

export default function SavedQueries() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white flex items-center">
            Query Library
          </h1>
          <p className="text-zinc-400">Save, manage, and execute complex database queries for dataset generation.</p>
        </div>
        <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
          <Terminal className="mr-2 h-4 w-4" />
          New Query
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {mockQueries.map((q) => (
          <Card key={q.id} className="bg-zinc-900 border-zinc-800 text-white flex flex-col hover:border-zinc-700 transition-colors">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start mb-2">
                <span className="px-2 py-0.5 rounded text-xs font-mono bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                  {q.language}
                </span>
                <div className="flex items-center text-zinc-500 hover:text-white transition-colors cursor-pointer">
                  <Edit2 className="h-4 w-4 mr-2" />
                  <Trash2 className="h-4 w-4 hover:text-rose-500 transition-colors" />
                </div>
              </div>
              <CardTitle className="text-lg">{q.name}</CardTitle>
              <CardDescription className="flex items-center text-zinc-400 mt-2">
                <Clock className="w-3 h-3 mr-1" /> Last run: {q.lastRun}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col">
              <div className="bg-zinc-950 p-3 rounded-md border border-zinc-800 mb-4 flex-1 overflow-x-auto">
                <pre className="text-xs font-mono text-zinc-300 leading-relaxed whitespace-pre-wrap">
                  {q.query}
                </pre>
              </div>
              
              <div className="flex items-center justify-between pt-2 border-t border-zinc-800/50 mt-auto">
                <div className="flex items-center text-xs text-zinc-500">
                  <Database className="w-3 h-3 mr-1" />
                  Yield: {q.count.toLocaleString()} docs
                </div>
                <Button size="sm" variant="outline" className="bg-emerald-500/10 border-emerald-500/20 text-emerald-500 hover:bg-emerald-500 hover:text-white">
                  <Play className="w-3 h-3 mr-2" />
                  Execute
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
