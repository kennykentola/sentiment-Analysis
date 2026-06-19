import { Scale, FileText, AlertTriangle } from 'lucide-react';

export default function Terms() {
  return (
    <div className="w-full bg-zinc-950 min-h-screen text-zinc-300">
      <section className="pt-32 pb-20 px-6 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Terms of Service</h1>
        <p className="text-lg text-zinc-400 mb-12">Last updated: {new Date().toLocaleDateString()}</p>

        <div className="space-y-12">
          {/* Agreement */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2"><Scale className="text-indigo-500" /> Agreement to Terms</h2>
            <p className="mb-4">
              By accessing or using the Sentiment Analysis System, you agree to be bound by these Terms of Service. If you disagree with any part of the terms, then you may not access the service.
            </p>
          </div>

          {/* Usage */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2"><FileText className="text-indigo-500" /> Acceptable Use</h2>
            <p className="mb-4">You agree to use the platform solely for academic, research, or policy-making purposes. You are strictly prohibited from:</p>
            <ul className="list-disc pl-6 space-y-2 mb-4 text-zinc-400">
              <li>Using the platform to dox, target, or harass specific individuals or institutions.</li>
              <li>Attempting to reverse engineer the sentiment models or API endpoints.</li>
              <li>Scraping the aggregated dashboard data without explicit API access.</li>
              <li>Selling or redistributing the raw datasets.</li>
            </ul>
          </div>

          {/* Accounts */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2"><AlertTriangle className="text-indigo-500" /> Account Responsibilities</h2>
            <p className="mb-4">
              You are responsible for safeguarding your password and API keys. We cannot and will not be liable for any loss or damage arising from your failure to comply with security requirements.
            </p>
          </div>

          {/* Termination */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">Termination</h2>
            <p className="mb-4">
              We may terminate or suspend access to our service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
