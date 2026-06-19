import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Check } from 'lucide-react';

export default function Pricing() {
  const tiers = [
    {
      name: 'Researcher',
      price: 'Free',
      description: 'For students and individual academic researchers.',
      features: [
        'Access to 30 days of historical data',
        'Basic sentiment charts',
        'Export data (CSV only)',
        'Community support'
      ],
      cta: 'Start Researching',
      highlighted: false
    },
    {
      name: 'Institution',
      price: '₦250k',
      period: '/month',
      description: 'For university administrators and governing councils.',
      features: [
        'Real-time data ingestion',
        'Full historical archive access',
        'Advanced NLP anomaly detection',
        'Automated PDF reporting',
        'Role-Based Access (Up to 10 users)',
        'Priority email support'
      ],
      cta: 'Contact Sales',
      highlighted: true
    },
    {
      name: 'Government',
      price: 'Custom',
      description: 'For federal ministries and national education boards.',
      features: [
        'Cross-university macro trends',
        'Predictive protest modeling',
        'Dedicated account manager',
        'On-premise deployment option',
        'Unlimited users',
        '24/7 phone support'
      ],
      cta: 'Request Demo',
      highlighted: false
    }
  ];

  return (
    <div className="w-full pb-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 pt-24 sm:pt-32 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl mb-6">Transparent Pricing</h1>
        <p className="text-lg leading-8 text-zinc-400 max-w-2xl mx-auto mb-16">
          Scalable intelligence for every level of academia, from individual thesis research to federal policy making.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center max-w-6xl mx-auto">
          {tiers.map((tier, i) => (
            <div key={i} className={`rounded-3xl p-8 border ${tier.highlighted ? 'bg-zinc-900 border-indigo-500 shadow-2xl shadow-indigo-500/20 relative scale-105 z-10 py-12' : 'bg-zinc-950 border-zinc-800'}`}>
              {tier.highlighted && (
                <div className="absolute top-0 inset-x-0 transform -translate-y-1/2 flex justify-center">
                  <span className="bg-indigo-600 text-white text-xs font-bold uppercase tracking-widest py-1 px-3 rounded-full">Most Popular</span>
                </div>
              )}
              <h3 className="text-xl font-bold text-white mb-2">{tier.name}</h3>
              <p className="text-sm text-zinc-400 mb-6 h-10">{tier.description}</p>
              <div className="flex items-baseline justify-center gap-1 mb-8">
                <span className="text-4xl font-bold text-white">{tier.price}</span>
                {tier.period && <span className="text-zinc-500">{tier.period}</span>}
              </div>
              <ul className="space-y-4 mb-8 text-sm text-zinc-300 text-left">
                {tier.features.map((f, idx) => (
                  <li key={idx} className="flex gap-3">
                    <Check className="h-5 w-5 text-indigo-400 shrink-0" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <Link to="/contact">
                <Button className={`w-full ${tier.highlighted ? 'bg-indigo-600 hover:bg-indigo-700 text-white' : 'bg-zinc-800 hover:bg-zinc-700 text-white'}`}>
                  {tier.cta}
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
