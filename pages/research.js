import ResearchCard from '@/components/ResearchCard'; // Adjust path if necessary
import Image from 'next/image';

// Placeholder research data (assuming this remains the same as your provided selection)
const researchArticles = [
  {
    slug: "navigating-labor-and-growth-in-the-AI-decade:-a-review-and-research-agenda",
    title: "Navigating Labor and Growth in the AI Decade: A Review and Research Agenda",
    date: 'June 2025',
    description: "AI’s economic impact is both vast and highly uncertain. Current forecasts \
    swing from unprecedented prosperity to severe inequality, but most rely on narrow models that \
    ignore the feedback loops linking technology, policy, and society. In this writeup, we review recent research on automation \
    exposure, firm-level adoption, and accelerating capabilities, and find large knowledge gaps. \
    We propose a more realistic path forward that demands richer modeling, better data, interdisciplinary work, and \
    adaptive governance to channel AI toward broadly shared prosperity.",
  },
];

export default function Research() {
  return (
    <section className="px-4 sm:px-8 py-16 max-w-6xl mx-auto">
      <div className="text-center mb-16"> {/* Increased bottom margin */}
        <h1 className="font-serif text-5xl md:text-6xl text-ink mb-4">Our Research</h1> {/* Increased bottom margin */}
        <p className="font-sans text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed"> {/* Slightly darker text, wider max-width */}
          How can we bring forth a positive AI-future? Explore our latest papers, policy reports, and perspective articles in our different focus areas. 
        </p>
      </div>

      {/* Featured Section Title - Icon changed and styled for a more professional look */}
      <div className="mb-10"> {/* Increased bottom margin */}
        <h2 className="font-serif text-4xl text-heading mb-12 flex items-center">
        <Image
          src="/focus.png"
          width={40}
          height={40}
          alt="Network icon"
          className="mr-3"
        />
        Featured
      </h2>
      </div>

      {/* Grid for Research Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10"> {/* Increased y-gap */}
        {researchArticles.map((article) => (
          <ResearchCard
            key={article.slug}
            title={article.title}
            authors={article.authors}
            date={article.date}
            description={article.description}
            slug={article.slug}
          />
        ))}
      </div>
    </section>
  );
}