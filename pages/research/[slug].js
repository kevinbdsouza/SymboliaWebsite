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
          Coming soon!
        </p>
        {/* Placeholder for future interactive content */}
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-gray-400">
          [Interactive content placeholder]
        </div>
      </div>
    </section>
  );
} 