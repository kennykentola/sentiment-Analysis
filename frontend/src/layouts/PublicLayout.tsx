
import { Outlet, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export function PublicLayout() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-300 flex flex-col selection:bg-indigo-500/30">
      {/* Navigation Bar */}
      <header className="sticky top-0 z-50 w-full border-b border-zinc-800 bg-zinc-950/80 backdrop-blur supports-[backdrop-filter]:bg-zinc-950/60">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2">
              <span className="font-bold text-xl tracking-tight text-white">
                Sentiment<span className="text-indigo-500">Hub</span>
              </span>
            </Link>
            
            <nav className="hidden md:flex gap-6 text-sm font-medium text-zinc-400">
              <Link to="/about" className="hover:text-white transition-colors">About</Link>
              <Link to="/features" className="hover:text-white transition-colors">Features</Link>
              <Link to="/pricing" className="hover:text-white transition-colors">Pricing</Link>
              <Link to="/docs" className="hover:text-white transition-colors">Docs</Link>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <Link to="/auth/login" className="text-sm font-medium text-zinc-300 hover:text-white hidden md:block">
              Log in
            </Link>
            <Link to="/auth/register">
              <Button className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-full px-6">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col">
        <Outlet />
      </main>

      {/* Footer Design */}
      <footer className="border-t border-zinc-800 bg-zinc-950 pt-16 pb-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div>
              <h3 className="text-white font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-sm text-zinc-400">
                <li><Link to="/features" className="hover:text-white">Features</Link></li>
                <li><Link to="/pricing" className="hover:text-white">Pricing</Link></li>
                <li><Link to="/docs" className="hover:text-white">API Documentation</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-sm text-zinc-400">
                <li><Link to="/about" className="hover:text-white">About Us</Link></li>
                <li><Link to="/contact" className="hover:text-white">Contact</Link></li>
                <li><Link to="/careers" className="hover:text-white">Careers</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-sm text-zinc-400">
                <li><Link to="/privacy" className="hover:text-white">Privacy Policy</Link></li>
                <li><Link to="/terms" className="hover:text-white">Terms of Service</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Connect</h3>
              <ul className="space-y-2 text-sm text-zinc-400">
                <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-white">Twitter / X</a></li>
                <li><a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-white">GitHub</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-zinc-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-zinc-500">
            <p>© {new Date().getFullYear()} SentimentHub. Built for Nigerian Higher Education.</p>
            <p className="mt-4 md:mt-0">Enterprise-grade NLP architecture.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
