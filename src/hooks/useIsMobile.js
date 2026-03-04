import { useState, useEffect } from 'react'

function checkIsMobile() {
  const ua = navigator.userAgent || ''
  const mobileUA = /Android|iPhone|iPad|iPod|webOS|BlackBerry|IEMobile|Opera Mini/i.test(ua)
  const narrowScreen = window.innerWidth <= 768
  return mobileUA || narrowScreen
}

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(checkIsMobile)

  useEffect(() => {
    function handleResize() {
      setIsMobile(checkIsMobile())
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return isMobile
}
