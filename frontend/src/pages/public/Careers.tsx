import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Briefcase, MapPin, Clock } from 'lucide-react';

export default function Careers() {
  return (
    <div className="w-full">
      {/* HERO SECTION */}
      <section className="relative isolate pt-24 pb-20 sm:pt-32 sm:pb-24 lg:pb-32 overflow-hidden border-b border-zinc-800">
        <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
          <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#10b981] to-[#3b82f6] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"></div>
        </div>

        <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-7xl mb-6">
            Join Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Mission</span>
          </h1>
          <p className="mt-6 text-lg leading-8 text-zinc-400 max-w-2xl mx-auto">
            Help us build the next generation of data intelligence platforms for Nigerian universities. We are a fast-growing team of researchers, engineers, and analysts passionate about public sentiment and educational policy.
          </p>
        </div>
      </section>

      {/* JOB LISTINGS */}
      <section className="py-24 bg-zinc-950">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-3xl font-bold text-white">Open Positions</h2>
            <span className="bg-zinc-800 text-zinc-300 px-3 py-1 rounded-full text-sm font-medium">3 Roles</span>
          </div>

          <div className="space-y-6">
            {/* Job 1 */}
            <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-2xl hover:border-emerald-500/50 transition-colors group">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors">Senior NLP Engineer</h3>
                  <p className="text-zinc-400 mb-4 max-w-xl">
                    Lead the development of our proprietary Nigerian Pidgin and Hausa sentiment analysis models. Experience with HuggingFace and PyTorch required.
                  </p>
                  <div className="flex flex-wrap gap-4 text-sm text-zinc-500">
                    <div className="flex items-center gap-1"><MapPin size={16} /> Lagos, Nigeria (Hybrid)</div>
                    <div className="flex items-center gap-1"><Clock size={16} /> Full-time</div>
                    <div className="flex items-center gap-1"><Briefcase size={16} /> Engineering</div>
                  </div>
                </div>
                <div>
                  <Button className="bg-zinc-800 hover:bg-emerald-600 text-white w-full md:w-auto">Apply Now</Button>
                </div>
              </div>
            </div>

            {/* Job 2 */}
            <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-2xl hover:border-emerald-500/50 transition-colors group">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors">Data Privacy Lead</h3>
                  <p className="text-zinc-400 mb-4 max-w-xl">
                    Ensure our data collection pipelines remain compliant with NDPR and GDPR. You'll be working closely with our scraping and legal teams.
                  </p>
                  <div className="flex flex-wrap gap-4 text-sm text-zinc-500">
                    <div className="flex items-center gap-1"><MapPin size={16} /> Remote</div>
                    <div className="flex items-center gap-1"><Clock size={16} /> Full-time</div>
                    <div className="flex items-center gap-1"><Briefcase size={16} /> Legal & Compliance</div>
                  </div>
                </div>
                <div>
                  <Button className="bg-zinc-800 hover:bg-emerald-600 text-white w-full md:w-auto">Apply Now</Button>
                </div>
              </div>
            </div>

            {/* Job 3 */}
            <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-2xl hover:border-emerald-500/50 transition-colors group">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors">Frontend Developer (React/Tailwind)</h3>
                  <p className="text-zinc-400 mb-4 max-w-xl">
                    Build beautiful, responsive, and accessible dashboards for our university administrators and researchers.
                  </p>
                  <div className="flex flex-wrap gap-4 text-sm text-zinc-500">
                    <div className="flex items-center gap-1"><MapPin size={16} /> Abuja, Nigeria (On-site)</div>
                    <div className="flex items-center gap-1"><Clock size={16} /> Full-time</div>
                    <div className="flex items-center gap-1"><Briefcase size={16} /> Product</div>
                  </div>
                </div>
                <div>
                  <Button className="bg-zinc-800 hover:bg-emerald-600 text-white w-full md:w-auto">Apply Now</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-24 relative overflow-hidden border-t border-zinc-800">
        <div className="absolute inset-0 bg-emerald-600/5"></div>
        <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-3xl font-bold text-white mb-6">Don't see a fit?</h2>
          <p className="text-lg text-zinc-400 mb-10">We're always looking for talented individuals. Send us your resume and we'll keep you in mind for future roles.</p>
          <Link to="/contact">
            <Button variant="outline" className="border-zinc-700 hover:bg-zinc-800 text-zinc-300 px-10 py-6 text-lg rounded-full">
              Contact Us
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
