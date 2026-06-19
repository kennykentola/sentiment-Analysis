export default function About() {
  return (
    <div className="w-full pb-24">
      <div className="relative isolate pt-24 sm:pt-32">
        <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl">
          <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#10b981] to-[#3b82f6] opacity-30"></div>
        </div>
        <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl mb-6">About SentimentHub</h1>
          <p className="text-lg leading-8 text-zinc-400">
            Born out of a necessity to understand student grievances, SentimentHub is a pioneering NLP platform dedicated to capturing the real-time pulse of Nigerian higher education institutions.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8 mt-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl font-bold text-white mb-6">Our Mission</h2>
            <p className="text-zinc-400 mb-4 leading-relaxed">
              We bridge the communication gap between university administrators, policymakers, and the student body. By analyzing millions of social media interactions regarding school fees, we provide actionable data to prevent crises and foster constructive dialogue.
            </p>
            <p className="text-zinc-400 leading-relaxed">
              Our custom machine learning models are trained specifically on Nigerian colloquialisms, ensuring that every piece of feedback—no matter how informal—is accurately quantified.
            </p>
          </div>
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-8">
            <div className="grid grid-cols-2 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold text-indigo-400 mb-2">2026</div>
                <div className="text-sm text-zinc-500 uppercase tracking-widest">Founded</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-teal-400 mb-2">40+</div>
                <div className="text-sm text-zinc-500 uppercase tracking-widest">Institutions</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-rose-400 mb-2">1B+</div>
                <div className="text-sm text-zinc-500 uppercase tracking-widest">Words Processed</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-amber-400 mb-2">100%</div>
                <div className="text-sm text-zinc-500 uppercase tracking-widest">Open Core</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
