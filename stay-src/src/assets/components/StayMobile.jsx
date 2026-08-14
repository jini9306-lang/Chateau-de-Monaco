import React, { useEffect } from 'react'
import StayDetail from './StayDetail'
import facilitiesData from '../data/facilities.json'

import '../css/staymobile.css'

const facilities = facilitiesData.facilities

const StayMobile = () => {
  // 푸터의 #gallery, #pool 같은 해시로 들어오면 해당 시설 카드로 스크롤
  useEffect(() => {
    const hashId = window.location.hash.slice(1)
    if (!hashId) return
    const el = document.getElementById(hashId)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [])

  return (
    <section id="stay_mobile">
      <div className="container">
        <section className="stay_mobile">
          {facilities.map((item) => (
            <article key={item.id} id={item.button.toLowerCase()} className="stay_mobile_item">
              <StayDetail data={item} variant="tablet" />
            </article>
          ))}
        </section>
      </div>
    </section>
  )
}

export default StayMobile
