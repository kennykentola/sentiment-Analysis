import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Activity, Database, ShieldCheck, Globe, MessageSquareQuote } from 'lucide-react';

export default function Home() {
  return (
    <div className="w-full">
      {/* HERO SECTION */}
      <section className="relative isolate pt-24 pb-20 sm:pt-32 sm:pb-24 lg:pb-32 overflow-hidden">
        {/* Neon Glow Background */}
        <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
          <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#3b82f6] to-[#8b5cf6] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"></div>
        </div>

        <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-7xl mb-6">
            Decipher the Voice of the <br className="hidden md:block" /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">Nigerian Student</span>
          </h1>
          <p className="mt-6 text-lg leading-8 text-zinc-400 max-w-2xl mx-auto">
            A smart AI platform that collects and analyses public opinions about tuition fees and educational policies in Nigerian universities. It uses advanced language processing to detect sentiment trends, understand students' experiences, and provide valuable insights that support better decisions for researchers, policymakers, and education leaders.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link to="/auth/register">
              <Button className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-6 text-lg rounded-full">
                Start Analyzing Free
              </Button>
            </Link>
            <Link to="/docs" className="text-sm font-semibold leading-6 text-white hover:text-indigo-400 transition-colors">
              Read the Research <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* STATISTICS SECTION */}
      <section className="border-y border-zinc-800 bg-zinc-900/30">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-white mb-2">14.2M+</div>
              <div className="text-sm text-zinc-400">Posts Analyzed</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">43</div>
              <div className="text-sm text-zinc-400">Universities Tracked</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">92.4%</div>
              <div className="text-sm text-zinc-400">Model Accuracy</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">&lt; 200ms</div>
              <div className="text-sm text-zinc-400">Inference Latency</div>
            </div>
          </div>
        </div>
      </section>

      {/* INTERACTIVE DASHBOARD PREVIEW */}
      <section className="py-24 bg-zinc-950">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white sm:text-4xl mb-4">Enterprise-Grade Intelligence</h2>
            <p className="text-zinc-400 max-w-2xl mx-auto">Get absolute clarity on public unrest. Filter by institution, detect anomalies, and export academic-grade reports with a single click.</p>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-2 md:p-4 overflow-hidden shadow-2xl shadow-indigo-500/10">
            <div className="rounded-xl border border-zinc-800 bg-[#09090b] aspect-video relative overflow-hidden flex items-center justify-center">
              {/* Mock Dashboard UI */}
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
              <div className="p-8 w-full h-full flex flex-col">
                <div className="flex justify-between items-center border-b border-zinc-800 pb-4 mb-4">
                  <div className="h-6 w-32 bg-zinc-800 rounded animate-pulse"></div>
                  <div className="flex gap-2">
                    <div className="h-6 w-16 bg-zinc-800 rounded"></div>
                    <div className="h-6 w-16 bg-indigo-600/50 rounded"></div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="h-24 bg-zinc-800/50 rounded-lg border border-zinc-800"></div>
                  <div className="h-24 bg-zinc-800/50 rounded-lg border border-zinc-800"></div>
                  <div className="h-24 bg-zinc-800/50 rounded-lg border border-zinc-800"></div>
                </div>
                <div className="flex-1 bg-zinc-800/30 rounded-lg border border-zinc-800"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="py-24 bg-zinc-900/20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-2xl hover:border-indigo-500/50 transition-colors">
              <div className="h-12 w-12 bg-indigo-500/10 text-indigo-400 rounded-xl flex items-center justify-center mb-6">
                <Database size={24} />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Massive Ingestion</h3>
              <p className="text-zinc-400">Connect to X/Twitter, Facebook, and News APIs to aggregate thousands of data points daily.</p>
            </div>
            <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-2xl hover:border-teal-500/50 transition-colors">
              <div className="h-12 w-12 bg-teal-500/10 text-teal-400 rounded-xl flex items-center justify-center mb-6">
                <Activity size={24} />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Pidgin NLP Model</h3>
              <p className="text-zinc-400">Custom sentiment models tuned specifically for Nigerian slang (Sapa, Wahala, Gbese).</p>
            </div>
            <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-2xl hover:border-rose-500/50 transition-colors">
              <div className="h-12 w-12 bg-rose-500/10 text-rose-400 rounded-xl flex items-center justify-center mb-6">
                <ShieldCheck size={24} />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Role-Based Access</h3>
              <p className="text-zinc-400">Enterprise security separating Super Admins, Analysts, Researchers, and Viewers.</p>
            </div>
          </div>
        </div>
      </section>

      {/* RESEARCH IMPACT */}
      <section className="py-24 border-t border-zinc-800">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-zinc-500 mb-8">Trusted by Researchers At</p>
          <div className="flex flex-wrap justify-center gap-12 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
            <div className="flex items-center gap-2 text-2xl font-bold text-white"><Globe className="text-indigo-500" /> UNILAG</div>
            <div className="flex items-center gap-2 text-2xl font-bold text-white"><Globe className="text-indigo-500" /> OAU</div>
            <div className="flex items-center gap-2 text-2xl font-bold text-white"><Globe className="text-indigo-500" /> ABU</div>
            <div className="flex items-center gap-2 text-2xl font-bold text-white"><Globe className="text-indigo-500" /> UI</div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-24 bg-zinc-900/30">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white">What Analysts Say</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-zinc-950 border border-zinc-800 p-8 rounded-2xl relative">
              <MessageSquareQuote className="absolute top-8 right-8 text-zinc-800" size={48} />
              <p className="text-zinc-300 relative z-10 text-lg mb-6">"The ability of the NLP engine to accurately classify Nigerian pidgin has drastically reduced our manual tagging hours. The dashboard is incredibly responsive."</p>
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold">A</div>
                <div>
                  <div className="text-white font-semibold">Dr. Adebayo</div>
                  <div className="text-sm text-zinc-500">Lead Researcher</div>
                </div>
              </div>
            </div>
            <div className="bg-zinc-950 border border-zinc-800 p-8 rounded-2xl relative">
              <MessageSquareQuote className="absolute top-8 right-8 text-zinc-800" size={48} />
              <p className="text-zinc-300 relative z-10 text-lg mb-6">"Finally, a tool that aggregates social unrest metrics specifically for university management. The early-warning anomaly detection is a game changer."</p>
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 bg-teal-600 rounded-full flex items-center justify-center text-white font-bold">C</div>
                <div>
                  <div className="text-white font-semibold">Chidinma</div>
                  <div className="text-sm text-zinc-500">Data Analyst</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-indigo-600/10"></div>
        <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-3xl font-bold text-white sm:text-5xl mb-6">Ready to decode the public voice?</h2>
          <p className="text-lg text-zinc-300 mb-10">Join researchers and administrators using our platform to make data-driven decisions on university policies.</p>
          <Link to="/auth/register">
            <Button className="bg-indigo-600 hover:bg-indigo-700 text-white px-10 py-6 text-lg rounded-full shadow-[0_0_40px_rgba(79,70,229,0.3)]">
              Create Free Account
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
