export default function Documentation() {
  return (
    <div className="w-full pb-24">
      <div className="mx-auto max-w-4xl px-6 lg:px-8 pt-24 sm:pt-32">
        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl mb-6">API & Architecture Documentation</h1>
        <p className="text-lg leading-8 text-zinc-400 mb-12">
          Technical specifications for integrating with the SentimentHub NLP engine and Webhook alerts.
        </p>

        <div className="prose prose-invert prose-indigo max-w-none">
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-8 mb-8">
            <h2 className="text-xl font-bold text-white mb-4">REST API Authentication</h2>
            <p className="text-zinc-400 mb-4">All API requests require a Bearer token in the Authorization header. You can generate a persistent API key from your Researcher or Admin dashboard.</p>
            <pre className="bg-[#09090b] border border-zinc-800 p-4 rounded-lg overflow-x-auto">
              <code className="text-emerald-400">
                curl -H "Authorization: Bearer YOUR_API_KEY" https://api.sentimenthub.ng/v1/analyze
              </code>
            </pre>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-8 mb-8">
            <h2 className="text-xl font-bold text-white mb-4">NLP Inference Endpoint</h2>
            <p className="text-zinc-400 mb-4">Submit raw text (English or Nigerian Pidgin) to receive a sentiment classification and confidence score.</p>
            <pre className="bg-[#09090b] border border-zinc-800 p-4 rounded-lg overflow-x-auto text-sm text-zinc-300">
{`POST /v1/analyze
Content-Type: application/json

{
  "text": "The new fee hike at UNILAG is total sapa and wahala. We cannot pay this!",
  "context": "education"
}

// Response
{
  "sentiment": "negative",
  "confidence": 0.982,
  "detected_slang": ["sapa", "wahala"],
  "entity_extracted": ["UNILAG"]
}`}
            </pre>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-8">
            <h2 className="text-xl font-bold text-white mb-4">Webhook Alerts</h2>
            <p className="text-zinc-400 mb-4">Configure webhooks to receive real-time POST requests when anomaly detection thresholds are breached for specific institutions.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
