import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const STEPS = [
  { icon: '◎', label: 'UI/UX Design', desc: 'Native-feel screens, smooth gestures, and intuitive flows designed for thumbs, not cursors.' },
  { icon: '◈', label: 'Cross-Platform Build', desc: 'One codebase. Both stores. React Native delivers true native performance without the double dev cost.' },
  { icon: '◉', label: 'Store Submission', desc: 'We handle the App Store and Google Play submission process — screenshots, metadata, review cycle.' },
  { icon: '✦', label: 'Launch & Maintain', desc: 'Push notifications, OTA updates, crash monitoring, and feature sprints post-launch.' },
]

const USECASES = [
  'Consumer apps with social features, feeds, and real-time messaging',
  'On-demand service apps — booking, delivery, marketplace',
  'B2B mobile tools for field teams, sales reps, and operations',
  'Companion apps that extend your existing SaaS or web platform',
]

export default function DataAtRest() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const imgRef = useRef<HTMLDivElement>(null)
  const stepsRef = useRef<HTMLDivElement>(null)

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

  return (
    <section ref={sectionRef} id="mobile" className="relative overflow-hidden border-t border-accent-dim/10">
      <div className="py-24 lg:py-40 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">

          {/* Service badge */}
          <div className="flex items-center gap-4 mb-16">
            <span className="font-mono text-[10px] text-accent-core/60 uppercase tracking-widest border border-accent-dim/30 px-3 py-1.5 rounded-full">
              Service 03
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
                  src="/assets/android-face.jpg"
                  alt="Mobile App Development"
                  className="w-full h-full object-cover"
                  style={{ transform: 'scale(1)' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-void/60 via-transparent to-transparent" />
                <div className="absolute top-4 left-4 flex items-center gap-2 glass-panel px-3 py-1.5 rounded-full">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent-core animate-pulse" />
                  <span className="font-mono text-[10px] text-accent-core uppercase tracking-widest">Both Stores Live</span>
                </div>
              </div>

              {/* Stats */}
              <div className="mt-4 grid grid-cols-3 gap-3">
                {[
                  { val: '2', lbl: 'Platforms' },
                  { val: '6 wks', lbl: 'Avg. delivery' },
                  { val: '5★', lbl: 'Store target' },
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
                MOBILE APP
                <br />DEVELOPMENT
              </h2>
              <p className="mt-6 text-text-muted leading-relaxed text-base lg:text-lg max-w-lg">
                iOS and Android, one build. We ship cross-platform mobile apps with native performance, polished UX, and a path to both app stores — in weeks not months.
              </p>

              {/* Delivery process */}
              <div ref={stepsRef} className="mt-10 space-y-3">
                <p className="font-mono text-[10px] text-text-muted uppercase tracking-widest mb-5">— Our delivery process</p>
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
                {['React Native', 'Expo', 'TypeScript', 'iOS / SwiftUI', 'Android / Jetpack', 'Firebase', 'RevenueCat', 'TestFlight'].map((tag) => (
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
                  BUILD MY APP →
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
