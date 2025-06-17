import Link from 'next/link';

export default function ResearchCard({ title, authors, date, description, slug }) {
  return (
    // Enhanced shadow, slightly darker border, and ensuring consistent professional fonts (already set globally)
    <div className="bg-white border border-gray-300 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out flex flex-col h-full">
      <h3 className="font-serif font-medium text-xl lg:text-3xl text-ink mb-2 leading-tight">
        {/* If a slug is provided, make the title a link */}
        {slug ? (
          <Link href={`/research/${slug}`} className="hover:text-primary transition-colors duration-150"> 
            {title}
          </Link>
        ) : (
          title
        )}
      </h3>
      <p className="font-sans text-xs text-gray-500 mb-3"> {/* Slightly smaller author/date text */}
        <span className="text-gray-400">{date}</span>
      </p>
      <p className="font-sans text-base text-gray-700 mb-4 flex-grow leading-relaxed"> {/* Slightly smaller description, more line height */} 
        {description}
      </p>
    </div>
  );
}