// src/pages/SociosPage.jsx — Pedidos Listo para Comercios (listopatron.com.do/socios)
import React, { useEffect, useState } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import './socios.css';

const APP_URL = 'https://pedidoslisto.vercel.app';

const BENEFITS = [
  { ic: '🎁', t: '90 días sin pagar', d: 'Arranca sin costo: durante tus primeros 3 meses cada peso que entra es tuyo.' },
  { ic: '💰', t: 'Tu caja en la pantalla', d: 'Cobra en efectivo, tarjeta o transferencia, calcula la devuelta y cuadra el turno sin libreta.' },
  { ic: '🧾', t: 'Comprobantes al día', d: 'Emite B01, B02, B14 y B15 con ITBIS y propina legal, en regla con la DGII.' },
  { ic: '📲', t: 'Órdenes al instante', d: 'Un aviso sonoro te llama hasta que respondes. Indicas cuánto tarda y el cliente se entera.' },
  { ic: '🛵', t: 'Motoristas a la vista', d: 'Ubica en el mapa a los mensajeros más cercanos o despacha con tu propia gente.' },
  { ic: '🍽️', t: 'Salón y cocina conectados', d: 'Controla cada mesa, envía la comanda a cocina y saca el ticket en tu impresora térmica.' },
  { ic: '📊', t: 'Números que se entienden', d: 'Mira lo vendido hoy, en la semana o el mes, lo que más sale y descárgalo a Excel.' },
  { ic: '💻', t: 'Usa lo que ya tienes', d: 'Corre en tu celular, tablet o computadora. Nada de rentar aparatos.' },
];

const STEPS = [
  { n: 1, t: 'Cuéntanos de ti', d: 'Deja tus datos, toma menos de un minuto.' },
  { n: 2, t: 'Te acompañamos', d: 'Nuestro equipo monta tu catálogo y tus fotos contigo.' },
  { n: 3, t: 'A facturar', d: 'Desde el primer día despachas órdenes y cobras en mostrador.' },
];

const FAQ = [
  ['¿Los 3 meses sin costo son reales?', 'Sí. En tus primeros 90 días no pagas porcentaje por tus órdenes ni por usar la caja.'],
  ['¿Qué me piden para empezar?', 'El nombre del local, un número de contacto y lo que vendes. El RNC lo puedes agregar después.'],
  ['¿Tengo que comprar algún equipo?', 'No. Basta con un celular, tablet o computadora con conexión a internet.'],
  ['¿Puedo despachar con mis mensajeros?', 'Claro. Trabaja con tu gente, llama a un motorista cercano de la red Listo, o combina ambos.'],
  ['¿Qué negocios pueden unirse?', 'Restaurantes, cafeterías, colmados, supermercados, farmacias, tiendas, ferreterías y mucho más.'],
];

const TYPES = ['Restaurante', 'Cafetería / Panadería', 'Comida rápida', 'Colmado / Supermercado', 'Farmacia', 'Tienda / Ropa', 'Ferretería', 'Otro'];

export default function SociosPage({ onNavigate }) {
  const [f, setF] = useState({ negocio: '', tipo: TYPES[0], ciudad: '', nombre: '', telefono: '', sucursales: '1' });
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);
  const [err, setErr] = useState('');
  const [faq, setFaq] = useState(0);

  useEffect(() => {
    document.title = 'Pedidos Listo para tu negocio | 90 días sin costo | Listo Patrón';
    const m = document.querySelector('meta[name="description"]');
    if (m) m.setAttribute('content', 'Únete a Pedidos Listo y opera tu local desde una sola pantalla: caja con comprobantes fiscales, órdenes a domicilio y motoristas cercanos. 90 días sin costo.');
  }, []);

  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    if (!f.negocio.trim() || !f.telefono.trim()) { setErr('Escribe el nombre del negocio y un teléfono.'); return; }
    setErr(''); setSending(true);
    try {
      await addDoc(collection(db, 'solicitudes_socios'), { ...f, promo: '3_meses_gratis', origen: 'web_socios', estado: 'nuevo', createdAt: serverTimestamp() });
      setDone(true);
    } catch (ex) {
      console.warn('solicitudes_socios:', ex);
      // Respaldo: abrir WhatsApp con los datos
      const txt = encodeURIComponent(`Hola, quiero registrar mi negocio en Pedidos Listo (3 meses gratis).\nNegocio: ${f.negocio}\nTipo: ${f.tipo}\nCiudad: ${f.ciudad}\nContacto: ${f.nombre} ${f.telefono}`);
      window.open(`https://wa.me/?text=${txt}`, '_blank');
      setDone(true);
    }
    setSending(false);
  };

  const goForm = () => document.getElementById('registro')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <div className="sx">
      <header className="sx-nav">
        <div className="sx-wrap sx-nav-in">
          <button className="sx-logo" onClick={() => onNavigate?.('home')} aria-label="Inicio">
            <img src="/pedidos-listo-blanco.png" alt="Pedidos Listo" />
          </button>
          <nav className="sx-links">
            <a href="#beneficios">Ventajas</a>
            <a href="#comparar">El cambio</a>
            <a href="#faq">Dudas</a>
            <a href={APP_URL} target="_blank" rel="noreferrer">Entrar a mi local</a>
          </nav>
          <button id="sx-nav-cta" className="sx-btn light" onClick={goForm}>Unirme</button>
        </div>
      </header>

      <main>
        <section className="sx-hero">
          <div className="sx-wrap sx-hero-in">
            <div className="sx-hero-txt">
              <span className="sx-pill">🎁 Promoción de apertura</span>
              <h1>Haz crecer tu local con <span>Pedidos Listo</span>.<br /><u>90 días</u> sin pagar nada.</h1>
              <p>Órdenes a domicilio, caja con comprobante fiscal y mensajeros a pocos minutos. Una sola pantalla pensada para el comercio dominicano.</p>
              <div className="sx-hero-cta">
                <button id="sx-hero-cta" className="sx-btn light big" onClick={goForm}>Quiero unirme →</button>
                <a className="sx-btn ghost big" href={APP_URL} target="_blank" rel="noreferrer">Probar la plataforma</a>
              </div>
              <ul className="sx-checks"><li>✓ Sin porcentaje por 90 días</li><li>✓ Sin ataduras</li><li>✓ Sin aparatos que comprar</li></ul>
            </div>
            <div className="sx-hero-art">
              <div className="sx-mock">
                <div className="sx-mock-top"><b>🔔 ¡Nuevo pedido!</b><span>02:41</span></div>
                <div className="sx-mock-row"><span>2× Chimi de res</span><b>RD$ 500</b></div>
                <div className="sx-mock-row"><span>1× Mangú con los 3 golpes</span><b>RD$ 350</b></div>
                <div className="sx-mock-row"><span>2× Morir soñando</span><b>RD$ 300</b></div>
                <div className="sx-mock-total"><span>Total</span><b>RD$ 1,150</b></div>
                <div className="sx-mock-btns"><span className="no">Rechazar</span><span className="ok">Aceptar · 20 min</span></div>
              </div>
              <div className="sx-float f1">🛵 3 motoristas cerca</div>
              <div className="sx-float f2">🧾 Factura B02 lista</div>
            </div>
          </div>
        </section>

        <section className="sx-stats">
          <div className="sx-wrap sx-stats-in">
            <div><b>90 días</b><span>sin costo alguno</span></div>
            <div><b>15%</b><span>al terminar la promo</span></div>
            <div><b>60 seg</b><span>para unirte</span></div>
            <div><b>24/7</b><span>ayuda por WhatsApp</span></div>
          </div>
        </section>

        <section id="beneficios" className="sx-sec">
          <div className="sx-wrap">
            <h2>Una sola herramienta para todo tu local</h2>
            <p className="sx-sub">Va mucho más allá de recibir órdenes: es el centro de mando de tu negocio.</p>
            <div className="sx-grid">
              {BENEFITS.map((b) => (
                <article key={b.t} className="sx-card"><div className="sx-ic">{b.ic}</div><h3>{b.t}</h3><p>{b.d}</p></article>
              ))}
            </div>
          </div>
        </section>

        <section id="comparar" className="sx-sec alt">
          <div className="sx-wrap">
            <h2>El cambio que nota tu negocio</h2>
            <p className="sx-sub">Así se trabaja hoy y así se trabaja con Pedidos Listo.</p>
            <div className="sx-table-wrap">
              <table className="sx-table">
                <thead><tr><th></th><th>Como lo haces hoy</th><th className="me">Con Pedidos Listo</th></tr></thead>
                <tbody>
                  <tr><td>Arranque</td><td>Pagas desde el día uno</td><td className="me">90 días sin costo</td></tr>
                  <tr><td>Órdenes</td><td>Llamadas y mensajes sueltos</td><td className="me">Todo en una pantalla</td></tr>
                  <tr><td>Cobro</td><td>Libreta y calculadora</td><td className="me">Caja automática</td></tr>
                  <tr><td>Comprobantes fiscales</td><td>A mano</td><td className="me">Al instante</td></tr>
                  <tr><td>Salón y cocina</td><td>Papelitos</td><td className="me">Comanda impresa</td></tr>
                  <tr><td>Mensajeros</td><td>Buscar a quién llamar</td><td className="me">Mapa con los más cercanos</td></tr>
                  <tr><td>Equipos</td><td>Comprar o rentar</td><td className="me">Tu celular o PC</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="sx-sec">
          <div className="sx-wrap">
            <h2>Únete en 3 pasos</h2>
            <div className="sx-steps">
              {STEPS.map((s) => (<div key={s.n} className="sx-step"><span>{s.n}</span><h3>{s.t}</h3><p>{s.d}</p></div>))}
            </div>
          </div>
        </section>

        <section id="registro" className="sx-sec sx-reg">
          <div className="sx-wrap sx-reg-in">
            <div className="sx-reg-txt">
              <h2>Súmate a Pedidos Listo</h2>
              <p>Déjanos tus datos y nuestro equipo te escribe hoy mismo. <b>Tus primeros 90 días corren por nuestra cuenta.</b></p>
              <ul className="sx-checks dark"><li>✓ Montamos tu catálogo contigo</li><li>✓ Entrenamiento incluido</li><li>✓ Te vas cuando quieras</li></ul>
            </div>
            <form className="sx-form" onSubmit={submit}>
              {done ? (
                <div className="sx-done">
                  <div>🎉</div><h3>¡Recibido! Ya estás en camino</h3>
                  <p>Te escribiremos al {f.telefono}. Mientras tanto, puedes ir explorando la plataforma.</p>
                  <a className="sx-btn big" href={APP_URL} target="_blank" rel="noreferrer">Entrar a Pedidos Listo</a>
                </div>
              ) : (
                <>
                  <label htmlFor="sx-negocio">Nombre del negocio *</label>
                  <input id="sx-negocio" value={f.negocio} onChange={set('negocio')} placeholder="Ej. Listo Patrón" />
                  <div className="sx-row">
                    <div><label htmlFor="sx-tipo">Tipo</label>
                      <select id="sx-tipo" value={f.tipo} onChange={set('tipo')}>{TYPES.map((t) => <option key={t}>{t}</option>)}</select></div>
                    <div><label htmlFor="sx-suc">Sucursales</label>
                      <select id="sx-suc" value={f.sucursales} onChange={set('sucursales')}>{['1', '2', '3-5', '6+'].map((t) => <option key={t}>{t}</option>)}</select></div>
                  </div>
                  <label htmlFor="sx-ciudad">Ciudad</label>
                  <input id="sx-ciudad" value={f.ciudad} onChange={set('ciudad')} placeholder="Santiago, Santo Domingo…" />
                  <div className="sx-row">
                    <div><label htmlFor="sx-nombre">Tu nombre</label><input id="sx-nombre" value={f.nombre} onChange={set('nombre')} /></div>
                    <div><label htmlFor="sx-tel">Teléfono *</label><input id="sx-tel" inputMode="tel" value={f.telefono} onChange={set('telefono')} placeholder="809-000-0000" /></div>
                  </div>
                  {err && <div className="sx-err">{err}</div>}
                  <button id="sx-submit" className="sx-btn big block" disabled={sending}>{sending ? 'Enviando…' : 'Activar mis 90 días sin costo'}</button>
                  <small>Al enviar aceptas los términos y condiciones de Listo Patrón.</small>
                </>
              )}
            </form>
          </div>
        </section>

        <section id="faq" className="sx-sec">
          <div className="sx-wrap sx-faq">
            <h2>Lo que más nos preguntan</h2>
            {FAQ.map(([q, a], i) => (
              <div key={q} className={`sx-q ${faq === i ? 'open' : ''}`}>
                <button onClick={() => setFaq(faq === i ? -1 : i)}>{q}<span>{faq === i ? '−' : '+'}</span></button>
                <p>{a}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="sx-foot">
        <div className="sx-wrap sx-foot-in">
          <img src="/pedidos-listo-blanco.png" alt="Pedidos Listo" />
          <span>© {new Date().getFullYear()} Listo Patrón · Hecho en República Dominicana 🇩🇴</span>
          <button className="sx-btn light" onClick={goForm}>Unirme sin costo</button>
        </div>
      </footer>
    </div>
  );
}
