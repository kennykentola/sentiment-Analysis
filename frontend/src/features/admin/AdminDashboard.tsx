import { useQuery } from '@tanstack/react-query';
import { Building2, Users, Network, TrendingDown, CheckCircle2, AlertCircle, XCircle, Loader2, Play } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { account } from '@/services/appwrite';
import { useState } from 'react';

const fetchLiveAnalytics = async () => {
  try {
    const session = await account.createJWT();
    const response = await fetch('http://localhost:8000/api/v1/analytics/latest', {
      headers: { 'x-appwrite-jwt': session.jwt }
    });
    if (!response.ok) throw new Error("API Error");
    return await response.json();
  } catch (error) {
    return {
      distribution: [
        { name: 'Positive', value: 25 },
        { name: 'Neutral', value: 35 },
        { name: 'Negative', value: 40 }
      ]
    };
  }
};

const fetchIngestionStatus = async () => {
  try {
    const session = await account.createJWT();
    const response = await fetch('http://localhost:8000/api/v1/ingestion/status', {
      headers: { 'x-appwrite-jwt': session.jwt }
    });
    if (!response.ok) throw new Error("API Error");
    return await response.json();
  } catch (error) {
    // Fallback if API is unreachable
    return {
      is_running: false,
      pipelines: {
        twitter: { status: "operational", rate: "120 posts/min", ping: "45ms" },
        facebook: { status: "degraded", rate: "15 posts/min", ping: "850ms" },
        nairaland: { status: "operational", rate: "8 posts/min", ping: "120ms" },
        news_api: { status: "down", rate: "0 posts/min", ping: "-" }
      }
    };
  }
};

export default function AdminDashboard() {
  const [isTriggering, setIsTriggering] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ['adminAnalytics'],
    queryFn: fetchLiveAnalytics,
    refetchInterval: 30000
  });

  const { data: ingestionData, refetch: refetchIngestion } = useQuery({
    queryKey: ['ingestionStatus'],
    queryFn: fetchIngestionStatus,
    refetchInterval: 5000 // Poll frequently to see when running state ends
  });

  const handleTriggerIngestion = async () => {
    try {
      setIsTriggering(true);
      const session = await account.createJWT();
      const response = await fetch('http://localhost:8000/api/v1/ingestion/trigger', {
        method: 'POST',
        headers: { 'x-appwrite-jwt': session.jwt }
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail || "Failed to trigger");
      }
      alert("Data ingestion pipeline started successfully in the background!");
      refetchIngestion();
    } catch (err: any) {
      alert("Error: " + err.message);
    } finally {
      setIsTriggering(false);
    }
  };

  const universityData = [
    { name: "University of Lagos (UNILAG)", state: "Lagos", negativeVol: "4,500", trend: "+15%", alert: true },
    { name: "Obafemi Awolowo University (OAU)", state: "Osun", negativeVol: "3,200", trend: "+5%", alert: false },
    { name: "University of Ibadan (UI)", state: "Oyo", negativeVol: "2,800", trend: "-2%", alert: false },
    { name: "Ahmadu Bello University (ABU)", state: "Kaduna", negativeVol: "1,500", trend: "+1%", alert: false },
    { name: "University of Nigeria (UNN)", state: "Enugu", negativeVol: "4,100", trend: "+12%", alert: true },
  ];

  const sourceHealth = [
    { name: "Twitter Stream API", status: ingestionData?.pipelines?.twitter?.status || "operational", latency: ingestionData?.pipelines?.twitter?.ping || "45ms", volume: ingestionData?.pipelines?.twitter?.rate || "120 posts/min" },
    { name: "Facebook Graph API", status: ingestionData?.pipelines?.facebook?.status || "degraded", latency: ingestionData?.pipelines?.facebook?.ping || "850ms", volume: ingestionData?.pipelines?.facebook?.rate || "15 posts/min" },
    { name: "Nairaland Scraper", status: ingestionData?.pipelines?.nairaland?.status || "operational", latency: ingestionData?.pipelines?.nairaland?.ping || "120ms", volume: ingestionData?.pipelines?.nairaland?.rate || "8 posts/min" },
    { name: "News API Aggregator", status: ingestionData?.pipelines?.news_api?.status || "down", latency: ingestionData?.pipelines?.news_api?.ping || "-", volume: ingestionData?.pipelines?.news_api?.rate || "0 posts/min" },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white flex items-center gap-3">
            Institutional Administration
            {isLoading && <Loader2 className="animate-spin text-indigo-400" size={20} />}
          </h1>
          <p className="text-zinc-400">Manage university metrics, generate custom reports, and oversee platform usage.</p>
        </div>
      </div>

      {/* Admin KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-zinc-900 border-zinc-800 text-white shadow-none">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-zinc-400">Total Institutions Monitored</CardTitle>
            <Building2 size={16} className="text-indigo-400" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">43</div>
            <p className="text-xs text-zinc-500 mt-1">2 added this month</p>
          </CardContent>
        </Card>
        <Card className="bg-zinc-900 border-zinc-800 text-white shadow-none">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-zinc-400">Platform Users</CardTitle>
            <Users size={16} className="text-teal-400" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">128</div>
            <p className="text-xs text-zinc-500 mt-1">45 Analysts, 83 Researchers</p>
          </CardContent>
        </Card>
        <Card className="bg-zinc-900 border-zinc-800 text-white shadow-none">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-zinc-400">Total NLP Ingestions</CardTitle>
            <Network size={16} className="text-rose-400" />
          </CardHeader>
          <CardContent>
            {isLoading ? <Loader2 className="animate-spin" size={24} /> : (
              <div className="text-3xl font-bold">{data?.total_posts || '2.4M'}</div>
            )}
            <p className="text-xs text-emerald-400 mt-1 flex items-center">
              <TrendingDown size={14} className="mr-1" /> Live Sync Active
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Universities Comparison Table */}
        <Card className="bg-zinc-900 border-zinc-800 text-white xl:col-span-2 shadow-none">
          <CardHeader className="flex flex-row justify-between items-center pb-2">
            <div>
              <CardTitle>High-Risk Institutions</CardTitle>
              <CardDescription className="text-zinc-400">Universities ranked by negative sentiment volume</CardDescription>
            </div>
            <Button variant="outline" size="sm" className="text-xs border-zinc-700 bg-zinc-950 hover:bg-zinc-800">
              View All 43
            </Button>
          </CardHeader>
          <CardContent>
            <div className="w-full overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-zinc-400 uppercase border-b border-zinc-800">
                  <tr>
                    <th className="py-3 font-medium">Institution</th>
                    <th className="py-3 font-medium">State</th>
                    <th className="py-3 font-medium text-right">Negative Vol.</th>
                    <th className="py-3 font-medium text-right">7d Trend</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800/50">
                  {universityData.map((uni, idx) => (
                    <tr key={idx} className="hover:bg-zinc-800/50 transition-colors">
                      <td className="py-3 font-medium flex items-center gap-2">
                        {uni.alert && <span className="h-2 w-2 rounded-full bg-rose-500 animate-pulse"></span>}
                        {!uni.alert && <span className="h-2 w-2 rounded-full bg-transparent"></span>}
                        {uni.name}
                      </td>
                      <td className="py-3 text-zinc-400">{uni.state}</td>
                      <td className="py-3 text-right font-mono">{uni.negativeVol}</td>
                      <td className={`py-3 text-right ${uni.alert ? 'text-rose-400' : 'text-zinc-400'}`}>
                        {uni.trend}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Data Sources Health */}
        <Card className="bg-zinc-900 border-zinc-800 text-white xl:col-span-1 shadow-none">
          <CardHeader className="pb-4 flex flex-row items-center justify-between">
            <div>
              <CardTitle>Ingestion Pipelines</CardTitle>
              <CardDescription className="text-zinc-400">Real-time health of data scrapers</CardDescription>
            </div>
            {ingestionData?.is_running && (
              <span className="flex items-center gap-1 text-xs font-medium text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-full border border-emerald-500/20">
                <Loader2 size={12} className="animate-spin" /> Running
              </span>
            )}
          </CardHeader>
          <CardContent className="space-y-4">
            {sourceHealth.map((source, idx) => (
              <div key={idx} className="flex items-start justify-between p-3 rounded-lg border border-zinc-800 bg-zinc-950">
                <div className="flex gap-3">
                  <div className="mt-0.5">
                    {source.status === 'operational' && <CheckCircle2 size={16} className="text-emerald-500" />}
                    {source.status === 'degraded' && <AlertCircle size={16} className="text-amber-500" />}
                    {source.status === 'down' && <XCircle size={16} className="text-rose-500" />}
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold">{source.name}</h4>
                    <p className="text-xs text-zinc-500 capitalize">{source.status}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs font-mono text-zinc-300">{source.volume}</div>
                  <div className="text-xs text-zinc-500">{source.latency} ping</div>
                </div>
              </div>
            ))}
            
            <Button 
              variant="default" 
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white text-xs mt-4 flex items-center justify-center gap-2 transition-all shadow-lg shadow-indigo-500/20"
              onClick={handleTriggerIngestion}
              disabled={isTriggering || ingestionData?.is_running}
            >
              {isTriggering || ingestionData?.is_running ? (
                <><Loader2 size={14} className="animate-spin" /> Ingestion in Progress...</>
              ) : (
                <><Play size={14} /> Trigger Manual Data Sync</>
              )}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
