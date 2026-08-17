import React, { useState } from 'react'
import { useMediaQuery } from '../hooks/useMediaQuery'
import '../css/header.css'

const Header = ({ logoColor = 'green', navStatic = true, language = 'EN', onLanguageChange }) => {
  const isDesktop = useMediaQuery('(min-width: 961px)')
  const [isOpen, setIsOpen] = useState(false)

  // Always open only on desktop pages with navStatic; otherwise follow isOpen.
  const navShown = (navStatic && isDesktop) || isOpen

  const handleLogoClick = (e) => {
    // Desktop + navStatic: follow the link without toggling.
    if (navStatic && isDesktop) return

    // Otherwise (mobile or a page without navStatic): toggle.
    e.preventDefault()
    setIsOpen((prev) => !prev)
  }

  return (
    <header id="header" className={navStatic ? 'change' : ''}>
      <div className="container">
        <header className="header">
          <h1 className="logo">
            <a href="/" onClick={handleLogoClick}>
              <img src={`${import.meta.env.BASE_URL}img/logo_${logoColor}.png`} alt="로고이미지" />
            </a>
          </h1>
          <nav className={`nav ${navShown ? 'nav_open' : ''}`}>
            <ul>
              <li><a href="/Chateau-de-Monaco/index.html"><span>HOME</span></a></li>
              <li><a href="/Chateau-de-Monaco/stay/stay-en.html"><span>STAY</span></a></li>
              <li><a href="/Chateau-de-Monaco/experiences/experiences-en.html"><span>EXPERIENCES</span></a></li>
              <li><a href="/Chateau-de-Monaco/location/location-en.html"><span>LOCATION</span></a></li>
              <li><a href="/Chateau-de-Monaco/reservation/reservation-en.html"><span>RESERVATION</span></a></li>
            </ul>
            <div className="translate">
              <select
                className="nation"
                value={language}
                onChange={(e) => onLanguageChange && onLanguageChange(e.target.value)}
              >
                <option value="KO">KO</option>
                <option value="EN">EN</option>
                <option value="FR">FR</option>
              </select>
            </div>
          </nav>
        </header>
      </div>
    </header>
  )
}

export default Header
