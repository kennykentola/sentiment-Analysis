import { useState } from 'react';
import { Link } from 'react-router-dom';
import { account } from '@/services/appwrite';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AlertCircle, CheckCircle2 } from 'lucide-react';

export default function ForgotPassword() {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleReset = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;

    try {
      // In production, the URL must be a registered hostname in the Appwrite Console
      const resetUrl = `${window.location.origin}/auth/reset-password`;
      await account.createRecovery(email, resetUrl);
      setSuccess(true);
    } catch (err: any) {
      setError(err.message || 'Failed to send recovery email.');
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <div className="w-full text-center">
        <div className="flex justify-center mb-6">
          <div className="h-16 w-16 bg-emerald-500/20 text-emerald-500 rounded-full flex items-center justify-center">
            <CheckCircle2 size={32} />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-white mb-4">Check your email</h2>
        <p className="text-zinc-400 text-sm mb-8">
          We have sent a password recovery link to your email address. Please check your inbox and spam folder.
        </p>
        <Link to="/auth/login">
          <Button variant="outline" className="w-full border-zinc-800 text-zinc-300 hover:text-white bg-transparent hover:bg-zinc-900">
            Return to Login
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">Forgot Password?</h2>
        <p className="text-zinc-400 text-sm">Enter your email and we'll send you a link to reset your password.</p>
      </div>

      <form onSubmit={handleReset} className="space-y-6">
        {error && (
          <div className="bg-rose-500/10 border border-rose-500/50 p-3 rounded-md flex items-center text-rose-500 text-sm">
            <AlertCircle className="w-4 h-4 mr-2 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <div>
          <Label htmlFor="email" className="text-zinc-300">Email address</Label>
          <div className="mt-1">
            <Input id="email" name="email" type="email" required className="bg-zinc-950 border-zinc-800 text-white" />
          </div>
        </div>

        <div>
          <Button type="submit" disabled={isLoading} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white disabled:opacity-50">
            {isLoading ? 'Sending link...' : 'Send Recovery Link'}
          </Button>
        </div>
        
        <div className="text-center text-sm mt-6 text-zinc-400">
          Remember your password?{' '}
          <Link to="/auth/login" className="text-indigo-400 hover:text-indigo-300 transition-colors">
            Sign in
          </Link>
        </div>
      </form>
    </div>
  );
}
