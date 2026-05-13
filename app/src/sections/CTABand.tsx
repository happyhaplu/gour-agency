import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function CTABand() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const btnRef = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const headline = headlineRef.current
    const btn = btnRef.current
    if (!section || !headline || !btn) return

    gsap.fromTo(
      headline,
      { opacity: 0, y: 60 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 75%',
        },
      }
    )
    gsap.fromTo(
      btn,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'expo.out',
        delay: 0.25,
        scrollTrigger: {
          trigger: section,
          start: 'top 75%',
        },
      }
    )

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill())
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      id="book-call"
      className="relative py-32 lg:py-48 px-6 lg:px-12 overflow-hidden border-t border-accent-dim/20"
    >
      {/* Ambient glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(0,227,74,0.07) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-5xl mx-auto text-center relative z-10">
        {/* Tag */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="w-1.5 h-1.5 rounded-full bg-accent-core animate-pulse" />
          <span className="font-mono text-xs text-accent-core uppercase tracking-widest">
            Taking on new projects — limited spots per month
          </span>
          <div className="w-1.5 h-1.5 rounded-full bg-accent-core animate-pulse" />
        </div>

        {/* Headline */}
        <h2
          ref={headlineRef}
          className="font-display font-extrabold uppercase text-text-primary"
          style={{
            fontSize: 'clamp(48px, 9vw, 140px)',
            lineHeight: 0.9,
            letterSpacing: '-0.04em',
          }}
        >
          READY TO
          <br />
          <span style={{ color: '#00E34A' }}>AUTOMATE</span>
          <br />
          EVERYTHING?
        </h2>

        <p className="mt-8 text-text-muted text-base lg:text-lg leading-relaxed max-w-2xl mx-auto">
          Book a free 30-minute strategy call. We'll identify the highest-leverage thing to automate or build in your business, give you a clear scope, and tell you exactly how fast we can ship it. Zero fluff.
        </p>

        {/* CTA Button */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            ref={btnRef}
            href="https://cal.com/aadarsh-kumar-singh-ptvf2a/secret"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 font-mono text-sm uppercase tracking-widest px-10 py-5 rounded-pill transition-all duration-200"
            style={{
              background: '#00E34A',
              color: '#050505',
              fontWeight: 700,
            }}
            onMouseEnter={(e) => {
              gsap.to(e.currentTarget, { scale: 1.04, duration: 0.2, ease: 'power2.out' })
            }}
            onMouseLeave={(e) => {
              gsap.to(e.currentTarget, { scale: 1, duration: 0.2, ease: 'power2.out' })
            }}
          >
            BOOK A FREE STRATEGY CALL
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
          <span className="font-mono text-[10px] text-text-muted uppercase tracking-widest">
            Free · 30 min · No commitment
          </span>
        </div>

        {/* Stats row */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 pt-12 border-t border-accent-dim/20">
          {[
            { value: '48H', label: 'Avg. response time' },
            { value: '100%', label: 'On-time delivery' },
            { value: '3×', label: 'Avg. efficiency gain' },
            { value: '24/7', label: 'Agents running' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p
                className="font-display font-extrabold text-text-primary"
                style={{ fontSize: 'clamp(32px, 4vw, 56px)', lineHeight: 1, letterSpacing: '-0.03em' }}
              >
                {stat.value}
              </p>
              <p className="font-mono text-[10px] text-text-muted uppercase tracking-widest mt-2">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
