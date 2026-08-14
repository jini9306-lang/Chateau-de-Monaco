import React from 'react'

import '../css/staydetail.css'

const StayDetail = ({ data, variant = 'pc' }) => {

    if (!data) return null

    const { title, tagline, primaryLabel, primaryItems, secondaryLabel, secondaryItems, description } = data


  return (
    <div className={`detail detail--${variant}`}>
        <div className="title">
            <h2 className='h2_en'>{title}</h2>
            <h4 className='h4_en'>{tagline}</h4>
        </div>
        <div className="info">
            <div className="info_1">
                <h3 className='h3_en'>{primaryLabel}</h3>
                <ul>
                    {primaryItems.map((item) => (
                        <li className='text_en' key={item}>{item}</li>
                    ))}
                </ul>
            </div>
            <div className="info_2">
                <h3 className='h3_en'>{secondaryLabel}</h3>
                <ul>
                    {secondaryItems.map((item) => (
                        <li className='text_en' key={item}>{item}</li>
                    ))}
                </ul>
            </div>
        </div>
        <p className='text_ko'>{description}</p>
        <img
            className="stay_img"
            src={`${import.meta.env.BASE_URL}${data.image}`}
            alt={data.title}
          />
    </div>
  )
}

export default StayDetail
