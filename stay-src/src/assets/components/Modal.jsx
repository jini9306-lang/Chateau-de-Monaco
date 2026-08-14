import React from 'react'
import StayDetail from './StayDetail'

import '../css/modal.css'

const Modal = ({ isOpen, onClose, item }) => {
  if (!isOpen || !item) return null

  return (
    <div className="stay_modal" onClick={onClose}>
      <div className="modal_panel" onClick={(e) => e.stopPropagation()}>
        <button className="modal_clos btn_small" type="button" onClick={onClose}>
          ✕
        </button>
        <StayDetail data={item} variant="pc" />
      </div>
    </div>
  )
}

export default Modal
