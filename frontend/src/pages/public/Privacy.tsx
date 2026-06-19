import { Shield, Lock, Eye, Database } from 'lucide-react';

export default function Privacy() {
  return (
    <div className="w-full bg-zinc-950 min-h-screen text-zinc-300">
      <section className="pt-32 pb-20 px-6 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Privacy Policy</h1>
        <p className="text-lg text-zinc-400 mb-12">Last updated: {new Date().toLocaleDateString()}</p>

        <div className="space-y-12">
          {/* Introduction */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2"><Shield className="text-indigo-500" /> Introduction</h2>
            <p className="mb-4">
              At our Sentiment Analysis Platform, we take your privacy seriously. This policy explains how we collect, use, and protect data related to our analysis of public opinions regarding university tuition fees. We comply with the Nigeria Data Protection Regulation (NDPR).
            </p>
          </div>

          {/* Data Collection */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2"><Database className="text-indigo-500" /> Data Collection</h2>
            <p className="mb-4">We collect data from public sources, including:</p>
            <ul className="list-disc pl-6 space-y-2 mb-4 text-zinc-400">
              <li>Public social media posts (X/Twitter, Facebook groups)</li>
              <li>Public forums and university community boards</li>
              <li>News articles and public comments</li>
            </ul>
            <p>
              <strong>Important:</strong> We do not scrape private accounts, direct messages, or closed groups. All ingested data is publicly accessible at the time of collection.
            </p>
          </div>

          {/* Data Anonymization */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2"><Eye className="text-indigo-500" /> Anonymization</h2>
            <p className="mb-4">
              Before running any NLP or sentiment analysis models, our pipeline automatically strips Personally Identifiable Information (PII) such as names, phone numbers, and exact locations. Our models only analyze the linguistic content to determine aggregate public sentiment.
            </p>
          </div>

          {/* Security */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2"><Lock className="text-indigo-500" /> Data Security</h2>
            <p className="mb-4">
              We implement industry-standard security measures, including role-based access control (RBAC), end-to-end encryption, and secure database architecture to prevent unauthorized access to the raw datasets.
            </p>
          </div>

          {/* Contact */}
          <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl">
            <h3 className="text-xl font-bold text-white mb-2">Questions?</h3>
            <p className="mb-4">If you have any questions or concerns about how we handle data, please contact our Data Protection Officer.</p>
            <a href="/contact" className="text-indigo-400 hover:text-indigo-300 font-medium">Contact Support →</a>
          </div>
        </div>
      </section>
    </div>
  );
}
