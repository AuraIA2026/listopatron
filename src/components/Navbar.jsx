import logoImg from '../assets/logo_listo.png'
import './Navbar.css'

const t = {
  es: { services: 'Servicios', login: 'Iniciar sesión', register: 'Registrarse', tagline: 'Profesionales a tu puerta' },
  en: { services: 'Services', login: 'Log in', register: 'Sign up', tagline: 'Professionals at your door' }
}

export default function Navbar({ navigate, currentPage, lang, setLang }) {
  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <div className="navbar-logo" onClick={() => navigate('services')}>
          <img src={logoImg} alt="Listo" className="logo-img" />
          <span className="logo-tag">{t[lang].tagline}</span>
        </div>

        <div className="navbar-actions">
          <button
            className="btn-delivery"
            onClick={() => navigate('register')}
            style={{
              background: 'linear-gradient(135deg, #EA1D2C, #F26000)',
              color: '#fff',
              border: 'none',
              borderRadius: '50px',
              padding: '8px 16px',
              fontWeight: '800',
              fontSize: '13px',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              boxShadow: '0 4px 12px rgba(234,29,44,0.3)'
            }}
          >
            🛵 Servicio de Delivery
          </button>
          <button
            className={`lang-toggle ${lang === 'es' ? 'active' : ''}`}
            onClick={() => setLang(lang === 'es' ? 'en' : 'es')}
          >
            {lang === 'es' ? 'EN' : 'ES'}
          </button>
          <button
            className={`btn-ghost ${currentPage === 'login' ? 'active' : ''}`}
            onClick={() => navigate('login')}
          >
            {t[lang].login}
          </button>
          <button
            className={`btn-primary ${currentPage === 'register' ? 'active' : ''}`}
            onClick={() => navigate('register')}
          >
            {t[lang].register}
          </button>
        </div>
      </div>
    </nav>
  )
}
