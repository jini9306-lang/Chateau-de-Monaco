import React from 'react'
import { useMediaQuery } from '../hooks/useMediaQuery'
import Stay from '../components/Stay'
import StayMobile from '../components/StayMobile'

const StayPage = ({ facilities }) => {
    const isPC = useMediaQuery('(min-width: 960px)')
  return isPC ? <Stay facilities={facilities} /> : <StayMobile facilities={facilities} />
}

export default StayPage
