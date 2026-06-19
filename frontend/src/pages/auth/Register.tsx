import { useState, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { account, storage } from '@/services/appwrite';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AlertCircle, Upload, Eye, EyeOff } from 'lucide-react';
import { ID } from 'appwrite';

export default function Register() {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState('');
  const [accountType, setAccountType] = useState<'viewer' | 'professional'>('viewer');
  const [showPassword, setShowPassword] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
    }
  };

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    const formData = new FormData(e.currentTarget);
    const firstName = formData.get('firstName') as string;
    const middleName = formData.get('middleName') as string;
    const lastName = formData.get('lastName') as string;
    const name = `${firstName} ${middleName} ${lastName}`.replace(/\s+/g, ' ').trim();
    
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    try {
      let fileId = null;
      let prefs: any = { 
        kyc_status: 'not_required',
        firstName,
        middleName,
        lastName
      };

      if (accountType === 'professional') {
        const institution = formData.get('institution') as string;
        const requestedRole = formData.get('requestedRole') as string;
        const idFile = fileInputRef.current?.files?.[0];

        if (!idFile) {
          throw new Error("Please upload a valid Institutional ID Card.");
        }

        // 1. Upload ID card to secure Appwrite Storage Bucket
        const fileUpload = await storage.createFile(
          'id_verification', 
          ID.unique(), 
          idFile
        );
        fileId = fileUpload.$id;
        
        prefs = {
          ...prefs,
          institution,
          requestedRole,
          id_file_id: fileId,
          kyc_status: 'pending' // Will be reviewed by super_admin
        };
      }

      // 2. Create the user account in Appwrite
      await account.create(ID.unique(), email, password, name);
      
      // 3. Log them in to set session
      await account.createEmailPasswordSession(email, password);

      // 4. Save their KYC data in Appwrite User Preferences
      await account.updatePrefs(prefs);
      
      // 5. Navigate to the app zone
      navigate('/app');
      
    } catch (err: any) {
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">Create an account</h2>
        <p className="text-zinc-400 text-sm">Join the leading platform for educational sentiment analysis.</p>
      </div>

      <form onSubmit={handleRegister} className="space-y-4">
        {error && (
          <div className="bg-rose-500/10 border border-rose-500/50 p-3 rounded-md flex items-center text-rose-500 text-sm">
            <AlertCircle className="w-4 h-4 mr-2 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}
        
        {/* Account Type Selector */}
        <div>
          <Label className="text-zinc-300 mb-2 block">Account Type</Label>
          <div className="flex bg-zinc-950 p-1 rounded-lg border border-zinc-800">
            <button
              type="button"
              className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors ${accountType === 'viewer' ? 'bg-indigo-600 text-white' : 'text-zinc-400 hover:text-zinc-200'}`}
              onClick={() => setAccountType('viewer')}
            >
              Standard Viewer
            </button>
            <button
              type="button"
              className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors ${accountType === 'professional' ? 'bg-indigo-600 text-white' : 'text-zinc-400 hover:text-zinc-200'}`}
              onClick={() => setAccountType('professional')}
            >
              Institutional Professional
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="firstName" className="text-zinc-300">First Name</Label>
            <Input id="firstName" name="firstName" type="text" required className="mt-1 bg-zinc-950 border-zinc-800 text-white" />
          </div>
          <div>
            <Label htmlFor="middleName" className="text-zinc-300">Middle Name</Label>
            <Input id="middleName" name="middleName" type="text" className="mt-1 bg-zinc-950 border-zinc-800 text-white" />
          </div>
          <div>
            <Label htmlFor="lastName" className="text-zinc-300">Last Name</Label>
            <Input id="lastName" name="lastName" type="text" required className="mt-1 bg-zinc-950 border-zinc-800 text-white" />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4">
          <div>
            <Label htmlFor="email" className="text-zinc-300">Email Address</Label>
            <Input id="email" name="email" type="email" required className="mt-1 bg-zinc-950 border-zinc-800 text-white" />
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

        {/* Dynamic Fields for Professional Account */}
        {accountType === 'professional' && (
          <div className="animate-in fade-in slide-in-from-top-2 duration-300">
            <div className="grid grid-cols-2 gap-4 border-t border-zinc-800 pt-4 mt-4">
              <div>
                <Label htmlFor="institution" className="text-zinc-300">Institution</Label>
                <Input id="institution" name="institution" placeholder="e.g. NISER" required={accountType === 'professional'} className="mt-1 bg-zinc-950 border-zinc-800 text-white" />
              </div>
              <div>
                <Label htmlFor="requestedRole" className="text-zinc-300">Official Role</Label>
                <Input id="requestedRole" name="requestedRole" placeholder="e.g. Lead Researcher" required={accountType === 'professional'} className="mt-1 bg-zinc-950 border-zinc-800 text-white" />
              </div>
            </div>

            <div className="pt-4">
              <Label className="text-zinc-300 block mb-2">Institutional ID Verification</Label>
              <div className="border-2 border-dashed border-zinc-700 rounded-lg p-6 flex flex-col items-center justify-center bg-zinc-950/50 hover:bg-zinc-900/50 transition-colors cursor-pointer" onClick={() => fileInputRef.current?.click()}>
                <Upload className="h-8 w-8 text-indigo-400 mb-2" />
                <p className="text-sm font-medium text-white text-center">
                  {fileName ? fileName : 'Upload official ID card'}
                </p>
                <p className="text-xs text-zinc-500 mt-1">JPEG, PNG, or PDF up to 5MB</p>
                <input 
                  title="ID Card File Upload"
                  type="file" 
                  ref={fileInputRef} 
                  className="hidden" 
                  accept=".jpg,.jpeg,.png,.pdf" 
                  onChange={handleFileChange}
                  required={accountType === 'professional'}
                />
              </div>
            </div>
          </div>
        )}

        <div className="pt-4">
          <Button type="submit" disabled={isLoading} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white disabled:opacity-50">
            {isLoading ? 'Processing Registration...' : 'Create Account'}
          </Button>
        </div>
        
        <div className="text-center text-sm mt-4 text-zinc-400">
          Already have an account?{' '}
          <Link to="/auth/login" className="text-indigo-400 hover:text-indigo-300 transition-colors">
            Sign in instead
          </Link>
        </div>
      </form>
    </div>
  );
}
