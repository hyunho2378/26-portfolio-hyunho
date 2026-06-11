import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { color } from '../../tokens.js'

export default function Layout() {
  // F키 전체화면 토글 (계승)
  useEffect(() => {
    function onKeyDown(e) {
      if (e.key !== 'f' && e.key !== 'F') return
      if (document.fullscreenElement) {
        document.exitFullscreen()
      } else {
        document.documentElement.requestFullscreen()
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [])

  return (
    <div style={{ minHeight: '100vh', backgroundColor: color.ink, color: color.paper }}>
      <Outlet />
    </div>
  )
}
