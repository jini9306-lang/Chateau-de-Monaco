import React, { useState } from 'react'
import { useMediaQuery } from '../hooks/useMediaQuery'
import '../css/header.css'


const Header = ({ logoColor = 'green', navStatic = true }) => {
  const isDesktop = useMediaQuery('(min-width: 961px)')
  const [isOpen, setIsOpen] = useState(false)

  // 데스크탑 + navStatic 페이지만 "항상 열림", 그 외엔 isOpen 상태를 따름
  const navShown = (navStatic && isDesktop) || isOpen

  const handleLogoClick = (e) => {
    // 데스크탑 + navStatic: 토글할 필요 없이 그냥 링크로 이동
    if (navStatic && isDesktop) return

    // 그 외(모바일이거나, navStatic이 아닌 페이지): 토글
    e.preventDefault()
    setIsOpen((prev) => !prev)
  }

  return (
    <header id="header" className={navStatic ? 'change' : ''}>
      <div className="container">
        <header className="header">
          <h1 className="logo">
              <button type="button" onClick={handleLogoClick}>
                <img
                  src={`${import.meta.env.BASE_URL}img/logo_${logoColor}.png`}
                  alt="로고이미지"
                />
              </button>
          </h1>
          <nav className={`nav ${navShown ? 'nav_open' : ''}`}>
            <ul>
              <li><a href={`${import.meta.env.BASE_URL}index/html`}><span>HOME</span></a></li>
              <li><a href="/Chateau-de-Monaco/stay/"><span>STAY</span></a></li>
              <li><a href="/Chateau-de-Monaco/experiences/"><span>EXPERIENCES</span></a></li>
              <li><a href="/Chateau-de-Monaco/location/"><span>LOCATION</span></a></li>
              <li><a href="/Chateau-de-Monaco/reservation/"><span>RESERVATION</span></a></li>
            </ul>
            <div className="translate">
              <select className="nation" defaultValue="KO">
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
