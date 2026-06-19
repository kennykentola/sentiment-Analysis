import { useRouteError, isRouteErrorResponse, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { AlertCircle } from 'lucide-react';

export default function ErrorBoundary() {
  const error = useRouteError();
  
  let errorMessage = "An unexpected error occurred.";
  let errorCode = "500";

  if (isRouteErrorResponse(error)) {
    errorCode = error.status.toString();
    errorMessage = error.status === 404 
      ? "The page you are looking for does not exist." 
      : error.statusText;
  } else if (error instanceof Error) {
    errorMessage = error.message;
  }

  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center p-4">
      <div className="text-center space-y-6 max-w-md">
        <div className="flex justify-center">
          <div className="h-20 w-20 bg-rose-500/10 rounded-full flex items-center justify-center">
            <AlertCircle className="h-10 w-10 text-rose-500" />
          </div>
        </div>
        <h1 className="text-4xl font-extrabold text-white tracking-tight">{errorCode}</h1>
        <p className="text-zinc-400 text-lg">{errorMessage}</p>
        <div className="pt-4">
          <Link to="/">
            <Button className="bg-indigo-600 hover:bg-indigo-700 text-white px-8">
              Return Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
