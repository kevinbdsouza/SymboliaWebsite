export default function Hero() {
  return (
    <section className="relative px-8 py-24 max-w-4xl mx-auto bg-white shadow-lg">
      <h1 className="font-serif text-5xl md:text-6xl leading-tight text-ink mb-6">
        How will <span className="text-accent">Symbolic AI</span> shape tomorrow?
      </h1>
      <p className="font-sans text-lg mb-4">
        We’re a research lab pushing the boundaries of inference-time control, neuro‑symbolic integration, and AI for public good.
      </p>
      <p className="font-sans text-lg mb-8">
        Our team designs methods that steer large language models, accelerate scientific discovery, and strengthen societal resilience.
      </p>

      {/* accent lines */}
      <div className="accent-lines">
        <svg viewBox="0 0 800 400">
          <path d="M0 350 L800 0" />
          <path d="M0 360 L780 0" />
          <path d="M0 370 L760 0" />
          <path d="M0 380 L740 0" />
          <path d="M0 390 L720 0" />
        </svg>
      </div>
    </section>
  )
}