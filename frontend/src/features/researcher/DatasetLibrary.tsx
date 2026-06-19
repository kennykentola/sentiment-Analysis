import { useState } from 'react';
import { Download, Database, Filter, Loader2, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { account } from '@/services/appwrite';

export default function DatasetLibrary() {
  const [sentiment, setSentiment] = useState('');
  const [source, setSource] = useState('');
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async () => {
    setIsExporting(true);
    try {
      const session = await account.createJWT();
      
      const queryParams = new URLSearchParams();
      if (sentiment) queryParams.append('sentiment', sentiment);
      if (source) queryParams.append('source', source);
      
      const response = await fetch(`http://localhost:8000/api/v1/datasets/export?${queryParams.toString()}`, {
        headers: { 'x-appwrite-jwt': session.jwt }
      });
      
      if (!response.ok) throw new Error("Failed to export dataset");
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `sentiment_export_${new Date().getTime()}.csv`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error(error);
      alert("Error exporting dataset. Please try again.");
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2 text-white flex items-center gap-3">
          Dataset Library & Export Center
        </h1>
        <p className="text-zinc-400">Build custom queries and download deep NLP slices for offline analysis.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Query Builder Sidebar */}
        <div className="lg:col-span-1 bg-zinc-900 border border-zinc-800 p-6 rounded-2xl flex flex-col h-fit">
          <div className="flex items-center gap-2 mb-6 border-b border-zinc-800 pb-4">
            <Filter className="text-indigo-400" size={20} />
            <h3 className="text-lg font-semibold text-white">Query Builder</h3>
          </div>
          
          <div className="space-y-6 flex-1">
            {/* Sentiment Filter */}
            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-2">Sentiment Classification</label>
              <select 
                title="Sentiment Classification"
                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-3 text-sm text-zinc-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={sentiment}
                onChange={(e) => setSentiment(e.target.value)}
              >
                <option value="">All Sentiments</option>
                <option value="positive">Positive</option>
                <option value="negative">Negative</option>
                <option value="neutral">Neutral</option>
              </select>
            </div>

            {/* Platform Filter */}
            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-2">Social Source</label>
              <select 
                title="Social Source"
                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-3 text-sm text-zinc-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={source}
                onChange={(e) => setSource(e.target.value)}
              >
                <option value="">All Platforms</option>
                <option value="twitter">Twitter / X</option>
                <option value="facebook">Facebook</option>
                <option value="nairaland">Nairaland</option>
              </select>
            </div>
            
            {/* Date Range (Visual mock for MVP) */}
            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-2">Date Range</label>
              <div className="flex items-center gap-2">
                 <div className="w-full relative">
                    <Calendar className="absolute left-3 top-3 text-zinc-500" size={16} />
                    <input type="text" placeholder="Start Date" disabled className="w-full bg-zinc-950 border border-zinc-800 rounded-lg pl-10 p-3 text-sm text-zinc-500 cursor-not-allowed" />
                 </div>
                 <span className="text-zinc-600">-</span>
                 <div className="w-full relative">
                    <Calendar className="absolute left-3 top-3 text-zinc-500" size={16} />
                    <input type="text" placeholder="End Date" disabled className="w-full bg-zinc-950 border border-zinc-800 rounded-lg pl-10 p-3 text-sm text-zinc-500 cursor-not-allowed" />
                 </div>
              </div>
            </div>
          </div>
          
          <div className="mt-8 pt-6 border-t border-zinc-800">
             <Button 
               onClick={handleExport}
               disabled={isExporting}
               className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-6"
             >
               {isExporting ? (
                 <>
                  <Loader2 className="animate-spin mr-2" size={20} />
                  Compiling Dataset...
                 </>
               ) : (
                 <>
                  <Download className="mr-2" size={20} />
                  Download CSV
                 </>
               )}
             </Button>
          </div>
        </div>

        {/* Info Area */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl">
             <div className="flex items-center gap-3 mb-4">
                <div className="h-10 w-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-400">
                  <Database size={20} />
                </div>
                <div>
                   <h3 className="text-lg font-semibold text-white">Live Appwrite Integration</h3>
                   <p className="text-sm text-zinc-400">Direct pipeline to unstructured NoSQL collections</p>
                </div>
             </div>
             <p className="text-zinc-300 leading-relaxed text-sm">
                When you click download, the export engine streams data directly from the live `SocialMediaPosts` and `SentimentResults` collections.
                The backend performs a server-side join mapping raw post text to its machine-learning inferred sentiment label and confidence score.
                This ensures you always get the latest data without waiting for overnight ETL batches.
             </p>
          </div>
        </div>
      </div>
    </div>
  );
}
