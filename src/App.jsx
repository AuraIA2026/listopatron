import React, { useState, useEffect } from 'react'
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

  const handleNavigate = (page) => {
    if (typeof window !== 'undefined') {
      if (page === 'home' || page === 'landing') {
        try {
          if (window.history && window.history.pushState) {
            const cleanPath = window.location.pathname.includes('index.html') ? window.location.pathname : '/';
            window.history.pushState({}, '', cleanPath);
          }
        } catch (e) {
          console.warn('Navigation error:', e);
        }
        setCurrentPage('home');
      } else if (page === 'shop') {
        try {
          if (window.history && window.history.pushState) {
            const cleanPath = window.location.pathname.includes('index.html') ? window.location.pathname : '/';
            window.history.pushState({}, '', cleanPath + '?page=shop');
          }
        } catch (e) {
          console.warn('Navigation error:', e);
        }
        setCurrentPage('shop');
      } else {
        setCurrentPage(page);
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setCurrentPage(page);
    }
  };

  useEffect(() => {
    const handlePopState = () => {
      const params = new URLSearchParams(window.location.search);
      if (params.get('page') === 'shop' || window.location.hash.includes('shop')) {
        setCurrentPage('shop');
      } else {
        setCurrentPage('home');
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  return (
    <>
      {currentPage === 'home' || currentPage === 'landing' ? (
        <LandingPage navigate={handleNavigate} onNavigate={handleNavigate} />
      ) : (
        <ShopPage onNavigate={handleNavigate} navigate={handleNavigate} />
      )}
    </>
  )
}
