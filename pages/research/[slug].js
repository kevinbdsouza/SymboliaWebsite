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
          over the next two decades, yet the nature and magnitude of its impact remain subjects of 
          intense debate and considerable uncertainty. We review the diverse spectrum of projections 
          concerning AI's consequences for labor markets, productivity, wages, and economic growth, 
          and synthesize contrasting viewpoints, ranging from utopian visions of unprecedented 
          prosperity to dystopian scenarios of widespread disruption and inequality. Central to this 
          review is a critique of existing forecasting methodologies and models, highlighting their 
          inherent limitations, particularly the prevalent lack of realistic, integrated scenarios 
          capable of capturing complex feedback loops between technology, policy, and society. Drawing 
          upon recent economic research, including analyses of automation risk exposure [1] and 
          firm-level AI adoption [2], alongside considerations of accelerating AI capabilities [3], 
          we identify significant gaps in current understanding. We argue that realizing AI's immense 
          potential while mitigating substantial risks requires a more grounded, nuanced, and adaptive 
          approach to analysis and policymaking than is currently common. We propose a path forward, 
          emphasizing the need for improved modeling techniques, enhanced data collection, 
          interdisciplinary collaboration, and a focus on adaptive governance strategies designed to 
          steer AI development towards shared prosperity and enhanced human well-being across a range of 
          plausible futures.
        </p>
        {/* Placeholder for future interactive content */}
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-gray-400">
          .
        </div>
      </div>
    </section>
  );
} 