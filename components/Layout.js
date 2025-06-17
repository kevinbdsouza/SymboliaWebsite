import Header from './Header'
import Footer from './Footer'

export default function Layout({ children }) {
  return (
    <>
      <Header />
      {/* This new div creates a consistent, centered container for all page content */}
      <div className="max-w-8xl mx-auto px-4 sm:px-6">
        <main>{children}</main>
      </div>
      <Footer />
    </>
  )
}