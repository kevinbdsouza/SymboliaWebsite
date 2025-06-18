// components/Hero.js

import DynamicNetworkBackground from './DynamicNetworkBackground';

export default function Hero() {
  return (
    <section className="px-4 sm:px-8 py-20 sm:py-24 max-w-6xl mx-auto bg-[#f5f5f0] shadow-lg overflow-hidden">
      <div className="flex flex-col-reverse lg:flex-row items-center">
        {/* ─── Text column ───────────────────────────────────────── */}
        <div className="mt-8 lg:mt-0 lg:w-1/2 relative z-10">
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl leading-tight text-ink mb-6">
            Shaping the Next Decade of AI
          </h1>
          <p className="font-sans text-ink mb-4">
            We’re a research and policy lab dedicated to advancing AI in India and its positive impact on society. We want to be an interdisciplinary research hub for Indian AI, bringing together computer scientists, cognitive scientists, philosophers, policy experts, and humanities scholars to guide AI development. 
          </p>
          <p className="font-sans text-ink">
            By uniting frontier research, rigorous benchmarking, policy insight, and human-centred design, we aim to steer AI toward a future that multiplies scientific progress, safeguards social welfare, and distributes opportunity.
          </p>
        </div>

        {/* ─── Animation column ─────────────────────────────────── */}
        <div className="lg:w-1/2 w-full h-60 sm:h-72 lg:h-[300px] relative">
          <div className="absolute inset-0">
            <DynamicNetworkBackground />
          </div>
        </div>
      </div>
    </section>
  );
}
