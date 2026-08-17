import React, { useState, useRef } from 'react'

import '../css/footer.css'

const Footer = () => {
    const [footerModal, setFooterModal] = useState(null)
    const videoRef = useRef(null)
    
    // Politique de confidentialité
    const openPrivacy = () => {
        setFooterModal("privacy")

        setTimeout(() => {
            if (videoRef.current) {
                videoRef.current.currentTime = 0
                videoRef.current.play()
            }
        }, 0)
    }


    // Conditions d'utilisation / Politique relative aux cookies / Plan du site
    const openNotice = () => {
        setFooterModal("notice")
    }


    // Fermer la fenêtre modale
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
                        <a href="/Chateau-de-Monaco/stay/stay-fr.html?item=art-gallery" className="text_en"><span>Galerie</span></a>
                        <a href="/Chateau-de-Monaco/stay/stay-fr.html?item=infinity-pool" className="text_en"><span>Piscine</span></a>
                        <a href="/Chateau-de-Monaco/stay/stay-fr.html?item=signature-restaurant" className="text_en" ><span>Restaurant</span></a>
                        <a href="/Chateau-de-Monaco/stay/stay-fr.html?item=spa-wellness" className="text_en"><span>Spa</span></a>
                        <a href="/Chateau-de-Monaco/stay/stay-fr.html?item=standard-room" className="text_en"><span>Chambre Standard</span></a>
                        <a href="/Chateau-de-Monaco/stay/stay-fr.html?item=suite-room" className="text_en"><span>Suite</span></a>
                    </div>
                </article>
                <article id="experiences">
                    <h4 className="h4_en">EXPERIENCES</h4>
                    <div className="list 2">
                        <a href="/Chateau-de-Monaco/experiences/experiences-fr.html?item=birthday" className="text_en"><span>Anniversaire</span></a>
                        <a href="/Chateau-de-Monaco/experiences/experiences-fr.html?item=spa" className="text_en"><span>Spa</span></a>
                        <a href="/Chateau-de-Monaco/experiences/experiences-fr.html?item=proposal" className="text_en"><span>Demande en mariage</span></a>
                        <a href="/Chateau-de-Monaco/experiences/experiences-fr.html?item=anniversary" className="text_en"><span>Célébration</span></a>
                        <a href="/Chateau-de-Monaco/experiences/experiences-fr.html?item=honeymoon" className="text_en"><span>Lune de miel</span></a>
                    </div>
                </article>
                <article id="location">
                    <h4 className="h4_en">LOCATION</h4>
                    <div className="list 3">
                        <a href="/Chateau-de-Monaco/location/location-fr.html#directions" className="text_en"><span>Itinéraire</span></a>
                        <a href="/Chateau-de-Monaco/location/location-fr.html#spot" className="text_en"><span>Sites incontournables</span></a>
                        <a href="/Chateau-de-Monaco/location/location-fr.html#map" className="text_en"><span>Carte</span></a>
                    </div>
                </article>
                <article id="reservation">
                    <h4 className="h4_en">RESERVATION</h4>
                    <div className="list 4">
                        <a href="/Chateau-de-Monaco/reservation-fr/reservation.html" className="text_en"><span>Réservation de chambre</span></a>
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
                <a className="f_logo" href="/Chateau-de-Monaco/index-fr.html"><img src={`${import.meta.env.BASE_URL}img/logo_white.png`} alt="로고_이미지" /></a>
                    <div className="down_right">
                        <div className="other text_en">
                            <a href="#" onClick={openPrivacy}>
                                Politique de confidentialité
                            </a>

                            <a href="#" onClick={openNotice}>
                                Conditions d'utilisation
                            </a>

                            <a href="#" onClick={openNotice}>
                                Politique relative aux cookies
                            </a>

                            <a href="#" onClick={openNotice}>
                                Plan du site
                            </a>
                        </div>
                        <p className="text_en">© 2026 Château de Monaco. All Rights Reserved.</p>
                    </div>
                </div>
            </footer>

        </div>

        {footerModal && (
            <div className="footer_modal active">

                {/* Arrière-plan */}
                <div
                    className="footer_modal_bg"
                    onClick={closeFooterModal}
                ></div>


                <div className="footer_modal_content">

                    {/* Bouton de fermeture */}
                    <button
                        type="button"
                        className="footer_modal_close btn_small"
                        onClick={closeFooterModal}
                    >
                        Fermer
                    </button>


                    {/* Politique de confidentialité */}
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

                                Votre navigateur ne prend pas en charge la lecture de vidéos.
                            </video>
                        </div>
                    )}


                    {/* Conditions d'utilisation / Politique relative aux cookies / Plan du site */}
                    {footerModal === "notice" && (
                        <p className="footer_notice_text h4_en">
                            Ceci est une page web créée à des fins de portfolio.
                        </p>
                    )}

                </div>
            </div>
        )}
    </footer>
  )
}

export default Footer
