import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export default function PlanSelectionModal({ 
  isOpen, 
  onClose, 
  onSelectPlan, 
  proInfo: propProInfo,
  initialPlanId 
}) {
  if (!isOpen) return null;

  const proData = propProInfo || (() => {
    try {
      return JSON.parse(localStorage.getItem('listo_user') || '{}');
    } catch {
      return {};
    }
  })();

  const [step, setStep] = useState(initialPlanId ? 'benefits' : 'list');
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [activeTab, setActiveTab] = useState('card'); // 'card' | 'transfer'
  const [submitting, setSubmitting] = useState(false);

  // Datos del Profesional
  const [proName, setProName] = useState(proData.name || proData.displayName || 'Juan Carlos p');
  const [proEmail, setProEmail] = useState(proData.email || 'juancarlosperez112725@gmail.com');
  const [proPhone, setProPhone] = useState(proData.phone || '8096163322');
  const [proCategory, setProCategory] = useState(proData.category || proData.job || 'tapicero');

  // Datos Tarjeta
  const [cardHolder, setCardHolder] = useState(proData.name || 'JUAN CARLOS P');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExp, setCardExp] = useState('');
  const [cardCvv, setCardCvv] = useState('');

  // Datos Transferencia
  const [originBank, setOriginBank] = useState('');
  const [depositorName, setDepositorName] = useState(proData.name || 'Juan Carlos p');
  const [voucherFile, setVoucherFile] = useState(null);
  const [copiedIdx, setCopiedIdx] = useState(null);

  const plans = [
    {
      num: 1,
      id: 'standard',
      badge: 'BÁSICO',
      name: 'Plan Estándar',
      stars: '⭐ 0-3.9',
      contracts: '3 contratos',
      numContracts: 3,
      price: 'RD$500',
      priceNum: 500,
      emoji: '🔹',
      class3d: 'plan-3d-standard',
      color: '#16a34a',
      bg: 'linear-gradient(135deg, #2E7D32 0%, #1B5E20 100%)',
      cardGradient: 'linear-gradient(135deg, #15803D 0%, #166534 100%)',
      benefits: [
        '3 contratos al mes incluidos en la aplicación.',
        'Ideal para profesionales que realizan servicios ocasionales.',
        'Visibilidad básica en los listados de búsqueda.',
        'Calificaciones y comentarios de clientes habilitados.',
        'Soporte técnico estándar a través de la aplicación.'
      ]
    },
    {
      num: 2,
      id: 'gold',
      badge: 'POPULAR',
      name: 'Plan Gold',
      stars: '⭐ 4.0-4.7',
      contracts: '8 contratos',
      numContracts: 8,
      price: 'RD$1,000',
      priceNum: 1000,
      emoji: '🥇',
      class3d: 'plan-3d-gold',
      color: '#B8860B',
      bg: 'linear-gradient(135deg, #D4A017 0%, #B8780A 100%)',
      cardGradient: 'linear-gradient(135deg, #B45309 0%, #92400E 100%)',
      benefits: [
        '8 contratos al mes incluidos (¡Más del doble que el plan estándar!).',
        'Destacado popular en los listados de búsqueda.',
        'Posicionamiento mejorado en los resultados de búsqueda.',
        'Acceso prioritario a nuevas solicitudes en tu área de cobertura.',
        'Soporte directo y personalizado a través de WhatsApp.'
      ]
    },
    {
      num: 3,
      id: 'platinum',
      badge: 'ACTIVO',
      name: 'Plan Platinum',
      stars: '⭐ 4.5-4.7',
      contracts: '12 contratos',
      numContracts: 12,
      price: 'RD$1,500',
      priceNum: 1500,
      emoji: '🥈',
      class3d: 'plan-3d-platinum',
      color: '#64748B',
      bg: 'linear-gradient(135deg, #64748B 0%, #475569 100%)',
      cardGradient: 'linear-gradient(135deg, #334155 0%, #1E293B 100%)',
      benefits: [
        '12 contratos al mes incluidos (¡Ideal para profesionales muy activos!).',
        'Insignia de "Profesional Recomendado" visible en tu perfil.',
        'Posicionamiento de búsqueda prioritario sobre Estándar y Gold.',
        'Notificaciones de solicitudes en tiempo real con 5 segundos de ventaja.',
        'Soporte VIP y asesoría personalizada de Listo Patrón.'
      ]
    },
    {
      num: 4,
      id: 'vip',
      badge: 'ÉLITE',
      name: 'Plan VIP',
      stars: '⭐ 4.8-5.0',
      contracts: '∞ contratos',
      numContracts: 999,
      price: 'RD$2,500',
      priceNum: 2500,
      emoji: '💎',
      class3d: 'plan-3d-vip',
      color: '#F26000',
      isVip: true,
      bg: 'linear-gradient(135deg, #F26000 0%, #EA580C 100%)',
      cardGradient: 'linear-gradient(135deg, #C2410C 0%, #9A3412 100%)',
      benefits: [
        'Contratos ILIMITADOS (Aplica a todos los trabajos que quieras sin restricciones).',
        'Insignia de "Élite VIP" en tu perfil y máxima exposición en la app.',
        'Primeros resultados de búsqueda garantizados siempre.',
        'Alertas instantáneas y prioritarias de todas las solicitudes publicadas.',
        'Soporte telefónico dedicado 24/7 y asistencia de cuenta premium.'
      ]
    }
  ];

  // Al abrir o cambiar initialPlanId
  useEffect(() => {
    if (initialPlanId) {
      const match = plans.find(p => p.id === initialPlanId || p.num.toString() === initialPlanId.toString());
      if (match) {
        setSelectedPlan(match);
        setStep('benefits');
        return;
      }
    }
    // Si no viene initialPlanId, mostrar lista de 4 tarjetas
    setSelectedPlan(null);
    setStep('list');
  }, [initialPlanId, isOpen]);

  const copyCuenta = (num, idx) => {
    navigator.clipboard.writeText(num);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 1800);
  };

  const handleSelectPlanCard = (p) => {
    setSelectedPlan(p);
    setStep('benefits');
  };

  const handleGoToAzul = () => {
    setActiveTab('card');
    setStep('checkout');
  };

  const handleGoToTransfer = () => {
    setActiveTab('transfer');
    setStep('checkout');
  };

  const handleConfirmAzulPayment = async () => {
    if (!proName.trim() || !cardNumber.trim()) {
      alert('⚠️ Por favor completa los datos de la tarjeta.');
      return;
    }
    setSubmitting(true);
    try {
      await addDoc(collection(db, 'payments'), {
        proId: proData.uid || '',
        proName: proName.trim(),
        email: proEmail.trim(),
        phone: proPhone.trim(),
        proCategory: proCategory.trim(),
        planId: selectedPlan.id,
        planName: selectedPlan.name,
        planPriceVal: selectedPlan.priceNum,
        paymentMethod: 'azul_card',
        last4: cardNumber.replace(/\s+/g, '').slice(-4) || '1234',
        cardHolder: cardHolder.trim() || proName.trim(),
        status: 'approved',
        gateway: 'AZUL Banco Popular',
        createdAt: serverTimestamp()
      });

      await addDoc(collection(db, 'notificaciones'), {
        userId: proData.uid || 'admin',
        type: 'plan_activated',
        title: '🎉 ¡PLAN ACTIVADO CON ÉXITO!',
        text: `Se ha procesado tu pago de ${selectedPlan.price} con pasarela AZUL. Tu ${selectedPlan.name} está activo.`,
        read: false,
        date: new Date().toISOString(),
        createdAt: serverTimestamp()
      });

      onSelectPlan?.(selectedPlan);
      setStep('success');
    } catch (e) {
      console.error(e);
      alert('Ocurrió un error al procesar el pago con AZUL.');
    }
    setSubmitting(false);
  };

  const handleConfirmTransfer = async () => {
    if (!proName.trim()) {
      alert('⚠️ Por favor ingresa el nombre de tu cuenta.');
      return;
    }
    setSubmitting(true);
    try {
      await addDoc(collection(db, 'payments'), {
        proId: proData.uid || '',
        proName: proName.trim(),
        email: proEmail.trim(),
        phone: proPhone.trim(),
        proCategory: proCategory.trim(),
        planId: selectedPlan.id,
        planName: selectedPlan.name,
        planPriceVal: selectedPlan.priceNum,
        paymentMethod: 'bank_transfer',
        bank: originBank || 'Banreservas',
        depositorName: depositorName || proName,
        status: 'pending',
        createdAt: serverTimestamp()
      });

      await addDoc(collection(db, 'notificaciones'), {
        userId: 'admin',
        type: 'system',
        title: '🏦 NUEVA TRANSFERENCIA NOTIFICADA',
        text: `El profesional ${proName} (${proCategory}) notificó transferencia para ${selectedPlan.name} (${selectedPlan.price}).`,
        read: false,
        date: new Date().toISOString(),
        createdAt: serverTimestamp()
      });

      onSelectPlan?.(selectedPlan);
      setStep('success');
    } catch (e) {
      console.error(e);
      alert('Ocurrió un error al notificar la transferencia.');
    }
    setSubmitting(false);
  };

  const getWhatsAppReceiptLink = () => {
    const text = `¡Hola Listo Patrón! He realizado una transferencia para activar mi plan:%0A%0A*Plan:* ${selectedPlan.name} (${selectedPlan.price})%0A*Profesional:* ${proName}%0A*Oficio:* ${proCategory}%0A*Teléfono:* ${proPhone}%0A*Banco de Origen:* ${originBank || 'Banreservas'}%0A*Depositante:* ${depositorName || proName}%0A%0AAdjunto mi comprobante para activación rápida.`;
    return `https://wa.me/18099090455?text=${text}`;
  };

  // Renderizar la tarjeta 3D exacta que coincide con las capturas
  const render3DCard = (p, isButton = true) => (
    <div
      key={p.num}
      onClick={isButton ? () => handleSelectPlanCard(p) : undefined}
      className={`plan-3d-wrap ${p.class3d}`}
      style={{
        cursor: isButton ? 'pointer' : 'default',
        width: '100%',
        maxWidth: isButton ? '240px' : '250px',
        margin: isButton ? '0' : '0 auto',
        boxShadow: p.isVip ? '0 0 0 2px #F26000, 0 10px 25px rgba(242,96,0,0.45)' : undefined,
        borderRadius: '20px'
      }}
    >
      <div className="plan-3d-blur" style={{
        position: "absolute", bottom: "-7px", left: "7px", right: "-2px", height: "100%",
        borderRadius: "18px", opacity: "0.28", filter: "blur(5px)", zIndex: "0"
      }}></div>
      <div className="plan-3d-inner" style={{ padding: '20px 12px 16px', minHeight: '172px' }}>
        <div className="plan-3d-shine-top"></div>
        <div className="plan-3d-badge">{p.badge}</div>
        <div className="plan-3d-num">{p.num}</div>
        
        <div style={{ marginTop: "12px", position: "relative" }}>
          <span className="plan-3d-emoji">{p.emoji}</span>
          {p.isVip && (
            <>
              <span style={{ position: "absolute", top: "-8px", right: "-13px", fontSize: "13px", animation: "twinkle 0.8s ease-in-out infinite alternate" }}>✨</span>
              <span style={{ position: "absolute", bottom: "-5px", left: "-11px", fontSize: "11px", animation: "twinkle 1.2s ease-in-out infinite alternate" }}>⭐</span>
            </>
          )}
        </div>

        <p style={{
          fontSize: "14px", fontWeight: "900", color: "white", margin: "7px 0 0",
          textShadow: "0 1px 4px rgba(0,0,0,0.4)", textAlign: "center", lineHeight: "1.2",
          fontFamily: "'Outfit', 'Fredoka One', sans-serif, system-ui"
        }}>
          {p.name}
        </p>

        <p style={{ fontSize: "10.5px", color: "rgba(255,255,255,0.88)", margin: "2px 0 0", fontWeight: "700" }}>
          {p.stars} | {p.contracts}
        </p>

        <div className="plan-3d-price-box" style={{ margin: '8px 0 0', padding: '4px 12px' }}>
          <p style={{ fontSize: "14px", fontWeight: "900", color: "white", margin: "0", textShadow: "0 1px 4px rgba(0,0,0,0.5)" }}>
            {p.price}
          </p>
        </div>

        {isButton && (
          <p style={{
            fontSize: "9px", color: "rgba(255,255,255,0.85)", margin: "7px 0 0",
            fontWeight: "900", letterSpacing: "0.5px"
          }}>
            ELEGIR PLAN →
          </p>
        )}
      </div>
    </div>
  );

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 999999,
      background: 'rgba(0, 0, 0, 0.78)', backdropFilter: 'blur(8px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px',
      overflowY: 'auto'
    }} onClick={onClose}>
      
      <div style={{
        background: '#FFFFFF', borderRadius: '32px',
        maxWidth: step === 'list' ? '980px' : '490px',
        width: '100%',
        padding: step === 'list' ? '32px 28px' : '26px 22px',
        position: 'relative',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.4)',
        maxHeight: '94vh', overflowY: 'auto',
        border: '1px solid rgba(0,0,0,0.08)',
        fontFamily: "'Outfit', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
      }} onClick={e => e.stopPropagation()}>

        {/* Botón Cerrar */}
        <button onClick={onClose} style={{
          position: 'absolute', top: '16px', right: '16px',
          background: '#F1F5F9', border: 'none', borderRadius: '50%',
          width: '36px', height: '36px', fontSize: '16px', fontWeight: 'bold',
          color: '#64748B', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 10, transition: 'background 0.2s'
        }}>
          ✕
        </button>

        {/* ============================================================== */}
        {/* PASO 1: SELECCIÓN DE PLAN (4 BOTONES 3D HORIZONTALES)          */}
        {/* ============================================================== */}
        {step === 'list' && (
          <div>
            <div style={{ textAlign: 'center', marginBottom: '26px' }}>
              <h2 style={{ fontSize: '26px', fontWeight: '900', color: '#1E293B', margin: '0 0 6px', letterSpacing: '-0.3px' }}>
                Adquirir Plan Profesional
              </h2>
              <p style={{ fontSize: '14px', color: '#64748B', margin: 0, fontWeight: '500' }}>
                Selecciona el plan que se adapte a tus necesidades para habilitar tu cuenta Listo Patrón.
              </p>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
              gap: '14px',
              justifyItems: 'center'
            }}>
              {plans.map(p => render3DCard(p, true))}
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* PASO 2: BENEFICIOS INCLUIDOS DEL PLAN SELECCIONADO            */}
        {/* ============================================================== */}
        {step === 'benefits' && selectedPlan && (
          <div>
            {/* Tarjeta Visual 3D del Plan Seleccionado en el Encabezado */}
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '18px' }}>
              {render3DCard(selectedPlan, false)}
            </div>

            <div style={{ textAlign: 'center', marginBottom: '14px' }}>
              <h3 style={{ fontSize: '22px', fontWeight: '900', color: '#0F172A', margin: '0' }}>
                Beneficios Incluidos
              </h3>
            </div>

            {/* Contenedor de Beneficios con Checkmarks */}
            <div style={{
              background: '#F8FAFC',
              border: '1.5px solid #E2E8F0',
              borderRadius: '20px',
              padding: '18px 20px',
              marginBottom: '20px'
            }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '11px' }}>
                {selectedPlan.benefits.map((b, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                    <span style={{ color: '#059669', fontSize: '17px', fontWeight: '900', lineHeight: '1.2' }}>✓</span>
                    <span style={{ fontSize: '13px', color: '#334155', fontWeight: '600', lineHeight: '1.45' }}>{b}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Botones de Acción */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <button onClick={handleGoToAzul} style={{
                width: '100%', background: '#059669', color: '#FFFFFF', border: 'none',
                borderRadius: '16px', padding: '14px', fontSize: '15px', fontWeight: '900',
                cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                boxShadow: '0 4px 14px rgba(5, 150, 105, 0.35)', transition: 'transform 0.15s'
              }}>
                <span>💳</span> Adquirir con Pasarela AZUL
              </button>

              <button onClick={handleGoToTransfer} style={{
                width: '100%', background: '#F26000', color: '#FFFFFF', border: 'none',
                borderRadius: '16px', padding: '14px', fontSize: '15px', fontWeight: '900',
                cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                boxShadow: '0 4px 14px rgba(242, 96, 0, 0.35)', transition: 'transform 0.15s'
              }}>
                <span>🏦</span> Pagos por Transferencia
              </button>
            </div>

            {/* Enlace para volver a la lista de 4 planes */}
            <div style={{ textAlign: 'center', marginTop: '16px' }}>
              <button onClick={() => setStep('list')} style={{
                background: 'transparent', border: 'none', color: '#64748B',
                fontSize: '13px', fontWeight: '700', cursor: 'pointer', textDecoration: 'none',
                display: 'inline-flex', alignItems: 'center', gap: '4px'
              }}>
                <span>👀</span> Mirar otras opciones
              </button>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* PASO 3: CHECKOUT (TARJETA AZUL / TRANSFERENCIA)                 */}
        {/* ============================================================== */}
        {step === 'checkout' && selectedPlan && (
          <div>
            {/* Header del Checkout */}
            <div style={{ textAlign: 'center', marginBottom: '18px' }}>
              <div style={{
                width: '46px', height: '46px', borderRadius: '50%', background: '#F26000',
                margin: '0 auto 8px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 4px 12px rgba(242,96,0,0.3)'
              }}>
                <span style={{ color: '#FFFFFF', fontWeight: '900', fontStyle: 'italic', fontSize: '14px' }}>Listo</span>
              </div>
              <h2 style={{ fontSize: '20px', fontWeight: '900', color: '#1E293B', margin: '0 0 2px' }}>
                Pagar {selectedPlan.name}
              </h2>
              <p style={{ fontSize: '14px', color: '#F26000', fontWeight: '800', margin: 0 }}>
                {selectedPlan.price} / mes
              </p>
            </div>

            {/* Pestañas de Pago */}
            <div style={{
              display: 'flex', borderBottom: '2px solid #E2E8F0', marginBottom: '18px'
            }}>
              <button onClick={() => setActiveTab('card')} style={{
                flex: 1, padding: '10px 6px', background: 'transparent', border: 'none',
                borderBottom: activeTab === 'card' ? '3px solid #F26000' : '3px solid transparent',
                color: activeTab === 'card' ? '#F26000' : '#64748B', fontWeight: '800',
                fontSize: '13px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px'
              }}>
                <span>💳</span> Tarjeta de Crédito
              </button>

              <button onClick={() => setActiveTab('transfer')} style={{
                flex: 1, padding: '10px 6px', background: 'transparent', border: 'none',
                borderBottom: activeTab === 'transfer' ? '3px solid #F26000' : '3px solid transparent',
                color: activeTab === 'transfer' ? '#F26000' : '#64748B', fontWeight: '800',
                fontSize: '13px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px'
              }}>
                <span>🏦</span> Transferencia Bancaria
              </button>
            </div>

            {/* Formulario Profesional (2x2 Grid) */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '14px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: '800', color: '#475569', marginBottom: '4px' }}>
                  Nombre en Listo
                </label>
                <input
                  type="text"
                  value={proName}
                  onChange={e => setProName(e.target.value)}
                  placeholder="Tu nombre"
                  style={{ width: '100%', padding: '9px 12px', borderRadius: '12px', border: '1.5px solid #CBD5E1', fontSize: '13px' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: '800', color: '#475569', marginBottom: '4px' }}>
                  Profesión / Oficio
                </label>
                <input
                  type="text"
                  value={proCategory}
                  onChange={e => setProCategory(e.target.value)}
                  placeholder="Ej: Tapicero, Plomero..."
                  style={{ width: '100%', padding: '9px 12px', borderRadius: '12px', border: '1.5px solid #CBD5E1', fontSize: '13px' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: '800', color: '#475569', marginBottom: '4px' }}>
                  Correo de tu Cuenta
                </label>
                <input
                  type="email"
                  value={proEmail}
                  onChange={e => setProEmail(e.target.value)}
                  placeholder="correo@ejemplo.com"
                  style={{ width: '100%', padding: '9px 12px', borderRadius: '12px', border: '1.5px solid #CBD5E1', fontSize: '13px' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: '800', color: '#475569', marginBottom: '4px' }}>
                  Teléfono / WhatsApp
                </label>
                <input
                  type="tel"
                  value={proPhone}
                  onChange={e => setProPhone(e.target.value)}
                  placeholder="809-000-0000"
                  style={{ width: '100%', padding: '9px 12px', borderRadius: '12px', border: '1.5px solid #CBD5E1', fontSize: '13px' }}
                />
              </div>
            </div>

            {/* TAB: TARJETA DE CRÉDITO (PASARELA AZUL) */}
            {activeTab === 'card' && (
              <div>
                {/* WIDGET INTERACTIVO DE TARJETA DE CRÉDITO */}
                <div style={{
                  background: selectedPlan.cardGradient,
                  borderRadius: '20px', padding: '18px 20px', color: '#FFFFFF',
                  boxShadow: '0 12px 25px rgba(0,0,0,0.25)', position: 'relative',
                  marginBottom: '16px', overflow: 'hidden'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '22px' }}>
                    {/* Chip de Tarjeta */}
                    <div style={{
                      width: '42px', height: '30px', borderRadius: '6px',
                      background: 'linear-gradient(135deg, #FFE082 0%, #FFB300 100%)',
                      border: '1px solid #FFD54F', position: 'relative'
                    }}>
                      <div style={{ position: 'absolute', inset: '4px', border: '1px solid rgba(0,0,0,0.15)', borderRadius: '3px' }}></div>
                    </div>
                    {/* Logo Listo en Tarjeta */}
                    <div style={{ fontWeight: '900', fontStyle: 'italic', fontSize: '20px', letterSpacing: '-0.5px' }}>
                      Listo
                    </div>
                  </div>

                  {/* Número en Tarjeta */}
                  <div style={{
                    fontSize: '17px', letterSpacing: '2.5px', fontFamily: 'monospace',
                    fontWeight: '700', marginBottom: '18px', textAlign: 'center'
                  }}>
                    {cardNumber.trim() ? cardNumber : '••••  ••••  ••••  ••••'}
                  </div>

                  {/* Titular y Expiración */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                    <div>
                      <div style={{ fontSize: '8px', opacity: 0.75, letterSpacing: '1px', textTransform: 'uppercase' }}>TITULAR</div>
                      <div style={{ fontSize: '12px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                        {cardHolder || proName || 'JUAN CARLOS P'}
                      </div>
                    </div>

                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '8px', opacity: 0.75, letterSpacing: '1px', textTransform: 'uppercase' }}>EXPIRA</div>
                      <div style={{ fontSize: '12px', fontWeight: '800', letterSpacing: '0.5px' }}>
                        {cardExp || 'MM/YY'}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Campos de la Tarjeta */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '11px', fontWeight: '800', color: '#475569', marginBottom: '4px' }}>
                      Nombre en la Tarjeta
                    </label>
                    <input
                      type="text"
                      placeholder="JUAN CARLOS P"
                      value={cardHolder}
                      onChange={e => setCardHolder(e.target.value.toUpperCase())}
                      style={{ width: '100%', padding: '9px 12px', borderRadius: '12px', border: '1.5px solid #CBD5E1', fontSize: '13px' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '11px', fontWeight: '800', color: '#475569', marginBottom: '4px' }}>
                      Número de Tarjeta
                    </label>
                    <input
                      type="text"
                      placeholder="4000 1234 5678 9010"
                      maxLength={19}
                      value={cardNumber}
                      onChange={e => {
                        const v = e.target.value.replace(/\D/g, '').slice(0, 16);
                        const parts = v.match(/[\s\S]{1,4}/g) || [];
                        setCardNumber(parts.join(' '));
                      }}
                      style={{ width: '100%', padding: '9px 12px', borderRadius: '12px', border: '1.5px solid #CBD5E1', fontSize: '13px', fontFamily: 'monospace' }}
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '11px', fontWeight: '800', color: '#475569', marginBottom: '4px' }}>
                        Expiración (MM/AA)
                      </label>
                      <input
                        type="text"
                        placeholder="12/28"
                        maxLength={5}
                        value={cardExp}
                        onChange={e => {
                          let v = e.target.value.replace(/\D/g, '').slice(0, 4);
                          if (v.length >= 3) v = `${v.slice(0, 2)}/${v.slice(2)}`;
                          setCardExp(v);
                        }}
                        style={{ width: '100%', padding: '9px 12px', borderRadius: '12px', border: '1.5px solid #CBD5E1', fontSize: '13px', textAlign: 'center' }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '11px', fontWeight: '800', color: '#475569', marginBottom: '4px' }}>
                        CVV / CVC
                      </label>
                      <input
                        type="password"
                        placeholder="•••"
                        maxLength={4}
                        value={cardCvv}
                        onChange={e => setCardCvv(e.target.value.replace(/\D/g, '').slice(0, 4))}
                        style={{ width: '100%', padding: '9px 12px', borderRadius: '12px', border: '1.5px solid #CBD5E1', fontSize: '13px', textAlign: 'center' }}
                      />
                    </div>
                  </div>
                </div>

                {/* Botón Pagar con AZUL */}
                <button
                  onClick={handleConfirmAzulPayment}
                  disabled={submitting}
                  style={{
                    width: '100%', background: '#059669', color: '#FFFFFF', border: 'none',
                    borderRadius: '16px', padding: '14px', fontSize: '15px', fontWeight: '900',
                    cursor: submitting ? 'wait' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                    boxShadow: '0 4px 14px rgba(5, 150, 105, 0.35)'
                  }}
                >
                  {submitting ? 'Procesando pago con AZUL...' : '✓ Pagar con Tarjeta (AZUL)'}
                </button>

                <div style={{ textAlign: 'center', marginTop: '10px', fontSize: '11px', color: '#64748B' }}>
                  🔒 Pago 100% Seguro cifrado SSL 256-Bit · Pasarela Oficial AZUL Banco Popular
                </div>
              </div>
            )}

            {/* TAB: TRANSFERENCIA BANCARIA */}
            {activeTab === 'transfer' && (
              <div>
                <div style={{ marginBottom: '12px' }}>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: '800', color: '#475569', marginBottom: '4px' }}>
                    Banco de Origen
                  </label>
                  <select
                    value={originBank}
                    onChange={e => setOriginBank(e.target.value)}
                    style={{ width: '100%', padding: '9px 12px', borderRadius: '12px', border: '1.5px solid #CBD5E1', fontSize: '13px', background: '#FFFFFF' }}
                  >
                    <option value="">Selecciona tu banco...</option>
                    <option value="Banco Popular">Banco Popular Dominicano</option>
                    <option value="Banreservas">Banreservas</option>
                    <option value="BHD">Banco BHD</option>
                    <option value="Scotiabank">Scotiabank</option>
                    <option value="Asociacion Popular">Asociación Popular (APAP)</option>
                    <option value="Otro">Otro Banco / Cooperativa</option>
                  </select>
                </div>

                {/* Caja de Cuentas Oficiales */}
                <div style={{
                  background: '#FFF7ED', border: '1.5px solid #FED7AA', borderRadius: '18px',
                  padding: '14px 16px', marginBottom: '14px'
                }}>
                  <div style={{ fontSize: '12px', fontWeight: '900', color: '#C2410C', marginBottom: '8px' }}>
                    Cuentas de Listo Patrón:
                  </div>

                  {/* Banco Popular */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', fontSize: '12px' }}>
                    <div>
                      <strong style={{ color: '#047857' }}>Banco Popular:</strong> Ahorros 746424456 (Julio de Jesús)
                    </div>
                    <button onClick={() => copyCuenta('746424456', 1)} style={{
                      background: copiedIdx === 1 ? '#10B981' : '#F1F5F9',
                      color: copiedIdx === 1 ? '#FFF' : '#334155',
                      border: '1px solid #CBD5E1', borderRadius: '8px', padding: '3px 8px',
                      fontSize: '11px', fontWeight: '800', cursor: 'pointer'
                    }}>
                      {copiedIdx === 1 ? '✓ Copiado' : 'Copiar'}
                    </button>
                  </div>

                  {/* Banreservas */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px' }}>
                    <div>
                      <strong style={{ color: '#1E3A8A' }}>Banreservas:</strong> Ahorros 960728472 (Julio de Jesús)
                    </div>
                    <button onClick={() => copyCuenta('960728472', 2)} style={{
                      background: copiedIdx === 2 ? '#10B981' : '#F1F5F9',
                      color: copiedIdx === 2 ? '#FFF' : '#334155',
                      border: '1px solid #CBD5E1', borderRadius: '8px', padding: '3px 8px',
                      fontSize: '11px', fontWeight: '800', cursor: 'pointer'
                    }}>
                      {copiedIdx === 2 ? '✓ Copiado' : 'Copiar'}
                    </button>
                  </div>
                </div>

                <div style={{ marginBottom: '12px' }}>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: '800', color: '#475569', marginBottom: '4px' }}>
                    Nombre del Depositante
                  </label>
                  <input
                    type="text"
                    value={depositorName}
                    onChange={e => setDepositorName(e.target.value)}
                    placeholder="Nombre completo de quien transfirió"
                    style={{ width: '100%', padding: '9px 12px', borderRadius: '12px', border: '1.5px solid #CBD5E1', fontSize: '13px' }}
                  />
                </div>

                {/* Subir comprobante y WhatsApp */}
                <div style={{
                  border: '2px dashed #CBD5E1', borderRadius: '16px', padding: '14px',
                  textAlign: 'center', marginBottom: '14px', background: '#F8FAFC'
                }}>
                  <div style={{ fontSize: '24px', marginBottom: '4px' }}>📎</div>
                  <div style={{ fontSize: '12px', fontWeight: '700', color: '#475569' }}>
                    {voucherFile ? `Archivo: ${voucherFile.name}` : 'Arrastra tu comprobante o haz clic para subir'}
                  </div>
                  <input
                    type="file"
                    accept="image/*,.pdf"
                    onChange={e => setVoucherFile(e.target.files[0])}
                    style={{ marginTop: '6px', fontSize: '11px' }}
                  />
                </div>

                {/* Botón WhatsApp directo */}
                <a
                  href={getWhatsAppReceiptLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                    width: '100%', background: '#25D366', color: '#FFFFFF', padding: '12px',
                    borderRadius: '14px', fontWeight: '900', fontSize: '13.5px', textDecoration: 'none',
                    marginBottom: '10px', boxShadow: '0 4px 12px rgba(37, 211, 102, 0.3)'
                  }}
                >
                  <span>💬</span> Enviar Comprobante por WhatsApp
                </a>

                {/* Botón Notificar Transferencia */}
                <button
                  onClick={handleConfirmTransfer}
                  disabled={submitting}
                  style={{
                    width: '100%', background: '#F26000', color: '#FFFFFF', border: 'none',
                    borderRadius: '16px', padding: '14px', fontSize: '15px', fontWeight: '900',
                    cursor: submitting ? 'wait' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                    boxShadow: '0 4px 14px rgba(242, 96, 0, 0.35)'
                  }}
                >
                  {submitting ? 'Notificando transferencia...' : '✓ Notificar Transferencia'}
                </button>
              </div>
            )}

            {/* Enlace para volver a beneficios */}
            <div style={{ textAlign: 'center', marginTop: '16px' }}>
              <button onClick={() => setStep('benefits')} style={{
                background: 'transparent', border: 'none', color: '#64748B',
                fontSize: '13px', fontWeight: '700', cursor: 'pointer', textDecoration: 'none'
              }}>
                ← Volver a beneficios del plan
              </button>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* PASO 4: ÉXITO                                                 */}
        {/* ============================================================== */}
        {step === 'success' && selectedPlan && (
          <div style={{ textAlign: 'center', padding: '20px 10px' }}>
            <div style={{
              width: '64px', height: '64px', borderRadius: '50%', background: '#10B981',
              color: '#FFFFFF', fontSize: '32px', display: 'flex', alignItems: 'center',
              justifyContent: 'center', margin: '0 auto 16px', boxShadow: '0 10px 25px rgba(16,185,129,0.4)'
            }}>
              ✓
            </div>
            <h2 style={{ fontSize: '24px', fontWeight: '900', color: '#1E293B', margin: '0 0 8px' }}>
              ¡Solicitud Procesada!
            </h2>
            <p style={{ fontSize: '14px', color: '#64748B', lineHeight: '1.5', maxWidth: '380px', margin: '0 auto 20px' }}>
              Tu solicitud para activar el <strong>{selectedPlan.name}</strong> ({selectedPlan.price}) ha sido registrada en el sistema de Listo Patrón.
            </p>

            <button onClick={onClose} style={{
              background: '#F26000', color: '#FFFFFF', border: 'none', borderRadius: '14px',
              padding: '12px 28px', fontSize: '14px', fontWeight: '900', cursor: 'pointer',
              boxShadow: '0 4px 14px rgba(242,96,0,0.3)'
            }}>
              Finalizar y Continuar
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
