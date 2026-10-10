import React, { useState } from 'react'
import LandingPage from './pages/LandingPage'
import ShopPage from './pages/ShopPage'
import './index.css'
import './premium.css'

export default function App() {
  const [currentPage, setCurrentPage] = useState(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('page') === 'shop' || window.location.hash.includes('shop')) return 'shop';
    }
    return 'home';
  });

  return (
    <>
      {currentPage === 'home' ? (
        <LandingPage navigate={(page) => setCurrentPage(page)} />
      ) : (
        <ShopPage onNavigate={(page) => setCurrentPage(page)} navigate={(page) => setCurrentPage(page)} />
      )}
    </>
  )
}
