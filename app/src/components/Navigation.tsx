import { useEffect, useState } from 'react'

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollTo = (id: string) => {
    setMobileOpen(false)
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      {/* Gradient overlay — keeps nav text readable over any hero background */}
      <div className="fixed top-0 left-0 right-0 h-32 z-40 pointer-events-none bg-gradient-to-b from-void/80 to-transparent" />

      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-void/90 backdrop-blur-xl border-b border-accent-dim/20 shadow-lg shadow-void/50'
            : 'bg-transparent'
        }`}
      >
        <div className="flex items-center justify-between px-6 lg:px-12 h-16">

          {/* Logo */}
          <div className="flex items-center gap-2">
            <img
              src="https://gour.io/assests/gour-logo-nav-white.svg"
              alt="Gour Logo"
              className="h-8 w-auto"
            />
            <span className="text-white font-display text-xl font-normal tracking-wide">
              Agency
            </span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8 font-mono text-xs uppercase tracking-widest text-white/70">
            <button onClick={() => scrollTo('capabilities')} className="hover:text-accent-core hover:drop-shadow-[0_0_8px_#00E34A60] transition-all duration-200">
              Services
            </button>
            <button onClick={() => scrollTo('telemetry')} className="hover:text-accent-core hover:drop-shadow-[0_0_8px_#00E34A60] transition-all duration-200">
              AI Agents
            </button>
            <button onClick={() => scrollTo('saas')} className="hover:text-accent-core hover:drop-shadow-[0_0_8px_#00E34A60] transition-all duration-200">
              SaaS
            </button>
            <button onClick={() => scrollTo('mobile')} className="hover:text-accent-core hover:drop-shadow-[0_0_8px_#00E34A60] transition-all duration-200">
              Mobile
            </button>
          </div>

          {/* CTA */}
          <div className="hidden md:block">
            <a
              href="https://cal.com/aadarsh-kumar-singh-ptvf2a/secret"
              target="_blank"
              rel="noopener noreferrer"
              className="pill-btn text-xs py-2 px-5 inline-block"
            >
              Book a Call
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <span className={`block w-5 h-0.5 bg-white transition-transform duration-300 ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block w-5 h-0.5 bg-white transition-opacity duration-300 ${mobileOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-5 h-0.5 bg-white transition-transform duration-300 ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="md:hidden bg-void/96 backdrop-blur-xl border-b border-accent-dim/20 px-6 pt-2 pb-8">
            <div className="flex flex-col gap-5 font-mono text-sm uppercase tracking-widest">
              <button onClick={() => scrollTo('capabilities')} className="text-left text-white/70 hover:text-accent-core transition-colors">
                Services
              </button>
              <button onClick={() => scrollTo('telemetry')} className="text-left text-white/70 hover:text-accent-core transition-colors">
                AI Agents
              </button>
              <button onClick={() => scrollTo('saas')} className="text-left text-white/70 hover:text-accent-core transition-colors">
                SaaS
              </button>
              <button onClick={() => scrollTo('mobile')} className="text-left text-white/70 hover:text-accent-core transition-colors">
                Mobile
              </button>
              <a
                href="https://cal.com/aadarsh-kumar-singh-ptvf2a/secret"
                target="_blank"
                rel="noopener noreferrer"
                className="pill-btn text-xs py-2 px-5 inline-block w-fit mt-1"
              >
                Book a Call
              </a>
            </div>
          </div>
        )}
      </nav>
    </>
  )
}
