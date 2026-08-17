import React, { useState } from 'react'
import './css/font.css'
import './css/vars.css'
import './css/common.css'
import './App.css'
import Header from './assets/components/Header'
import HeaderEn from './assets/components/Header-en'
import HeaderFr from './assets/components/Header-fr'
import Footer from './assets/components/Footer'
import FooterEn from './assets/components/Footer-en'
import FooterFr from './assets/components/Footer-fr'
import IntroOverlay from './assets/components/IntroOverlay'
import StayPage from './assets/pages/StayPage'
import facilitiesKo from './assets/data/facilities.json'
import facilitiesEn from './assets/data/facilities-en.json'
import facilitiesFr from './assets/data/facilities-fr.json'

const App = () => {
  const [language, setLanguage] = useState(
    () => localStorage.getItem('siteLanguage') || 'KO'
  )

  const handleLanguageChange = (lang) => {
    setLanguage(lang)
    localStorage.setItem('siteLanguage', lang)
  }

  const languageContent = {
    KO: { HeaderComponent: Header, FooterComponent: Footer, facilities: facilitiesKo },
    EN: { HeaderComponent: HeaderEn, FooterComponent: FooterEn, facilities: facilitiesEn },
    FR: { HeaderComponent: HeaderFr, FooterComponent: FooterFr, facilities: facilitiesFr }
  }

  const { HeaderComponent, FooterComponent, facilities } = languageContent[language]

  return (
    <>
      <IntroOverlay />

      <HeaderComponent language={language} onLanguageChange={setLanguage} />

      <StayPage facilities={facilities.facilities} />

      <FooterComponent />
    </>
  )
}

export default App
