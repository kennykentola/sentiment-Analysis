import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AlertCircle, Eye, EyeOff } from 'lucide-react';

export default function Login() {
  const { login } = useAuth();
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    try {
      await login(email, password);
      // Navigation is handled automatically by AuthLayout observing user state
    } catch (err: any) {
      setError(err.message || 'Invalid credentials');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleLogin} className="space-y-6">
      {error && (
        <div className="bg-rose-500/10 border border-rose-500/50 p-3 rounded-md flex items-center text-rose-500 text-sm">
          <AlertCircle className="w-4 h-4 mr-2 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}
      <div>
        <Label htmlFor="email" className="text-zinc-300">Email address</Label>
        <div className="mt-1">
          <Input id="email" name="email" type="email" required className="bg-zinc-950 border-zinc-800 text-white" defaultValue="peterkehindeademola@gmail.com" />
        </div>
      </div>
      <div>
        <Label htmlFor="password" className="text-zinc-300">Password</Label>
        <div className="relative mt-1">
          <Input 
            id="password" 
            name="password" 
            type={showPassword ? "text" : "password"} 
            required 
            className="bg-zinc-950 border-zinc-800 text-white pr-10" 
          />
          <button
            type="button"
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-zinc-400 hover:text-zinc-300"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
      </div>
      <div>
        <Button type="submit" disabled={isLoading} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white disabled:opacity-50">
          {isLoading ? 'Signing in...' : 'Sign in'}
        </Button>
      </div>
      
      <div className="flex items-center justify-between text-sm mt-6">
        <a href="/auth/forgot-password" className="text-indigo-400 hover:text-indigo-300 transition-colors">
          Forgot your password?
        </a>
        <a href="/auth/register" className="text-zinc-400 hover:text-white transition-colors">
          Create an account
        </a>
      </div>
    </form>
  );
}
