import Link from 'next/link';

export default function ResearchCard({ title, date, description, slug }) {
  return (
    <div className="bg-white border border-gray-200 p-6 rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300 ease-in-out flex flex-col h-full group">
      <h3 className="font-serif text-xl lg:text-2xl text-ink mb-2 leading-tight">
        <Link href={`/research/${slug}`} className="group-hover:text-accent transition-colors duration-200">
          {title}
        </Link>
      </h3>
      <p className="font-sans text-xs text-gray-500 mb-3">
        <span className="text-gray-400">{date}</span>
      </p>
      <p className="font-sans text-sm text-gray-700 flex-grow leading-relaxed">
        {description}
      </p>
    </div>
  );
}
