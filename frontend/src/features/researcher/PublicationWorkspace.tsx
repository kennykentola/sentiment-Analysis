import { useState } from 'react';
import { Save, FileText, Image as ImageIcon, Link, Bold, Italic, List } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function PublicationWorkspace() {
  const [content, setContent] = useState('# Title of the Study\n\nAbstract:\n\n...');

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col space-y-4 animate-in fade-in duration-500">
      
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">Publication Draft</h1>
          <p className="text-zinc-400">Write your paper and pin live charts.</p>
        </div>
        <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
          <Save className="mr-2" size={16} />
          Save Draft
        </Button>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6 overflow-hidden">
        
        {/* Editor Area */}
        <div className="lg:col-span-2 bg-zinc-900 border border-zinc-800 rounded-2xl flex flex-col overflow-hidden">
           <div className="flex items-center gap-2 p-3 border-b border-zinc-800 bg-zinc-950">
             <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-zinc-400 hover:text-white"><Bold size={16} /></Button>
             <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-zinc-400 hover:text-white"><Italic size={16} /></Button>
             <div className="w-px h-4 bg-zinc-800 mx-1"></div>
             <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-zinc-400 hover:text-white"><List size={16} /></Button>
             <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-zinc-400 hover:text-white"><Link size={16} /></Button>
             <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-zinc-400 hover:text-white"><ImageIcon size={16} /></Button>
           </div>
           <textarea 
             title="Publication Editor"
             placeholder="Start typing your draft..."
             className="flex-1 w-full p-6 bg-transparent border-none resize-none text-zinc-300 focus:outline-none focus:ring-0 leading-relaxed font-mono text-sm"
             value={content}
             onChange={(e) => setContent(e.target.value)}
           />
        </div>

        {/* Pinned Charts Sidebar */}
        <div className="lg:col-span-1 bg-zinc-900 border border-zinc-800 rounded-2xl p-6 overflow-y-auto">
           <div className="flex items-center gap-2 mb-6">
              <FileText className="text-indigo-400" size={20} />
              <h3 className="text-lg font-semibold text-white">Pinned Assets</h3>
           </div>
           
           <div className="space-y-4">
              <div className="p-4 border border-zinc-800 rounded-xl bg-zinc-950">
                <div className="h-24 bg-zinc-900 rounded-lg flex items-center justify-center text-zinc-600 text-xs font-mono mb-3 border border-dashed border-zinc-700">
                   [ Sentiment Evolution Area Chart ]
                </div>
                <p className="text-xs font-medium text-zinc-300">Sentiment Evolution (Jan - Jul)</p>
                <div className="flex gap-2 mt-3">
                   <Button variant="outline" size="sm" className="h-7 text-xs bg-transparent border-zinc-700 text-zinc-400">Insert Ref</Button>
                </div>
              </div>

              <div className="p-4 border border-zinc-800 rounded-xl bg-zinc-950">
                <div className="h-24 bg-zinc-900 rounded-lg flex items-center justify-center text-zinc-600 text-xs font-mono mb-3 border border-dashed border-zinc-700">
                   [ University Radar Chart ]
                </div>
                <p className="text-xs font-medium text-zinc-300">University Matrix</p>
                <div className="flex gap-2 mt-3">
                   <Button variant="outline" size="sm" className="h-7 text-xs bg-transparent border-zinc-700 text-zinc-400">Insert Ref</Button>
                </div>
              </div>
           </div>
        </div>

      </div>
    </div>
  );
}
