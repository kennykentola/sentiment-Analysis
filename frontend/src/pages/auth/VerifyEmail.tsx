import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { account } from '@/services/appwrite';
import { Button } from '@/components/ui/button';
import { AlertCircle, CheckCircle2, Loader2 } from 'lucide-react';

export default function VerifyEmail() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const verify = async () => {
      const userId = searchParams.get('userId');
      const secret = searchParams.get('secret');

      if (!userId || !secret) {
        setStatus('error');
        setErrorMessage('Invalid or missing verification link.');
        return;
      }

      try {
        await account.updateVerification(userId, secret);
        setStatus('success');
        // Optional: auto-redirect after success
        // setTimeout(() => navigate('/app'), 3000);
      } catch (err: any) {
        setStatus('error');
        setErrorMessage(err.message || 'Verification failed. The link might be expired.');
      }
    };

    verify();
  }, [searchParams, navigate]);

  return (
    <div className="w-full text-center">
      {status === 'loading' && (
        <div className="flex flex-col items-center justify-center">
          <Loader2 className="w-12 h-12 text-indigo-500 animate-spin mb-4" />
          <h2 className="text-xl font-bold text-white">Verifying your email...</h2>
        </div>
      )}

      {status === 'success' && (
        <div className="flex flex-col items-center justify-center">
          <div className="h-16 w-16 bg-emerald-500/20 text-emerald-500 rounded-full flex items-center justify-center mb-6">
            <CheckCircle2 size={32} />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Email Verified!</h2>
          <p className="text-zinc-400 mb-8">Thank you for verifying your email address. Your account is now fully active.</p>
          <Link to="/app">
            <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white">
              Go to Dashboard
            </Button>
          </Link>
        </div>
      )}

      {status === 'error' && (
        <div className="flex flex-col items-center justify-center">
          <div className="h-16 w-16 bg-rose-500/20 text-rose-500 rounded-full flex items-center justify-center mb-6">
            <AlertCircle size={32} />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Verification Failed</h2>
          <p className="text-zinc-400 mb-8">{errorMessage}</p>
          <Link to="/auth/login">
            <Button variant="outline" className="w-full border-zinc-800 text-zinc-300 hover:text-white bg-transparent hover:bg-zinc-900">
              Return to Login
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}
