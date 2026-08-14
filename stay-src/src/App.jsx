import React from 'react'
import { Route, Routes } from 'react-router-dom'
import './css/font.css'
import './css/vars.css'
import './css/common.css'
import './App.css'
import Header from './assets/components/Header'
import Footer from './assets/components/Footer'
import IntroOverlay from './assets/components/IntroOverlay'
import StayPage from './assets/pages/StayPage'

const App = () => {
  return (
    <>
      <IntroOverlay />

      <Header />

      <StayPage />

      <Footer />
    </>
  )
}

export default App
