import Image from 'next/image'
import Link from 'next/link'

export default function Header() {
  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white/60 backdrop-blur-md sticky top-0 z-20">
      <Link href="/" className="flex items-center space-x-3">
        <Image src="/logo.png" alt="Symbolia Labs Logo" width={40} height={40} />
        <span className="font-serif text-2xl text-ink">Symbolia Labs</span>
      </Link>
      <nav className="space-x-8 font-sans text-sm uppercase tracking-wide">
        <Link href="/research" className="hover:text-accent">Research</Link>
        <Link href="/about" className="hover:text-accent">About</Link>
        <Link href="/support" className="hover:text-accent">Support</Link>
        <Link href="/contact" className="hover:text-accent">Contact</Link>
      </nav>
    </header>
  )
}