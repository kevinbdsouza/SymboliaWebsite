import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'      // ↓ add to package.json if not installed


export default function Header() {
  const [open, setOpen] = useState(false)
  return (
    <header className="sticky top-0 z-20 bg-white/60 backdrop-blur-md">
      <div className="mx-auto flex items-center justify-between px-4 sm:px-6 py-4 max-w-6xl">
        {/* ─── logo ───────────────────────────────────────────── */}
        <Link href="/" className="flex items-center space-x-3 shrink-0">
          <Image src="/logo.png" alt="Symbolia Labs Logo" width={35} height={35} priority />
          <span className="font-serif text-3xl sm:text-4xl text-heading">Symbolia Labs</span>
        </Link>

        {/* ─── desktop nav ───────────────────────────────────── */}
        <nav className="hidden md:flex space-x-8 font-sans text-heading uppercase tracking-wide">
          <Link href="/research" className="hover:text-accent">Research</Link>
          <Link href="/programs" className="hover:text-accent">Programs</Link>
          <Link href="/about"    className="hover:text-accent">About</Link>
        </nav>

        {/* ─── mobile menu button ────────────────────────────── */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 rounded focus:outline-none focus:ring-2 focus:ring-accent"
          aria-label="Toggle navigation"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* ─── mobile dropdown ────────────────────────────────── */}
      {open && (
        <nav className="md:hidden bg-white border-t border-gray-100">
          <Link href="/research" className="block px-6 py-3 font-sans uppercase tracking-wide border-b border-gray-100 hover:bg-gray-50" onClick={() => setOpen(false)}>Research</Link>
          <Link href="/programs" className="block px-6 py-3 font-sans uppercase tracking-wide border-b border-gray-100 hover:bg-gray-50" onClick={() => setOpen(false)}>Programs</Link>
          <Link href="/about"    className="block px-6 py-3 font-sans uppercase tracking-wide hover:bg-gray-50" onClick={() => setOpen(false)}>About</Link>
        </nav>
      )}
    </header>
  )
}