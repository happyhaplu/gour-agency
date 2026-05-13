import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const MARQUEE_TEXT = 'SAAS BUILD // MVP TO SCALE // API FIRST // CLEAN ARCHITECTURE // SHIP IN WEEKS // FULL STACK // ZERO DOWNTIME // BUILT TO GROW // '
const BASE_TIMINGS = [0.6, 0.85, 1.1, 0.9, 1.3, 0.7, 1.2, 0.8]

const STEPS = [
  { icon: '◎', label: 'Discovery', desc: 'We map your product, define the MVP scope, and align on architecture before writing a line of code.' },
  { icon: '◈', label: 'Design & Plan', desc: 'Wireframes, DB schema, API contracts. You see the full picture before we build.' },
  { icon: '◉', label: 'Build & Iterate', desc: 'Sprints with weekly demos. You stay in the loop — no black boxes.' },
  { icon: '✦', label: 'Launch & Scale', desc: 'CI/CD pipeline, cloud deploy, monitoring live. Your product goes live, not just "done".' },
]

const USECASES = [
  'SaaS dashboards with auth, billing (Stripe), and role-based access',
  'Internal tools that replace spreadsheets and manual ops workflows',
  'Customer portals, booking platforms, and marketplace products',
  'API backends that power mobile apps, AI agents, and third-party integrations',
]

export default function TerminalVelocity() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const rowsWrapperRef = useRef<HTMLDivElement>(null)
  const imgRef = useRef<HTMLDivElement>(null)
  const stepsRef = useRef<HTMLDivElement>(null)
  const timelinesRef = useRef<gsap.core.Timeline[]>([])

  // Image zoom on hover
  useEffect(() => {
    const el = imgRef.current
    if (!el) return
    const img = el.querySelector('img')
    if (!img) return
    const onEnter = () => gsap.to(img, { scale: 1.06, duration: 1.2, ease: 'expo.out' })
    const onLeave = () => gsap.to(img, { scale: 1, duration: 1.2, ease: 'expo.inOut' })
    el.addEventListener('mouseenter', onEnter)
    el.addEventListener('mouseleave', onLeave)
    return () => {
      el.removeEventListener('mouseenter', onEnter)
      el.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  // Stagger step animations on scroll
  useEffect(() => {
    const steps = stepsRef.current
    if (!steps) return
    const items = steps.querySelectorAll<HTMLElement>('.step-item')
    gsap.fromTo(items,
      { opacity: 0, x: -16 },
      {
        opacity: 1, x: 0, stagger: 0.1, duration: 0.6, ease: 'expo.out',
        scrollTrigger: { trigger: steps, start: 'top 80%' },
      }
    )
  }, [])

  // Marquee scroll velocity
  useEffect(() => {
    const rowsWrapper = rowsWrapperRef.current
    if (!rowsWrapper) return
    const rows = rowsWrapper.querySelectorAll<HTMLElement>('.marquee-row')
    if (!rows.length) return

    const timelines: gsap.core.Timeline[] = []
    rows.forEach((row, index) => {
      const inner = row.querySelector('.marquee-inner') as HTMLElement
      if (!inner) return
      const isLeft = index % 2 === 0
      const duration = 30 + Math.random() * 20
      const tl = gsap.timeline({ repeat: -1 })
      if (isLeft) {
        tl.fromTo(inner, { xPercent: 0 }, { xPercent: -50, duration, ease: 'none' })
      } else {
        tl.fromTo(inner, { xPercent: -50 }, { xPercent: 0, duration, ease: 'none' })
      }
      tl.timeScale(BASE_TIMINGS[index] || 1)
      ;(row as any)._timeline = tl
      timelines.push(tl)
    })
    timelinesRef.current = timelines

    const blurNode = document.getElementById('blurNode') as SVGFEGaussianBlurElement | null
    const dispNode = document.getElementById('dispNode') as SVGFEDisplacementMapElement | null

    const scrollTrigger = ScrollTrigger.create({
      trigger: rowsWrapper,
      start: 'top bottom',
      end: 'bottom top',
      onUpdate: (self) => {
        const velocity = Math.abs(self.getVelocity()) / 8000
        if (blurNode) blurNode.setAttribute('stdDeviation', (velocity * 0.015).toString())
        if (dispNode) dispNode.setAttribute('scale', (100 + velocity * 400).toString())
        const timeScale = 1.0 + (1.0 - Math.abs(self.progress - 0.5) * 2) * 4.0
        rows.forEach((row, index) => {
          const tl = (row as any)._timeline
          if (tl) tl.timeScale(timeScale * (BASE_TIMINGS[index] || 1))
        })
      },
    })

    return () => {
      scrollTrigger.kill()
      timelines.forEach(tl => tl.kill())
    }
  }, [])

  const marqueeRows = Array.from({ length: 8 }, (_, i) => i)

  return (
    <section ref={sectionRef} id="saas" className="relative overflow-hidden border-t border-accent-dim/10">

      {/* ── 2-col sticky layout ── */}
      <div className="py-24 lg:py-40 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          {/* Service badge */}
          <div className="flex items-center gap-4 mb-16">
            <span className="font-mono text-[10px] text-accent-core/60 uppercase tracking-widest border border-accent-dim/30 px-3 py-1.5 rounded-full">
              Service 02
            </span>
            <div className="flex-1 h-px bg-accent-dim/20" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            {/* Left — Sticky image + stats */}
            <div className="lg:sticky lg:top-28">
              <div
                ref={imgRef}
                className="overflow-hidden rounded-lg border border-accent-dim/20 relative"
                style={{ aspectRatio: '4/3' }}
              >
                <img
                  src="/assets/code-reflection.jpg"
                  alt="SaaS Platform Development"
                  className="w-full h-full object-cover"
                  style={{ transform: 'scale(1)' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-void/60 via-transparent to-transparent" />
                <div className="absolute top-4 left-4 flex items-center gap-2 glass-panel px-3 py-1.5 rounded-full">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent-core animate-pulse" />
                  <span className="font-mono text-[10px] text-accent-core uppercase tracking-widest">Deploy Ready</span>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-3">
                {[
                  { val: '4 wks', lbl: 'Avg. MVP time' },
                  { val: '99.9%', lbl: 'Uptime SLA' },
                  { val: '10×', lbl: 'Scale headroom' },
                ].map((s) => (
                  <div key={s.lbl} className="glass-panel p-4 rounded-lg text-center">
                    <p className="font-display font-bold text-text-primary" style={{ fontSize: 'clamp(18px, 2vw, 26px)' }}>{s.val}</p>
                    <p className="font-mono text-[9px] text-text-muted uppercase tracking-widest mt-1">{s.lbl}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — Content */}
            <div>
              <h2
                className="font-display font-extrabold uppercase text-text-primary"
                style={{ fontSize: 'clamp(36px, 4.5vw, 64px)', lineHeight: 0.95, letterSpacing: '-0.03em' }}
              >
                CUSTOM SAAS
                <br />&amp; WEB APPS
              </h2>
              <p className="mt-6 text-text-muted leading-relaxed text-base lg:text-lg max-w-lg">
                From a napkin idea to a live product generating revenue. We design, engineer, and deploy full-stack platforms with clean architecture that scales — shipped in weeks, not quarters.
              </p>

              {/* Build process */}
              <div ref={stepsRef} className="mt-10 space-y-3">
                <p className="font-mono text-[10px] text-text-muted uppercase tracking-widest mb-5">— Our build process</p>
                {STEPS.map((step) => (
                  <div key={step.label} className="step-item flex items-start gap-4 p-4 rounded-lg border border-accent-dim/15 hover:border-accent-dim/40 transition-colors">
                    <span className="text-accent-core text-lg mt-0.5 shrink-0">{step.icon}</span>
                    <div>
                      <p className="font-mono text-xs font-bold text-text-primary uppercase tracking-wide">{step.label}</p>
                      <p className="font-mono text-xs text-text-muted mt-0.5">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Use cases */}
              <div className="mt-10">
                <p className="font-mono text-[10px] text-text-muted uppercase tracking-widest mb-4">— What we build</p>
                <ul className="space-y-3">
                  {USECASES.map((uc) => (
                    <li key={uc} className="flex items-start gap-3">
                      <span className="text-accent-core mt-1 shrink-0 text-xs">→</span>
                      <span className="text-text-muted text-sm leading-relaxed">{uc}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tech tags */}
              <div className="mt-8 flex flex-wrap gap-2">
                {['React / Next.js', 'Node.js', 'Python / FastAPI', 'PostgreSQL', 'Stripe', 'AWS / Vercel', 'Docker', 'GraphQL'].map((tag) => (
                  <span key={tag} className="font-mono text-[10px] uppercase tracking-widest px-3 py-1.5 rounded-pill border border-accent-dim/30 text-text-muted hover:border-accent-core hover:text-accent-core transition-colors cursor-default">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="mt-8">
                <a
                  href="https://cal.com/aadarsh-kumar-singh-ptvf2a/secret"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pill-btn inline-block"
                >
                  SHIP MY PRODUCT →
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Animated marquee divider ── */}
      <div className="py-12 lg:py-20 border-t border-accent-dim/10 overflow-hidden">
        <svg display="none" version="1.1" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <filter id="distort" filterUnits="objectBoundingBox" primitiveUnits="userSpaceOnUse">
              <feGaussianBlur in="SourceGraphic" stdDeviation="0" result="SMOOTH" id="blurNode" />
              <feDisplacementMap in="SMOOTH" in2="SMOOTH" scale="100" xChannelSelector="R" yChannelSelector="G" result="DISPLACED" id="dispNode" />
              <feComposite operator="in" in="DISPLACED" in2="SourceGraphic" />
            </filter>
          </defs>
        </svg>
        <div ref={rowsWrapperRef} className="space-y-2">
          {marqueeRows.map((_, index) => {
            const fontSize = index % 3 === 0 ? 'text-4xl lg:text-6xl' : index % 2 === 0 ? 'text-2xl lg:text-4xl' : 'text-lg lg:text-2xl'
            return (
              <div
                key={index}
                className="marquee-row overflow-hidden whitespace-nowrap"
                style={{ filter: 'url(#distort)' }}
              >
                <div className={`marquee-inner inline-flex ${fontSize}`}>
                  {[0, 1, 2, 3].map((j) => (
                    <span key={j} className={`font-display font-bold uppercase tracking-tight px-4 ${index % 4 === 0 ? 'text-accent-core/20' : 'text-text-primary/10'}`}>
                      {MARQUEE_TEXT}
                    </span>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>

    </section>
  )
}
