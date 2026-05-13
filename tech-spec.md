# Tech Spec — Gour Agency

## Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| react | ^19.0 | UI framework |
| react-dom | ^19.0 | DOM renderer |
| gsap | ^3.12 | Core animation engine (ScrollTrigger, Flip plugins) |
| tailwindcss | ^4.0 | Utility-first CSS |
| @tailwindcss/vite | ^4.0 | Tailwind Vite integration |
| typescript | ^5.7 | Type safety |
| vite | ^6.0 | Build tool |
| @vitejs/plugin-react | ^4.4 | React fast refresh for Vite |

## Component Inventory

### Layout
- **Navigation** — Fixed top bar. Logo left, nav links center (desktop), contact CTA right. Collapses to hamburger on mobile.
- **Footer** — Split layout: animated SVG logo (left), link column + status message (right).

### Sections
- **Hero** — Full-viewport section. Hosts the AcousticRadiationCanvas as background, headline at bottom.
- **Capabilities** — 400vh scroll section. Sticky inner container holds the DimensionalWobbleGrid background with a frosted glass overlay panel in the center.
- **DeepTelemetry** — Two-column editorial grid with offset vertical positioning. Left: DeepZoomHover image. Right: code-styled text block with ambient glow.
- **TerminalVelocity** — Full-bleed velocity marquee section. Hosts the SVG distortion filter and 15 alternating marquee rows.
- **DataAtRest** — 3-column dense CSS grid. Card 1: InteractiveTextDensityGrid. Card 2: Looping video. Card 3: Brutalist typography card.

### Reusable Components
- **PillButton** — 500px radius CTA. Hover: instant bg swap to accent-core, text to black.
- **GlassPanel** — `backdrop-blur-xl` + `bg-black/60` + 1px `accent-dim/20` border. Used as overlay containers.

### Core Effects (Individual Components)
- **AcousticRadiationCanvas** — Raw WebGL implementation. Own canvas element, custom vertex/fragment shaders, mouse tracking via refs (no React re-renders). Imperative RAF loop.
- **DimensionalWobbleGrid** — GSAP ScrollTrigger-driven 3D grid. Two image layers, staggered random transforms, wobble tween toggled by scroll state callbacks.
- **VelocityScrollMarquee** — 15 row elements with GSAP Flip-based marquee + ScrollTrigger onUpdate driving SVG feDisplacementMap/feGaussianBlur attributes.
- **InteractiveTextDensityGrid** — 800 character spans in a 50x16 grid. Custom RAF loop updating translate3d, character cycling, Z-depth based on mouse proximity.
- **IdentitySequence** — SVG with stroke-dasharray animation. Two-layer stroke: grey base + green reveal, clipped to text outlines. Pure CSS animation.

## Animation Implementation

| Animation | Library | Approach | Complexity |
|-----------|---------|----------|------------|
| Acoustic Radiation Canvas | Raw WebGL | Single-pass fragment shader, RAF loop, mouse uniforms via refs | High |
| Dimensional Wobble Grid | GSAP + ScrollTrigger | ScrollTrigger scrub timeline + wobble tween toggled by onEnter/onLeave callbacks | High |
| Velocity Scroll Marquee | GSAP ScrollTrigger + Flip | ScrollTrigger onUpdate mutates SVG filter stdDeviation/scale; timeScale drives row timelines | High |
| Interactive Text Density Grid | Custom RAF | Direct DOM manipulation in requestAnimationFrame loop, mouse position in grid space | High |
| Identity Sequence (SVG stroke) | CSS | stroke-dasharray/dashoffset with CSS keyframes, staggered via animation-delay | Low |
| Deep Zoom Hover | GSAP | mouseenter/mouseleave event listeners tween scale to 1.4/1.0 | Low |
| Navigation / Buttons | CSS transitions | Hover state swaps via Tailwind transition utilities | Low |

## State & Logic Plan

### Raw WebGL in React (AcousticRadiationCanvas)
This component manages its own render loop imperatively. All mouse state (position, velocity) is stored in a single `useRef` object. The `requestAnimationFrame` loop reads directly from the ref and updates WebGL uniforms without triggering React re-renders. Cleanup must dispose of the WebGL context and cancel the RAF on unmount.

### GSAP ScrollTrigger Coordination (DimensionalWobbleGrid)
Two GSAP instances must coordinate: the scrub timeline handles scroll-driven convergence, a separate wobble tween handles idle oscillation. The wobble tween must not be created with `repeat: -1` initially — it gets that flag plus a `restart()` call inside the scrub timeline's `onComplete` callback. This prevents the wobble from playing during the scroll phase.

### SVG Filter Mutation (VelocityScrollMarquee)
The SVG `feGaussianBlur` and `feDisplacementMap` primitives are updated via direct DOM `setAttribute` calls inside ScrollTrigger's `onUpdate`. This bypasses React's virtual DOM. The filter elements are referenced by ID and mutated imperatively.

## Other Key Decisions

- **No shadcn/ui components** — The design is entirely bespoke with no standard UI patterns (forms, dialogs, tables). All components are custom-built.
- **Font loading** — Inter Tight and JetBrains Mono loaded via Google Fonts link in `index.html`.
- **Asset strategy** — All generated images and video are placed in `/public/assets/` and referenced by static path.
