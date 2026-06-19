import { Construction, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface PlaceholderPageProps {
  title: string;
  description: string;
}

export default function PlaceholderPage({ title, description }: PlaceholderPageProps) {
  const navigate = useNavigate();

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col items-center justify-center animate-in fade-in zoom-in-95 duration-500">
      <div className="bg-zinc-900 border border-zinc-800 p-10 rounded-2xl max-w-md w-full text-center shadow-xl">
        <div className="h-20 w-20 bg-indigo-500/10 rounded-full flex items-center justify-center mx-auto mb-6 text-indigo-400 ring-8 ring-zinc-950/50">
          <Construction size={32} />
        </div>
        
        <h1 className="text-2xl font-bold tracking-tight text-white mb-3">{title}</h1>
        <p className="text-zinc-400 mb-8 leading-relaxed text-sm">
          {description}
        </p>
        
        <div className="flex flex-col gap-3">
          <Button 
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
            onClick={() => window.history.back()}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Go Back
          </Button>
        </div>
      </div>
    </div>
  );
}
