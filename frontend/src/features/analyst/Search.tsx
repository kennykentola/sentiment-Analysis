import { Card, CardContent } from '@/components/ui/card';
import { Search as SearchIcon, Filter, Calendar, Download, MoreHorizontal, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';

const mockResults = [
  { id: 'POST-10492', platform: 'Twitter', text: 'The new #OAU tuition fees are outrageous. How do they expect students from average homes to pay 150k? We need the student union to act now. #FeesMustFall', sentiment: 'negative', score: -0.85, date: '2024-06-18 14:32', author: '@student_voice' },
  { id: 'POST-10493', platform: 'Nairaland', text: 'I understand the economic reality of the country, but increasing UNILAG fees by 300% without student loans is crazy.', sentiment: 'negative', score: -0.65, date: '2024-06-18 12:15', author: 'NaijaIntel' },
  { id: 'POST-10494', platform: 'Facebook', text: 'Finally got the federal student loan approved! This will really help cushion the effect of the new tuition structure.', sentiment: 'positive', score: 0.75, date: '2024-06-17 09:45', author: 'Adekunle B.' },
  { id: 'POST-10495', platform: 'Twitter', text: 'Are the universities even using this money to upgrade facilities? The hostels are still in terrible conditions.', sentiment: 'negative', score: -0.90, date: '2024-06-17 08:20', author: '@campus_watch' },
];

export default function Search() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">Advanced Search</h1>
          <p className="text-zinc-400">Query and filter the entire social sentiment dataset.</p>
        </div>
        <Button variant="outline" className="bg-zinc-900 border-zinc-800 text-zinc-300 hover:bg-zinc-800 hover:text-white">
          <Download className="mr-2 h-4 w-4" />
          Export Results
        </Button>
      </div>

      <Card className="bg-zinc-900 border-zinc-800 p-2">
        <div className="flex flex-col md:flex-row gap-2">
          <div className="relative flex-1">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-500" />
            <input 
              type="text" 
              placeholder="Search keywords, hashtags, or phrases (e.g., 'student loan', '#FeesMustFall')..." 
              className="w-full pl-10 pr-4 py-3 bg-zinc-950 border border-zinc-800 rounded-md text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <Button className="py-3 px-6 bg-zinc-800 hover:bg-zinc-700 text-white border border-zinc-700 h-auto">
            <Filter className="mr-2 h-4 w-4" />
            Filters
          </Button>
          <Button className="py-3 px-8 bg-indigo-600 hover:bg-indigo-700 text-white h-auto font-medium">
            Search
          </Button>
        </div>
        
        <div className="flex flex-wrap gap-2 mt-3 px-2 pb-2">
          <span className="text-xs text-zinc-500 font-medium uppercase tracking-wider flex items-center mr-2">Quick Filters:</span>
          <span className="px-3 py-1 bg-zinc-800 text-zinc-300 rounded-full text-xs cursor-pointer hover:bg-zinc-700 transition-colors">Hashtag: #OAU</span>
          <span className="px-3 py-1 bg-rose-500/10 text-rose-400 border border-rose-500/20 rounded-full text-xs cursor-pointer hover:bg-rose-500/20 transition-colors">Sentiment: Negative</span>
          <span className="px-3 py-1 bg-zinc-800 text-zinc-300 rounded-full text-xs cursor-pointer hover:bg-zinc-700 transition-colors flex items-center"><Calendar className="w-3 h-3 mr-1"/> Last 7 Days</span>
        </div>
      </Card>

      <div className="flex items-center justify-between text-sm text-zinc-400 px-1">
        <p>Showing <span className="text-white font-medium">4</span> results for your query (0.042 seconds)</p>
        <div className="flex gap-2">
          <span>Sort by:</span>
          <select title="Sort results" className="bg-transparent text-white border-b border-zinc-700 focus:outline-none cursor-pointer">
            <option>Relevance</option>
            <option>Date (Newest)</option>
            <option>Sentiment (Lowest)</option>
          </select>
        </div>
      </div>

      <div className="space-y-4">
        {mockResults.map((post) => (
          <Card key={post.id} className="bg-zinc-900 border-zinc-800 text-white hover:border-zinc-700 transition-colors">
            <CardContent className="p-5">
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center font-bold text-zinc-400">
                    {post.author.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-medium text-white text-sm">{post.author}</p>
                    <p className="text-xs text-zinc-500">{post.platform} • {post.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                    post.sentiment === 'positive' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 
                    post.sentiment === 'negative' ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20' : 
                    'bg-zinc-500/10 text-zinc-400 border border-zinc-500/20'
                  }`}>
                    Score: {post.score}
                  </span>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-500 hover:text-white">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              
              <p className="text-zinc-300 text-sm leading-relaxed mb-4">
                {/* Highlight mock keywords */}
                {post.text.split(' ').map((word, i) => {
                  if (word.startsWith('#') || word.toLowerCase().includes('fees') || word.toLowerCase().includes('loan')) {
                    return <span key={i} className="text-indigo-400 font-medium">{word} </span>;
                  }
                  return word + ' ';
                })}
              </p>
              
              <div className="flex gap-4 pt-3 border-t border-zinc-800/50">
                <button className="flex items-center text-xs text-zinc-500 hover:text-zinc-300 transition-colors">
                  <MessageSquare className="w-4 h-4 mr-1.5" />
                  View Original Thread
                </button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="flex justify-center pt-4">
        <Button variant="outline" className="bg-zinc-900 border-zinc-800 text-zinc-400 hover:bg-zinc-800 hover:text-white">
          Load More Results
        </Button>
      </div>
    </div>
  );
}
