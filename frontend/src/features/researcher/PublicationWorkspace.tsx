import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { FileText, BookOpen, ExternalLink, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function PublicationWorkspace() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white flex items-center">
            Publication Workspace
          </h1>
          <p className="text-zinc-400">Draft, format, and organize manuscripts intended for peer review.</p>
        </div>
        <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
          <Plus className="mr-2 h-4 w-4" />
          New Draft
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="bg-zinc-900 border-zinc-800 text-white lg:col-span-2">
          <CardHeader>
            <CardTitle>Recent Drafts</CardTitle>
            <CardDescription className="text-zinc-400">Work in progress</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start p-4 bg-zinc-950 border border-zinc-800 rounded-lg">
              <FileText className="w-8 h-8 text-indigo-500 mr-4 mt-1" />
              <div className="flex-1">
                <h3 className="font-semibold text-white">Analysis of Tuition Policy Communication</h3>
                <p className="text-sm text-zinc-400 mt-1 line-clamp-2">
                  This paper examines the immediate sentiment backlash following the simultaneous announcement of fee hikes across three major federal universities...
                </p>
                <div className="flex items-center gap-4 mt-3 text-xs text-zinc-500 font-mono">
                  <span>Last edited: Yesterday</span>
                  <span>Word count: 4,250</span>
                </div>
              </div>
              <Button variant="ghost" size="sm" className="text-zinc-400 hover:text-white ml-2">
                Continue
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-zinc-900 border-zinc-800 text-white">
          <CardHeader>
            <CardTitle>Journal Targets</CardTitle>
            <CardDescription className="text-zinc-400">Tracked submissions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-3 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center justify-between">
              <div className="flex items-center">
                <BookOpen className="w-4 h-4 text-emerald-500 mr-3" />
                <span className="text-sm font-medium">Journal of African Higher Education</span>
              </div>
              <ExternalLink className="w-3 h-3 text-zinc-500 cursor-pointer hover:text-white" />
            </div>
            <div className="p-3 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center justify-between opacity-70">
              <div className="flex items-center">
                <BookOpen className="w-4 h-4 text-amber-500 mr-3" />
                <span className="text-sm font-medium">Educational Policy Analysis Archives</span>
              </div>
              <ExternalLink className="w-3 h-3 text-zinc-500 cursor-pointer hover:text-white" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
