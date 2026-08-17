import React, { useState, useRef } from 'react'

import '../css/footer.css'

const Footer = () => {
    const [footerModal, setFooterModal] = useState(null)
    const videoRef = useRef(null)
    
    // Privacy Policy
    const openPrivacy = () => {
        setFooterModal("privacy")

        setTimeout(() => {
            if (videoRef.current) {
                videoRef.current.currentTime = 0
                videoRef.current.play()
            }
        }, 0)
    }


    // Terms of Use / Cookie Policy / Sitemap
    const openNotice = () => {
        setFooterModal("notice")
    }


    // Close modal
    const closeFooterModal = () => {
        if (videoRef.current) {
            videoRef.current.pause()
            videoRef.current.currentTime = 0
        }

        setFooterModal(null)
    }

  return (
    <footer id="footer">
    <div className="container">
        <footer className="footer">
            <div className="footer_up">
                <article id="stay">
                    <h4 className="h4_en">STAY</h4>
                    <div className="list 1">
                        <a href="/Chateau-de-Monaco/stay/stay-en.html?item=art-gallery" className="text_en"><span>gallery</span></a>
                        <a href="/Chateau-de-Monaco/stay/stay-en.html?item=infinity-pool" className="text_en"><span>pool</span></a>
                        <a href="/Chateau-de-Monaco/stay/stay-en.html?item=signature-restaurant" className="text_en" ><span>restaurant</span></a>
                        <a href="/Chateau-de-Monaco/stay/stay-en.html?item=spa-wellness" className="text_en"><span>spa</span></a>
                        <a href="/Chateau-de-Monaco/stay/stay-en.html?item=standard-room" className="text_en"><span>standard</span></a>
                        <a href="/Chateau-de-Monaco/stay/stay-en.html?item=suite-room" className="text_en"><span>suite</span></a>
                    </div>
                </article>
                <article id="experiences">
                    <h4 className="h4_en">EXPERIENCES</h4>
                    <div className="list 2">
                        <a href="/Chateau-de-Monaco/experiences/experiences-en.html?item=birthday" className="text_en"><span>birthday</span></a>
                        <a href="/Chateau-de-Monaco/experiences/experiences-en.html?item=spa" className="text_en"><span>spa</span></a>
                        <a href="/Chateau-de-Monaco/experiences/experiences-en.html?item=proposal" className="text_en"><span>proposal</span></a>
                        <a href="/Chateau-de-Monaco/experiences/experiences-en.html?item=anniversary" className="text_en"><span>anniversary</span></a>
                        <a href="/Chateau-de-Monaco/experiences/experiences-en.html?item=honeymoon" className="text_en"><span>honeymoon</span></a>
                    </div>
                </article>
                <article id="location">
                    <h4 className="h4_en">LOCATION</h4>
                    <div className="list 3">
                        <a href="/Chateau-de-Monaco/location/location-en.html#directions" className="text_en"><span>directions</span></a>
                        <a href="/Chateau-de-Monaco/location/location-en.html#spot" className="text_en"><span>spot</span></a>
                        <a href="/Chateau-de-Monaco/location/location-en.html#map" className="text_en"><span>map</span></a>
                    </div>
                </article>
                <article id="reservation">
                    <h4 className="h4_en">RESERVATION</h4>
                    <div className="list 4">
                        <a href="/Chateau-de-Monaco/reservation/reservation-en.html" className="text_en"><span>reservation</span></a>
                    </div>
                </article>
            </div>
            <div className="footer_down">
                <div className="down_left">
                    <span className="info text_en">
                        Place du Casino, 98000 Monte-Carlo, Monaco
                    </span>
                    <span className="mail text_en">
                        chateau.reserve@monaco.com
                    </span>
                </div>
                <a className="f_logo" href="/Chateau-de-Monaco/index-en.html"><img src={`${import.meta.env.BASE_URL}img/logo_white.png`} alt="로고_이미지" /></a>
                    <div className="down_right">
                        <div className="other text_en">
                            <a href="#" onClick={openPrivacy}>
                                Privacy Policy
                            </a>

                            <a href="#" onClick={openNotice}>
                                Terms of Use
                            </a>

                            <a href="#" onClick={openNotice}>
                                Cookie Policy
                            </a>

                            <a href="#" onClick={openNotice}>
                                Sitemap
                            </a>
                        </div>
                        <p className="text_en">© 2026 Château de Monaco. All Rights Reserved.</p>
                    </div>
                </div>
            </footer>

        </div>

        {footerModal && (
            <div className="footer_modal active">

                {/* Background */}
                <div
                    className="footer_modal_bg"
                    onClick={closeFooterModal}
                ></div>


                <div className="footer_modal_content">

                    {/* Close button */}
                    <button
                        type="button"
                        className="footer_modal_close btn_small"
                        onClick={closeFooterModal}
                    >
                        Close
                    </button>


                    {/* Privacy Policy */}
                    {footerModal === "privacy" && (
                        <div className="footer_video">
                            <video
                                ref={videoRef}
                                controls
                            >
                                <source
                                    src={`${import.meta.env.BASE_URL}img/personal_information.mp4`}
                                    type="video/mp4"
                                />

                                Your browser does not support video playback.
                            </video>
                        </div>
                    )}


                    {/* Terms of Use / Cookie Policy / Sitemap */}
                    {footerModal === "notice" && (
                        <p className="footer_notice_text h4_en">
                            This is a portfolio website.
                        </p>
                    )}

                </div>
            </div>
        )}
    </footer>
  )
}

export default Footer
