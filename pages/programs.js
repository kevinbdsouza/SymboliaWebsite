import ResearchCard from '@/components/ResearchCard'

const projectList = [
  {
    slug: 'inference-time-steering',
    title: 'Coming Soon',
    authors: 'X',
    date: 'June 2025',
    description: '.',
  },
  // Add your other projects here
];

export default function Programs() {
  return (
    <section className="px-4 sm:px-8 py-16 max-w-6xl mx-auto">
      <div className="text-center mb-16">
        <h1 className="font-serif text-5xl md:text-6xl text-ink mb-4">Our Programs</h1>
        <p className="font-sans text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Explore our ongoing programs and initiatives propelling our mission to shape the future of AI in India. 
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10">
        {projectList.map((project) => (
          <ResearchCard
            key={project.slug}
            title={project.title}
            authors={project.authors}
            date={project.date}
            description={project.description}
            slug={project.slug}
          />
        ))}
      </div>
    </section>
  )
}