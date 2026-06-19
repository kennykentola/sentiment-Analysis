import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { User, Mail, Shield, Bell, Laptop } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ProfileSettings() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500 max-w-5xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-white">Profile & Settings</h1>
        <p className="text-zinc-400">Manage your account credentials, preferences, and system settings.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Sidebar Navigation */}
        <div className="space-y-1">
          <Button variant="ghost" className="w-full justify-start text-indigo-400 bg-indigo-500/10 hover:bg-indigo-500/20 hover:text-indigo-300">
            <User className="mr-3 h-4 w-4" />
            General Profile
          </Button>
          <Button variant="ghost" className="w-full justify-start text-zinc-400 hover:text-white hover:bg-zinc-800">
            <Shield className="mr-3 h-4 w-4" />
            Security
          </Button>
          <Button variant="ghost" className="w-full justify-start text-zinc-400 hover:text-white hover:bg-zinc-800">
            <Bell className="mr-3 h-4 w-4" />
            Notifications
          </Button>
          <Button variant="ghost" className="w-full justify-start text-zinc-400 hover:text-white hover:bg-zinc-800">
            <Laptop className="mr-3 h-4 w-4" />
            System Preferences
          </Button>
        </div>

        {/* Main Content Area */}
        <div className="md:col-span-3 space-y-6">
          <Card className="bg-zinc-900 border-zinc-800 text-white">
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription className="text-zinc-400">Update your basic profile details and avatar.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-6">
                <div className="w-20 h-20 rounded-full bg-zinc-800 flex items-center justify-center text-2xl font-bold text-zinc-500 border-2 border-zinc-700">
                  A
                </div>
                <div>
                  <Button variant="outline" className="bg-zinc-800 border-zinc-700 text-white hover:bg-zinc-700 mr-3">Change Avatar</Button>
                  <Button variant="ghost" className="text-rose-500 hover:text-rose-400 hover:bg-rose-500/10">Remove</Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-zinc-300">First Name</label>
                  <input type="text" defaultValue="Analyst" className="w-full bg-zinc-950 border border-zinc-800 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-zinc-300">Last Name</label>
                  <input type="text" defaultValue="User" className="w-full bg-zinc-950 border border-zinc-800 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-medium text-zinc-300">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                    <input type="email" defaultValue="analyst@example.com" disabled className="w-full bg-zinc-950 border border-zinc-800 rounded-md pl-9 pr-3 py-2 text-zinc-500 cursor-not-allowed" />
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">Save Changes</Button>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-zinc-900 border-zinc-800 text-white">
            <CardHeader>
              <CardTitle>Role & Permissions</CardTitle>
              <CardDescription className="text-zinc-400">Your current access level within the system.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="p-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-start gap-4">
                <div className="mt-1 p-2 bg-emerald-500/10 rounded-md">
                  <Shield className="w-5 h-5 text-emerald-500" />
                </div>
                <div>
                  <h4 className="font-medium text-white mb-1">Analyst Role</h4>
                  <p className="text-sm text-zinc-400 leading-relaxed">
                    You have full access to Data Sources, Collection Jobs, Advanced Search, and all Core Analytics dashboards. You cannot manage users or alter system configurations.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-zinc-900 border-rose-900/50 text-white">
            <CardHeader>
              <CardTitle className="text-rose-500">Danger Zone</CardTitle>
              <CardDescription className="text-zinc-400">Irreversible account actions.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between p-4 border border-rose-500/20 rounded-lg bg-rose-500/5">
                <div>
                  <h4 className="font-medium text-white">Deactivate Account</h4>
                  <p className="text-sm text-zinc-400">Temporarily disable your access to the dashboard.</p>
                </div>
                <Button variant="outline" className="border-rose-500/50 text-rose-500 hover:bg-rose-500 hover:text-white">Deactivate</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
