import React, { useEffect, useRef, useState } from 'react'
import '../../css/intro.css'


const DURATION = 1400 // ms — 실제 에셋 로드 시간에 맞춰 조정하세요

const IntroOverlay = () => {
  const [isOpen, setIsOpen] = useState(false)
  const fillRef = useRef(null)

  useEffect(() => {
    document.documentElement.classList.add('intro-lock')

    let finished = false
    let rafId

    function finish() {
      if (finished) return
      finished = true
      setIsOpen(true)
      document.documentElement.classList.remove('intro-lock')
      document.dispatchEvent(new CustomEvent('introComplete'))
    }

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (reduceMotion) {
      if (fillRef.current) fillRef.current.style.width = '100%'
      finish()
    } else {
      const start = performance.now()
      const tick = (now) => {
        const t = Math.min(1, (now - start) / DURATION)
        if (fillRef.current) fillRef.current.style.width = (t * 100) + '%'
        if (t < 1) {
          rafId = requestAnimationFrame(tick)
        } else {
          finish()
        }
      }
      rafId = requestAnimationFrame(tick)
    }

    return () => {
      if (rafId) cancelAnimationFrame(rafId)
      document.documentElement.classList.remove('intro-lock')
    }
  }, [])

  return (
    <div id="siteIntro" className={isOpen ? 'is-open' : ''}>
      <div className="intro__lockup">
        <p className="intro__eyebrow">Château de</p>
        <div className="intro__bar"><div id="introBarFill" ref={fillRef}></div></div>
        <h1 className="intro__title">Monaco</h1>
      </div>
    </div>
  )
}

export default IntroOverlay
