import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const GRID_IMAGES_1 = [
  '/assets/hero-bg.jpg',
  '/assets/server-rack.jpg',
  '/assets/neural-network.jpg',
  '/assets/code-reflection.jpg',
  '/assets/android-face.jpg',
  '/assets/hero-bg.jpg',
  '/assets/server-rack.jpg',
  '/assets/neural-network.jpg',
  '/assets/code-reflection.jpg',
  '/assets/android-face.jpg',
  '/assets/hero-bg.jpg',
  '/assets/server-rack.jpg',
  '/assets/neural-network.jpg',
  '/assets/code-reflection.jpg',
  '/assets/android-face.jpg',
  '/assets/hero-bg.jpg',
]

const GRID_IMAGES_2 = [
  '/assets/android-face.jpg',
  '/assets/neural-network.jpg',
  '/assets/code-reflection.jpg',
  '/assets/hero-bg.jpg',
  '/assets/server-rack.jpg',
  '/assets/android-face.jpg',
  '/assets/neural-network.jpg',
  '/assets/code-reflection.jpg',
  '/assets/hero-bg.jpg',
  '/assets/server-rack.jpg',
  '/assets/android-face.jpg',
  '/assets/neural-network.jpg',
  '/assets/code-reflection.jpg',
  '/assets/hero-bg.jpg',
  '/assets/server-rack.jpg',
  '/assets/android-face.jpg',
]

export default function Capabilities() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const gridWrapRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const gridWrap = gridWrapRef.current
    const grid = gridRef.current
    if (!section || !gridWrap || !grid) return

    const items = gsap.utils.toArray<HTMLElement>('.grid__item')
    if (!items.length) return

    const winsize = { width: window.innerWidth, height: window.innerHeight }
    const maxY = 0.5 * winsize.height

    // Set initial 3D state
    gsap.set(items, {
      transformOrigin: '50% 0%',
      translateZ: () => gsap.utils.random(-6000, -2000),
      rotateX: () => gsap.utils.random(-65, -25),
      scale: () => gsap.utils.random(2, 5),
    })

    // Scroll-driven convergence timeline
    const scrollTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: grid,
        start: 'top top+=5%',
        end: 'bottom top',
        scrub: true,
      },
    })

    scrollTimeline.to(items, {
      ease: 'power1',
      yPercent: () => gsap.utils.random(-100, 100),
      rotateY: -720,
      scale: 0.5,
      stagger: 0.005,
    })

    // Wobble tween
    const wobbleTargets = [gridWrap, ...items]
    const wobbleTween = gsap.to(wobbleTargets, {
      duration: 1.5,
      ease: 'sine',
      yPercent: () => gsap.utils.random(-maxY * 0.25, maxY * 0.25),
      rotationZ: () => gsap.utils.random(-3, 3),
      paused: true,
    })

    const convergeTween = gsap.to(wobbleTargets, {
      duration: 1.5,
      ease: 'sine',
      yPercent: 0,
      rotationZ: 0,
      paused: true,
    })

    scrollTimeline.eventCallback('onComplete', () => {
      wobbleTween.repeat(-1).yoyo(true)
      wobbleTween.restart()
      convergeTween.restart()
    })

    scrollTimeline.eventCallback('onReverseComplete', () => {
      wobbleTween.pause()
    })

    const st = scrollTimeline.scrollTrigger
    if (st) {
      st.vars.onEnter = () => wobbleTween.play()
      st.vars.onEnterBack = () => wobbleTween.play()
      st.vars.onLeave = () => wobbleTween.pause()
      st.vars.onLeaveBack = () => wobbleTween.pause()
    }

    return () => {
      scrollTimeline.kill()
      wobbleTween.kill()
      convergeTween.kill()
    }
  }, [])

  return (
    <section id="capabilities" ref={sectionRef} className="relative" style={{ height: '400vh' }}>
      <div className="sticky top-0 h-screen overflow-hidden" style={{ perspective: '1000px' }}>
        <div
          ref={gridWrapRef}
          className="absolute inset-0 flex items-center justify-center"
          style={{ transformStyle: 'preserve-3d' }}
        >
          <div
            ref={gridRef}
            className="grid grid-cols-4 gap-3 w-[200%] h-[200%] absolute"
            style={{ transformStyle: 'preserve-3d' }}
          >
            {GRID_IMAGES_1.map((img, i) => (
              <div
                key={`g1-${i}`}
                className="grid__item relative overflow-hidden"
                style={{ transformStyle: 'preserve-3d', backfaceVisibility: 'hidden' }}
              >
                <div
                  className="grid__item-inner w-full h-full"
                  style={{
                    backgroundImage: `url(${img})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backfaceVisibility: 'hidden',
                    minHeight: '200px',
                  }}
                />
              </div>
            ))}
            {GRID_IMAGES_2.map((img, i) => (
              <div
                key={`g2-${i}`}
                className="grid__item relative overflow-hidden"
                style={{ transformStyle: 'preserve-3d', backfaceVisibility: 'hidden' }}
              >
                <div
                  className="grid__item-inner w-full h-full"
                  style={{
                    backgroundImage: `url(${img})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backfaceVisibility: 'hidden',
                    minHeight: '200px',
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Frosted glass overlay */}
        <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
          <div className="glass-panel p-8 lg:p-12 max-w-3xl w-full mx-4 pointer-events-auto">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1.5 h-1.5 rounded-full bg-accent-core animate-pulse" />
              <span className="font-mono text-xs text-accent-core uppercase tracking-widest">
                Gour Agency — 3 Services
              </span>
            </div>
            <h2
              className="font-display font-extrabold uppercase text-text-primary"
              style={{ fontSize: 'clamp(28px, 4vw, 52px)', lineHeight: 1.0, letterSpacing: '-0.02em' }}
            >
              WE BUILD.
              <br />YOU SCALE.
            </h2>

            <div className="mt-8 grid grid-cols-1 gap-4">
              {[
                {
                  num: '01',
                  id: 'telemetry',
                  title: 'AI Agents & Automation',
                  desc: 'Custom agents that handle your ops, support & outreach — 24/7, without headcount.',
                },
                {
                  num: '02',
                  id: 'saas',
                  title: 'Custom SaaS & Web Apps',
                  desc: 'Full-stack platforms from MVP to scale. Shipped in weeks, built to last years.',
                },
                {
                  num: '03',
                  id: 'mobile',
                  title: 'Mobile App Development',
                  desc: 'iOS & Android, simultaneously. Apps built for retention, performance & store approval.',
                },
              ].map((s) => (
                <button
                  key={s.num}
                  onClick={() => {
                    const el = document.getElementById(s.id)
                    if (el) el.scrollIntoView({ behavior: 'smooth' })
                  }}
                  className="flex items-start gap-4 text-left group p-4 rounded-lg border border-transparent hover:border-accent-dim/30 hover:bg-white/5 transition-all duration-200"
                >
                  <span className="font-mono text-xs text-accent-core/60 mt-0.5 shrink-0 group-hover:text-accent-core transition-colors">{s.num}</span>
                  <div>
                    <p className="font-display font-bold uppercase text-text-primary text-base group-hover:text-accent-core transition-colors tracking-tight">
                      {s.title}
                    </p>
                    <p className="font-mono text-xs text-text-muted mt-1 leading-relaxed">
                      {s.desc}
                    </p>
                  </div>
                  <svg className="ml-auto shrink-0 opacity-0 group-hover:opacity-100 transition-opacity mt-1" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#00E34A" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </button>
              ))}
            </div>

            <div className="mt-6 pt-6 border-t border-accent-dim/20">
              <a
                href="https://cal.com/aadarsh-kumar-singh-ptvf2a/secret"
                target="_blank"
                rel="noopener noreferrer"
                className="pill-btn inline-block text-xs"
              >
                BOOK A FREE CALL →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
