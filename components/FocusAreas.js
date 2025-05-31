import Image from 'next/image';

const focusAreas = [
  {
    title: "Architectural Frontiers",
    description: "Investigating the fundamental limits of today’s AI systems and exploring new paradigms that unlock greater capability and reliability.",
  },
  {
    title: "AI for Discovery",
    description: "Exploring the potential of AI to accelerate breakthroughs across science, biology, climate, and beyond.",
  },
  {
    title: "Societal Impact",
    description: "Examining how AI reshapes work, well-being, and global equity so society can adapt and thrive.",
  },
  {
    title: "Shared Prosperity",
    description: "Creating technologies and policy insights that ensure the benefits of AI reach every human in the developing world.",
  },
];

export default function FocusAreas() {
  return (
    <section className="px-8 py-24 max-w-6xl mx-auto">
      <h2 className="font-serif text-4xl text-heading mb-12 flex items-center">
        <Image
          src="/focus.png"
          width={40}
          height={40}
          alt="Network icon"
          className="mr-3"
        />
        Focus Areas
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {focusAreas.map(({ title, description }) => (
          <div
            key={title}
            className="p-8 bg-[#f5f5f0] border border-gray-200 rounded-lg shadow-sm"
          >
            <h3 className="font-serif text-2xl text-ink mb-4">{title}</h3>
            <p className="font-sans text-lg text-gray-700">{description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}