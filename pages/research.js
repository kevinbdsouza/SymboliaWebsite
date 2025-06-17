import ResearchCard from '@/components/ResearchCard';
import Image from 'next/image';
import { researchArticles } from '@/data/articles'; // Import the data

export default function Research() {
  return (
    <section className="px-4 sm:px-8 py-16 max-w-8xl mx-auto">
      <div className="text-center mb-16">
        <h1 className="font-serif text-5xl md:text-6xl text-ink mb-4">Our Research</h1>
        <p className="font-sans text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
          How can we bring forth a positive AI-future? Explore our latest papers, policy reports, and perspective articles in our different focus areas. 
        </p>
      </div>

      <div className="mb-10">
        <h2 className="font-serif text-3xl text-heading mb-12 flex items-center">
          <Image
            src="/focus.png"
            width={30}
            height={30}
            alt="Network icon"
            className="mr-3"
          />
          Featured
        </h2>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10">
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