import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Ghost, Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full bg-zinc-950 flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background Neon Glow */}
      <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
        <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#3b82f6] to-[#8b5cf6] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"></div>
      </div>
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 z-0 pointer-events-none"></div>

      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-2xl">
        {/* Animated Ghost Icon */}
        <div className="relative mb-8 animate-bounce">
          <div className="absolute -inset-4 bg-indigo-500/30 blur-xl rounded-full"></div>
          <Ghost size={120} className="text-indigo-400 relative z-10 animate-pulse" />
        </div>

        {/* 404 Text */}
        <h1 className="text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400 mb-4 tracking-tighter">
          404
        </h1>
        <h2 className="text-3xl font-bold text-white mb-6">
          Lost in the Data Void
        </h2>
        <p className="text-lg text-zinc-400 mb-10 leading-relaxed max-w-lg">
          It looks like the page you are looking for has been moved, deleted, or never existed in the first place. Don't worry, the sentiment is still positive!
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center">
          <Button 
            onClick={() => navigate(-1)}
            variant="outline"
            className="border-zinc-700 hover:bg-zinc-800 text-zinc-300 gap-2 h-12 px-6 rounded-full"
          >
            <ArrowLeft size={18} />
            Go Back
          </Button>
          
          <Link to="/">
            <Button className="bg-indigo-600 hover:bg-indigo-700 text-white gap-2 h-12 px-8 rounded-full shadow-[0_0_20px_rgba(79,70,229,0.3)] w-full sm:w-auto">
              <Home size={18} />
              Return Home
            </Button>
          </Link>
        </div>
      </div>
      
      {/* Floating Particles (CSS Animation) */}
      <div className="absolute bottom-10 left-10 w-4 h-4 rounded-full bg-cyan-500/20 blur-sm animate-[ping_3s_ease-in-out_infinite]"></div>
      <div className="absolute top-20 right-20 w-6 h-6 rounded-full bg-indigo-500/20 blur-sm animate-[ping_4s_ease-in-out_infinite_1s]"></div>
      <div className="absolute bottom-40 right-40 w-3 h-3 rounded-full bg-rose-500/20 blur-sm animate-[ping_2s_ease-in-out_infinite_0.5s]"></div>
    </div>
  );
}
