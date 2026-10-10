import React, { useState, useEffect } from 'react';
import { collection, addDoc, serverTimestamp, doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';

const CUENTAS_LISTO = [
  { banco: 'Banco Popular', tipo: 'Ahorros', cuenta: '746424456', titular: 'Julio de Jesús', color: '#00843D' },
  { banco: 'Banreservas', tipo: 'Ahorros', cuenta: '9607282472', titular: 'Julio de Jesús', color: '#003087' },
];

const BANCOS_ORIGEN = [
  'Banreservas',
  'Banco Popular',
  'BHD León',
  'Scotiabank',
  'Bancaribe',
  'Banco Promerica',
  'Asociación Popular (APAP)',
  'Vimenca',
  'Otro / Efectivo'
];

export default function PlanSelectionModal({ isOpen, onClose, onSelectPlan, proInfo: propProInfo }) {
  if (!isOpen) return null;

  // Estado del profesional
  const [proData, setProData] = useState({
    uid: '', name: '', email: '', phone: '', cedula: '', category: ''
  });

  // Estado de pasos: 'list' (los 4 planes) | 'benefits' (detalle del plan) | 'checkout' (pasarela / transferencia) | 'success' (confirmación)
  const [step, setStep] = useState('list');
  const [selectedPlan, setSelectedPlan] = useState({
    num: 2,
    id: 'gold',
    badge: 'POPULAR',
    name: 'Plan Gold',
    stars: '⭐ 4.0-4.7',
    contracts: '8 contratos',
    numContracts: 8,
    price: 'RD$1,000',
    priceNum: 1000,
    bg: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
    icon: '🥇',
    color: '#F59E0B',
    cardGradient: 'linear-gradient(135deg, #D97706 0%, #B45309 100%)',
    benefits: [
      '8 contratos al mes incluidos (¡Más del doble que el plan estándar!).',
      'Destacado popular en los listados de búsqueda.',
      'Posicionamiento mejorado en los resultados de búsqueda.',
      'Acceso prioritario a nuevas solicitudes en tu área de cobertura.',
      'Soporte directo y personalizado a través de WhatsApp.'
    ]
  });

  // Tab activo en checkout: 'card' (Pasarela AZUL) | 'transfer' (Transferencia Bancaria)
  const [activeTab, setActiveTab] = useState('card');

  // Formulario de cuenta / usuario
  const [proName, setProName] = useState('Juan Carlos p');
  const [proCategory, setProCategory] = useState('tapicero');
  const [proEmail, setProEmail] = useState('juancarlosperez112725@gn');
  const [proPhone, setProPhone] = useState('8096163322');

  // Formulario tarjeta (AZUL)
  const [cardHolder, setCardHolder] = useState('Juan Carlos p');
  const [cardNumber, setCardNumber] = useState('4000 1234 5678 9010');
  const [cardExpiry, setCardExpiry] = useState('MM/YY');
  const [cardCvv, setCardCvv] = useState('123');

  // Formulario transferencia
  const [originBank, setOriginBank] = useState('');
  const [depositorName, setDepositorName] = useState('Juan Carlos p');
  const [receiptFile, setReceiptFile] = useState(null);
  const [copiedIdx, setCopiedIdx] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  // Carga inicial de datos desde props, URL o Firestore
  useEffect(() => {
    let search = '';
    if (typeof window !== 'undefined') {
      search = window.location.search || '';
    }
    const params = new URLSearchParams(search);

    const uid = propProInfo?.uid || params.get('uid') || '';
    const name = propProInfo?.name || params.get('name') || '';
    const email = propProInfo?.email || params.get('email') || '';
    const phone = propProInfo?.phone || params.get('phone') || '';
    const cedula = propProInfo?.cedula || params.get('cedula') || '';
    const category = propProInfo?.category || params.get('category') || params.get('especialidad') || '';

    const initialData = {
      uid: decodeURIComponent(uid),
      name: decodeURIComponent(name),
      email: decodeURIComponent(email),
      phone: decodeURIComponent(phone),
      cedula: decodeURIComponent(cedula),
      category: decodeURIComponent(category)
    };

    setProData(initialData);

    if (initialData.name) {
      setProName(initialData.name);
      setCardHolder(initialData.name);
      setDepositorName(initialData.name);
    }
    if (initialData.category) setProCategory(initialData.category);
    if (initialData.email) setProEmail(initialData.email);
    if (initialData.phone) setProPhone(initialData.phone);

    if (initialData.uid) {
      getDoc(doc(db, 'users', initialData.uid)).then(docSnap => {
        if (docSnap.exists()) {
          const u = docSnap.data();
          const vf = u.verificacion || {};
          const fullN = u.name || vf.nombre || initialData.name;
          const fullCat = u.category || vf.especialidad || u.especialidad || initialData.category;
          const fullMail = u.email || vf.correo || initialData.email;
          const fullPh = u.phone || vf.telefono || initialData.phone;

          if (fullN) {
            setProName(fullN);
            setCardHolder(fullN);
            setDepositorName(fullN);
          }
          if (fullCat) setProCategory(fullCat);
          if (fullMail) setProEmail(fullMail);
          if (fullPh) setProPhone(fullPh);
        }
      }).catch(() => {});
    }
  }, [propProInfo, isOpen]);

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
      bg: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
      cardGradient: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
      icon: '🔹',
      color: '#10B981',
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
      bg: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
      cardGradient: 'linear-gradient(135deg, #D97706 0%, #B45309 100%)',
      icon: '🥇',
      color: '#F59E0B',
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
      bg: 'linear-gradient(135deg, #64748B 0%, #475569 100%)',
      cardGradient: 'linear-gradient(135deg, #475569 0%, #334155 100%)',
      icon: '🥈',
      color: '#64748B',
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
      bg: 'linear-gradient(135deg, #F26000 0%, #EA580C 100%)',
      cardGradient: 'linear-gradient(135deg, #C2410C 0%, #9A3412 100%)',
      icon: '💎',
      color: '#F26000',
      isVip: true,
      benefits: [
        'Contratos ILIMITADOS (Aplica a todos los trabajos que quieras sin restricciones).',
        'Insignia de "Élite VIP" en tu perfil y máxima exposición en la app.',
        'Primeros resultados de búsqueda garantizados siempre.',
        'Alertas instantáneas y prioritarias de todas las solicitudes publicadas.',
        'Soporte telefónico dedicado 24/7 y asistencia de cuenta premium.'
      ]
    }
  ];

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
        cardHolder: cardHolder || proName,
        cardLast4: cardNumber.replace(/\s/g, '').slice(-4),
        status: 'completed',
        createdAt: serverTimestamp()
      });

      await addDoc(collection(db, 'notificaciones'), {
        userId: 'admin',
        type: 'system',
        title: '💳 PAGO AZUL CON TARJETA RECIBIDO',
        text: `El profesional ${proName} (${proCategory}) completó el pago del ${selectedPlan.name} (${selectedPlan.price}) con tarjeta AZUL.`,
        read: false,
        date: new Date().toISOString(),
        createdAt: serverTimestamp()
      });

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

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 999999,
      background: 'rgba(0, 0, 0, 0.78)', backdropFilter: 'blur(8px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px',
      overflowY: 'auto'
    }} onClick={onClose}>
      
      <div style={{
        background: '#FFFFFF', borderRadius: '28px', maxWidth: '520px', width: '100%',
        padding: '24px 22px', position: 'relative', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.35)',
        maxHeight: '94vh', overflowY: 'auto', border: '1px solid rgba(0,0,0,0.08)',
        fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
      }} onClick={e => e.stopPropagation()}>

        {/* Botón Cerrar */}
        <button onClick={onClose} style={{
          position: 'absolute', top: '16px', right: '16px',
          background: '#F1F5F9', border: 'none', borderRadius: '50%',
          width: '36px', height: '36px', fontSize: '16px', fontWeight: 'bold',
          color: '#64748B', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 10
        }}>
          ✕
        </button>

        {/* ============================================================== */}
        {/* PASO 1: SELECCIÓN DE PLAN (REJILLA 4 TARJETAS)                */}
        {/* ============================================================== */}
        {step === 'list' && (
          <div>
            <div style={{ textAlign: 'center', marginBottom: '22px' }}>
              <h2 style={{ fontSize: '24px', fontWeight: '900', color: '#1E293B', margin: '0 0 6px', letterSpacing: '-0.3px' }}>
                Adquirir Plan Profesional
              </h2>
              <p style={{ fontSize: '13.5px', color: '#64748B', margin: 0, fontWeight: '500' }}>
                Selecciona el plan que se adapte a tus necesidades para habilitar tu cuenta Listo Patrón.
              </p>
            </div>

            <div style={{
              display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: '14px'
            }}>
              {plans.map(p => (
                <div key={p.num} style={{
                  background: p.bg, borderRadius: '22px', padding: '20px 16px',
                  color: '#FFFFFF', position: 'relative', display: 'flex', flexDirection: 'column',
                  alignItems: 'center', textAlign: 'center',
                  boxShadow: p.isVip ? '0 10px 25px rgba(242,96,0,0.4), 0 0 0 2px #F26000' : '0 8px 20px rgba(0,0,0,0.12)'
                }}>
                  {/* Badge y número */}
                  <div style={{
                    position: 'absolute', top: '12px', left: '12px',
                    width: '22px', height: '22px', borderRadius: '50%',
                    background: 'rgba(255,255,255,0.25)', fontSize: '11px',
                    fontWeight: '900', display: 'flex', alignItems: 'center', justifyContent: 'center'
                  }}>
                    {p.num}
                  </div>
                  <div style={{
                    position: 'absolute', top: '12px', right: '12px',
                    background: 'rgba(0,0,0,0.35)', padding: '3px 10px', borderRadius: '100px',
                    fontSize: '9.5px', fontWeight: '900', letterSpacing: '0.5px'
                  }}>
                    {p.badge}
                  </div>

                  {/* Icono */}
                  <div style={{ fontSize: '32px', margin: '14px 0 6px' }}>{p.icon}</div>

                  {/* Título y detalles */}
                  <h3 style={{ fontSize: '16px', fontWeight: '900', margin: '0 0 4px', textShadow: '0 1px 3px rgba(0,0,0,0.3)' }}>
                    {p.name}
                  </h3>
                  <p style={{ fontSize: '11px', opacity: 0.95, margin: '0 0 12px', fontWeight: '600' }}>
                    {p.stars} | {p.contracts}
                  </p>

                  {/* Precio */}
                  <div style={{
                    background: 'rgba(0, 0, 0, 0.3)', padding: '6px 16px', borderRadius: '14px',
                    fontSize: '15px', fontWeight: '900', margin: 'auto 0 14px', border: '1px solid rgba(255,255,255,0.2)'
                  }}>
                    {p.price}
                  </div>

                  {/* Botón */}
                  <button onClick={() => handleSelectPlanCard(p)} style={{
                    width: '100%', background: '#FFFFFF', color: p.color, border: 'none',
                    borderRadius: '12px', padding: '10px 12px', fontSize: '12px', fontWeight: '900',
                    cursor: 'pointer', letterSpacing: '0.5px', boxShadow: '0 2px 6px rgba(0,0,0,0.15)'
                  }}>
                    ELEGIR PLAN →
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* PASO 2: BENEFICIOS INCLUIDOS DEL PLAN SELECCIONADO            */}
        {/* ============================================================== */}
        {step === 'benefits' && selectedPlan && (
          <div>
            {/* Tarjeta Visual del Plan Seleccionado en la parte superior */}
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '18px' }}>
              <div style={{
                background: selectedPlan.bg, borderRadius: '22px', padding: '16px 20px',
                color: '#FFFFFF', width: '100%', maxWidth: '280px', textAlign: 'center',
                boxShadow: '0 10px 25px rgba(0,0,0,0.18)', position: 'relative'
              }}>
                <div style={{
                  position: 'absolute', top: '10px', left: '10px',
                  width: '20px', height: '20px', borderRadius: '50%',
                  background: 'rgba(255,255,255,0.25)', fontSize: '10.5px',
                  fontWeight: '900', display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                  {selectedPlan.num}
                </div>
                <div style={{
                  position: 'absolute', top: '10px', right: '10px',
                  background: 'rgba(0,0,0,0.35)', padding: '2px 8px', borderRadius: '100px',
                  fontSize: '9px', fontWeight: '900'
                }}>
                  {selectedPlan.badge}
                </div>

                <div style={{ fontSize: '28px', margin: '8px 0 4px' }}>{selectedPlan.icon}</div>
                <h3 style={{ fontSize: '16px', fontWeight: '900', margin: '0 0 2px' }}>{selectedPlan.name}</h3>
                <p style={{ fontSize: '10.5px', opacity: 0.95, margin: '0 0 10px', fontWeight: '600' }}>
                  {selectedPlan.stars} | {selectedPlan.contracts}
                </p>
                <div style={{
                  background: 'rgba(0,0,0,0.3)', padding: '5px 14px', borderRadius: '12px',
                  fontSize: '14px', fontWeight: '900', display: 'inline-block'
                }}>
                  {selectedPlan.price}
                </div>
              </div>
            </div>

            <h3 style={{
              textAlign: 'center', fontSize: '20px', fontWeight: '900', color: '#1E293B',
              margin: '0 0 14px'
            }}>
              Beneficios Incluidos
            </h3>

            {/* Caja de Beneficios con Checkmarks */}
            <div style={{
              background: '#F8FAFC', border: '1.5px solid #E2E8F0', borderRadius: '20px',
              padding: '18px 20px', marginBottom: '20px', textAlign: 'left'
            }}>
              {selectedPlan.benefits.map((b, idx) => (
                <div key={idx} style={{
                  display: 'flex', alignItems: 'flex-start', gap: '10px',
                  marginBottom: idx < selectedPlan.benefits.length - 1 ? '12px' : 0
                }}>
                  <span style={{ color: '#10B981', fontWeight: '900', fontSize: '16px', lineHeight: '1.2' }}>
                    ✓
                  </span>
                  <span style={{ fontSize: '13px', color: '#334155', lineHeight: '1.5', fontWeight: '500' }}>
                    {b}
                  </span>
                </div>
              ))}
            </div>

            {/* Botones de Acción */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <button 
                onClick={handleGoToAzul}
                style={{
                  width: '100%', padding: '14px', borderRadius: '16px', border: 'none',
                  background: 'linear-gradient(135deg, #059669, #10B981)', color: '#FFFFFF',
                  fontSize: '15px', fontWeight: '800', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                  boxShadow: '0 6px 16px rgba(16,185,129,0.3)'
                }}
              >
                <span>💳</span> Adquirir con Pasarela AZUL
              </button>

              <button 
                onClick={handleGoToTransfer}
                style={{
                  width: '100%', padding: '14px', borderRadius: '16px', border: 'none',
                  background: 'linear-gradient(135deg, #F26000, #EA580C)', color: '#FFFFFF',
                  fontSize: '15px', fontWeight: '800', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                  boxShadow: '0 6px 16px rgba(242,96,0,0.3)'
                }}
              >
                <span>🏦</span> Pagos por Transferencia
              </button>

              <button 
                onClick={() => setStep('list')}
                style={{
                  width: '100%', padding: '12px', borderRadius: '16px',
                  background: '#FFFFFF', border: '1.5px solid #CBD5E1', color: '#475569',
                  fontSize: '13.5px', fontWeight: '700', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px'
                }}
              >
                <span>👀</span> Mirar otras opciones
              </button>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* PASO 3: CHECKOUT (PASARELA AZUL TARJETA O TRANSFERENCIA)       */}
        {/* ============================================================== */}
        {step === 'checkout' && selectedPlan && (
          <div>
            {/* Header del Plan */}
            <div style={{ textAlign: 'center', marginBottom: '16px' }}>
              <div style={{
                width: '42px', height: '42px', borderRadius: '50%', background: '#F26000',
                color: '#fff', fontSize: '15px', fontWeight: '900', display: 'flex',
                alignItems: 'center', justifyContent: 'center', margin: '0 auto 8px',
                boxShadow: '0 4px 12px rgba(242,96,0,0.35)'
              }}>
                Listo
              </div>
              <h3 style={{ fontSize: '21px', fontWeight: '900', color: '#1E293B', margin: '0 0 2px' }}>
                Pagar {selectedPlan.name}
              </h3>
              <div style={{ fontSize: '15px', fontWeight: '800', color: '#F26000' }}>
                {selectedPlan.price} / mes
              </div>
            </div>

            {/* Pestañas: Tarjeta de Crédito | Transferencia Bancaria */}
            <div style={{
              display: 'flex', borderBottom: '2px solid #E2E8F0', marginBottom: '18px', gap: '8px'
            }}>
              <button
                onClick={() => setActiveTab('card')}
                style={{
                  flex: 1, padding: '10px 4px', background: 'none', border: 'none',
                  borderBottom: activeTab === 'card' ? '3px solid #F26000' : '3px solid transparent',
                  color: activeTab === 'card' ? '#F26000' : '#64748B',
                  fontWeight: activeTab === 'card' ? '800' : '600', fontSize: '13.5px',
                  cursor: 'pointer', marginBottom: '-2px', transition: 'all 0.2s'
                }}
              >
                💳 Tarjeta de Crédito
              </button>
              <button
                onClick={() => setActiveTab('transfer')}
                style={{
                  flex: 1, padding: '10px 4px', background: 'none', border: 'none',
                  borderBottom: activeTab === 'transfer' ? '3px solid #F26000' : '3px solid transparent',
                  color: activeTab === 'transfer' ? '#F26000' : '#64748B',
                  fontWeight: activeTab === 'transfer' ? '800' : '600', fontSize: '13.5px',
                  cursor: 'pointer', marginBottom: '-2px', transition: 'all 0.2s'
                }}
              >
                🏦 Transferencia Bancaria
              </button>
            </div>

            {/* CAMPOS COMUNES PRE-LLENADOS */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px', textAlign: 'left' }}>
              <div>
                <label style={{ fontSize: '11.5px', fontWeight: '800', color: '#1E293B', display: 'block', marginBottom: '5px' }}>
                  Nombre en Listo
                </label>
                <input 
                  type="text" 
                  value={proName} 
                  onChange={e => { setProName(e.target.value); setCardHolder(e.target.value); setDepositorName(e.target.value); }}
                  placeholder="Ej. Juan Carlos p"
                  style={{
                    width: '100%', padding: '10px 12px', borderRadius: '12px',
                    border: '1.5px solid #E2E8F0', background: '#F8FAFC', fontSize: '13px',
                    fontWeight: '600', color: '#1E293B', outline: 'none', boxSizing: 'border-box'
                  }}
                />
              </div>

              <div>
                <label style={{ fontSize: '11.5px', fontWeight: '800', color: '#1E293B', display: 'block', marginBottom: '5px' }}>
                  Profesión / Oficio
                </label>
                <input 
                  type="text" 
                  value={proCategory} 
                  onChange={e => setProCategory(e.target.value)}
                  placeholder="Ej. tapicero"
                  style={{
                    width: '100%', padding: '10px 12px', borderRadius: '12px',
                    border: '1.5px solid #E2E8F0', background: '#F8FAFC', fontSize: '13px',
                    fontWeight: '600', color: '#1E293B', outline: 'none', boxSizing: 'border-box'
                  }}
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px', textAlign: 'left' }}>
              <div>
                <label style={{ fontSize: '11.5px', fontWeight: '800', color: '#1E293B', display: 'block', marginBottom: '5px' }}>
                  Correo de tu Cuenta
                </label>
                <input 
                  type="email" 
                  value={proEmail} 
                  onChange={e => setProEmail(e.target.value)}
                  placeholder="ejemplo@correo.com"
                  style={{
                    width: '100%', padding: '10px 12px', borderRadius: '12px',
                    border: '1.5px solid #E2E8F0', background: '#F8FAFC', fontSize: '13px',
                    fontWeight: '600', color: '#1E293B', outline: 'none', boxSizing: 'border-box'
                  }}
                />
              </div>

              <div>
                <label style={{ fontSize: '11.5px', fontWeight: '800', color: '#1E293B', display: 'block', marginBottom: '5px' }}>
                  Teléfono / WhatsApp
                </label>
                <input 
                  type="tel" 
                  value={proPhone} 
                  onChange={e => setProPhone(e.target.value)}
                  placeholder="8096163322"
                  style={{
                    width: '100%', padding: '10px 12px', borderRadius: '12px',
                    border: '1.5px solid #E2E8F0', background: '#F8FAFC', fontSize: '13px',
                    fontWeight: '600', color: '#1E293B', outline: 'none', boxSizing: 'border-box'
                  }}
                />
              </div>
            </div>

            {/* ============================================================== */}
            {/* SUB-VISTA: TARJETA DE CRÉDITO (PASARELA AZUL)                  */}
            {/* ============================================================== */}
            {activeTab === 'card' && (
              <div>
                {/* WIDGET VISUAL DE TARJETA CON COLOR DINÁMICO DEL PLAN */}
                <div style={{
                  background: selectedPlan.cardGradient, borderRadius: '20px', padding: '18px 20px',
                  color: '#FFFFFF', boxShadow: '0 12px 28px rgba(0,0,0,0.22)', marginBottom: '18px',
                  position: 'relative', overflow: 'hidden', textAlign: 'left'
                }}>
                  {/* Brillo reflectivo de plástico */}
                  <div style={{
                    position: 'absolute', top: '-50%', left: '-50%', width: '200%', height: '200%',
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, transparent 60%)',
                    pointerEvents: 'none'
                  }} />

                  {/* Fila superior: Chip EMV + Logo Listo */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                    <div style={{
                      width: '42px', height: '32px', borderRadius: '6px',
                      background: 'linear-gradient(135deg, #FDE68A 0%, #D97706 100%)',
                      border: '1px solid rgba(255,255,255,0.4)', boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                    }} />
                    <span style={{ fontSize: '20px', fontWeight: '900', fontStyle: 'italic', letterSpacing: '-0.5px' }}>
                      Listo
                    </span>
                  </div>

                  {/* Número de tarjeta simulado o en vivo */}
                  <div style={{
                    fontSize: '18px', fontWeight: '700', letterSpacing: '3px',
                    fontFamily: 'monospace', marginBottom: '14px', textShadow: '0 1px 2px rgba(0,0,0,0.4)'
                  }}>
                    {cardNumber || '•••• •••• •••• ••••'}
                  </div>

                  {/* Fila inferior: Titular y Expiración */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                    <div>
                      <div style={{ fontSize: '9px', opacity: 0.8, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                        TITULAR
                      </div>
                      <div style={{ fontSize: '13px', fontWeight: '800', textTransform: 'uppercase' }}>
                        {cardHolder || proName || 'JUAN CARLOS P'}
                      </div>
                    </div>
                    <div>
                      <div style={{ fontSize: '9px', opacity: 0.8, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                        EXPIRA
                      </div>
                      <div style={{ fontSize: '13px', fontWeight: '800' }}>
                        {cardExpiry || 'MM/YY'}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Campos de la Tarjeta */}
                <div style={{ textAlign: 'left', marginBottom: '12px' }}>
                  <label style={{ fontSize: '11.5px', fontWeight: '800', color: '#1E293B', display: 'block', marginBottom: '5px' }}>
                    Nombre en la Tarjeta
                  </label>
                  <input 
                    type="text" 
                    value={cardHolder} 
                    onChange={e => setCardHolder(e.target.value)}
                    placeholder="Juan Carlos p"
                    style={{
                      width: '100%', padding: '10px 12px', borderRadius: '12px',
                      border: '1.5px solid #E2E8F0', background: '#FFFFFF', fontSize: '13px',
                      fontWeight: '600', color: '#1E293B', outline: 'none', boxSizing: 'border-box'
                    }}
                  />
                </div>

                <div style={{ textAlign: 'left', marginBottom: '12px' }}>
                  <label style={{ fontSize: '11.5px', fontWeight: '800', color: '#1E293B', display: 'block', marginBottom: '5px' }}>
                    Número de Tarjeta
                  </label>
                  <input 
                    type="text" 
                    value={cardNumber} 
                    onChange={e => setCardNumber(e.target.value)}
                    placeholder="4000 1234 5678 9010"
                    style={{
                      width: '100%', padding: '10px 12px', borderRadius: '12px',
                      border: '1.5px solid #E2E8F0', background: '#FFFFFF', fontSize: '13px',
                      fontWeight: '600', color: '#1E293B', outline: 'none', boxSizing: 'border-box'
                    }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '14px', textAlign: 'left' }}>
                  <div>
                    <label style={{ fontSize: '11.5px', fontWeight: '800', color: '#1E293B', display: 'block', marginBottom: '5px' }}>
                      Vencimiento (MM/YY)
                    </label>
                    <input 
                      type="text" 
                      value={cardExpiry} 
                      onChange={e => setCardExpiry(e.target.value)}
                      placeholder="MM/YY"
                      style={{
                        width: '100%', padding: '10px 12px', borderRadius: '12px',
                        border: '1.5px solid #E2E8F0', background: '#FFFFFF', fontSize: '13px',
                        fontWeight: '600', color: '#1E293B', outline: 'none', boxSizing: 'border-box'
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: '11.5px', fontWeight: '800', color: '#1E293B', display: 'block', marginBottom: '5px' }}>
                      CVV
                    </label>
                    <input 
                      type="password" 
                      maxLength="4"
                      value={cardCvv} 
                      onChange={e => setCardCvv(e.target.value)}
                      placeholder="123"
                      style={{
                        width: '100%', padding: '10px 12px', borderRadius: '12px',
                        border: '1.5px solid #E2E8F0', background: '#FFFFFF', fontSize: '13px',
                        fontWeight: '600', color: '#1E293B', outline: 'none', boxSizing: 'border-box'
                      }}
                    />
                  </div>
                </div>

                {/* Caja de Transacción Encriptada */}
                <div style={{
                  background: '#F0F9FF', border: '1.5px solid #BAE6FD', borderRadius: '14px',
                  padding: '12px 14px', marginBottom: '18px', textAlign: 'left'
                }}>
                  <div style={{ fontSize: '12.5px', fontWeight: '800', color: '#0369A1', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span>🛡️</span> Transacción Encriptada
                  </div>
                  <p style={{ fontSize: '11.5px', color: '#0284C7', margin: '4px 0 0', lineHeight: '1.4' }}>
                    Tus datos bancarios se transmiten cifrados de forma segura. No almacenamos tus credenciales de pago.
                  </p>
                </div>

                {/* Botón Pagar con Tarjeta (AZUL) */}
                <button 
                  onClick={handleConfirmAzulPayment}
                  disabled={submitting}
                  style={{
                    width: '100%', padding: '14px', background: 'linear-gradient(135deg, #059669, #10B981)',
                    color: '#FFFFFF', border: 'none', borderRadius: '16px', fontSize: '15px', fontWeight: '900',
                    cursor: 'pointer', boxShadow: '0 6px 18px rgba(16,185,129,0.35)', opacity: submitting ? 0.7 : 1
                  }}
                >
                  {submitting ? '⏳ Procesando pago...' : '✓ Pagar con Tarjeta (AZUL)'}
                </button>
              </div>
            )}

            {/* ============================================================== */}
            {/* SUB-VISTA: TRANSFERENCIA BANCARIA                             */}
            {/* ============================================================== */}
            {activeTab === 'transfer' && (
              <div>
                {/* Banco de Origen Dropdown */}
                <div style={{ textAlign: 'left', marginBottom: '14px' }}>
                  <label style={{ fontSize: '11.5px', fontWeight: '800', color: '#1E293B', display: 'block', marginBottom: '5px' }}>
                    Banco de Origen
                  </label>
                  <select 
                    value={originBank}
                    onChange={e => setOriginBank(e.target.value)}
                    style={{
                      width: '100%', padding: '10px 12px', borderRadius: '12px',
                      border: '1.5px solid #E2E8F0', background: '#FFFFFF', fontSize: '13px',
                      fontWeight: '600', color: '#1E293B', outline: 'none', boxSizing: 'border-box'
                    }}
                  >
                    <option value="" disabled>Selecciona tu banco...</option>
                    {BANCOS_ORIGEN.map(b => (
                      <option key={b} value={b}>{b}</option>
                    ))}
                  </select>
                </div>

                {/* Caja de Cuentas de Listo Patrón */}
                <div style={{
                  background: '#FFF8F3', border: '1px solid #FFE4D6', borderRadius: '16px',
                  padding: '14px 16px', marginBottom: '14px', textAlign: 'left'
                }}>
                  <div style={{ fontSize: '12.5px', fontWeight: '800', color: '#C24E00', marginBottom: '8px' }}>
                    Cuentas de Listo Patrón:
                  </div>
                  {CUENTAS_LISTO.map((c, idx) => (
                    <div key={c.banco} style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                      marginBottom: idx < CUENTAS_LISTO.length - 1 ? '8px' : 0, fontSize: '12px'
                    }}>
                      <div style={{ color: '#1E293B' }}>
                        <strong style={{ color: c.color }}>{c.banco}:</strong> {c.tipo} {c.cuenta} ({c.titular})
                      </div>
                      <button 
                        onClick={() => copyCuenta(c.cuenta, idx)}
                        style={{
                          background: '#E2E8F0', border: 'none', borderRadius: '8px',
                          padding: '4px 10px', fontSize: '11px', fontWeight: '700',
                          color: '#475569', cursor: 'pointer', marginLeft: '8px', flexShrink: 0
                        }}
                      >
                        {copiedIdx === idx ? '✓ Copiado' : 'Copiar'}
                      </button>
                    </div>
                  ))}
                </div>

                {/* Nombre del Depositante */}
                <div style={{ textAlign: 'left', marginBottom: '14px' }}>
                  <label style={{ fontSize: '11.5px', fontWeight: '800', color: '#1E293B', display: 'block', marginBottom: '5px' }}>
                    Nombre del Depositante
                  </label>
                  <input 
                    type="text" 
                    value={depositorName} 
                    onChange={e => setDepositorName(e.target.value)}
                    placeholder="Juan Carlos p"
                    style={{
                      width: '100%', padding: '10px 12px', borderRadius: '12px',
                      border: '1.5px solid #E2E8F0', background: '#F8FAFC', fontSize: '13px',
                      fontWeight: '600', color: '#1E293B', outline: 'none', boxSizing: 'border-box'
                    }}
                  />
                </div>

                {/* Comprobante de Pago Drag and Drop */}
                <div style={{ textAlign: 'left', marginBottom: '16px' }}>
                  <label style={{ fontSize: '11.5px', fontWeight: '800', color: '#1E293B', display: 'block', marginBottom: '5px' }}>
                    Comprobante de Pago
                  </label>
                  <label style={{
                    border: '2px dashed #CBD5E1', borderRadius: '16px', padding: '20px 14px',
                    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                    background: '#F8FAFC', cursor: 'pointer', transition: 'all 0.2s'
                  }}>
                    <input 
                      type="file" 
                      accept="image/*,.pdf" 
                      style={{ display: 'none' }}
                      onChange={e => { if (e.target.files?.[0]) setReceiptFile(e.target.files[0]); }}
                    />
                    <div style={{ fontSize: '28px', marginBottom: '4px' }}>📁</div>
                    <div style={{ fontSize: '13px', fontWeight: '700', color: '#334155' }}>
                      {receiptFile ? `✓ ${receiptFile.name}` : (
                        <>Arrastra el comprobante aquí o <span style={{ color: '#F26000' }}>haz clic</span></>
                      )}
                    </div>
                    <div style={{ fontSize: '11px', color: '#94A3B8', marginTop: '3px' }}>
                      JPG, PNG o PDF
                    </div>
                  </label>
                </div>

                {/* Botón WhatsApp */}
                <a 
                  href={getWhatsAppReceiptLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                    width: '100%', padding: '14px', background: '#25D366', color: '#FFFFFF',
                    borderRadius: '16px', textDecoration: 'none', fontSize: '14.5px', fontWeight: '800',
                    marginBottom: '10px', boxShadow: '0 6px 16px rgba(37,211,102,0.35)', boxSizing: 'border-box'
                  }}
                >
                  <span>💬</span> Enviar Comprobante por WhatsApp
                </a>

                {/* Botón Notificar Transferencia */}
                <button 
                  onClick={handleConfirmTransfer}
                  disabled={submitting}
                  style={{
                    width: '100%', padding: '14px', background: 'linear-gradient(135deg, #F26000, #EA580C)',
                    color: '#FFFFFF', border: 'none', borderRadius: '16px', fontSize: '14.5px', fontWeight: '900',
                    cursor: 'pointer', boxShadow: '0 6px 18px rgba(242,96,0,0.3)', opacity: submitting ? 0.7 : 1
                  }}
                >
                  {submitting ? '⏳ Guardando comprobante...' : '✓ Notificar Transferencia'}
                </button>
              </div>
            )}
          </div>
        )}

        {/* ============================================================== */}
        {/* PASO 4: CONFIRMACIÓN EXITOSA                                  */}
        {/* ============================================================== */}
        {step === 'success' && (
          <div style={{ textAlign: 'center', padding: '24px 10px' }}>
            <div style={{ fontSize: '60px', marginBottom: '14px' }}>🎉</div>
            <h3 style={{ fontSize: '22px', fontWeight: '900', color: '#1E293B', margin: '0 0 8px' }}>
              ¡Actualización y Pago Recibidos!
            </h3>
            <p style={{ fontSize: '14px', color: '#475569', lineHeight: 1.6, marginBottom: '24px' }}>
              Hola <strong>{proName}</strong>, tu solicitud para el <strong>{selectedPlan?.name}</strong> fue recibida correctamente.
              <br /><br />
              El equipo de administración de <strong>Listo Patrón</strong> validará los datos y activará tus contratos directamente en tu cuenta.
            </p>
            <button onClick={onClose} style={{
              width: '100%', maxWidth: '280px', padding: '14px', background: '#10B981', color: '#FFF',
              border: 'none', borderRadius: '14px', fontSize: '15px', fontWeight: '900', cursor: 'pointer'
            }}>
              Entendido 👍
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
