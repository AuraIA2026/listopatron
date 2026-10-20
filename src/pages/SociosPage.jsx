// src/pages/SociosPage.jsx — Únete a Pedidos Listo (listopatron.com.do/unete)
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
  { ic: '✍️', t: 'Cuéntanos de tu negocio' },
  { ic: '🤝', t: 'Aprueba el acuerdo en línea' },
  { ic: '🔍', t: 'Verificamos tus datos' },
  { ic: '📸', t: 'Monta catálogo, horas y marca' },
  { ic: '🖥️', t: 'Enciende tu pantalla de órdenes' },
  { ic: '🎉', t: '¡Abre tus puertas digitales!' },
];

const TIPS = [
  { img: '/unete/plato1.jpg', t: '¿Qué papeles debo preparar?', d: 'La lista completa para que tu cocina o restaurante quede activo sin vueltas ni demoras.' },
  { img: '/unete/plato2.jpg', t: 'Fotos que abren el apetito', d: 'Un plato bien fotografiado vende el doble. Te damos trucos sencillos con tu celular.' },
  { img: '/unete/plato3.jpg', t: 'Un tablero para todo el local', d: 'Órdenes, caja, mesas y reportes conviven en una sola pantalla para que operes sin enredos.' },
  { img: '/pedidos_listo_hero.png', t: 'Gana clientes desde la semana uno', d: 'Aprovecha a la comunidad de Listo Patrón y las promociones para llenar tu cocina.' },
];

const SOLUTIONS = [
  { tag: 'Destaca', t: 'Vitrina preferencial', d: 'Los locales con buen servicio suben en la lista y aparecen primero ante los clientes de su zona.' },
  { tag: 'Delivery', t: 'Red de motoristas Listo', d: 'Pide un mensajero cercano con un toque y sigue el trayecto en el mapa hasta la puerta del cliente.' },
  { tag: 'Caja', t: 'Punto de venta fiscal', d: 'Facturas con comprobante, cuadre de turno y reportes listos para tu contador, sin pagar otro sistema.' },
];

const BUSINESS = ['🍔 Comida rápida', '🍕 Pizzerías', '🥗 Saludable', '☕ Cafeterías', '🥖 Panaderías', '🛒 Colmados', '💊 Farmacias', '🍰 Reposterías', '🍗 Pica pollo', '🌮 Comida mexicana', '🍣 Sushi', '🧃 Jugos'];

const FAQ = [
  ['¿Los 3 meses sin costo son reales?', 'Sí. En tus primeros 90 días no pagas porcentaje por tus órdenes ni por usar la caja.'],
  ['¿Qué me piden para empezar?', 'El nombre del local, un número de contacto y lo que vendes. El RNC lo puedes agregar después.'],
  ['¿Tengo que comprar algún equipo?', 'No. Basta con un celular, tablet o computadora con conexión a internet. La impresora térmica es opcional.'],
  ['¿Puedo despachar con mis mensajeros?', 'Claro. Trabaja con tu gente, llama a un motorista cercano de la red Listo, o combina ambos.'],
  ['¿Qué negocios pueden unirse?', 'Restaurantes, cafeterías, colmados, supermercados, farmacias, tiendas, ferreterías y mucho más.'],
  ['¿En qué momento me llega el dinero?', 'Lo cobrado en efectivo queda en tu caja al instante; lo pagado en línea se transfiere a tu cuenta bancaria.'],
  ['¿Dónde actualizo precios, fotos y horarios?', 'En las secciones Menú y Local del programa. Los cambios se ven al momento.'],
  ['Si algo falla, ¿quién me ayuda?', 'Nuestro equipo por WhatsApp, directo desde el programa o desde esta web.'],
  ['¿Cómo luce una jornada normal?', 'Abres caja, suena una orden, la aceptas con su tiempo, la marcas lista, se entrega y al final cuadras el turno.'],
  ['¿Cuánto dura la verificación?', 'Por lo general de 1 a 3 días hábiles después de tener tus documentos completos.'],
  ['¿Sirve si cocino desde casa?', 'Sí. Cocinas caseras y negocios solo de delivery pueden sumarse si cumplen los requisitos.'],
  ['¿Hasta qué distancia reparto?', 'Tú defines tu zona. El mapa te muestra motoristas en un radio de 3 km de tu local.'],
];

const TYPES = ['Restaurante', 'Cafetería / Panadería', 'Comida rápida', 'Colmado / Supermercado', 'Farmacia', 'Tienda / Ropa', 'Ferretería', 'Otro'];

export default function SociosPage({ onNavigate }) {
  const [f, setF] = useState({ negocio: '', tipo: TYPES[0], ciudad: '', nombre: '', telefono: '', sucursales: '1' });
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);
  const [err, setErr] = useState('');
  const [faq, setFaq] = useState(0);
  const [docs, setDocs] = useState(true);

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
      await addDoc(collection(db, 'solicitudes_socios'), { ...f, promo: '3_meses_gratis', origen: 'web_unete', estado: 'nuevo', createdAt: serverTimestamp() });
    } catch (ex) {
      console.warn('solicitudes_socios:', ex);
      const txt = encodeURIComponent(`Hola, quiero sumar mi negocio a Pedidos Listo (90 días sin costo).\nNegocio: ${f.negocio}\nTipo: ${f.tipo}\nCiudad: ${f.ciudad}\nContacto: ${f.nombre} ${f.telefono}`);
      window.open(`https://wa.me/?text=${txt}`, '_blank');
    }
    setDone(true); setSending(false);
  };

  const goForm = () => document.getElementById('registro')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <div className="sx">
      <header className="sx-nav">
        <div className="sx-wrap sx-nav-in">
          <button className="sx-logo" onClick={() => onNavigate?.('home')} aria-label="Inicio">
            <img src="/unete/logo-pill.png" alt="Pedidos Listo" />
          </button>
          <nav className="sx-links">
            <a href="#pasos">¿Cómo trabajamos?</a>
            <a href="#beneficios">Ventajas</a>
            <a href="#comparar">El cambio</a>
            <a href="#faq">Dudas</a>
            <a href={APP_URL} target="_blank" rel="noreferrer">Entrar a mi local</a>
          </nav>
          <button id="sx-nav-cta" className="sx-btn light" onClick={goForm}>Unirme</button>
        </div>
      </header>

      <main>
        {/* PORTADA */}
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

        {/* 6 PASOS + PAPELES */}
        <section id="pasos" className="sx-sec">
          <div className="sx-wrap">
            <h2>De cero a vendiendo en 6 pasos</h2>
            <p className="sx-sub">Te acompañamos en cada uno, sin filas ni papeleo complicado.</p>
            <div className="sx-steps6">
              {STEPS.map((s, i) => (
                <div key={s.t} className="sx-step6">
                  <small>Paso {i + 1}</small>
                  <div className="sx-step6-ic">{s.ic}</div>
                  <p>{s.t}</p>
                </div>
              ))}
            </div>
            <div className={`sx-docs ${docs ? 'open' : ''}`}>
              <button onClick={() => setDocs(!docs)}><span>📋 Lo que debes tener a mano</span><span>{docs ? '−' : '+'}</span></button>
              <div className="sx-docs-body">
                <div>
                  <b>Negocio a tu nombre</b>
                  <ul><li>Tu cédula.</li><li>Una foto de tu carta o menú.</li><li>Datos de tu cuenta de banco.</li><li>El acuerdo de Pedidos Listo (lo apruebas en línea).</li></ul>
                </div>
                <div>
                  <b>Empresa registrada</b>
                  <ul><li>RNC vigente en la DGII.</li><li>Cédula de quien representa la empresa.</li><li>Foto de la carta o menú.</li></ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* BANDA CON VIDEO */}
        <section className="sx-band">
          <div className="sx-wrap sx-band-in">
            <div className="sx-band-txt">
              <h2>¡Tu cocina merece más clientes!</h2>
              <p>Mientras lo piensas, otros ya están despachando. Empieza hoy y paga en 90 días.</p>
              <button className="sx-btn light" onClick={goForm}>Sumar mi negocio</button>
            </div>
            <div className="sx-video"><video src="/unete/entrega.mp4" autoPlay muted loop playsInline /></div>
          </div>
        </section>

        {/* VENTAJAS */}
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

        {/* GUÍA */}
        <section className="sx-sec alt">
          <div className="sx-wrap">
            <h2>Ideas para arrancar con el pie derecho</h2>
            <p className="sx-sub">Consejos cortos para que tu local brille desde el primer día.</p>
            <div className="sx-tips">
              {TIPS.map((t) => (
                <article key={t.t} className="sx-tip">
                  <div className="sx-tip-img" style={{ backgroundImage: `url('${t.img}')` }} />
                  <div className="sx-tip-b"><h3>{t.t}</h3><p>{t.d}</p><button className="sx-btn sm" onClick={goForm}>Ver más</button></div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* DESTACADOS CON FOTOS */}
        <section className="sx-band tall">
          <div className="sx-wrap sx-feat">
            <div className="sx-feat-row">
              <div className="sx-feat-txt"><h3>Tu plato, tu mejor anuncio</h3><p>Sube fotos reales de tu comida y deja que hablen por ti. Los clientes compran con los ojos, y en Pedidos Listo tu menú luce grande y apetitoso.</p></div>
              <div className="sx-feat-img" style={{ backgroundImage: "url('/unete/plato3.jpg')" }} />
            </div>
            <div className="sx-feat-row rev">
              <div className="sx-feat-img" style={{ backgroundImage: "url('/unete/plato1.jpg')" }} />
              <div className="sx-feat-txt"><h3>Rapidez que se nota</h3><p>La alarma te avisa al segundo, la comanda sale a cocina y el cliente ve el tiempo estimado. Menos llamadas, más órdenes despachadas.</p></div>
            </div>
          </div>
        </section>

        {/* EL CAMBIO */}
        <section id="comparar" className="sx-sec">
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

        {/* MOTORISTAS */}
        <section className="sx-sec alt">
          <div className="sx-wrap sx-fleet">
            <div>
              <h2>Mensajeros a la vuelta de la esquina</h2>
              <p>Concéntrate en cocinar rico; del traslado se encarga la red Listo. Mira en el mapa quién está cerca, pide con un toque o usa tus propios motoristas.</p>
              <button className="sx-btn" onClick={goForm}>Empezar ahora</button>
            </div>
            <div className="sx-video"><video src="/unete/moto.mp4" autoPlay muted loop playsInline /></div>
          </div>
        </section>

        {/* HERRAMIENTAS */}
        <section className="sx-band">
          <div className="sx-wrap">
            <h2 className="light">Extras que hacen la diferencia</h2>
            <div className="sx-sols">
              {SOLUTIONS.map((s) => (
                <article key={s.t} className="sx-sol"><span>Pedidos Listo · {s.tag}</span><h3>{s.t}</h3><p>{s.d}</p></article>
              ))}
            </div>
          </div>
        </section>

        {/* TIPOS DE NEGOCIO */}
        <section className="sx-sec">
          <div className="sx-wrap">
            <h2>Hecho para todo tipo de negocio</h2>
            <p className="sx-sub">Si vendes algo que se pueda llevar a una puerta, aquí tienes espacio.</p>
            <div className="sx-chips">{BUSINESS.map((b) => <span key={b}>{b}</span>)}</div>
          </div>
        </section>

        {/* 3 PASOS + FORMULARIO */}
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

        {/* DUDAS */}
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
