import { Database, ShieldCheck, Activity, BarChart, Server, Workflow } from 'lucide-react';

export default function Features() {
  const features = [
    {
      name: 'Omnichannel Ingestion',
      description: 'Scrapes data from Twitter/X, Facebook, and local Nigerian forums using distributed asynchronous workers.',
      icon: Database,
      color: 'text-indigo-400',
      bg: 'bg-indigo-500/10',
      border: 'hover:border-indigo-500/50'
    },
    {
      name: 'Pidgin NLP Engine',
      description: 'Fine-tuned HuggingFace transformers that understand Nigerian Pidgin slang and localized academic jargon.',
      icon: Activity,
      color: 'text-teal-400',
      bg: 'bg-teal-500/10',
      border: 'hover:border-teal-500/50'
    },
    {
      name: 'RBAC Security',
      description: 'Granular access control allowing Super Admins, Analysts, and Researchers to view appropriate data tiers.',
      icon: ShieldCheck,
      color: 'text-rose-400',
      bg: 'bg-rose-500/10',
      border: 'hover:border-rose-500/50'
    },
    {
      name: 'Anomaly Detection',
      description: 'Statistical algorithms detect sudden spikes in negative sentiment, alerting administrators before physical protests erupt.',
      icon: BarChart,
      color: 'text-amber-400',
      bg: 'bg-amber-500/10',
      border: 'hover:border-amber-500/50'
    },
    {
      name: 'Scalable Infrastructure',
      description: 'Built on FastAPI, Celery, and Appwrite, the system scales dynamically to handle millions of requests during viral trends.',
      icon: Server,
      color: 'text-cyan-400',
      bg: 'bg-cyan-500/10',
      border: 'hover:border-cyan-500/50'
    },
    {
      name: 'Automated Reporting',
      description: 'Generate weekly PDFs summarizing sentiment trajectories for university senates and governing councils.',
      icon: Workflow,
      color: 'text-fuchsia-400',
      bg: 'bg-fuchsia-500/10',
      border: 'hover:border-fuchsia-500/50'
    }
  ];

  return (
    <div className="w-full pb-24">
      <div className="relative isolate pt-24 sm:pt-32 pb-16">
        <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl mb-6">Platform Features</h1>
          <p className="text-lg leading-8 text-zinc-400">
            A comprehensive suite of data ingestion, analysis, and visualization tools built exclusively for the academic sector.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <div key={i} className={`bg-zinc-900/50 border border-zinc-800 p-8 rounded-2xl transition-colors ${f.border}`}>
              <div className={`h-12 w-12 ${f.bg} ${f.color} rounded-xl flex items-center justify-center mb-6`}>
                <f.icon size={24} />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{f.name}</h3>
              <p className="text-zinc-400">{f.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
