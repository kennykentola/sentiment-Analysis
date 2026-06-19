import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Bell, AlertTriangle, Info, CheckCircle, Mail, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';

const mockNotifications = [
  { id: 1, type: 'alert', title: 'System Alert: High CPU Usage', message: 'Collection job JOB-901 is consuming over 90% CPU.', time: '10 mins ago', unread: true },
  { id: 2, type: 'info', title: 'Report Generated', message: 'Your "Weekly Sentiment Summary" report is ready for download.', time: '2 hours ago', unread: true },
  { id: 3, type: 'success', title: 'API Connection Restored', message: 'Twitter (X) API connection has been successfully re-established.', time: '1 day ago', unread: false },
  { id: 4, type: 'alert', title: 'Sentiment Spike Detected', message: 'Unusual spike in negative sentiment regarding "Hostel Fees" detected at UNILAG.', time: '2 days ago', unread: false },
];

export default function Notifications() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500 max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white flex items-center">
            <Bell className="w-6 h-6 mr-3 text-indigo-400" />
            Notifications
          </h1>
          <p className="text-zinc-400">Manage your system alerts and personal inbox.</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" className="bg-zinc-900 border-zinc-800 text-zinc-300 hover:bg-zinc-800 hover:text-white">
            <Settings className="mr-2 h-4 w-4" />
            Preferences
          </Button>
          <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
            <Mail className="mr-2 h-4 w-4" />
            Mark All Read
          </Button>
        </div>
      </div>

      <Card className="bg-zinc-900 border-zinc-800 text-white shadow-xl">
        <CardHeader className="border-b border-zinc-800 pb-4">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Recent Alerts</CardTitle>
              <CardDescription className="text-zinc-400 mt-1">You have 2 unread notifications.</CardDescription>
            </div>
          </div>
        </CardHeader>
        <div className="divide-y divide-zinc-800">
          {mockNotifications.map((notif) => (
            <div key={notif.id} className={`p-4 hover:bg-zinc-800/30 transition-colors flex gap-4 ${notif.unread ? 'bg-zinc-800/10' : ''}`}>
              <div className="mt-1">
                {notif.type === 'alert' && <AlertTriangle className="w-5 h-5 text-rose-500" />}
                {notif.type === 'info' && <Info className="w-5 h-5 text-indigo-400" />}
                {notif.type === 'success' && <CheckCircle className="w-5 h-5 text-emerald-500" />}
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start mb-1">
                  <h4 className={`text-sm font-medium ${notif.unread ? 'text-white' : 'text-zinc-300'}`}>
                    {notif.title}
                  </h4>
                  <span className="text-xs text-zinc-500 whitespace-nowrap ml-4">{notif.time}</span>
                </div>
                <p className="text-sm text-zinc-400 leading-relaxed">{notif.message}</p>
              </div>
              {notif.unread && (
                <div className="flex items-center justify-center pl-2">
                  <div className="w-2.5 h-2.5 bg-indigo-500 rounded-full" title="Unread"></div>
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="p-4 border-t border-zinc-800 text-center">
          <Button variant="ghost" className="text-zinc-400 hover:text-white w-full">
            View Older Notifications
          </Button>
        </div>
      </Card>
    </div>
  );
}
