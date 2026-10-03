import React, { useState } from 'react'
import HomePage from './pages/HomePage'
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
        <HomePage onNavigate={setCurrentPage} />
      ) : (
        <ShopPage onNavigate={setCurrentPage} />
      )}
    </>
  )
}

export default App
