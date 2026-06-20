import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ShieldCheck, UserCheck, Search, Image as ImageIcon, CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { storage } from '@/services/appwrite';
import { UsersAPI } from '@/services/api';

export default function UserManagement() {
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIdUrl, setSelectedIdUrl] = useState<string | null>(null);

  const { data: usersData, isLoading } = useQuery({
    queryKey: ['adminUsers'],
    queryFn: UsersAPI.getUsers,
  });

  const mutation = useMutation({
    mutationFn: (variables: { userId: string, role: string }) => UsersAPI.updateUserRole(variables.userId, variables.role),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminUsers'] });
    }
  });

  const handleApprove = (userId: string, requestedRole: string) => {
    mutation.mutate({ userId, role: requestedRole || 'researcher' });
  };

  const handleViewId = async (fileId: string) => {
    try {
      const result = storage.getFileView(
        import.meta.env.VITE_APPWRITE_BUCKET_ID || 'sentiment', 
        fileId
      );
      setSelectedIdUrl(result.toString());
    } catch (error) {
      console.error("Failed to load ID image", error);
    }
  };

  const usersList = usersData?.users || [];
  
  const pendingUsers = usersList.filter((u: any) => u.prefs?.kyc_status === 'pending');
  const activeUsers = usersList.filter((u: any) => u.prefs?.kyc_status !== 'pending');

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white flex items-center gap-2">
            <UserCheck className="text-indigo-500" size={28} /> User Management & KYC
          </h1>
          <p className="text-zinc-400">Approve researcher access, verify institutional IDs, and manage platform roles.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {/* Pending Approvals */}
        <Card className="bg-zinc-900 border-amber-500/50 text-white shadow-none">
          <CardHeader className="border-b border-zinc-800 pb-4">
            <CardTitle className="text-amber-400 flex items-center gap-2">
              <ShieldCheck size={20} /> Pending KYC Approvals
            </CardTitle>
            <CardDescription className="text-zinc-400">Users waiting for ID verification to access the platform.</CardDescription>
          </CardHeader>
          <CardContent className="pt-4">
            {isLoading ? (
              <div className="flex justify-center p-4"><Loader2 className="animate-spin text-amber-500" /></div>
            ) : pendingUsers.length === 0 ? (
              <div className="text-center py-6 text-zinc-500 text-sm">No pending KYC approvals at the moment.</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="text-xs text-zinc-400 uppercase border-b border-zinc-800">
                    <tr>
                      <th className="py-3 font-medium">User Details</th>
                      <th className="py-3 font-medium">Institution</th>
                      <th className="py-3 font-medium">Requested Role</th>
                      <th className="py-3 font-medium text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-800/50">
                    {pendingUsers.map((user: any) => (
                      <tr key={user.$id} className="hover:bg-zinc-800/50 transition-colors">
                        <td className="py-3">
                          <div className="font-medium text-zinc-200">{user.name}</div>
                          <div className="text-xs text-zinc-500">{user.email}</div>
                        </td>
                        <td className="py-3 text-zinc-300">{user.prefs?.institution || 'N/A'}</td>
                        <td className="py-3">
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                            {user.prefs?.requestedRole || 'researcher'}
                          </span>
                        </td>
                        <td className="py-3 text-right space-x-2">
                          {user.prefs?.id_file_id && (
                            <Button 
                              size="sm" 
                              variant="outline" 
                              className="text-xs bg-zinc-950 border-zinc-700 hover:bg-zinc-800 text-zinc-300"
                              onClick={() => handleViewId(user.prefs.id_file_id)}
                            >
                              <ImageIcon size={14} className="mr-1" /> View ID
                            </Button>
                          )}
                          <Button 
                            size="sm" 
                            className="bg-emerald-600 hover:bg-emerald-700 text-white"
                            onClick={() => handleApprove(user.$id, 'researcher')}
                            disabled={mutation.isPending}
                          >
                            <CheckCircle size={14} className="mr-1" /> Approve
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Active Users */}
        <Card className="bg-zinc-900 border-zinc-800 text-white shadow-none">
          <CardHeader className="border-b border-zinc-800 pb-4 flex flex-row items-center justify-between">
            <div>
              <CardTitle>Active Directory</CardTitle>
              <CardDescription className="text-zinc-400">All registered and verified users.</CardDescription>
            </div>
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-zinc-500" />
              <Input
                placeholder="Search users..."
                className="pl-9 bg-zinc-950 border-zinc-800 w-[250px] text-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-zinc-400 uppercase border-b border-zinc-800">
                  <tr>
                    <th className="py-3 font-medium">User Details</th>
                    <th className="py-3 font-medium">Institution</th>
                    <th className="py-3 font-medium">Current Role</th>
                    <th className="py-3 font-medium text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800/50">
                  {activeUsers
                    .filter((u: any) => u.name.toLowerCase().includes(searchTerm.toLowerCase()) || u.email.toLowerCase().includes(searchTerm.toLowerCase()))
                    .map((user: any) => (
                    <tr key={user.$id} className="hover:bg-zinc-800/50 transition-colors">
                      <td className="py-3">
                        <div className="font-medium text-zinc-200">{user.name}</div>
                        <div className="text-xs text-zinc-500">{user.email}</div>
                      </td>
                      <td className="py-3 text-zinc-300">{user.prefs?.institution || 'N/A'}</td>
                      <td className="py-3">
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border bg-zinc-500/10 text-zinc-400 border-zinc-500/20 capitalize">
                          {user.prefs?.role || 'viewer'}
                        </span>
                      </td>
                      <td className="py-3 text-right">
                        <span className="text-emerald-500 text-xs font-medium">Verified</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* ID Card Modal */}
      {selectedIdUrl && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 max-w-2xl w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-white">Institutional ID Card</h3>
              <Button variant="ghost" size="icon" onClick={() => setSelectedIdUrl(null)} className="text-zinc-400 hover:text-white">
                <XCircle size={20} />
              </Button>
            </div>
            <div className="rounded-lg overflow-hidden bg-zinc-950 flex items-center justify-center min-h-[300px]">
              <img src={selectedIdUrl} alt="ID Verification" className="max-w-full max-h-[60vh] object-contain" />
            </div>
            <div className="mt-4 flex justify-end">
              <Button onClick={() => setSelectedIdUrl(null)} className="bg-indigo-600 hover:bg-indigo-700 text-white">
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
