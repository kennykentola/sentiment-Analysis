import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Plus, Users, Clock, FolderKanban } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ResearchProjects() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white flex items-center">
            Research Projects
          </h1>
          <p className="text-zinc-400">Manage your ongoing research projects and collaborate with peers.</p>
        </div>
        <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
          <Plus className="mr-2 h-4 w-4" />
          New Project
        </Button>
      </div>

      <div className="p-4 bg-indigo-500/10 border border-indigo-500/20 rounded-lg">
        <h2 className="text-sm font-semibold text-indigo-400 uppercase tracking-wide mb-1">System Core Context</h2>
        <p className="text-white font-medium">DESIGN AND IMPLEMENTATION OF A SENTIMENT ANALYSIS SYSTEM OF PUBLIC OPINIONS ON SCHOOL FEES HIKES IN NIGERIAN TERTIARY INSTITUTION</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="bg-zinc-900 border-zinc-800 text-white hover:border-zinc-700 transition-colors cursor-pointer">
          <CardHeader>
            <div className="flex items-center justify-between mb-2">
              <span className="px-2 py-0.5 rounded text-xs font-medium bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">Active</span>
              <Users className="h-4 w-4 text-zinc-500" />
            </div>
            <CardTitle className="text-lg">Fee Hike Baseline Study</CardTitle>
            <CardDescription className="text-zinc-400">Initial data gathering and qualitative overview of the primary problem space.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center text-xs text-zinc-500 mt-4">
              <Clock className="w-3 h-3 mr-1" /> Last updated: 2 hours ago
            </div>
          </CardContent>
        </Card>

        <Card className="bg-zinc-900 border-zinc-800 text-white hover:border-zinc-700 transition-colors cursor-pointer border-dashed">
          <CardContent className="h-full flex flex-col items-center justify-center p-6 min-h-[200px]">
            <div className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center mb-4">
              <FolderKanban className="h-6 w-6 text-zinc-400" />
            </div>
            <h3 className="font-medium text-zinc-300">Create Workspace</h3>
            <p className="text-sm text-zinc-500 text-center mt-1">Initialize a new isolated environment for your cohort.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
