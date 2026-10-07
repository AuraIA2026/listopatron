import React, { useState } from 'react'
import LandingPage from './pages/LandingPage'
import ShopPage from './pages/ShopPage'
import './index.css'
import './premium.css'

function App() {
  const [currentPage, setCurrentPage] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get('page') === 'shop' || window.location.hash === '#shop' ? 'shop' : 'home';
  });

  return (
    <>
      {currentPage === 'home' ? (
        <LandingPage navigate={(page) => setCurrentPage(page)} />
      ) : (
        <ShopPage navigate={(page) => setCurrentPage(page)} />
      )}
    </>
  )
}

export default App
