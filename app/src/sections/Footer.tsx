export default function Footer() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer id="footer" className="relative border-t border-accent-dim/20 overflow-hidden">

      {/* Ambient glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-accent-core/5 blur-[120px] pointer-events-none" />

      {/* ── Main footer body ── */}
      <div className="relative px-6 lg:px-12 pt-20 pb-12 max-w-7xl mx-auto">

        {/* Top: big tagline */}
        <div className="mb-16 border-b border-accent-dim/10 pb-14">
          <p className="font-mono text-[10px] uppercase tracking-widest text-accent-core/60 mb-4">— Gour Agency</p>
          <h2
            className="font-display font-extrabold uppercase text-text-primary"
            style={{ fontSize: 'clamp(40px, 7vw, 100px)', lineHeight: 0.9, letterSpacing: '-0.03em' }}
          >
            LET'S BUILD
            <br />
            <span style={{ color: '#00E34A' }}>SOMETHING</span>
            <br />
            GREAT.
          </h2>
        </div>

        {/* Middle grid: Logo | Services | Get in touch */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-8 mb-16">

          {/* Col 1 — GOUR wordmark fully visible in green */}
          <div className="flex flex-col gap-6">
            {/* Filled green GOUR — always visible, no animation dependency */}
            <div className="flex items-center gap-3">
              <span
                className="font-display font-extrabold uppercase leading-none"
                style={{ fontSize: 'clamp(52px, 6vw, 80px)', color: '#00E34A', letterSpacing: '-0.04em' }}
              >
                GOUR
              </span>
              <span
                className="font-display font-light uppercase leading-none text-white/30"
                style={{ fontSize: 'clamp(52px, 6vw, 80px)', letterSpacing: '-0.04em' }}
              >
                /
              </span>
            </div>
            <p className="font-mono text-xs text-text-muted leading-relaxed max-w-[220px]">
              We build AI agents, SaaS platforms, and mobile apps that help businesses grow faster.
            </p>
            {/* Status pill */}
            <div className="flex items-center gap-2 border border-accent-dim/30 rounded-full px-3 py-1.5 w-fit">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-core opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-core" />
              </span>
              <span className="font-mono text-[10px] uppercase tracking-widest text-accent-core">
                Taking new projects
              </span>
            </div>
          </div>

          {/* Col 2 — Services */}
          <div>
            <p className="font-mono text-[10px] uppercase tracking-widest text-text-muted mb-6">Services</p>
            <div className="flex flex-col gap-4">
              {[
                { label: 'AI Agents & Automation', id: 'telemetry' },
                { label: 'Custom SaaS & Web Apps', id: 'saas' },
                { label: 'Mobile App Development', id: 'mobile' },
                { label: 'All Services', id: 'capabilities' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className="font-mono text-sm text-text-primary/70 uppercase tracking-widest text-left hover:text-accent-core transition-colors group flex items-center gap-2"
                >
                  <span className="text-accent-core/0 group-hover:text-accent-core transition-colors text-xs">→</span>
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Col 3 — Get in touch */}
          <div>
            <p className="font-mono text-[10px] uppercase tracking-widest text-text-muted mb-6">Get in touch</p>
            <div className="flex flex-col gap-5">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-widest text-text-muted mb-1">Location</p>
                <p className="font-mono text-sm text-text-primary/70">Based in India</p>
                <p className="font-mono text-xs text-text-muted">Building globally</p>
              </div>
              <div>
                <p className="font-mono text-[10px] uppercase tracking-widest text-text-muted mb-2">Book a call</p>
                <a
                  href="https://cal.com/aadarsh-kumar-singh-ptvf2a/secret"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pill-btn text-xs inline-block"
                >
                  BOOK A FREE CALL →
                </a>
              </div>
              <div>
                <p className="font-mono text-[10px] uppercase tracking-widest text-text-muted mb-2">Response time</p>
                <p className="font-mono text-sm text-accent-core">Within 48 hours</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-accent-dim/10 pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <img
                src="https://gour.io/assests/gour-logo-nav-white.svg"
                alt="Gour Logo"
                className="h-5 w-auto opacity-50"
              />
              <span className="font-mono text-[10px] text-text-muted uppercase tracking-widest">
                © 2026 Do4SelfSolutions LLC. All rights reserved.
              </span>
            </div>
            <span className="font-mono text-[10px] text-text-muted/50 tracking-wide pl-0.5">
              Gour Agency is a brand of Do4SelfSolutions LLC · Registered in the United States
            </span>
          </div>
          <span className="font-mono text-[10px] text-text-muted uppercase tracking-widest shrink-0">
            India · Remote · Global
          </span>
        </div>
      </div>
    </footer>
  )
}
