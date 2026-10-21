// Carrusel principal de la Tienda: bolsas y empaques personalizados
import React, { useEffect, useState } from 'react';

const WA = '18099090455';
const waLink = (t) => `https://wa.me/${WA}?text=${encodeURIComponent(t)}`;
const PEDIR = waLink('¡Hola Listo Patrón! Quiero fabricar bolsas con mi logo y aprovechar el 50% de descuento en las primeras 5,000.');

const SLIDES = [
  { img: '/tienda/bolsa1.jpg', main: true },
  { img: '/tienda/bolsa2.jpg', tag: 'Bolsas de papel', t: 'Tu logo viaja en cada entrega', d: 'Bolsas kraft resistentes, impresas a todo color con la imagen de tu negocio.' },
  { img: '/tienda/bolsa3.jpg', tag: 'Diseño a tu medida', t: 'Empaques que se recuerdan', d: 'Colores, mascotas y frases de tu marca: tu cliente te reconoce antes de abrir.' },
  { img: '/tienda/bolsa4.jpg', tag: 'Con asas', t: 'Bolsas para llevar con estilo', d: 'Asas reforzadas para pedidos grandes, restaurantes, bistrós y cafeterías.' },
  { img: '/tienda/bolsa5.jpg', tag: 'Kraft ecológico', t: 'Papel que cuida el planeta', d: 'Material reciclable y apto para alimentos calientes y fríos.' },
  { img: '/tienda/bolsa6.jpg', tag: 'Cajas y estuches', t: 'Cajas para hot dogs, burgers y más', d: 'Empaques rígidos que mantienen tu comida intacta hasta la puerta.' },
  { img: '/tienda/bolsa8.jpg', tag: 'Combos completos', t: 'Bolsa, vaso y servilleta a juego', d: 'Arma el kit completo de tu marca y destaca en cada pedido.' },
];

export default function BolsasCarousel() {
  const [i, setI] = useState(0);
  const [pause, setPause] = useState(false);
  const n = SLIDES.length;
  const go = (k) => setI((k + n) % n);

  useEffect(() => {
    if (pause) return;
    const t = setTimeout(() => go(i + 1), 5500);
    return () => clearTimeout(t);
  }, [i, pause]);

  return (
    <section className="bc" onMouseEnter={() => setPause(true)} onMouseLeave={() => setPause(false)} aria-label="Bolsas y empaques personalizados">
      <style>{CSS}</style>
      {SLIDES.map((s, k) => (
        <div key={s.img} className={`bc-slide ${k === i ? 'on' : ''}`} aria-hidden={k !== i}>
          <div className="bc-bg" style={{ backgroundImage: `url('${s.img}')` }} />
          <div className="bc-shade" />
          <div className="bc-in">
            {s.main ? (
              <div className="bc-txt">
                <span className="bc-tag">🛍️ Fábrica de bolsas y empaques</span>
                <h2>FABRICAMOS<br /><em>TUS BOLSAS</em></h2>
                <p className="bc-sub">Haz tu pedido hoy mismo</p>
                <div className="bc-offer"><b>50%</b><span>DE DESCUENTO<br /><small>en tus primeras 5,000 bolsas</small></span></div>
                <div className="bc-cta">
                  <a id="bc-pedir" className="bc-btn" href={PEDIR} target="_blank" rel="noreferrer">Haz tu pedido →</a>
                  <a className="bc-btn ghost" href="#bc-galeria" onClick={(e) => { e.preventDefault(); go(1); }}>Ver modelos</a>
                </div>
              </div>
            ) : (
              <div className="bc-txt sm">
                <span className="bc-tag">{s.tag}</span>
                <h3>{s.t}</h3>
                <p>{s.d}</p>
                <div className="bc-cta">
                  <a className="bc-btn" href={PEDIR} target="_blank" rel="noreferrer">Cotizar con 50% OFF</a>
                </div>
              </div>
            )}
            <div className="bc-card"><img src={s.img} alt={s.t || 'Bolsas personalizadas para negocios de comida'} /></div>
          </div>
        </div>
      ))}

      <button className="bc-arrow l" onClick={() => go(i - 1)} aria-label="Anterior">‹</button>
      <button className="bc-arrow r" onClick={() => go(i + 1)} aria-label="Siguiente">›</button>
      <div className="bc-dots" id="bc-galeria">
        {SLIDES.map((s, k) => <button key={k} className={k === i ? 'on' : ''} onClick={() => go(k)} aria-label={`Ir a la imagen ${k + 1}`} />)}
      </div>
      <div className="bc-thumbs">
        {SLIDES.map((s, k) => <button key={k} className={k === i ? 'on' : ''} onClick={() => go(k)} style={{ backgroundImage: `url('${s.img}')` }} aria-label={`Miniatura ${k + 1}`} />)}
      </div>
    </section>
  );
}

const CSS = `
.bc { position: relative; height: 620px; margin-top: 72px; overflow: hidden; background: #FF6000; font-family: 'Outfit','Nunito Sans',system-ui,sans-serif; }
.bc-slide { position: absolute; inset: 0; opacity: 0; transition: opacity .8s ease; pointer-events: none; }
.bc-slide.on { opacity: 1; pointer-events: auto; }
.bc-bg { position: absolute; inset: -20px; background: center/cover; filter: blur(14px) saturate(1.2); transform: scale(1.08); transition: transform 6s ease; }
.bc-slide.on .bc-bg { transform: scale(1.18); }
.bc-shade { position: absolute; inset: 0; background: linear-gradient(100deg, rgba(255,96,0,.96) 0%, rgba(255,96,0,.88) 42%, rgba(255,122,31,.45) 75%, rgba(0,0,0,.15) 100%); }
.bc-in { position: relative; z-index: 2; height: 100%; width: min(1180px, 100% - 48px); margin: 0 auto; display: grid; grid-template-columns: 1.1fr 1fr; align-items: center; gap: 40px; padding-bottom: 40px; }
.bc-txt { color: #fff; transform: translateY(24px); opacity: 0; transition: all .7s .2s ease; }
.bc-slide.on .bc-txt { transform: none; opacity: 1; }
.bc-tag { display: inline-block; background: rgba(255,255,255,.2); border: 1px solid rgba(255,255,255,.5); padding: 6px 14px; border-radius: 99px; font-weight: 800; font-size: 14px; margin-bottom: 16px; }
.bc h2 { margin: 0; font-size: clamp(40px, 6vw, 76px); line-height: .95; font-weight: 900; letter-spacing: -.02em; color: #fff; }
.bc h2 em { font-style: normal; color: #fff3e6; -webkit-text-stroke: 0; text-shadow: 0 6px 30px rgba(0,0,0,.2); }
.bc-sub { font-size: clamp(18px, 2vw, 24px); font-weight: 800; margin: 14px 0 18px; }
.bc-offer { display: inline-flex; align-items: center; gap: 14px; background: #fff; color: #FF6000; border-radius: 20px; padding: 10px 22px 10px 16px; box-shadow: 0 16px 40px rgba(0,0,0,.2); animation: bcPulse 2.2s ease-in-out infinite; }
.bc-offer b { font-size: clamp(42px, 5vw, 64px); font-weight: 900; line-height: 1; }
.bc-offer span { font-weight: 900; font-size: 18px; line-height: 1.15; }
.bc-offer small { font-weight: 700; font-size: 14px; color: #1d1d1f; }
.bc-txt.sm h3 { font-size: clamp(30px, 4vw, 50px); line-height: 1.05; margin: 0 0 12px; font-weight: 900; color: #fff; }
.bc-txt.sm p { font-size: 19px; line-height: 1.5; max-width: 520px; opacity: .95; margin: 0; }
.bc-cta { display: flex; gap: 12px; flex-wrap: wrap; margin-top: 24px; }
.bc-btn { background: #fff; color: #FF6000 !important; font-weight: 900; padding: 15px 26px; border-radius: 99px; text-decoration: none; font-size: 17px; transition: transform .15s, box-shadow .2s; }
.bc-btn:hover { transform: translateY(-3px); box-shadow: 0 12px 26px rgba(0,0,0,.25); }
.bc-btn.ghost { background: transparent; color: #fff !important; border: 2px solid rgba(255,255,255,.8); }
.bc-card { justify-self: center; width: min(430px, 100%); aspect-ratio: 1; border-radius: 32px; overflow: hidden; border: 8px solid #fff; box-shadow: 0 30px 70px rgba(0,0,0,.3); transform: rotate(3deg) scale(.92); opacity: 0; transition: all .8s .1s ease; }
.bc-slide.on .bc-card { transform: rotate(-2deg) scale(1); opacity: 1; }
.bc-card img { width: 100%; height: 100%; object-fit: cover; display: block; }
.bc-arrow { position: absolute; top: 50%; z-index: 3; transform: translateY(-50%); width: 50px; height: 50px; border-radius: 50%; border: 0; background: rgba(255,255,255,.9); color: #FF6000; font-size: 34px; line-height: 1; cursor: pointer; box-shadow: 0 8px 20px rgba(0,0,0,.2); transition: transform .15s; }
.bc-arrow:hover { transform: translateY(-50%) scale(1.1); }
.bc-arrow.l { left: 18px; } .bc-arrow.r { right: 18px; }
.bc-dots { position: absolute; z-index: 3; bottom: 18px; left: 50%; transform: translateX(-50%); display: flex; gap: 8px; }
.bc-dots button { width: 10px; height: 10px; border-radius: 99px; border: 0; background: rgba(255,255,255,.55); cursor: pointer; transition: all .3s; padding: 0; }
.bc-dots button.on { width: 34px; background: #fff; }
.bc-thumbs { position: absolute; z-index: 3; right: 24px; bottom: 14px; display: flex; gap: 8px; }
.bc-thumbs button { width: 52px; height: 52px; border-radius: 12px; border: 3px solid rgba(255,255,255,.5); background: center/cover; cursor: pointer; opacity: .7; transition: all .2s; padding: 0; }
.bc-thumbs button.on, .bc-thumbs button:hover { opacity: 1; border-color: #fff; transform: translateY(-4px); }
@keyframes bcPulse { 50% { transform: scale(1.04); } }
@media (max-width: 860px) {
  .bc { height: 640px; }
  .bc-in { grid-template-columns: 1fr; gap: 16px; text-align: center; padding: 30px 0 70px; align-content: center; }
  .bc-cta { justify-content: center; }
  .bc-card { width: 200px; order: -1; }
  .bc-thumbs, .bc-arrow { display: none; }
  .bc-txt.sm p { margin: 0 auto; }
}
`;
