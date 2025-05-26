import Header from './Header'
import Footer from './Footer'

export default function Layout({ children }) {
  return (
    <>
      <Header />
      <main className="relative z-10">{children}</main>
      <Footer />
    </>
  )
}