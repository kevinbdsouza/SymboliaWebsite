import { useRouter } from 'next/router';

export default function ResearchArticle() {
  const router = useRouter();
  const { slug } = router.query;

  return (
    <section className="px-4 sm:px-8 py-16 max-w-3xl mx-auto text-center">
      <h1 className="font-serif text-4xl md:text-5xl text-ink mb-6 capitalize">
        {slug ? slug.replace(/-/g, ' ') : 'Loading...'}
      </h1>
      <div className="bg-gray-100 rounded-lg p-8 mt-8">
        <p className="font-sans text-lg text-gray-700 mb-4">
          Artificial Intelligence (AI) stands poised to reshape economies and societies profoundly 
          over the coming decades, yet the nature and magnitude of its impact remain subjects of 
          intense debate and considerable uncertainty. We review the diverse spectrum of projections 
          concerning AI's consequences for labor markets, productivity, wages, and economic growth, and 
          synthesize contrasting viewpoints, ranging from utopian visions of unprecedented prosperity to 
          dystopian scenarios of widespread disruption and inequality. We scrutinize the methodologies 
          underpinning these forecasts, and identify limitations in predicting technological breakthroughs, 
          modeling complex task dynamics and real-world frictions, and capturing crucial feedback loops 
          between technology, policy, and society. Our analysis advocates for a more integrated, granular, 
          and context-aware research agenda focusing on skill dynamics, institutional influences, human-AI 
          collaboration, and the valuation of non-market impacts. Ultimately, we argue that navigating the 
          AI future requires interdisciplinary research, proactive policy interventions, and a commitment 
          to responsible innovation centered on human values to ensure that AI's potential benefits humanity 
          broadly.

        </p>
        {/* Placeholder for future interactive content */}
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-gray-400">
          .
        </div>
      </div>
    </section>
  );
} 