import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// 라우트 변경 시 스크롤 최상단. 해시 앵커는 예외.
export default function ScrollToTop() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) return
    window.scrollTo(0, 0)
  }, [pathname, hash])
  return null
}
