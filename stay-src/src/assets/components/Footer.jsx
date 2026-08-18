import React, { useState } from 'react'

import '../css/footer.css'

const Footer = () => {
    const [footerModal, setFooterModal] = useState(null)
    
    // 개인정보처리방침
    const openPrivacy = () => {
        setFooterModal("privacy")
    }


    // 이용약관 / 쿠키정책 / 사이트맵
    const openNotice = () => {
        setFooterModal("notice")
    }


    // 모달 닫기
    const closeFooterModal = () => {
        setFooterModal(null)
    }

  return (
    <footer id="footer">
    <div className="container">
        <footer className="footer">
            <div className="footer_up">
                <article id="stay">
                    <h4 className="h4_ko">STAY</h4>
                    <div className="list 1">
                        <a href="/Chateau-de-Monaco/stay/index.html?item=art-gallery" className="text_ko"><span>갤러리</span></a>
                        <a href="/Chateau-de-Monaco/stay/index.html?item=infinity-pool" className="text_ko"><span>수영장</span></a>
                        <a href="/Chateau-de-Monaco/stay/index.html?item=signature-restaurant" className="text_ko" ><span>레스토랑</span></a>
                        <a href="/Chateau-de-Monaco/stay/index.html?item=spa-wellness" className="text_ko"><span>스파</span></a>
                        <a href="/Chateau-de-Monaco/stay/index.html?item=standard-room" className="text_ko"><span>스탠다드 룸</span></a>
                        <a href="/Chateau-de-Monaco/stay/index.html?item=suite-room" className="text_ko"><span>스위트 룸</span></a>
                    </div>
                </article>
                <article id="experiences">
                    <h4 className="h4_ko">EXPERIENCES</h4>
                    <div className="list 2">
                        <a href="/Chateau-de-Monaco/experiences/index.html?item=birthday" className="text_ko"><span>생일</span></a>
                        <a href="/Chateau-de-Monaco/experiences/index.html?item=spa" className="text_ko"><span>스파</span></a>
                        <a href="/Chateau-de-Monaco/experiences/index.html?item=proposal" className="text_ko"><span>프로포즈</span></a>
                        <a href="/Chateau-de-Monaco/experiences/index.html?item=anniversary" className="text_ko"><span>기념일</span></a>
                        <a href="/Chateau-de-Monaco/experiences/index.html?item=honeymoon" className="text_ko"><span>허니문</span></a>
                    </div>
                </article>
                <article id="location">
                    <h4 className="h4_ko">LOCATION</h4>
                    <div className="list 3">
                        <a href="/Chateau-de-Monaco/location/index.html#directions" className="text_ko"><span>오시는 길</span></a>
                        <a href="/Chateau-de-Monaco/location/index.html#spot" className="text_ko"><span>주요 명소</span></a>
                        <a href="/Chateau-de-Monaco/location/index.html#map" className="text_ko"><span>지도</span></a>
                    </div>
                </article>
                <article id="reservation">
                    <h4 className="h4_ko">RESERVATION</h4>
                    <div className="list 4">
                        <a href="/Chateau-de-Monaco/reservation/index.html" className="text_ko"><span>객실 예약</span></a>
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
                <a className="f_logo" href="/Chateau-de-Monaco/index.html"><img src={`${import.meta.env.BASE_URL}img/logo_white.png`} alt="로고_이미지" /></a>
                    <div className="down_right">
                        <div className="other text_ko">
                            <a href="#" onClick={openPrivacy}>
                                개인정보처리방침
                            </a>

                            <a href="#" onClick={openNotice}>
                                이용약관
                            </a>

                            <a href="#" onClick={openNotice}>
                                쿠키정책
                            </a>

                            <a href="#" onClick={openNotice}>
                                사이트맵
                            </a>
                        </div>
                        <p className="text_en">© 2026 Château de Monaco. All Rights Reserved.</p>
                    </div>
                </div>
            </footer>

        </div>

        {footerModal && (
            <div className="footer_modal active">

                {/* 배경 */}
                <div
                    className="footer_modal_bg"
                    onClick={closeFooterModal}
                ></div>


                <div className="footer_modal_content">

                    {/* 닫기 버튼 */}
                    <button
                        type="button"
                        className="footer_modal_close btn_small"
                        onClick={closeFooterModal}
                    >
                        ×
                    </button>


                    {/* 개인정보처리방침 */}
                    {footerModal === "privacy" && (
                        <div className="footer_video">
                            <iframe
                                src="https://www.youtube.com/embed/hZ_l3GG4gvw?"
                                title="개인정보처리방침"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </div>
                    )}


                    {/* 이용약관 / 쿠키정책 / 사이트맵 */}
                    {footerModal === "notice" && (
                        <p className="footer_notice_text h4_ko">
                            포트폴리오용 웹페이지 입니다.
                        </p>
                    )}

                </div>
            </div>
        )}
    </footer>
  )
}

export default Footer
