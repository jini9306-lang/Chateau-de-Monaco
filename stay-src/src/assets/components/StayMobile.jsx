import React from 'react'
import StayDetail from './StayDetail'
import facilitiesData from '../data/facilities.json'

import '../css/staymobile.css'

const facilities = facilitiesData.facilities

const StayMobile = () => {
  return (
    <section id="stay_mobile">
      <div className="container">
        <section className="stay_mobile">
          {facilities.map((item) => (
            <article key={item.id} className="stay_mobile_item">
              <StayDetail data={item} variant="tablet" />
            </article>
          ))}
        </section>
      </div>
    </section>
  )
}

export default StayMobile
