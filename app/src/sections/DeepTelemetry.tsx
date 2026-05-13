import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const STEPS = [
  { icon: '◎', label: 'Trigger', desc: 'Event, schedule, or API call fires the agent' },
  { icon: '◈', label: 'Reason', desc: 'LLM reads context, decides the next action' },
  { icon: '◉', label: 'Execute', desc: 'Agent calls tools, APIs, sends emails, writes data' },
  { icon: '✦', label: 'Report', desc: 'Logs outcome, escalates exceptions to a human' },
]

const USECASES = [
  'Support agent that resolves 80% of tickets without human intervention',
  'Outbound agent that researches, drafts & sends personalised emails at scale',
  'Internal ops agent that routes tasks, updates CRMs & generates reports',
  'Onboarding agent that guides new users through setup flows around the clock',
]

/*
  IMAGE RECOMMENDATION — replace /assets/neural-network.jpg with:
  ✦ A dark-themed screenshot of a chat/agent UI showing AI responses
  ✦ OR an abstract glowing neural network / brain mesh on black background
  ✦ OR a split-screen: user prompt on left, AI executing tasks on right
  Search: "AI agent dashboard dark UI", "LLM automation interface dark"
  Ideal aspect ratio: 4:3 or 16:9 landscape
*/

export default function DeepTelemetry() {
  const imgRef = useRef<HTMLDivElement>(null)
  const stepsRef = useRef<HTMLDivElement>(null)

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
    <section id="telemetry" className="relative py-24 lg:py-40 px-6 lg:px-12 border-t border-accent-dim/10">
      <div className="max-w-7xl mx-auto">
        {/* Service badge */}
        <div className="flex items-center gap-4 mb-16">
          <span className="font-mono text-[10px] text-accent-core/60 uppercase tracking-widest border border-accent-dim/30 px-3 py-1.5 rounded-full">
            Service 01
          </span>
          <div className="flex-1 h-px bg-accent-dim/20" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left — Image */}
          <div className="lg:sticky lg:top-28">
            <div
              ref={imgRef}
              className="overflow-hidden rounded-lg border border-accent-dim/20 relative"
              style={{ aspectRatio: '4/3' }}
            >
              <img
                src="/assets/neural-network.jpg"
                alt="AI Agent Automation"
                className="w-full h-full object-cover"
                style={{ transform: 'scale(1)' }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-void/60 via-transparent to-transparent" />
              <div className="absolute top-4 left-4 flex items-center gap-2 glass-panel px-3 py-1.5 rounded-full">
                <div className="w-1.5 h-1.5 rounded-full bg-accent-core animate-pulse" />
                <span className="font-mono text-[10px] text-accent-core uppercase tracking-widest">Agent Active</span>
              </div>
            </div>

            {/* Agent stats */}
            <div className="mt-4 grid grid-cols-3 gap-3">
              {[
                { val: '24/7', lbl: 'Always on' },
                { val: '<2s', lbl: 'Response time' },
                { val: '80%', lbl: 'Ticket deflection' },
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
              AI AGENTS
              <br />&amp; AUTOMATION
            </h2>
            <p className="mt-6 text-text-muted leading-relaxed text-base lg:text-lg max-w-lg">
              Stop paying people to do tasks a machine does better at 1/10th the cost. We build agents that read, reason, and execute across your entire operation — 24 hours a day, without error, without burnout.
            </p>

            {/* How it works */}
            <div ref={stepsRef} className="mt-10 space-y-3">
              <p className="font-mono text-[10px] text-text-muted uppercase tracking-widest mb-5">— How the agent loop works</p>
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
              {['OpenAI', 'Anthropic', 'LangChain', 'n8n', 'Make.com', 'Zapier', 'Custom LLMs', 'Webhooks'].map((tag) => (
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
                AUTOMATE MY WORKFLOW →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
