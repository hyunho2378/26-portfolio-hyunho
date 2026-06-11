import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ScrollToTop from './components/layout/ScrollToTop.jsx'
import Layout from './components/layout/Layout.jsx'
import HomePage from './pages/HomePage.jsx'
import WorkDetailPage from './pages/WorkDetailPage.jsx'
import NotFoundPage from './pages/NotFoundPage.jsx'

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/work/:id" element={<WorkDetailPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
