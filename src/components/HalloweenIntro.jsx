import { useEffect, useMemo, useState } from 'react'
import './HalloweenIntro.css'

const TOTAL_MS = 11000

// Genera un rayo zigzag en coordenadas 0-100
function makeBolt(seed) {
  let x = 20 + ((seed * 37) % 60)
  let y = 0
  const pts = [`${x},${y}`]
  const branches = []
  while (y < 100) {
    y += 6 + ((seed * (y + 3)) % 7)
    x += (((seed * 13 + y * 7) % 11) - 5) * 1.6
    pts.push(`${x.toFixed(1)},${Math.min(y, 100)}`)
    if (y > 20 && y < 70 && (seed + Math.round(y)) % 4 === 0) {
      const bx = x + (seed % 2 ? 12 : -12)
      branches.push(`${x.toFixed(1)},${y} ${((x + bx) / 2).toFixed(1)},${y + 6} ${bx.toFixed(1)},${y + 14}`)
    }
  }
  return { main: pts.join(' '), branches }
}

function Bat({ style }) {
  return (
    <svg className="hw-bat" style={style} viewBox="0 0 120 60" aria-hidden="true">
      <g className="hw-bat-body">
        <path className="hw-wing hw-wing-l" d="M60 30 C50 18 38 12 22 14 C28 20 26 26 18 28 C8 26 4 30 0 34 C14 34 22 40 26 46 C32 40 42 40 48 44 C50 38 54 34 60 32 Z" />
        <path className="hw-wing hw-wing-r" d="M60 30 C70 18 82 12 98 14 C92 20 94 26 102 28 C112 26 116 30 120 34 C106 34 98 40 94 46 C88 40 78 40 72 44 C70 38 66 34 60 32 Z" />
        <ellipse cx="60" cy="33" rx="6" ry="9" />
        <path d="M55 25 L56 18 L59 24 M65 25 L64 18 L61 24" />
        <circle cx="57.5" cy="28" r="1.1" fill="#ff8a3d" />
        <circle cx="62.5" cy="28" r="1.1" fill="#ff8a3d" />
      </g>
    </svg>
  )
}

export default function HalloweenIntro({ onFinish }) {
  const [closing, setClosing] = useState(false)
  const [gone, setGone] = useState(false)

  const bats = useMemo(
    () =>
      Array.from({ length: 34 }, (_, i) => {
        const angle = (i * 137.5 * Math.PI) / 180
        const dist = 30 + (i % 5) * 18
        return {
          '--tx': `${Math.cos(angle) * dist}vmax`,
          '--ty': `${Math.sin(angle) * dist * 0.8}vmax`,
          '--rot': `${(i % 7) * 8 - 24}deg`,
          left: `${42 + ((i * 17) % 16)}%`,
          top: `${36 + ((i * 11) % 18)}%`,
          animationDelay: `${1.2 + (i % 12) * 0.18}s`,
          animationDuration: `${1.8 + (i % 4) * 0.35}s`,
        }
      }),
    []
  )

  const bolts = useMemo(() => [makeBolt(7), makeBolt(11), makeBolt(23)], [])

  const finish = () => {
    if (closing) return
    setClosing(true)
    setTimeout(() => {
      setGone(true)
      onFinish && onFinish()
    }, 900)
  }

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    const t = setTimeout(finish, TOTAL_MS)
    return () => {
      clearTimeout(t)
      document.body.style.overflow = ''
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (gone) document.body.style.overflow = ''
  }, [gone])

  if (gone) return null

  return (
    <div className={`hw-intro ${closing ? 'hw-closing' : ''}`} role="dialog" aria-label="Intro de Halloween Listo Patrón">
      <div className="hw-stars" />
      <div className="hw-fog" />

      {/* Luna = logo Listo Patrón */}
      <div className="hw-moon-wrap">
        <div className="hw-moon">
          <div className="hw-moon-craters" />
          <img src="./assets/logo_listo_blanco.png" alt="Listo Patrón" className="hw-moon-logo" />
        </div>
      </div>

      {/* Silueta de bosque + calabazas */}
      <svg className="hw-ground" viewBox="0 0 1000 300" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0 300 L0 170 L30 120 L45 160 L70 80 L95 150 L120 110 L140 170 L170 60 L195 150 L230 130 L260 175 L290 100 L310 160 L340 190 L380 185 L620 185 L660 190 L690 150 L710 90 L735 160 L770 120 L800 170 L830 50 L860 150 L885 110 L905 165 L930 75 L955 150 L980 120 L1000 160 L1000 300 Z" />
      </svg>
      <div className="hw-pumpkins" aria-hidden="true">
        <span>🎃</span><span>🎃</span><span>🎃</span><span>🎃</span><span>🎃</span>
      </div>

      {/* Murciélagos volando hacia la cámara */}
      <div className="hw-bats">
        {bats.map((s, i) => (
          <Bat key={i} style={s} />
        ))}
      </div>

      {/* Pantalla negra */}
      <div className="hw-blackout" />

      {/* Rayos mamey */}
      <div className="hw-flash" />
      {bolts.map((b, i) => (
        <svg key={i} className={`hw-bolt hw-bolt-${i}`} viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          <polyline points={b.main} />
          {b.branches.map((br, j) => (
            <polyline key={j} points={br} className="hw-branch" />
          ))}
        </svg>
      ))}

      {/* Texto final */}
      <div className="hw-text">
        <h2 className="hw-title">
          Bienvenidos a <span>Listo Patrón</span>
        </h2>
        <p className="hw-sub">🎃 Feliz Halloween 🦇</p>
      </div>

      <button className="hw-skip" onClick={finish} id="halloween-intro-skip">
        Saltar ›
      </button>
    </div>
  )
}
