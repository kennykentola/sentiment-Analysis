import React, { useState, useEffect } from 'react';
import { Shield, Plus, Trash2, Edit2, ShieldAlert } from 'lucide-react';

interface Role {
  $id: string;
  name: string;
  permissions: string[];
  $createdAt: string;
}

export default function RoleManagement() {
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newRoleName, setNewRoleName] = useState("");
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const availablePermissions = [
    { id: "read_analytics", label: "Read Analytics" },
    { id: "manage_users", label: "Manage Users" },
    { id: "manage_roles", label: "Manage Roles" },
    { id: "export_data", label: "Export Data" },
    { id: "manage_datasets", label: "Manage Datasets" }
  ];

  const fetchRoles = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('appwrite_jwt');
      const res = await fetch('https://sentiment-analysis-vc31.onrender.com/api/v1/roles', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'X-Appwrite-JWT': token || ''
        }
      });
      if (!res.ok) throw new Error("Failed to fetch roles");
      const data = await res.json();
      setRoles(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  const togglePermission = (permId: string) => {
    if (selectedPermissions.includes(permId)) {
      setSelectedPermissions(prev => prev.filter(id => id !== permId));
    } else {
      setSelectedPermissions(prev => [...prev, permId]);
    }
  };

  const handleCreateRole = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRoleName.trim()) return;

    try {
      setIsSubmitting(true);
      const token = localStorage.getItem('appwrite_jwt');
      const res = await fetch('https://sentiment-analysis-vc31.onrender.com/api/v1/roles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'X-Appwrite-JWT': token || ''
        },
        body: JSON.stringify({
          name: newRoleName,
          permissions: selectedPermissions
        })
      });

      if (!res.ok) throw new Error("Failed to create role");
      
      // Reset form and fetch updated roles
      setNewRoleName("");
      setSelectedPermissions([]);
      setIsModalOpen(false);
      await fetchRoles();
    } catch (err: any) {
      alert("Error creating role: " + err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteRole = async (roleId: string) => {
    if (!window.confirm("Are you sure you want to delete this role?")) return;
    
    try {
      const token = localStorage.getItem('appwrite_jwt');
      const res = await fetch(`https://sentiment-analysis-vc31.onrender.com/api/v1/roles/${roleId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'X-Appwrite-JWT': token || ''
        }
      });
      if (!res.ok) throw new Error("Failed to delete role");
      await fetchRoles();
    } catch (err: any) {
      alert("Error deleting role: " + err.message);
    }
  };

  if (loading) {
    return <div className="text-white flex items-center justify-center h-64">Loading roles...</div>;
  }

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white flex items-center gap-2">
            <Shield className="h-8 w-8 text-indigo-500" />
            Role Management
          </h1>
          <p className="text-zinc-400 mt-2">Create and manage dynamic user roles and permissions.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors font-medium shadow-lg shadow-indigo-500/20"
        >
          <Plus size={18} />
          Create Custom Role
        </button>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/50 text-red-400 p-4 rounded-lg flex items-center gap-3">
          <ShieldAlert size={20} />
          {error}
        </div>
      )}

      {/* Roles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {roles.map(role => (
          <div key={role.$id} className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 relative group overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
              <button 
                onClick={() => handleDeleteRole(role.$id)}
                className="p-2 bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500/20 transition-colors"
                title="Delete Role"
              >
                <Trash2 size={16} />
              </button>
            </div>
            
            <h3 className="text-xl font-bold text-white mb-1">{role.name}</h3>
            <p className="text-xs text-zinc-500 mb-4">ID: {role.$id}</p>
            
            <div className="space-y-2">
              <h4 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider">Permissions</h4>
              {role.permissions && role.permissions.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {role.permissions.map(perm => (
                    <span key={perm} className="px-2.5 py-1 rounded-full bg-indigo-500/10 text-indigo-400 text-xs font-medium border border-indigo-500/20">
                      {perm}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-zinc-600 italic">No specific permissions attached.</p>
              )}
            </div>
          </div>
        ))}

        {roles.length === 0 && (
          <div className="col-span-full py-12 text-center border-2 border-dashed border-zinc-800 rounded-xl">
            <Shield className="h-12 w-12 text-zinc-600 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-white mb-1">No Custom Roles Found</h3>
            <p className="text-zinc-400">Your Appwrite database currently has no custom roles configured.</p>
          </div>
        )}
      </div>

      {/* Create Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl">
            <div className="p-6 border-b border-zinc-800">
              <h2 className="text-xl font-bold text-white">Create New Role</h2>
            </div>
            
            <form onSubmit={handleCreateRole} className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-2">Role Name</label>
                <input 
                  type="text" 
                  required
                  value={newRoleName}
                  onChange={e => setNewRoleName(e.target.value)}
                  placeholder="e.g. Data Analyst, Editor"
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-3">Assign Permissions</label>
                <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
                  {availablePermissions.map(perm => (
                    <label key={perm.id} className="flex items-center gap-3 p-3 rounded-lg border border-zinc-800 bg-zinc-950/50 hover:bg-zinc-800/50 cursor-pointer transition-colors">
                      <div className="relative flex items-center">
                        <input 
                          type="checkbox" 
                          checked={selectedPermissions.includes(perm.id)}
                          onChange={() => togglePermission(perm.id)}
                          className="peer h-5 w-5 cursor-pointer appearance-none rounded-md border border-zinc-700 checked:border-indigo-500 checked:bg-indigo-500 transition-all"
                        />
                        <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 peer-checked:opacity-100">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor" stroke="currentColor" strokeWidth="1">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                          </svg>
                        </div>
                      </div>
                      <span className="text-sm text-zinc-300 font-medium">{perm.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 bg-zinc-800 hover:bg-zinc-700 text-white py-2.5 rounded-lg font-medium transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  disabled={isSubmitting || !newRoleName}
                  className="flex-1 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed text-white py-2.5 rounded-lg font-medium transition-colors shadow-lg shadow-indigo-500/20"
                >
                  {isSubmitting ? "Creating..." : "Save Role"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
