import React from 'react'

import '../css/footer.css'

const Footer = () => {
    
    

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
                        <a href="/Chateau-de-Monaco/reservation/index.html" class="text_ko"><span>객실 예약</span></a>
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
                            <a href="#">개인정보처리방침</a>
                            <a href="#">이용약관</a>
                            <a href="#">쿠키정책</a>
                            <a href="#">사이트맵</a>
                        </div>
                        <p className="text_en">© 2026 Château de Monaco. All Rights Reserved.</p>
                    </div>
                </div>
            </footer>

        </div>
    </footer>
  )
}

export default Footer
