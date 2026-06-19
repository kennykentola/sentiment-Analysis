import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { User, Mail, Shield, Bell, Laptop, Key, Smartphone, Moon, Globe, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ProfileSettings() {
  const [activeTab, setActiveTab] = useState('general');

  return (
    <div className="space-y-6 animate-in fade-in duration-500 max-w-5xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-white">Profile & Settings</h1>
        <p className="text-zinc-400">Manage your account credentials, preferences, and system settings.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Sidebar Navigation */}
        <div className="space-y-1">
          <Button 
            variant="ghost" 
            onClick={() => setActiveTab('general')}
            className={`w-full justify-start ${activeTab === 'general' ? 'text-indigo-400 bg-indigo-500/10 hover:bg-indigo-500/20 hover:text-indigo-300' : 'text-zinc-400 hover:text-white hover:bg-zinc-800'}`}
          >
            <User className="mr-3 h-4 w-4" />
            General Profile
          </Button>
          <Button 
            variant="ghost" 
            onClick={() => setActiveTab('security')}
            className={`w-full justify-start ${activeTab === 'security' ? 'text-indigo-400 bg-indigo-500/10 hover:bg-indigo-500/20 hover:text-indigo-300' : 'text-zinc-400 hover:text-white hover:bg-zinc-800'}`}
          >
            <Shield className="mr-3 h-4 w-4" />
            Security
          </Button>
          <Button 
            variant="ghost" 
            onClick={() => setActiveTab('notifications')}
            className={`w-full justify-start ${activeTab === 'notifications' ? 'text-indigo-400 bg-indigo-500/10 hover:bg-indigo-500/20 hover:text-indigo-300' : 'text-zinc-400 hover:text-white hover:bg-zinc-800'}`}
          >
            <Bell className="mr-3 h-4 w-4" />
            Notifications
          </Button>
          <Button 
            variant="ghost" 
            onClick={() => setActiveTab('system')}
            className={`w-full justify-start ${activeTab === 'system' ? 'text-indigo-400 bg-indigo-500/10 hover:bg-indigo-500/20 hover:text-indigo-300' : 'text-zinc-400 hover:text-white hover:bg-zinc-800'}`}
          >
            <Laptop className="mr-3 h-4 w-4" />
            System Preferences
          </Button>
        </div>

        {/* Main Content Area */}
        <div className="md:col-span-3 space-y-6">
          {activeTab === 'general' && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-300 space-y-6">
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
                      <label htmlFor="firstName" className="text-sm font-medium text-zinc-300">First Name</label>
                      <input id="firstName" name="firstName" title="First Name" placeholder="First Name" type="text" defaultValue="Analyst" className="w-full bg-zinc-950 border border-zinc-800 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="lastName" className="text-sm font-medium text-zinc-300">Last Name</label>
                      <input id="lastName" name="lastName" title="Last Name" placeholder="Last Name" type="text" defaultValue="User" className="w-full bg-zinc-950 border border-zinc-800 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <label htmlFor="emailAddress" className="text-sm font-medium text-zinc-300">Email Address</label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                        <input id="emailAddress" name="emailAddress" title="Email Address" placeholder="Email Address" type="email" defaultValue="analyst@example.com" disabled className="w-full bg-zinc-950 border border-zinc-800 rounded-md pl-9 pr-3 py-2 text-zinc-500 cursor-not-allowed" />
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end pt-4">
                    <Button className="bg-indigo-600 hover:bg-indigo-700 text-white" onClick={() => alert('Changes saved successfully!')}>Save Changes</Button>
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
                      <h4 className="font-medium text-white mb-1">Active User Role</h4>
                      <p className="text-sm text-zinc-400 leading-relaxed">
                        You have access to Data Sources, Collection Jobs, Advanced Search, and all Core Analytics dashboards based on your Appwrite role assignment.
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
                    <Button variant="outline" className="border-rose-500/50 text-rose-500 hover:bg-rose-500 hover:text-white" onClick={() => alert('Account deactivation requires super admin approval.')}>Deactivate</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-300 space-y-6">
              <Card className="bg-zinc-900 border-zinc-800 text-white">
                <CardHeader>
                  <CardTitle>Security Settings</CardTitle>
                  <CardDescription className="text-zinc-400">Manage your password and secure your account.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-white flex items-center gap-2">
                      <Key className="w-5 h-5 text-indigo-400" />
                      Change Password
                    </h3>
                    <div className="space-y-3">
                      <div className="space-y-1">
                        <label className="text-sm font-medium text-zinc-300">Current Password</label>
                        <input type="password" placeholder="••••••••" className="w-full bg-zinc-950 border border-zinc-800 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-sm font-medium text-zinc-300">New Password</label>
                        <input type="password" placeholder="••••••••" className="w-full bg-zinc-950 border border-zinc-800 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-sm font-medium text-zinc-300">Confirm New Password</label>
                        <input type="password" placeholder="••••••••" className="w-full bg-zinc-950 border border-zinc-800 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                      </div>
                    </div>
                    <Button className="bg-indigo-600 hover:bg-indigo-700 text-white mt-2" onClick={() => alert('Password successfully updated!')}>Update Password</Button>
                  </div>

                  <div className="pt-6 border-t border-zinc-800 space-y-4">
                    <h3 className="text-lg font-medium text-white flex items-center gap-2">
                      <Smartphone className="w-5 h-5 text-emerald-400" />
                      Two-Factor Authentication
                    </h3>
                    <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-lg flex items-start gap-4">
                      <div className="mt-0.5">
                        <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                      </div>
                      <div>
                        <h4 className="font-medium text-emerald-400 mb-1">2FA is Enabled</h4>
                        <p className="text-sm text-zinc-400 leading-relaxed mb-3">
                          Your account is protected by an authenticator app. You will be asked for a code whenever you log in from a new device.
                        </p>
                        <Button variant="outline" className="border-zinc-700 text-white hover:bg-zinc-800">Manage 2FA Settings</Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-300 space-y-6">
              <Card className="bg-zinc-900 border-zinc-800 text-white">
                <CardHeader>
                  <CardTitle>Notification Preferences</CardTitle>
                  <CardDescription className="text-zinc-400">Choose what alerts you want to receive and how.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-white">Email Notifications</h3>
                    <div className="space-y-3">
                      <label className="flex items-center justify-between p-3 border border-zinc-800 rounded-lg bg-zinc-950/50 cursor-pointer hover:bg-zinc-800/50 transition-colors">
                        <div>
                          <p className="font-medium text-white">Weekly Sentiment Reports</p>
                          <p className="text-sm text-zinc-500">Receive a weekly summary PDF of national trends.</p>
                        </div>
                        <input type="checkbox" defaultChecked className="h-5 w-5 rounded border-zinc-700 text-indigo-500 focus:ring-indigo-500 bg-zinc-900" />
                      </label>
                      
                      <label className="flex items-center justify-between p-3 border border-zinc-800 rounded-lg bg-zinc-950/50 cursor-pointer hover:bg-zinc-800/50 transition-colors">
                        <div>
                          <p className="font-medium text-white">Anomaly Alerts</p>
                          <p className="text-sm text-zinc-500">Get notified immediately when negative sentiment spikes above 50%.</p>
                        </div>
                        <input type="checkbox" defaultChecked className="h-5 w-5 rounded border-zinc-700 text-indigo-500 focus:ring-indigo-500 bg-zinc-900" />
                      </label>

                      <label className="flex items-center justify-between p-3 border border-zinc-800 rounded-lg bg-zinc-950/50 cursor-pointer hover:bg-zinc-800/50 transition-colors">
                        <div>
                          <p className="font-medium text-white">Data Export Readiness</p>
                          <p className="text-sm text-zinc-500">Email me when a large CSV export finishes generating.</p>
                        </div>
                        <input type="checkbox" defaultChecked className="h-5 w-5 rounded border-zinc-700 text-indigo-500 focus:ring-indigo-500 bg-zinc-900" />
                      </label>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-zinc-800 flex justify-end">
                    <Button className="bg-indigo-600 hover:bg-indigo-700 text-white" onClick={() => alert('Notification preferences saved!')}>Save Preferences</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === 'system' && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-300 space-y-6">
              <Card className="bg-zinc-900 border-zinc-800 text-white">
                <CardHeader>
                  <CardTitle>System Preferences</CardTitle>
                  <CardDescription className="text-zinc-400">Customize the dashboard's appearance and localization.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-white flex items-center gap-2">
                      <Moon className="w-5 h-5 text-indigo-400" />
                      Appearance
                    </h3>
                    <div className="grid grid-cols-3 gap-4">
                      <button className="border-2 border-indigo-500 bg-zinc-950 rounded-lg p-4 flex flex-col items-center gap-2 hover:bg-zinc-800 transition-colors">
                        <div className="w-full h-12 bg-zinc-900 rounded border border-zinc-800 flex items-center justify-center">
                          <Moon className="w-5 h-5 text-zinc-400" />
                        </div>
                        <span className="text-sm font-medium text-white">Dark Theme</span>
                      </button>
                      
                      <button className="border border-zinc-800 bg-zinc-950 rounded-lg p-4 flex flex-col items-center gap-2 hover:bg-zinc-800 opacity-50 cursor-not-allowed">
                        <div className="w-full h-12 bg-zinc-100 rounded border border-zinc-200 flex items-center justify-center">
                          <div className="w-5 h-5 rounded-full bg-yellow-400" />
                        </div>
                        <span className="text-sm font-medium text-white">Light Theme</span>
                      </button>

                      <button className="border border-zinc-800 bg-zinc-950 rounded-lg p-4 flex flex-col items-center gap-2 hover:bg-zinc-800 opacity-50 cursor-not-allowed">
                        <div className="w-full h-12 bg-gradient-to-r from-zinc-900 to-zinc-100 rounded border border-zinc-800 flex items-center justify-center">
                          <Laptop className="w-5 h-5 text-zinc-500" />
                        </div>
                        <span className="text-sm font-medium text-white">System Sync</span>
                      </button>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-zinc-800 space-y-4">
                    <h3 className="text-lg font-medium text-white flex items-center gap-2">
                      <Globe className="w-5 h-5 text-indigo-400" />
                      Localization
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-zinc-300">Display Language</label>
                        <select className="w-full bg-zinc-950 border border-zinc-800 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500">
                          <option>English (UK)</option>
                          <option>English (US)</option>
                          <option disabled>Hausa (Coming Soon)</option>
                          <option disabled>Yoruba (Coming Soon)</option>
                          <option disabled>Igbo (Coming Soon)</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-zinc-300">Timezone</label>
                        <select className="w-full bg-zinc-950 border border-zinc-800 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500">
                          <option>West Africa Time (WAT) - Lagos</option>
                          <option>Coordinated Universal Time (UTC)</option>
                        </select>
                      </div>
                    </div>
                  </div>

                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
