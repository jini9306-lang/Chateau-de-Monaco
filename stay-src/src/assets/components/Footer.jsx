import React from 'react'

import '../css/footer.css'

const Footer = () => {

    const handleAnchorClick = (e, path, id) => {
        if (window.innerWidth <= 960) {
            const target = document.getElementById(id)

            if (target) {
                e.preventDefault()

                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start',
                })
            }
        }
    }

  return (
    <footer id="footer">
    <div class="container">
        <footer class="footer">
            <div class="footer_up">
                <article id="stay">
                    <a href="/Chateau-de-Monaco/stay/index.html">
                        <h4 class="h4_ko">STAY</h4>
                    </a>
                    <div className="list 1">
                        <a
                            href="/Chateau-de-Monaco/stay/index.html#gallery"
                            className="text_ko"
                            onClick={(e) => handleAnchorClick(e, '/Chateau-de-Monaco/stay/index.html', 'gallery')}
                        >
                            <span>갤러리</span>
                        </a>

                        <a
                            href="/Chateau-de-Monaco/stay/index.html#pool"
                            className="text_ko"
                            onClick={(e) => handleAnchorClick(e, '/Chateau-de-Monaco/stay/index.html', 'pool')}
                        >
                            <span>수영장</span>
                        </a>

                        <a
                            href="/Chateau-de-Monaco/stay/index.html#restaurant"
                            className="text_ko"
                            onClick={(e) => handleAnchorClick(e, '/Chateau-de-Monaco/stay/index.html', 'restaurant')}
                        >
                            <span>레스토랑</span>
                        </a>

                        <a
                            href="/Chateau-de-Monaco/stay/index.html#spa"
                            className="text_ko"
                            onClick={(e) => handleAnchorClick(e, '/Chateau-de-Monaco/stay/index.html', 'spa')}
                        >
                            <span>스파</span>
                        </a>

                        <a
                            href="/Chateau-de-Monaco/stay/index.html#standard"
                            className="text_ko"
                            onClick={(e) => handleAnchorClick(e, '/Chateau-de-Monaco/stay/index.html', 'standard')}
                        >
                            <span>스탠다드 룸</span>
                        </a>

                        <a
                            href="/Chateau-de-Monaco/stay/index.html#suite"
                            className="text_ko"
                            onClick={(e) => handleAnchorClick(e, '/Chateau-de-Monaco/stay/index.html', 'suite')}
                        >
                            <span>스위트 룸</span>
                        </a>
                    </div>
                </article>
                <article id="experiences">
                    <a href="/Chateau-de-Monaco/experiences/index.html">
                        <h4 class="h4_ko">EXPERIENCES</h4>
                    </a>
                    <div class="list 2">
                        <a href="/Chateau-de-Monaco/experiences/index.html#birthday" class="text_ko"><span>생일</span></a>
                        <a href="/Chateau-de-Monaco/experiences/index.html#spa" class="text_ko"><span>스파</span></a>
                        <a href="/Chateau-de-Monaco/experiences/index.html#proposal" class="text_ko"><span>프로포즈</span></a>
                        <a href="/Chateau-de-Monaco/experiences/index.html#anniversary" class="text_ko"><span>기념일</span></a>
                        <a href="/Chateau-de-Monaco/experiences/index.html#honeymoon" class="text_ko"><span>허니문</span></a>
                    </div>
                </article>
                <article id="location">
                    <a href="/Chateau-de-Monaco/location/index.html">
                        <h4 class="h4_ko">LOCATION</h4>
                    </a>
                    <div class="list 3">
                        <a href="/Chateau-de-Monaco/location/index.html#directions" class="text_ko"><span>오시는 길</span></a>
                        <a href="/Chateau-de-Monaco/location/index.html#spot" class="text_ko"><span>주요 명소</span></a>
                        <a href="/Chateau-de-Monaco/location/index.html#map" class="text_ko"><span>지도</span></a>
                    </div>
                </article>
                <article id="reservation">
                    <a href="/Chateau-de-Monaco/reservation/index.html">
                        <h4 class="h4_ko">RESERVATION</h4>
                    </a>
                    <div class="list 4">
                        <a href="/Chateau-de-Monaco/reservation/index.html" class="text_ko"><span>객실 예약</span></a>
                    </div>
                </article>
            </div>
            <div class="footer_down">
                <div class="down_left">
                    <span class="info text_en">
                        Place du Casino, 98000 Monte-Carlo, Monaco
                    </span>
                    <span class="mail text_en">
                        chateau.reserve@monaco.com
                    </span>
                </div>
                <a class="f_logo" href="/Chateau-de-Monaco/index.html"><img src={`${import.meta.env.BASE_URL}img/logo_white.png`} alt="로고_이미지" /></a>
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
