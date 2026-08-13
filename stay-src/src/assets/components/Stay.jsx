import React, { useState, useRef } from 'react'
import {} from 'react-router-dom'

import Modal from '../components/Modal'

import '../css/stay.css'
import facilitiesData from '../data/facilities.json'

const Stay = () => {
  // 버튼클릭 시 문 오픈
  const [isOpen, setIsOpen] = useState(false)

  // 버튼 맵핑
  // 데이터
  const facilities = facilitiesData.facilities
  // 지금 선택된 항목 저장
  const [activeId, setActiveId] = useState(facilities[0].id)
  // 타이머저장
  const timeoutRef = useRef(null)
  // 선택된 항목 찾기
  const activeItem = facilities.find((item) => item.id === activeId)
  // 클릭시 문 열림,닫힘
  const handleSelect = (id) => {
    clearTimeout(timeoutRef.current)
    // 이전에 예약된 타이머 취소
    setIsOpen(false)              
    // 1) 일단 문 닫기

    timeoutRef.current = setTimeout(() => {
      setActiveId(id)              
      // 2) 문이 다 닫힌 후 내용 교체
      setIsOpen(true)               
      // 3) 다시 열기
    },1000)                          
    // CSS transition 시간(0.8s)과 맞춤
  }
  
  // 모달 열림 상태 추가
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <section className="stay_pc" id='stay_pc'>
      <div className="container">
        <section className='stay_pc'>
          <div className="door_wrap">
          <div className={`door ${isOpen ? 'open' : ''}`}>
            <div className="left_door"></div>
            <div className="rigth_door"></div>
          </div>
          </div>

          <div
            className="stay_overlay"
            style={{ backgroundImage: `url(${import.meta.env.BASE_URL}${activeItem.image})` }}
          >
            <h2 className='h2_en'>{activeItem.title}</h2>
            <button className='stay_btn btn_big' type="button" onClick={() => setIsModalOpen(true)}>
              VIEW DETAILS
            </button>
          </div>    
        </section>
      </div>

      <ul className="btn_area">
        {facilities.map((item) => (
          <li key={item.id} onClick={() => handleSelect(item.id)}>
            {item.button}
          </li>
        ))}
        <li onClick={()=> setIsOpen(false)}>CLOSE</li>
      </ul>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        item={activeItem}
      />
      
    </section>
  )
}

export default Stay
