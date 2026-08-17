import React, { useState } from 'react'
import { useMediaQuery } from '../hooks/useMediaQuery'
import '../css/header.css'

const Header = ({ logoColor = 'green', navStatic = true, language = 'FR', onLanguageChange }) => {
  const isDesktop = useMediaQuery('(min-width: 961px)')
  const [isOpen, setIsOpen] = useState(false)

  // Toujours ouvert uniquement sur les pages desktop avec navStatic ; sinon, suit isOpen.
  const navShown = (navStatic && isDesktop) || isOpen

  const handleLogoClick = (e) => {
    // Desktop + navStatic : suit le lien sans basculer le menu.
    if (navStatic && isDesktop) return

    // Sinon (mobile ou page sans navStatic) : bascule le menu.
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
              <li><a href="/Chateau-de-Monaco/index.html"><span>ACCUEIL</span></a></li>
              <li><a href="/Chateau-de-Monaco/stay/index.html"><span>SÉJOUR</span></a></li>
              <li><a href="/Chateau-de-Monaco/experiences/experiences-fr.html"><span>EXPÉRIENCES</span></a></li>
              <li><a href="/Chateau-de-Monaco/location/location-fr.html"><span>LOCALISATION</span></a></li>
              <li><a href="/Chateau-de-Monaco/reservation/reservation-fr.html"><span>RÉSERVATION</span></a></li>
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
