import { useRef, useEffect } from 'react'

const VERTEX_SHADER = `
attribute vec2 a_pos;
void main() {
  gl_Position = vec4(a_pos, 0.0, 1.0);
}
`

const FRAGMENT_SHADER = `
precision highp float;
uniform float u_time;
uniform vec2 u_res;
uniform float u_intensity;
uniform float u_complexity;
uniform vec3 u_mouse;
uniform float u_rotationSpeed;

float hash(vec2 p) {
  vec3 p3 = fract(vec3(p.xyx) * 0.1031);
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.x + p3.y) * p3.z);
}

float vnoise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x),
    mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x),
    f.y
  );
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  mat2 rot = mat2(0.8, 0.6, -0.6, 0.8);
  for (int i = 0; i < 5; i++) {
    v += a * vnoise(p);
    p = rot * p * 2.0 + vec2(100.0);
    a *= 0.5;
  }
  return v;
}

float warpedNoise(vec2 p, float t) {
  vec2 q = vec2(
    fbm(p + t * 0.1),
    fbm(p + vec2(5.2, 1.3) + t * 0.08)
  );
  return fbm(p + 4.0 * q);
}

void main() {
  vec2 uv = (gl_FragCoord.xy - u_res * 0.5) / min(u_res.x, u_res.y);
  float r = length(uv);
  float theta = atan(uv.y, uv.x);

  float barrel = 1.0 + r * r * 0.25;
  float r_distorted = r / (1.0 + r * r * 0.3);

  float rotSpeed = u_rotationSpeed * 0.15;
  float angle = theta + rotSpeed;
  float t = u_time;

  float warpedNoiseVal = warpedNoise(vec2(r_distorted * 3.0, angle * 0.5), t * 0.2);

  float primaryRays = 0.5 + 0.5 * sin(angle * u_complexity + r_distorted * 4.0 - t * 0.5 + warpedNoiseVal * 2.0);
  primaryRays = primaryRays * primaryRays;

  float secondaryRays = pow(sin(angle * 12.0 + r_distorted * 6.0 + t * 0.3) * 0.5 + 0.5, 8.0);

  float interference = sin(angle * 48.0 + t * 0.7) * sin(r_distorted * 32.0 - t * 0.4) * 0.5 + 0.5;

  vec3 color1 = vec3(0.0, 0.89, 0.29);
  vec3 color2 = vec3(0.2, 0.8, 0.5);
  vec3 color3 = vec3(0.0, 0.3, 0.1);

  float hueShift = sin(r_distorted * 3.0 + t * 0.2) * 0.15;
  vec3 color2Shifted = color2 + vec3(hueShift, -hueShift * 0.3, hueShift * 0.2);

  vec3 color = color3;
  color = mix(color, color2Shifted, primaryRays * 0.6);
  color = mix(color, color1, secondaryRays * 0.4 * interference);

  float centerGlow = exp(-r_distorted * r_distorted * 8.0);
  color += vec3(0.5, 1.0, 0.7) * centerGlow * 1.2;

  float mouseInfluence = exp(-r * r * 4.0);
  color += vec3(0.2, 0.8, 0.4) * mouseInfluence * u_mouse.z;

  float grain = hash(gl_FragCoord.xy + fract(u_time * 43.0) * 1000.0) - 0.5;
  color += grain * 0.04;

  float vignette = 1.0 - r * r * 0.8;
  color *= max(vignette, 0.0);

  float brightBand = smoothstep(0.1, 0.5, r_distorted) * smoothstep(0.8, 0.4, r_distorted);
  color *= 0.5 + brightBand * 0.5;

  color = max(color, vec3(0.0));
  color = pow(color, vec3(0.9)) * u_intensity;

  gl_FragColor = vec4(color, 1.0);
}
`

function initWebGL(canvas: HTMLCanvasElement) {
  const gl = canvas.getContext('webgl', { alpha: false, antialias: false })
  if (!gl) return null

  function createShader(type: number, source: string) {
    const shader = gl!.createShader(type)!
    gl!.shaderSource(shader, source)
    gl!.compileShader(shader)
    return shader
  }

  const vs = createShader(gl.VERTEX_SHADER, VERTEX_SHADER)
  const fs = createShader(gl.FRAGMENT_SHADER, FRAGMENT_SHADER)
  const program = gl.createProgram()!
  gl.attachShader(program, vs)
  gl.attachShader(program, fs)
  gl.linkProgram(program)
  gl.useProgram(program)

  const posLoc = gl.getAttribLocation(program, 'a_pos')
  const buf = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, buf)
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, 1,1]), gl.STATIC_DRAW)
  gl.enableVertexAttribArray(posLoc)
  gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0)

  return {
    gl,
    uniforms: {
      u_time: gl.getUniformLocation(program, 'u_time'),
      u_res: gl.getUniformLocation(program, 'u_res'),
      u_intensity: gl.getUniformLocation(program, 'u_intensity'),
      u_complexity: gl.getUniformLocation(program, 'u_complexity'),
      u_mouse: gl.getUniformLocation(program, 'u_mouse'),
      u_rotationSpeed: gl.getUniformLocation(program, 'u_rotationSpeed'),
    },
  }
}

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: 0, y: 0, vx: 0, vy: 0, lastX: 0, lastY: 0, velocity: 0, active: 0 })
  const rafRef = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const result = initWebGL(canvas)
    if (!result) return
    const { gl, uniforms } = result

    const dpr = Math.min(window.devicePixelRatio, 2)

    function resize() {
      const w = window.innerWidth
      const h = window.innerHeight
      canvas!.width = w * dpr
      canvas!.height = h * dpr
      gl.viewport(0, 0, canvas!.width, canvas!.height)
      gl.uniform2f(uniforms.u_res, canvas!.width, canvas!.height)
    }
    resize()
    window.addEventListener('resize', resize)

    gl.uniform1f(uniforms.u_intensity, 1.2)
    gl.uniform1f(uniforms.u_complexity, 8.0)

    const handleMouseMove = (e: MouseEvent) => {
      const m = mouseRef.current
      m.x = (e.clientX / window.innerWidth) * 2 - 1
      m.y = (e.clientY / window.innerHeight) * 2 - 1
      m.vx = e.clientX - m.lastX
      m.vy = e.clientY - m.lastY
      m.velocity = Math.sqrt(m.vx * m.vx + m.vy * m.vy) / 16
      m.lastX = e.clientX
      m.lastY = e.clientY
      m.active = 1
    }
    window.addEventListener('mousemove', handleMouseMove)

    const startTime = performance.now()
    function render() {
      const t = (performance.now() - startTime) / 1000
      const m = mouseRef.current

      m.velocity *= 0.95
      if (m.velocity < 0.01) m.velocity = 0

      gl.uniform1f(uniforms.u_time, t)
      gl.uniform3f(uniforms.u_mouse, m.x, m.y, m.velocity * m.active)
      gl.uniform1f(uniforms.u_rotationSpeed, t * 0.5 + m.velocity * 2.0)

      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
      rafRef.current = requestAnimationFrame(render)
    }
    rafRef.current = requestAnimationFrame(render)

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  useEffect(() => {
    const el = document.getElementById('sys-time')
    if (!el) return
    const interval = setInterval(() => {
      const now = new Date()
      el.textContent = now.toISOString().split('T')[1].split('.')[0]
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative h-screen w-full overflow-hidden flex flex-col">
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 1,
        }}
      />

      <div className="relative z-10 flex-1 flex flex-col justify-end pb-12 lg:pb-16">
        <h1
          className="font-display font-extrabold uppercase text-text-primary select-none"
          style={{
            fontSize: 'clamp(64px, 11vw, 180px)',
            lineHeight: 0.85,
            letterSpacing: '-0.04em',
            padding: '0 0.02em',
          }}
        >
          AUTOMATE YOUR
          <br />
          <span style={{ color: '#00E34A' }}>ENTIRE</span> BUSINESS.
        </h1>

        <div className="flex items-end justify-between px-4 lg:px-8 mt-8">
          <div className="max-w-lg">
            <div className="flex items-center gap-4 mb-5">
              {['AI Agents', 'Custom SaaS', 'Mobile Apps'].map((s, i) => (
                <span key={s} className="flex items-center gap-2">
                  {i > 0 && <span className="text-accent-dim/40 text-xs">•</span>}
                  <span className="font-mono text-[10px] lg:text-xs text-text-muted uppercase tracking-widest">{s}</span>
                </span>
              ))}
            </div>
            <p className="text-text-muted text-sm lg:text-base leading-relaxed mb-6 max-w-sm">
              We build AI agents that replace headcount, SaaS platforms that print revenue, and mobile apps your users keep coming back to.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="https://cal.com/aadarsh-kumar-singh-ptvf2a/secret"
                target="_blank"
                rel="noopener noreferrer"
                className="pill-btn text-xs inline-block"
              >
                BOOK A STRATEGY CALL →
              </a>
              <button
                onClick={() => {
                  const el = document.getElementById('capabilities')
                  if (el) el.scrollIntoView({ behavior: 'smooth' })
                }}
                className="font-mono text-xs uppercase tracking-widest text-text-muted hover:text-accent-core transition-colors py-3 px-2"
              >
                SEE OUR WORK ↓
              </button>
            </div>
          </div>
          <div className="text-right hidden sm:block">
            <span className="font-mono text-xs lg:text-sm text-text-muted uppercase tracking-widest">
              SYS.RESPONSE: <span id="sys-time" className="text-accent-core">00:00:00</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
