import Link from 'next/link'

export default function About() {
  return (
    <section className="px-8 py-24 max-w-3xl mx-auto space-y-6">
      <h1 className="font-serif text-4xl mb-6">About Us</h1>
      <p className="font-sans text-lg">
        Symbolia Labs is an independent research and policy lab based in Bengaluru, India, committed to steering artificial intelligence toward outcomes that elevate human flourishing.
      </p>
      <p className="font-sans text-lg">
        We pair frontier technical work with rigorous social-science analysis to answer a single question: How do we build an AI future that is unmistakably people‑centred, bearing in mind an entangled world?
      </p>
      <p className="font-sans text-lg">
        If you are an investor who shares our ethos and wants to support our mission,{' '}
        <a href="mailto:hello@symbolialabs.com" className="underline text-accent">
          get in touch
        </a>{' '}
        with us.
      </p>
      <p className="font-sans text-lg">
        We are currently a small team and are not explicitly looking to hire, but if you like our work and want to potentially work with us, we encourage you to{' '}
        <a href="mailto:hello@symbolialabs.com" className="underline text-accent">
          reach out
        </a>.
      </p>
    </section>
  )
}
