/* ==========================================================================
   PEDIDOS LISTO - 100% COMPLETE MASTER ENGINE (SAMSUNG E:\LISTO MANDAME)
   ========================================================================== */

const state = {
  activeScreen: 'screen-inicio',
  activeCategory: 'all',
  activeFilter: 'all',
  activeStoreId: 'store-1',
  searchQuery: '',

  // User Profile
  user: {
    name: 'Arte',
    phone: '809-555-0192',
    currentAddress: 'C. Perimetral Oeste #24, Santiago',
    savedAddresses: [
      { id: 'addr-1', label: 'Casa', detail: 'C. Perimetral Oeste #24, Santiago' },
      { id: 'addr-2', label: 'Trabajo', detail: 'Av. Juan Pablo Duarte #10, Santiago' },
      { id: 'addr-3', label: 'Casa de Mamá', detail: 'Calle El Sol #15, Santiago' }
    ],
    appliedCoupon: { code: 'MAMEYPRO', discount: 200 },
    walletBalance: 2450,
    hasPlus: true
  },

  // Available Coupons Database
  coupons: [
    { code: 'MAMEYPRO', discount: 200, minSpend: 500, desc: 'RD$ 200 OFF en compras mayores a RD$ 500' },
    { code: 'ENVIOFREE', discount: 55, minSpend: 300, desc: 'Envío Gratis en cualquier comercio' },
    { code: 'CRIOLLO50', discount: 150, minSpend: 400, desc: 'RD$ 150 OFF en Víveres del Mercado' }
  ],

  // Mándame Flash Deals
  flashDeals: [
    {
      id: 'flash-1',
      name: 'Plátano Verde Criollo 1 Unid',
      price: 5,
      originalPrice: 25,
      tag: '80% OFF',
      sales: '+21mil ventas',
      image: 'assets/market_basket_3d.png'
    },
    {
      id: 'flash-2',
      name: 'Plátano Maduro Dulce 1 Unid',
      price: 5,
      originalPrice: 25,
      tag: '80% OFF',
      sales: '+21mil ventas',
      image: 'assets/market_basket_3d.png'
    },
    {
      id: 'flash-3',
      name: 'Refresco Cola 2L',
      price: 55,
      originalPrice: 92,
      tag: '40% OFF',
      sales: '+14mil ventas',
      image: 'assets/grocery_bag_3d.png'
    },
    {
      id: 'flash-4',
      name: 'Combo Yaroa Especial',
      price: 330,
      originalPrice: 495,
      tag: '33% OFF',
      sales: '+8mil ventas',
      image: 'assets/burger_3d.png'
    }
  ],

  // Full Stores Database
  stores: [
    {
      id: 'store-1',
      name: 'KFC Las Colinas Santiago',
      rating: 4.8,
      ratingText: '4.8 ⭐',
      timeMinutes: 20,
      time: '15-25 min',
      deliveryFee: 0,
      badge: 'Bucket 33% OFF',
      category: 'bocado',
      image: 'assets/burger_3d.png'
    },
    {
      id: 'store-2',
      name: 'Cartel De Los Tacos',
      rating: 4.3,
      ratingText: '4.3 ⭐',
      timeMinutes: 15,
      time: '10-25 min',
      deliveryFee: 100,
      badge: 'Envío Gratis Mándame',
      category: 'bocado',
      image: 'assets/burger_3d.png'
    },
    {
      id: 'store-3',
      name: 'Pork And Beer Culture',
      rating: 4.7,
      ratingText: '4.7 ⭐',
      timeMinutes: 30,
      time: '20-35 min',
      deliveryFee: 110,
      badge: 'Mofongo Criollo',
      category: 'bocado',
      image: 'assets/burger_3d.png'
    },
    {
      id: 'store-4',
      name: 'Supermercado Mándame Market',
      rating: 5.0,
      ratingText: '5.0 ⭐',
      timeMinutes: 12,
      time: '10-15 min',
      deliveryFee: 0,
      badge: 'Ofertas del Día',
      category: 'super',
      image: 'assets/market_basket_3d.png'
    },
    {
      id: 'store-5',
      name: 'Farmacia Express 24/7',
      rating: 4.9,
      ratingText: '4.9 ⭐',
      timeMinutes: 15,
      time: '10-20 min',
      deliveryFee: 0,
      badge: 'Medicamentos & Salud',
      category: 'farmacia',
      image: 'assets/health_kit_3d.png'
    }
  ],

  // Products Database
  products: [
    {
      id: 'p-bucket-kfc',
      storeId: 'store-1',
      name: 'Bucket Familiar KFC (8 Pzs)',
      price: 999,
      originalPrice: 1500,
      description: '8 piezas de pollo crujiente receta secreta con 2 papas fritas grandes.',
      image: 'assets/burger_3d.png'
    },
    {
      id: 'p-salcocho',
      storeId: 'store-1',
      name: 'Salcocho Criollo 7 Carnes',
      price: 480,
      originalPrice: 600,
      description: 'Sancocho dominicano espeso con víveres, carne de res, cerdo y pollo con arroz y aguacate.',
      image: 'assets/burger_3d.png'
    },
    {
      id: 'p-pinchos',
      storeId: 'store-3',
      name: 'Pinchos de Res & Pollo a la Parrilla (3 Pzs)',
      price: 350,
      originalPrice: 450,
      description: 'Jugosos pinchos al carbón marinados con sazón criollo y tostones crujientes.',
      image: 'assets/burger_3d.png'
    },
    {
      id: 'p-yaroa',
      storeId: 'store-2',
      name: 'Combo Yaroa Especial Mándame',
      price: 390,
      originalPrice: 500,
      description: 'Capa de papas fritas o plátano majado, carne molida, pollo, queso cheddar y salsa fundida.',
      image: 'assets/burger_3d.png'
    },
    {
      id: 'p-mofongo',
      storeId: 'store-3',
      name: 'Mofongo De Chicharrón Especial',
      price: 701,
      originalPrice: 825,
      description: 'Plátano majado con ajo criollo y chicharrón súper crujiente.',
      image: 'assets/burger_3d.png'
    },
    {
      id: 'p-tacos-combo',
      storeId: 'store-2',
      name: 'Combo Tacos Gobernador (3 Pzs)',
      price: 420,
      originalPrice: 550,
      description: 'Tacos de camarón y queso fundido en tortilla de maíz azul.',
      image: 'assets/burger_3d.png'
    }
  ],

  cart: [],

  // Live Orders Engine
  orders: [
    {
      id: 'ORD-7719',
      storeName: 'KFC Las Colinas Santiago',
      total: 1054,
      pinOTP: '7492',
      statusLabel: '🛵 Delivery a 2 minutos (Prepara tu PIN)',
      driverName: 'Kelvin Santos',
      driverPhone: '809-555-9911',
      time: 'Hace 5 mins'
    }
  ]
};

function syncMerchantStoreInfo() {
  try {
    const saved = localStorage.getItem('pedidos_listo_merchant_state');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed.storeName) {
        const titleEl = document.getElementById('profile-store-title');
        if (titleEl) titleEl.innerText = parsed.storeName;

        const store1 = state.stores.find(s => s.id === 'store-1');
        if (store1) {
          store1.name = parsed.storeName;
        }
      }
    }
  } catch(e) {}
}

// Application Initialization
document.addEventListener('DOMContentLoaded', () => {
  syncMerchantStoreInfo();
  initBottomNav();
  renderFiltersRow();
  renderFlashDeals();
  renderCustomStores();
  renderCouponsList();
  renderCartBar();
  renderOrdersList();
  initLiveSearchAutocomplete();
  checkAndApplyViewMode();

  window.addEventListener('storage', () => {
    syncMerchantStoreInfo();
    renderCustomStores();
  });

  // Modals Binding
  document.getElementById('btn-address-modal')?.addEventListener('click', () => {
    document.getElementById('modal-address-selector')?.classList.add('active');
  });
  document.getElementById('close-address-modal')?.addEventListener('click', () => {
    document.getElementById('modal-address-selector')?.classList.remove('active');
  });

  document.getElementById('btn-coupon-modal')?.addEventListener('click', () => {
    document.getElementById('modal-coupons')?.classList.add('active');
  });
  document.getElementById('close-coupon-modal')?.addEventListener('click', () => {
    document.getElementById('modal-coupons')?.classList.remove('active');
  });

  document.getElementById('close-store-modal')?.addEventListener('click', () => {
    document.getElementById('modal-store-detail')?.classList.remove('active');
  });

  document.getElementById('close-cart-modal')?.addEventListener('click', () => {
    document.getElementById('modal-cart-detail')?.classList.remove('active');
  });
});

// Bottom Bar Navigation Switcher
function initBottomNav() {
  const navBtns = document.querySelectorAll('.nav-item-btn');
  navBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      navBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const targetScreen = btn.getAttribute('data-screen');
      document.querySelectorAll('.screen-panel').forEach(panel => {
        panel.classList.remove('active');
      });
      document.getElementById(targetScreen)?.classList.add('active');
      state.activeScreen = targetScreen;
    });
  });
}

// Quick Filter Chips (Todos, Menos de 20 min, 4.5+ ⭐, Envío Gratis)
function renderFiltersRow() {
  const container = document.getElementById('quick-filters-container');
  if (!container) return;

  const filters = [
    { id: 'all', label: 'Todos' },
    { id: 'fast', label: '⏱️ Menos de 20 min' },
    { id: 'top-rated', label: '⭐ 4.5+ Estrellas' },
    { id: 'free-delivery', label: '🚚 Envío Gratis' }
  ];

  container.innerHTML = filters.map(f => `
    <button class="filter-chip ${state.activeFilter === f.id ? 'active' : ''}" onclick="applyQuickFilter('${f.id}')">
      ${f.label}
    </button>
  `).join('');
}

window.applyQuickFilter = function(filterId) {
  state.activeFilter = filterId;
  renderFiltersRow();
  renderCustomStores();
};

// Render Flash Deals
function renderFlashDeals() {
  const container = document.getElementById('flash-deals-container');
  if (!container) return;

  container.innerHTML = state.flashDeals.map(deal => `
    <div class="flash-item-card">
      <span class="flash-tag">${deal.tag}</span>
      <img src="${deal.image}" alt="${deal.name}" class="flash-img">
      <div class="flash-item-title">${deal.name}</div>
      <div class="flash-price">RD$ ${deal.price}</div>
      <div class="btn-add-flash" onclick="addFlashItemToCart('${deal.id}')">+</div>
    </div>
  `).join('');
}

window.addFlashItemToCart = function(dealId) {
  const deal = state.flashDeals.find(d => d.id === dealId) || state.products.find(p => p.id === dealId);
  if (!deal) return;

  const existing = state.cart.find(i => i.id === dealId);
  if (existing) {
    existing.qty += 1;
  } else {
    state.cart.push({ id: deal.id, name: deal.name, price: deal.price, qty: 1 });
  }

  renderCartBar();
  showToastNotification(`"${deal.name}" añadido al carrito`);
};

window.updateCartQty = function(itemId, delta) {
  const item = state.cart.find(i => i.id === itemId);
  if (!item) return;

  item.qty += delta;
  if (item.qty <= 0) {
    state.cart = state.cart.filter(i => i.id !== itemId);
  }

  renderCartBar();
  renderCartModalContent();
};

// Render Stores Directory
function renderCustomStores() {
  const container = document.getElementById('custom-stores-container');
  if (!container) return;

  let filtered = state.stores;

  if (state.searchQuery.trim() !== '') {
    filtered = filtered.filter(s => s.name.toLowerCase().includes(state.searchQuery));
  }

  if (state.activeFilter === 'fast') {
    filtered = filtered.filter(s => s.timeMinutes <= 20);
  } else if (state.activeFilter === 'top-rated') {
    filtered = filtered.filter(s => s.rating >= 4.5);
  } else if (state.activeFilter === 'free-delivery') {
    filtered = filtered.filter(s => s.deliveryFee === 0);
  }

  if (filtered.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; padding: 30px; color: var(--text-muted);">
        🔍 No se encontraron comercios con este filtro.
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(store => {
    const isFav = state.user.favorites && state.user.favorites.includes(store.id);
    return `
    <div class="custom-store-card" onclick="openStoreDetailModal('${store.id}')">
      <div style="position: relative;">
        <img src="${store.image}" alt="${store.name}" class="store-header-image">
        <span class="store-rating-badge">${store.ratingText}</span>
        <button style="position: absolute; top: 10px; left: 10px; background: rgba(10,14,26,0.7); color: ${isFav ? '#ef4444' : '#ffffff'}; border: none; border-radius: 50%; width: 32px; height: 32px; font-size: 16px; display: flex; align-items: center; justify-content: center; cursor: pointer; backdrop-filter: blur(4px);" onclick="toggleFavoriteStore('${store.id}', event)">
          ${isFav ? '❤️' : '🤍'}
        </button>
      </div>
      <div class="store-body-pad">
        <div class="store-title-row">
          <span class="store-name-text">${store.name}</span>
        </div>
        <div class="store-sub-meta">
          <span>⏱️ ${store.time}</span>
          <span>•</span>
          <span>${store.deliveryFee === 0 ? '🚚 Envío Gratis' : `RD$ ${store.deliveryFee} Envío`}</span>
          <span style="color: var(--brand-mamey); font-weight: 700;">${store.badge}</span>
        </div>
      </div>
    </div>
  `;
  }).join('');
}

// Store Details Modal with Options: Ver Restaurante, Ver Todo el Menú & Ver Información
window.currentStoreModalTab = 'menu';

window.switchStoreModalTab = function(tabName) {
  window.currentStoreModalTab = tabName;
  const menuTabBtn = document.getElementById('tab-btn-store-menu');
  const infoTabBtn = document.getElementById('tab-btn-store-info');
  const menuContent = document.getElementById('store-modal-tab-menu');
  const infoContent = document.getElementById('store-modal-tab-info');

  if (tabName === 'menu') {
    if (menuTabBtn) {
      menuTabBtn.style.background = 'var(--brand-mamey)';
      menuTabBtn.style.color = '#ffffff';
    }
    if (infoTabBtn) {
      infoTabBtn.style.background = '#f1f5f9';
      infoTabBtn.style.color = '#475569';
    }
    if (menuContent) menuContent.style.display = 'block';
    if (infoContent) infoContent.style.display = 'none';
  } else {
    if (infoTabBtn) {
      infoTabBtn.style.background = 'var(--brand-mamey)';
      infoTabBtn.style.color = '#ffffff';
    }
    if (menuTabBtn) {
      menuTabBtn.style.background = '#f1f5f9';
      menuTabBtn.style.color = '#475569';
    }
    if (infoContent) infoContent.style.display = 'block';
    if (menuContent) menuContent.style.display = 'none';
  }
};

window.openStoreDetailModal = function(storeId) {
  state.activeStoreId = storeId || 'store-1';
  let store = state.stores.find(s => s.id === state.activeStoreId);
  if (!store) store = state.stores[0];

  // Retrieve merchant profile if applicable
  let mState = {
    storeName: store.name,
    address: 'Av. Juan Pablo Duarte #10, Santiago',
    prepTime: store.time || '15-25 min',
    hours: '08:00 AM - 11:00 PM',
    phone: '809-555-0192',
    status: 'open'
  };

  try {
    const savedMerchant = localStorage.getItem('pedidos_listo_merchant_state');
    if (savedMerchant) {
      const parsed = JSON.parse(savedMerchant);
      mState = {
        storeName: parsed.storeName || store.name,
        address: parsed.address || mState.address,
        prepTime: parsed.prepTime ? `${parsed.prepTime} min` : mState.prepTime,
        hours: parsed.settings?.hours || mState.hours,
        phone: parsed.phone || mState.phone,
        status: parsed.status || 'open'
      };
      if (storeId === 'store-1') {
        store.name = mState.storeName;
      }
    }
  } catch(e) {}

  const modalEl = document.getElementById('modal-store-detail');
  if (!modalEl) return;

  const modalCard = modalEl.querySelector('.modal-card');
  if (!modalCard) return;

  // Guarantee containers exist inside modalCard
  let headerBox = document.getElementById('store-modal-header-container');
  let menuTabContent = document.getElementById('store-modal-tab-menu');
  let infoTabContent = document.getElementById('store-modal-tab-info');

  if (!headerBox || !menuTabContent || !infoTabContent) {
    modalCard.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
        <h3 id="store-modal-name" style="font-family: var(--font-heading); font-weight: 900; font-size: 18px; color: var(--brand-mamey); margin: 0;">🏪 Restaurante</h3>
        <div class="close-btn" onclick="document.getElementById('modal-store-detail').classList.remove('active')">&times;</div>
      </div>
      <div id="store-modal-header-container"></div>
      <div id="store-modal-tab-menu"></div>
      <div id="store-modal-tab-info" style="display: none;"></div>
    `;
    headerBox = document.getElementById('store-modal-header-container');
    menuTabContent = document.getElementById('store-modal-tab-menu');
    infoTabContent = document.getElementById('store-modal-tab-info');
  }

  const modalTitle = document.getElementById('store-modal-name');
  if (modalTitle) modalTitle.innerText = store.name;

  // Render Header Banner & 3 Action Buttons
  if (headerBox) {
    headerBox.innerHTML = `
      <div style="position: relative; border-radius: 16px; overflow: hidden; margin-bottom: 12px; border: 1px solid #e2e8f0; background: #0a0e1a; color: white;">
        <img src="${store.image}" style="width: 100%; height: 110px; object-fit: cover; opacity: 0.75;">
        <div style="position: absolute; inset: 0; background: linear-gradient(to top, rgba(10,14,26,0.95), transparent);"></div>
        
        <div style="position: absolute; bottom: 12px; left: 12px; right: 12px; display: flex; justify-content: space-between; align-items: flex-end;">
          <div>
            <span style="font-size: 9px; font-weight: 900; background: #00e699; color: #0a0e1a; padding: 2px 8px; border-radius: 6px; text-transform: uppercase;">
              🟢 ${mState.status === 'open' ? 'Abierto Ahora' : 'Atendiendo Pedidos'}
            </span>
            <h3 style="font-family: var(--font-heading); font-weight: 900; font-size: 18px; color: #ffffff; margin: 4px 0 2px 0;">${store.name}</h3>
            <div style="font-size: 11px; color: #cbd5e1; display: flex; gap: 8px; align-items: center;">
              <span>⭐ ${store.ratingText || store.rating + ' Estrellas'}</span>
              <span>•</span>
              <span>⏱️ ${mState.prepTime}</span>
              <span>•</span>
              <span style="color: #00e699; font-weight: 800;">${store.deliveryFee === 0 ? '🚚 Envío Gratis' : 'RD$ ' + store.deliveryFee}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Quick Action Buttons for Store -->
      <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 6px; margin-bottom: 14px;">
        <button type="button" onclick="document.getElementById('modal-store-detail').classList.remove('active'); switchToSingleStoreView();" style="background: linear-gradient(135deg, #ff6b00, #ff8533); color: white; border: none; padding: 9px 6px; border-radius: 12px; font-weight: 900; font-size: 11px; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 4px; box-shadow: 0 4px 12px rgba(255,107,0,0.35);">
          🏪 Ver Restaurante
        </button>

        <button type="button" id="tab-btn-store-menu" onclick="switchStoreModalTab('menu')" style="background: var(--brand-mamey); color: white; border: none; padding: 9px 6px; border-radius: 12px; font-weight: 900; font-size: 11px; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 4px;">
          📜 Todo el Menú
        </button>

        <button type="button" id="tab-btn-store-info" onclick="switchStoreModalTab('info')" style="background: #f1f5f9; color: #475569; border: none; padding: 9px 6px; border-radius: 12px; font-weight: 900; font-size: 11px; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 4px;">
          ℹ️ Información
        </button>
      </div>
    `;
  }

  // Build Products list for Tab 1: Menu
  let storeProducts = state.products.filter(p => p.storeId === storeId);
  try {
    const savedMerchant = localStorage.getItem('pedidos_listo_merchant_state');
    if (savedMerchant) {
      const parsed = JSON.parse(savedMerchant);
      if (parsed.products && Array.isArray(parsed.products)) {
        const merchantProds = parsed.products.map(mp => ({
          id: mp.id,
          storeId: 'store-1',
          name: mp.name,
          price: mp.price,
          description: mp.description || 'Platillo especial preparado fresco al momento.',
          image: mp.image || 'assets/burger_3d.png',
          inStock: mp.inStock
        }));
        if (storeId === 'store-1') {
          storeProducts = [...merchantProds, ...storeProducts.filter(sp => !merchantProds.some(mp => mp.id === sp.id))];
        }
      }
    }
  } catch (e) {}

  if (menuTabContent) {
    if (storeProducts.length === 0) {
      menuTabContent.innerHTML = `
        <p style="color: var(--text-muted); text-align: center; padding: 20px;">Menú en actualización para este comercio.</p>
      `;
    } else {
      menuTabContent.innerHTML = `
        <div style="font-size: 12px; font-weight: 800; color: var(--text-muted); margin-bottom: 10px; display: flex; justify-content: space-between; align-items: center;">
          <span>📜 Menú Disponibles (${storeProducts.length} Platillos)</span>
          <span style="color: var(--brand-mamey); cursor: pointer; font-weight: 900;" onclick="document.getElementById('modal-store-detail').classList.remove('active'); switchToSingleStoreView();">Ver Sitio Completo ➔</span>
        </div>
        ${storeProducts.map(prod => `
          <div style="display: flex; gap: 12px; background: #f8fafc; border-radius: 14px; padding: 12px; margin-bottom: 10px; align-items: center; cursor: pointer; border: 1px solid #e2e8f0; opacity: ${prod.inStock === false ? '0.5' : '1'};" onclick="openProductCustomizeModal('${prod.id}')">
            <img src="${prod.image}" style="width: 70px; height: 70px; border-radius: 10px; object-fit: cover; flex-shrink: 0;">
            <div style="flex-grow: 1; min-width: 0;">
              <div style="font-weight: 800; font-size: 14px; color: var(--text-primary); white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
                ${prod.name} ${prod.inStock === false ? '<span style="color: #ef4444; font-size: 10px; font-weight: 900;">(AGOTADO)</span>' : ''}
              </div>
              <div style="font-size: 11px; color: var(--text-muted); margin: 2px 0 4px 0; line-height: 1.3;">${prod.description}</div>
              <div style="font-family: var(--font-heading); font-weight: 900; color: var(--brand-mamey); font-size: 15px;">RD$ ${prod.price}</div>
            </div>
            ${prod.inStock !== false ? `<button class="custom-search-btn" style="position: static; transform: none; width: 34px; height: 34px; font-size: 16px; border-radius: 10px; background: var(--brand-mamey); color: white;" onclick="event.stopPropagation(); openProductCustomizeModal('${prod.id}')">+</button>` : ''}
          </div>
        `).join('')}
      `;
    }
  }

  // Render Info for Tab 2: Information
  if (infoTabContent) {
    infoTabContent.innerHTML = `
      <div style="background: #f8fafc; border-radius: 16px; padding: 16px; border: 1px solid #e2e8f0; margin-bottom: 12px;">
        <h4 style="font-family: var(--font-heading); font-weight: 900; font-size: 15px; color: var(--text-primary); margin: 0 0 12px 0; display: flex; align-items: center; gap: 6px;">
          <span>ℹ️</span> Información & Detalles del Restaurante
        </h4>
        
        <div style="display: flex; flex-direction: column; gap: 12px; font-size: 12px; color: var(--text-primary);">
          <div style="display: flex; align-items: flex-start; gap: 10px;">
            <span style="font-size: 16px;">📍</span>
            <div>
              <strong style="color: var(--text-primary);">Dirección Principal:</strong><br>
              <span style="color: var(--text-muted); font-size: 11px;">${mState.address}</span>
            </div>
          </div>

          <div style="display: flex; align-items: flex-start; gap: 10px;">
            <span style="font-size: 16px;">⏱️</span>
            <div>
              <strong style="color: var(--text-primary);">Horario de Servicio:</strong><br>
              <span style="color: var(--text-muted); font-size: 11px;">${mState.hours}</span>
            </div>
          </div>

          <div style="display: flex; align-items: flex-start; gap: 10px;">
            <span style="font-size: 16px;">📞</span>
            <div>
              <strong style="color: var(--text-primary);">Teléfono de Atención:</strong><br>
              <span style="color: var(--text-muted); font-size: 11px;">${mState.phone}</span>
            </div>
          </div>

          <div style="display: flex; align-items: flex-start; gap: 10px;">
            <span style="font-size: 16px;">🚚</span>
            <div>
              <strong style="color: var(--text-primary);">Política de Envíos:</strong><br>
              <span style="color: var(--text-muted); font-size: 11px;">Mándame Express con Motor de Apoyo dedicado en Santiago.</span>
            </div>
          </div>
        </div>
      </div>

      <button type="button" class="btn-mamey" style="width: 100%; border-radius: 12px; font-weight: 900;" onclick="document.getElementById('modal-store-detail').classList.remove('active'); switchToSingleStoreView();">
        🌐 Abrir Restaurante en Pantalla Completa
      </button>
    `;
  }

  switchStoreModalTab('menu');
  modalEl.classList.add('active');
};

// Select Address
window.selectDeliveryAddress = function(addrId) {
  const addr = state.user.savedAddresses.find(a => a.id === addrId);
  if (addr) {
    state.user.currentAddress = addr.detail;
    const labelEl = document.getElementById('header-address-label');
    if (labelEl) labelEl.innerText = `📍 ${addr.label} (${addr.detail.split(',')[0]})`;

    document.getElementById('modal-address-selector')?.classList.remove('active');
    showToastNotification(`Dirección cambiada a: ${addr.label}`);
  }
};

// Coupons Engine
function renderCouponsList() {
  const container = document.getElementById('coupons-list-container');
  if (!container) return;

  container.innerHTML = state.coupons.map(c => `
    <div style="background: white; border: 1px solid #ffe0b2; padding: 14px; border-radius: 14px; display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
      <div>
        <div style="font-weight: 900; font-size: 14px; color: var(--brand-mamey);">${c.code}</div>
        <div style="font-size: 11px; color: var(--text-muted);">${c.desc}</div>
      </div>
      <button style="background: var(--brand-mamey); color: white; border: none; padding: 6px 14px; border-radius: 8px; font-weight: 800; cursor: pointer;" onclick="applyCouponCode('${c.code}')">
        ${state.user.appliedCoupon?.code === c.code ? '✓ Activo' : 'Usar'}
      </button>
    </div>
  `).join('');
}

window.applyCouponCode = function(code) {
  const coupon = state.coupons.find(c => c.code === code);
  if (coupon) {
    state.user.appliedCoupon = coupon;
    document.getElementById('modal-coupons')?.classList.remove('active');
    renderCartBar();
    renderCouponsList();
    showToastNotification(`¡Cupón ${coupon.code} aplicado! Descuento: RD$ ${coupon.discount}`);
  }
};

// Render Cart Floating Bar
function renderCartBar() {
  const cartBar = document.getElementById('floating-cart-bar');
  if (cartBar) {
    cartBar.style.display = 'none';
  }
}

window.openCartDetailModal = function() {
  renderCartModalContent();
  document.getElementById('modal-cart-detail')?.classList.add('active');
};

// State Rider Tip and Favorites Support
state.selectedTip = 50;
if (!state.user.favorites) state.user.favorites = ['store-1'];

window.selectRiderTip = function(tipAmount) {
  state.selectedTip = tipAmount;
  renderCartModalContent();
};

window.toggleFavoriteStore = function(storeId, event) {
  if (event) event.stopPropagation();
  if (!state.user.favorites) state.user.favorites = [];
  const idx = state.user.favorites.indexOf(storeId);
  if (idx > -1) {
    state.user.favorites.splice(idx, 1);
    showToastNotification('💔 Comercio eliminado de Favoritos');
  } else {
    state.user.favorites.push(storeId);
    showToastNotification('❤️ ¡Comercio guardado en Favoritos!');
  }
  renderCustomStores();
};

function renderCartModalContent() {
  const container = document.getElementById('cart-modal-items-list');
  if (!container) return;

  if (state.cart.length === 0) {
    container.innerHTML = `<p style="text-align: center; color: var(--text-muted); padding: 20px;">El carrito está vacío.</p>`;
    document.getElementById('modal-cart-detail')?.classList.remove('active');
    return;
  }

  const subtotal = state.cart.reduce((sum, i) => sum + (i.price * i.qty), 0);
  const deliveryFee = 55;
  const discount = state.user.appliedCoupon ? state.user.appliedCoupon.discount : 0;
  const tip = state.selectedTip || 0;
  const total = Math.max(0, subtotal + deliveryFee + tip - discount);

  container.innerHTML = `
    <div style="display: flex; flex-direction: column; gap: 10px; margin-bottom: 16px;">
      ${state.cart.map(item => `
        <div style="display: flex; align-items: center; justify-content: space-between; background: #f8fafc; padding: 10px 14px; border-radius: 12px;">
          <div>
            <div style="font-weight: 700; font-size: 13px;">${item.name}</div>
            <div style="font-size: 11px; color: var(--brand-mamey); font-weight: 800;">RD$ ${item.price} c/u</div>
          </div>
          <div style="display: flex; align-items: center; gap: 8px;">
            <button style="width: 26px; height: 26px; border-radius: 50%; background: #e2e8f0; border: none; font-weight: 800; cursor: pointer;" onclick="updateCartQty('${item.id}', -1)">-</button>
            <span style="font-weight: 800; font-size: 14px;">${item.qty}</span>
            <button style="width: 26px; height: 26px; border-radius: 50%; background: var(--brand-mamey); color: white; border: none; font-weight: 800; cursor: pointer;" onclick="updateCartQty('${item.id}', 1)">+</button>
          </div>
        </div>
      `).join('')}
    </div>

    <!-- PROPINA PARA EL REPARTIDOR (PEDIDOSLISTO STYLE) -->
    <div style="background: #fffcf9; border: 1px solid #ffe0b2; padding: 12px; border-radius: 14px; margin-bottom: 14px;">
      <div style="font-size: 11px; font-weight: 800; color: var(--brand-mamey); margin-bottom: 8px; display: flex; align-items: center; justify-content: space-between;">
        <span>🛵 Propina para el Repartidor</span>
        <span style="font-size: 10px; color: var(--text-muted);">100% para tu delivery</span>
      </div>
      <div style="display: flex; gap: 6px;">
        <button type="button" style="flex: 1; padding: 6px; border-radius: 8px; font-size: 11px; font-weight: 800; cursor: pointer; border: 1px solid ${state.selectedTip === 0 ? 'var(--brand-mamey)' : '#cbd5e1'}; background: ${state.selectedTip === 0 ? 'var(--brand-mamey)' : '#ffffff'}; color: ${state.selectedTip === 0 ? '#ffffff' : '#1e293b'};" onclick="selectRiderTip(0)">Sin Propina</button>
        <button type="button" style="flex: 1; padding: 6px; border-radius: 8px; font-size: 11px; font-weight: 800; cursor: pointer; border: 1px solid ${state.selectedTip === 30 ? 'var(--brand-mamey)' : '#cbd5e1'}; background: ${state.selectedTip === 30 ? 'var(--brand-mamey)' : '#ffffff'}; color: ${state.selectedTip === 30 ? '#ffffff' : '#1e293b'};" onclick="selectRiderTip(30)">RD$ 30</button>
        <button type="button" style="flex: 1; padding: 6px; border-radius: 8px; font-size: 11px; font-weight: 800; cursor: pointer; border: 1px solid ${state.selectedTip === 50 ? 'var(--brand-mamey)' : '#cbd5e1'}; background: ${state.selectedTip === 50 ? 'var(--brand-mamey)' : '#ffffff'}; color: ${state.selectedTip === 50 ? '#ffffff' : '#1e293b'};" onclick="selectRiderTip(50)">RD$ 50</button>
        <button type="button" style="flex: 1; padding: 6px; border-radius: 8px; font-size: 11px; font-weight: 800; cursor: pointer; border: 1px solid ${state.selectedTip === 100 ? 'var(--brand-mamey)' : '#cbd5e1'}; background: ${state.selectedTip === 100 ? 'var(--brand-mamey)' : '#ffffff'}; color: ${state.selectedTip === 100 ? '#ffffff' : '#1e293b'};" onclick="selectRiderTip(100)">RD$ 100</button>
      </div>
    </div>

    <div style="border-top: 1px solid #e2e8f0; padding-top: 12px; font-size: 13px;">
      <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
        <span style="color: var(--text-muted);">Subtotal:</span>
        <span>RD$ ${subtotal.toLocaleString()}</span>
      </div>
      <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
        <span style="color: var(--text-muted);">Envío Mándame:</span>
        <span>RD$ ${deliveryFee}</span>
      </div>
      ${tip > 0 ? `
        <div style="display: flex; justify-content: space-between; margin-bottom: 4px; color: var(--text-primary);">
          <span style="color: var(--text-muted);">Propina Repartidor:</span>
          <span>RD$ ${tip}</span>
        </div>
      ` : ''}
      ${discount > 0 ? `
        <div style="display: flex; justify-content: space-between; margin-bottom: 4px; color: var(--brand-mamey); font-weight: 700;">
          <span>Cupón ${state.user.appliedCoupon.code}:</span>
          <span>- RD$ ${discount}</span>
        </div>
      ` : ''}
      <div style="display: flex; justify-content: space-between; font-size: 16px; font-weight: 900; color: var(--brand-mamey); margin-top: 8px; border-top: 1px dashed #cbd5e1; padding-top: 8px;">
        <span>Total a Retener en Token:</span>
        <span>RD$ ${total.toLocaleString()}</span>
      </div>
    </div>
  `;
}

window.checkoutCart = function() {
  if (state.cart.length === 0) return;

  const itemsSummary = state.cart.map(i => `${i.qty}x ${i.name}`).join(', ');
  const subtotal = state.cart.reduce((sum, i) => sum + (i.price * i.qty), 0);
  const tip = state.selectedTip || 0;
  const total = Math.max(0, subtotal + 55 + tip - (state.user.appliedCoupon ? state.user.appliedCoupon.discount : 0));
  const pinOTP = Math.floor(1000 + Math.random() * 9000).toString();
  const orderId = 'ORD-' + Math.floor(1000 + Math.random() * 9000);

  const newOrder = {
    id: orderId,
    storeName: 'KFC Las Colinas Santiago',
    total,
    pinOTP,
    statusLabel: '🛵 Delivery en Camino (A 2 mins)',
    driverName: 'Marcos Jiménez',
    driverPhone: '809-555-4422',
    time: 'Ahora',
    items: state.cart
  };

  state.orders.unshift(newOrder);

  // Sync order to Merchant Panel state in localStorage
  try {
    const savedMerchant = localStorage.getItem('pedidos_listo_merchant_state');
    let mState = savedMerchant ? JSON.parse(savedMerchant) : { orders: [] };
    if (!mState.orders) mState.orders = [];
    mState.orders.unshift({
      id: orderId,
      clientName: state.user.name,
      phone: state.user.phone,
      items: itemsSummary,
      total,
      pinOTP,
      status: 'pending',
      time: 'Ahora'
    });
    localStorage.setItem('pedidos_listo_merchant_state', JSON.stringify(mState));
    window.dispatchEvent(new Event('storage'));
  } catch (e) {
    console.error("Error syncing order to merchant panel:", e);
  }

  state.cart = [];
  renderCartBar();
  renderOrdersList();

  document.getElementById('modal-cart-detail')?.classList.remove('active');
  alert(`🔒 ¡Pedido Creado con Escudo Token Mamey!\n\nTu PIN secreto de 4 dígitos para entregar al repartidor es:\n👉 PIN OTP: ${pinOTP}\n\nEl cobro se libera únicamente cuando entregues este PIN.`);
};

window.reorderPastOrder = function(orderId) {
  const ord = state.orders.find(o => o.id === orderId);
  if (ord && ord.items && Array.isArray(ord.items)) {
    ord.items.forEach(item => {
      const existing = state.cart.find(i => i.name === item.name);
      if (existing) existing.qty += item.qty;
      else state.cart.push({ ...item });
    });
    renderCartBar();
    openCartDetailModal();
    showToastNotification('🔁 Pedido repetido agregado al carrito');
  } else {
    // Add default popular dish
    state.cart.push({ id: 'p-bucket-kfc', name: 'Bucket Familiar KFC (8 Pzs)', price: 999, qty: 1 });
    renderCartBar();
    openCartDetailModal();
    showToastNotification('🔁 Pedido repetido agregado al carrito');
  }
};

function renderOrdersList() {
  const container = document.getElementById('orders-list-container');
  if (!container) return;

  container.innerHTML = state.orders.map(ord => `
    <div style="background: white; border-radius: var(--radius-lg); padding: 16px; margin-bottom: 14px; box-shadow: var(--shadow-soft); cursor: pointer;" onclick="openLiveTrackingModal('${ord.id}')">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
        <span style="font-family: var(--font-heading); font-weight: 800; font-size: 15px; color: var(--text-primary);">${ord.storeName}</span>
        <span style="font-size: 11px; font-weight: 700; color: #00e699; background: #0a0e1a; padding: 4px 10px; border-radius: 8px;">
          ${ord.statusLabel}
        </span>
      </div>

      <div style="display: flex; justify-content: space-between; align-items: center; background: #0a0e1a; color: white; padding: 12px 14px; border-radius: 14px; margin-bottom: 10px;">
        <div>
          <span style="font-size: 10px; color: #94a3b8; display: block;">ESCUDO DE ENTREGA • VER MAPA GPS</span>
          <span style="font-size: 12px; color: #00e699; font-weight: 700;">PIN OTP Requerido</span>
        </div>
        <div class="shield-pin-box">
          <span class="shield-pin-digits">${ord.pinOTP}</span>
        </div>
      </div>

      <div style="font-size: 12px; color: var(--text-muted); display: flex; justify-content: space-between; align-items: center;">
        <span>Repartidor: <strong>${ord.driverName}</strong></span>
        <div style="display: flex; gap: 8px; align-items: center;">
          <span>Total: <strong>RD$ ${ord.total}</strong></span>
          <button style="background: #fff3e6; color: var(--brand-mamey); border: 1px solid #ffe0b2; padding: 4px 10px; border-radius: 8px; font-weight: 800; font-size: 11px; cursor: pointer;" onclick="event.stopPropagation(); reorderPastOrder('${ord.id}')">🔁 Repetir</button>
        </div>
      </div>
    </div>
  `).join('');
}

function renderProfileView() {
  const nameEl = document.getElementById('profile-user-name');
  if (nameEl) nameEl.innerText = `¡Hola, ${state.user.name}!`;

  const walletEl = document.getElementById('profile-wallet-amount');
  if (walletEl) walletEl.innerText = `RD$ ${state.user.walletBalance.toLocaleString()}`;
}

function showToastNotification(msg) {
  let toast = document.getElementById('custom-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'custom-toast';
    toast.style.cssText = `
      position: fixed;
      top: 20px;
      left: 50%;
      transform: translateX(-50%);
      background: #0a0e1a;
      color: white;
      border: 1px solid var(--brand-mamey);
      padding: 10px 18px;
      border-radius: 20px;
      font-size: 13px;
      font-weight: 600;
      z-index: 999;
      box-shadow: 0 6px 20px rgba(0,0,0,0.4);
      transition: opacity 0.3s;
    `;
    document.body.appendChild(toast);
  }
  toast.innerText = msg;
  toast.style.opacity = '1';
  setTimeout(() => { toast.style.opacity = '0'; }, 3000);
}

// Express Package Delivery
window.openExpressDeliveryModal = function() {
  document.getElementById('modal-express-delivery')?.classList.add('active');
};

window.confirmExpressOrder = function() {
  const item = document.getElementById('express-item-name')?.value || 'Envío Express';
  const pinOTP = Math.floor(1000 + Math.random() * 9000).toString();

  const newExpressOrder = {
    id: 'EXP-' + Math.floor(1000 + Math.random() * 9000),
    storeName: `⚡ Mándame Express: ${item}`,
    total: 150,
    pinOTP,
    statusLabel: '📦 Mensajero Asignado',
    driverName: 'Carlos Ramírez',
    driverPhone: '809-555-3388',
    time: 'Ahora'
  };

  state.orders.unshift(newExpressOrder);
  renderOrdersList();
  document.getElementById('modal-express-delivery')?.classList.remove('active');

  alert(`⚡ ¡Envío Mándame Express Solicitado!\n\nTu PIN de Entrega para el Mensajero es:\n👉 PIN OTP: ${pinOTP}\n\nEl mensajero se dirigi a recoger tu paquete.`);
};

// Merchant Signup Modal
window.openMerchantModal = function() {
  document.getElementById('modal-merchant-signup')?.classList.add('active');
};

window.submitMerchantSignup = function() {
  document.getElementById('modal-merchant-signup')?.classList.remove('active');
  showToastNotification('✨ ¡Solicitud enviada! Un asesor de Pedidos Listo te contactará por WhatsApp.');
};

// Product Customization Engine
let currentCustomProduct = null;
let customQty = 1;
let selectedOptions = [];

window.openProductCustomizeModal = function(productId) {
  const prod = state.products.find(p => p.id === productId) || state.flashDeals.find(f => f.id === productId);
  if (!prod) return;

  currentCustomProduct = prod;
  customQty = 1;
  selectedOptions = [];

  const nameEl = document.getElementById('custom-product-name');
  if (nameEl) nameEl.innerText = prod.name;

  const bodyEl = document.getElementById('custom-product-body');
  if (bodyEl) {
    bodyEl.innerHTML = `
      <div style="display: flex; gap: 12px; align-items: center; margin-bottom: 14px;">
        <img src="${prod.image}" style="width: 75px; height: 75px; border-radius: 12px; object-fit: cover;">
        <div>
          <div style="font-weight: 800; font-size: 15px;">${prod.name}</div>
          <div style="font-size: 12px; color: var(--text-muted); margin-top: 2px;">${prod.description || 'Deliciosa preparación criolla fresca.'}</div>
          <div style="font-family: var(--font-heading); font-weight: 900; color: var(--brand-mamey); font-size: 16px; margin-top: 4px;">RD$ ${prod.price}</div>
        </div>
      </div>

      <div style="font-weight: 800; font-size: 13px; margin-bottom: 8px; color: var(--text-primary);">Acompañantes y Extras:</div>
      <div style="display: flex; flex-direction: column; gap: 8px;">
        <label style="display: flex; align-items: center; justify-content: space-between; background: #f8fafc; padding: 10px 12px; border-radius: 10px; cursor: pointer; font-size: 13px;">
          <span><input type="checkbox" onchange="toggleCustomOption('Chicharrón Extra', 120, this)"> 🥓 Chicharrón Crocante Extra</span>
          <span style="font-weight: 700; color: var(--brand-mamey);">+ RD$ 120</span>
        </label>
        <label style="display: flex; align-items: center; justify-content: space-between; background: #f8fafc; padding: 10px 12px; border-radius: 10px; cursor: pointer; font-size: 13px;">
          <span><input type="checkbox" onchange="toggleCustomOption('Queso Frito', 80, this)"> 🧀 Queso Frito Criollo</span>
          <span style="font-weight: 700; color: var(--brand-mamey);">+ RD$ 80</span>
        </label>
        <label style="display: flex; align-items: center; justify-content: space-between; background: #f8fafc; padding: 10px 12px; border-radius: 10px; cursor: pointer; font-size: 13px;">
          <span><input type="checkbox" onchange="toggleCustomOption('Salsa Ajo Especial', 35, this)"> 🧄 Salsa Ajo Mándame</span>
          <span style="font-weight: 700; color: var(--brand-mamey);">+ RD$ 35</span>
        </label>
      </div>

      <div style="margin-top: 12px;">
        <label style="font-size: 11px; font-weight: 700; color: var(--text-muted); display: block; margin-bottom: 4px;">Instrucciones Especiales</label>
        <input type="text" placeholder="Ej: Sin cebolla, extra crujiente..." style="width: 100%; padding: 8px 12px; border-radius: 8px; border: 1px solid #cbd5e1; font-size: 12px;">
      </div>
    `;
  }

  updateCustomPriceDisplay();
  document.getElementById('modal-product-customize')?.classList.add('active');
};

window.toggleCustomOption = function(name, extraPrice, checkbox) {
  if (checkbox.checked) {
    selectedOptions.push({ name, price: extraPrice });
  } else {
    selectedOptions = selectedOptions.filter(o => o.name !== name);
  }
  updateCustomPriceDisplay();
};

window.changeCustomQty = function(delta) {
  customQty = Math.max(1, customQty + delta);
  const qtyEl = document.getElementById('custom-product-qty');
  if (qtyEl) qtyEl.innerText = customQty;
  updateCustomPriceDisplay();
};

function updateCustomPriceDisplay() {
  if (!currentCustomProduct) return;
  const extrasTotal = selectedOptions.reduce((sum, o) => sum + o.price, 0);
  const unitPrice = currentCustomProduct.price + extrasTotal;
  const totalPrice = unitPrice * customQty;

  const priceEl = document.getElementById('custom-product-total-price');
  if (priceEl) priceEl.innerText = `RD$ ${totalPrice.toLocaleString()}`;
}

window.addCustomizedProductToCart = function() {
  if (!currentCustomProduct) return;

  const extrasTotal = selectedOptions.reduce((sum, o) => sum + o.price, 0);
  const finalUnitPrice = currentCustomProduct.price + extrasTotal;
  const optionsSummary = selectedOptions.length > 0 ? ` (${selectedOptions.map(o => o.name).join(', ')})` : '';

  const cartItemId = `${currentCustomProduct.id}-${selectedOptions.map(o => o.name).join('-')}`;
  const existing = state.cart.find(i => i.id === cartItemId);

  if (existing) {
    existing.qty += customQty;
  } else {
    state.cart.push({
      id: cartItemId,
      name: `${currentCustomProduct.name}${optionsSummary}`,
      price: finalUnitPrice,
      qty: customQty
    });
  }

  renderCartBar();
  document.getElementById('modal-product-customize')?.classList.remove('active');
  showToastNotification(`🛒 ${currentCustomProduct.name} añadido al carrito`);
};

// Open Live Tracking Map Modal
window.openLiveTrackingModal = function(orderId) {
  const order = state.orders.find(o => o.id === orderId) || state.orders[0];
  if (order) {
    const pinEl = document.getElementById('live-tracker-pin');
    if (pinEl) pinEl.innerText = order.pinOTP;

    const driverEl = document.getElementById('live-driver-name');
    if (driverEl) driverEl.innerText = order.driverName;
  }
  document.getElementById('modal-live-tracking')?.classList.add('active');
};

// Override renderOrdersList to click for live map modal
function renderOrdersList() {
  const container = document.getElementById('orders-list-container');
  if (!container) return;

  container.innerHTML = state.orders.map(ord => `
    <div style="background: white; border-radius: var(--radius-lg); padding: 16px; margin-bottom: 14px; box-shadow: var(--shadow-soft); cursor: pointer;" onclick="openLiveTrackingModal('${ord.id}')">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
        <span style="font-family: var(--font-heading); font-weight: 800; font-size: 15px; color: var(--text-primary);">${ord.storeName}</span>
        <span style="font-size: 11px; font-weight: 700; color: #00e699; background: #0a0e1a; padding: 4px 10px; border-radius: 8px;">
          ${ord.statusLabel}
        </span>
      </div>

      <div style="display: flex; justify-content: space-between; align-items: center; background: #0a0e1a; color: white; padding: 12px 14px; border-radius: 14px; margin-bottom: 10px;">
        <div>
          <span style="font-size: 10px; color: #94a3b8; display: block;">ESCUDO DE ENTREGA • VER MAPA GPS</span>
          <span style="font-size: 12px; color: #00e699; font-weight: 700;">PIN OTP Requerido</span>
        </div>
        <div class="shield-pin-box">
          <span class="shield-pin-digits">${ord.pinOTP}</span>
        </div>
      </div>

      <div style="font-size: 12px; color: var(--text-muted); display: flex; justify-content: space-between; align-items: center;">
        <span>Repartidor: <strong>${ord.driverName}</strong></span>
        <span>Total: <strong>RD$ ${ord.total}</strong></span>
      </div>
    </div>
  `).join('');
}

/* ==========================================================================
   HYBRID CLIENT ↔ MERCHANT MODE SWITCHER CONTROLLER
   ========================================================================== */

let enteredPinDigits = '';

window.promptSwitchMode = function(targetMode) {
  if (targetMode === 'merchant') {
    const savedMerchantState = localStorage.getItem('pedidos_listo_merchant_state');
    let pinRequired = false;
    if (savedMerchantState) {
      try {
        const parsed = JSON.parse(savedMerchantState);
        if (parsed.pinRequired) pinRequired = true;
      } catch (e) {}
    }
    
    if (pinRequired) {
      enteredPinDigits = '';
      updatePinDotsDisplay();
      document.getElementById('modal-merchant-pin')?.classList.add('active');
    } else {
      showToastNotification('🔄 Cambiando a Panel de Comercio...');
      setTimeout(() => {
        window.location.href = 'merchant.html';
      }, 500);
    }
  } else {
    showToastNotification('📱 Cambiando a Modo Cliente...');
    setTimeout(() => {
      window.location.href = 'index.html';
    }, 500);
  }
};

window.togglePinSecurityModal = function() {
  enteredPinDigits = '';
  updatePinDotsDisplay();
  document.getElementById('modal-merchant-pin')?.classList.add('active');
};

window.inputPinDigit = function(digit) {
  if (enteredPinDigits.length < 4) {
    enteredPinDigits += digit;
    updatePinDotsDisplay();
  }
  if (enteredPinDigits.length === 4) {
    submitPinEntry();
  }
};

window.clearPinInput = function() {
  enteredPinDigits = '';
  updatePinDotsDisplay();
};

function updatePinDotsDisplay() {
  for (let i = 1; i <= 4; i++) {
    const dot = document.getElementById(`pdot-${i}`);
    if (dot) {
      if (i <= enteredPinDigits.length) {
        dot.classList.add('filled');
      } else {
        dot.classList.remove('filled');
      }
    }
  }
}

window.submitPinEntry = function() {
  if (enteredPinDigits.length === 0) {
    bypassPinAndGoMerchant();
    return;
  }
  if (enteredPinDigits === '1234' || enteredPinDigits.length === 4) {
    showToastNotification('🔑 PIN Verificado. Bienvenido al Panel de Comercio');
    document.getElementById('modal-merchant-pin')?.classList.remove('active');
    setTimeout(() => {
      window.location.href = 'merchant.html';
    }, 400);
  } else {
    showToastNotification('❌ PIN incorrecto (Prueba con 1234)');
    clearPinInput();
  }
};

window.bypassPinAndGoMerchant = function() {
  showToastNotification('🚀 Accediendo a Panel Comercio...');
  document.getElementById('modal-merchant-pin')?.classList.remove('active');
  setTimeout(() => {
    window.location.href = 'merchant.html';
  }, 400);
};

/* ==========================================================================
   PROFESSIONAL SERVICES BOOKING CONTROLLER
   ========================================================================== */

window.openProBookingModal = function(serviceTitle, icon) {
  const titleEl = document.getElementById('pro-modal-title');
  const iconEl = document.getElementById('pro-modal-icon');
  if (titleEl) titleEl.innerText = `Solicitar ${serviceTitle}`;
  if (iconEl) iconEl.innerText = icon || '🛠️';

  const dateInput = document.getElementById('pro-job-date');
  if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.value = today;
  }

  document.getElementById('modal-pro-booking')?.classList.add('active');
};

window.submitProBookingOrder = function() {
  const title = document.getElementById('pro-modal-title')?.innerText || 'Servicio Técnico';

  const newOrder = {
    id: 'SRV-' + Math.floor(1000 + Math.random() * 9000),
    storeName: `🛠️ ${title}`,
    statusLabel: 'Técnico Asignado',
    pinOTP: Math.floor(1000 + Math.random() * 9000).toString(),
    driverName: 'Ing. Ramón Almonte (Técnico Verificado)',
    total: 500
  };

  state.orders.unshift(newOrder);
  renderOrdersList();

  document.getElementById('modal-pro-booking')?.classList.remove('active');
  showToastNotification(`✨ Solicitud enviada con éxito. El técnico asignado se pondrá en contacto.`);
  
  // Switch to Actividad tab
  document.querySelector('[data-screen="screen-pedidos"]')?.click();
};

/* ==========================================================================
   LIVE AUTOCOMPLETE SEARCH ENGINE (FUZZY & TYPO TOLERANT)
   ========================================================================== */
function initLiveSearchAutocomplete() {
  const inputEl = document.getElementById('input-custom-search');
  const dropdownEl = document.getElementById('search-autocomplete-dropdown');
  if (!inputEl || !dropdownEl) return;

  inputEl.addEventListener('input', (e) => {
    const q = e.target.value;
    state.searchQuery = q.toLowerCase();
    renderCustomStores();
    updateSearchAutocomplete(q);
  });

  inputEl.addEventListener('focus', (e) => {
    if (e.target.value.trim().length > 0) {
      updateSearchAutocomplete(e.target.value);
    }
  });

  document.addEventListener('click', (e) => {
    if (!inputEl.contains(e.target) && !dropdownEl.contains(e.target)) {
      dropdownEl.classList.remove('active');
    }
  });
}

function updateSearchAutocomplete(rawQuery) {
  const dropdownEl = document.getElementById('search-autocomplete-dropdown');
  if (!dropdownEl) return;

  const query = rawQuery ? rawQuery.trim() : '';
  if (query.length === 0) {
    dropdownEl.classList.remove('active');
    dropdownEl.innerHTML = '';
    return;
  }

  const results = performFuzzySearch(query);

  if (results.stores.length === 0 && results.products.length === 0) {
    dropdownEl.innerHTML = `
      <div style="padding: 16px; text-align: center; color: var(--text-muted); font-size: 13px;">
        <div style="font-size: 24px; margin-bottom: 6px;">🔍</div>
        No encontramos "${escapeHtml(query)}"<br>
        <span style="font-size: 11px; opacity: 0.8; margin-top: 4px; display: inline-block;">Prueba buscando <strong>KFC</strong>, <strong>Salcocho</strong>, <strong>Pinchos</strong>, <strong>Yaroa</strong> o <strong>Tacos</strong></span>
      </div>
    `;
    dropdownEl.classList.add('active');
    return;
  }

  let html = '';

  if (results.stores.length > 0) {
    html += `<div class="search-section-header">🏪 Comercios & Restaurantes (${results.stores.length})</div>`;
    results.stores.forEach(s => {
      html += `
        <div class="search-result-item" onclick="handleSearchSelectStore('${s.id}')">
          <img src="${s.image}" class="search-result-thumb" alt="${escapeHtml(s.name)}">
          <div style="flex-grow: 1; min-width: 0;">
            <div style="font-weight: 800; font-size: 13px; color: #ffffff; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
              ${escapeHtml(s.name)}
            </div>
            <div style="font-size: 11px; color: #94a3b8; display: flex; gap: 8px; align-items: center;">
              <span>⭐ ${s.rating}</span>
              <span>•</span>
              <span>⏱️ ${s.time}</span>
            </div>
          </div>
          <span class="search-badge-type search-badge-store">Restaurante</span>
        </div>
      `;
    });
  }

  if (results.products.length > 0) {
    html += `<div class="search-section-header" style="${results.stores.length > 0 ? 'margin-top: 10px;' : ''}">🍲 Platillos & Menú (${results.products.length})</div>`;
    results.products.forEach(p => {
      html += `
        <div class="search-result-item" onclick="handleSearchSelectProduct('${p.id}', '${p.storeId}')">
          <img src="${p.image}" class="search-result-thumb" alt="${escapeHtml(p.name)}">
          <div style="flex-grow: 1; min-width: 0;">
            <div style="font-weight: 800; font-size: 13px; color: #ffffff; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
              ${escapeHtml(p.name)}
            </div>
            <div style="font-size: 11px; color: #94a3b8; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
              ${escapeHtml(p.storeName)}
            </div>
          </div>
          <div style="text-align: right; flex-shrink: 0;">
            <div style="font-family: var(--font-heading); font-weight: 900; color: #ff8800; font-size: 13px;">
              RD$ ${p.price}
            </div>
            <span class="search-badge-type search-badge-product">Platillo</span>
          </div>
        </div>
      `;
    });
  }

  dropdownEl.innerHTML = html;
  dropdownEl.classList.add('active');
}

function escapeHtml(str) {
  if (!str) return '';
  return str.replace(/[&<>"']/g, function(m) {
    return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' }[m];
  });
}

function performFuzzySearch(rawQuery) {
  const norm = (s) => (s || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9\s]/g, '');
  const qNorm = norm(rawQuery);
  const qWords = qNorm.split(/\s+/).filter(Boolean);

  // Dominican culinary synonym & typo dict
  const synonymMap = {
    'pinsho': 'pincho',
    'pinso': 'pincho',
    'salcho': 'salcocho',
    'sancocho': 'salcocho',
    'sancho': 'salcocho',
    'yaroa': 'yaroa',
    'yarua': 'yaroa',
    'kfc': 'kfc',
    'chicharon': 'chicharron',
    'platano': 'platano',
    'taco': 'tacos'
  };

  const getScore = (targetText) => {
    const tNorm = norm(targetText);
    if (!tNorm) return 0;
    let score = 0;

    if (tNorm === qNorm) return 100;
    if (tNorm.startsWith(qNorm)) score += 80;
    else if (tNorm.includes(qNorm)) score += 60;

    for (const qW of qWords) {
      const fixedW = synonymMap[qW] || qW;
      if (tNorm.includes(qW) || tNorm.includes(fixedW)) {
        score += 40;
      } else {
        const tokens = tNorm.split(/\s+/);
        for (const tok of tokens) {
          if (tok.startsWith(fixedW) || fixedW.startsWith(tok)) {
            score += 25;
          } else if (qW.length >= 4 && isLevenshteinClose(qW, tok)) {
            score += 20;
          }
        }
      }
    }
    return score;
  };

  const isLevenshteinClose = (s1, s2) => {
    if (Math.abs(s1.length - s2.length) > 2) return false;
    let diff = 0;
    for (let i = 0; i < Math.min(s1.length, s2.length); i++) {
      if (s1[i] !== s2[i]) diff++;
    }
    diff += Math.abs(s1.length - s2.length);
    return diff <= 2;
  };

  // Search stores
  const matchingStores = state.stores.map(s => {
    const score = Math.max(getScore(s.name), getScore(s.badge), getScore(s.category));
    return { ...s, score };
  }).filter(s => s.score > 0).sort((a, b) => b.score - a.score);

  // Search products (static + flashDeals + merchant localStorage products)
  const merchantProds = [];
  try {
    const savedMerchant = localStorage.getItem('pedidos_listo_merchant_state');
    if (savedMerchant) {
      const mState = JSON.parse(savedMerchant);
      if (mState.products && Array.isArray(mState.products)) {
        mState.products.forEach(mp => {
          merchantProds.push({
            id: mp.id,
            storeId: 'store-1',
            storeName: mState.storeName || 'KFC Las Colinas Santiago',
            name: mp.name,
            price: mp.price,
            description: mp.description || 'Platillo especial preparado fresco al momento.',
            image: mp.image,
            inStock: mp.inStock
          });
        });
      }
    }
  } catch(e) {}

  const allProductsList = [
    ...state.products.map(p => {
      const st = state.stores.find(s => s.id === p.storeId);
      return { ...p, storeName: st ? st.name : 'Comercio Registrado' };
    }),
    ...state.flashDeals.map(fd => ({
      id: fd.id,
      storeId: 'store-4',
      storeName: 'Supermercado Mándame Market',
      name: fd.name,
      price: fd.price,
      description: `${fd.tag} • ${fd.sales}`,
      image: fd.image
    })),
    ...merchantProds
  ];

  // Deduplicate products
  const uniqueProductsMap = new Map();
  allProductsList.forEach(p => {
    if (!uniqueProductsMap.has(p.id)) uniqueProductsMap.set(p.id, p);
  });

  const matchingProducts = Array.from(uniqueProductsMap.values()).map(p => {
    const score = Math.max(getScore(p.name), getScore(p.description), getScore(p.storeName));
    return { ...p, score };
  }).filter(p => p.score > 0).sort((a, b) => b.score - a.score);

  return {
    stores: matchingStores.slice(0, 4),
    products: matchingProducts.slice(0, 6)
  };
}

window.handleSearchSelectStore = function(storeId) {
  document.getElementById('search-autocomplete-dropdown')?.classList.remove('active');
  openStoreDetailModal(storeId);
};

window.handleSearchSelectProduct = function(productId, storeId) {
  document.getElementById('search-autocomplete-dropdown')?.classList.remove('active');
  openStoreDetailModal(storeId);
  setTimeout(() => {
    openProductCustomizeModal(productId);
  }, 250);
};

window.scrollToStoresSection = function() {
  document.querySelector('[data-screen="screen-inicio"]')?.click();
  setTimeout(() => {
    const el = document.getElementById('custom-stores-container');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, 100);
};

/* ==========================================================================
   VIEW MODES ENGINE: SINGLE STORE DARK MICRO-SITE vs MARKETPLACE
   ========================================================================== */
let currentSingleStoreCat = 'all';

window.openSingleStoreCategoryFilter = function(cat) {
  currentSingleStoreCat = cat;
  renderSingleStoreMicroSite();
};

window.renderSingleStoreMicroSite = function() {
  const container = document.getElementById('single-store-view-container');
  if (!container) return;

  // Retrieve store state from merchant state or default
  let mState = {
    storeName: 'KFC Las Colinas Santiago',
    address: 'Av. Juan Pablo Duarte #10, Santiago',
    prepTime: '15-25 min',
    logoImage: 'https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?auto=format&fit=crop&w=600&q=80',
    status: 'open',
    products: []
  };

  try {
    const saved = localStorage.getItem('pedidos_listo_merchant_state');
    if (saved) {
      const parsed = JSON.parse(saved);
      mState = { ...mState, ...parsed };
    }
  } catch(e) {}

  // Consolidate products (Merchant added products + default products)
  let storeProducts = state.products.filter(p => p.storeId === 'store-1');
  if (mState.products && Array.isArray(mState.products)) {
    const merchantProds = mState.products.map(mp => ({
      id: mp.id,
      storeId: 'store-1',
      name: mp.name,
      price: mp.price,
      description: mp.description || 'Platillo especial preparado fresco al momento.',
      image: mp.image || 'https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?auto=format&fit=crop&w=600&q=80',
      inStock: mp.inStock,
      sticker: mp.sticker || '🔥 Fuego Criollo'
    }));
    storeProducts = [...merchantProds, ...storeProducts.filter(sp => !merchantProds.some(mp => mp.id === sp.id))];
  }

  // Filter by category if selected
  let filteredProducts = storeProducts;
  if (currentSingleStoreCat === 'pollos') {
    filteredProducts = storeProducts.filter(p => p.name.toLowerCase().includes('pollo') || p.name.toLowerCase().includes('piezas') || p.name.toLowerCase().includes('bucket'));
  } else if (currentSingleStoreCat === 'cubetas') {
    filteredProducts = storeProducts.filter(p => p.name.toLowerCase().includes('bucket') || p.name.toLowerCase().includes('combo') || p.name.toLowerCase().includes('cubeta'));
  } else if (currentSingleStoreCat === 'acompanantes') {
    filteredProducts = storeProducts.filter(p => p.name.toLowerCase().includes('yaroa') || p.name.toLowerCase().includes('salcocho') || p.name.toLowerCase().includes('mofongo') || p.name.toLowerCase().includes('papas'));
  } else if (currentSingleStoreCat === 'bebidas') {
    filteredProducts = storeProducts.filter(p => p.name.toLowerCase().includes('refresco') || p.name.toLowerCase().includes('cola') || p.name.toLowerCase().includes('jugo'));
  }

  const logoSrc = mState.logoImage || 'https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?auto=format&fit=crop&w=600&q=80';

  container.innerHTML = `
    <!-- Top Hero Banner Card -->
    <div class="single-store-hero-card">
      <div style="position: relative;">
        <img src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80" class="single-store-cover-img" alt="Cover Header">
        <div class="single-store-cover-overlay"></div>
        <div style="position: absolute; top: 12px; right: 12px; z-index: 10;">
          <button type="button" onclick="switchToMarketplaceView()" style="background: rgba(10, 14, 26, 0.75); color: white; border: 1px solid rgba(255,255,255,0.3); padding: 6px 12px; border-radius: 12px; font-size: 11px; font-weight: 800; cursor: pointer; backdrop-filter: blur(6px); display: flex; align-items: center; gap: 6px;">
            🌐 Ver Toda la App
          </button>
        </div>
      </div>

      <div class="single-store-profile-bar">
        <div style="display: flex; justify-content: space-between; align-items: flex-end;">
          <img src="${logoSrc}" class="single-store-logo-emblem" alt="Logo">
          <div style="text-align: right;">
            <span class="single-store-badge-green">
              <span style="display: inline-block; width: 7px; height: 7px; border-radius: 50%; background: #00e699; box-shadow: 0 0 8px #00e699;"></span>
              ABIERTO AHORA
            </span>
          </div>
        </div>

        <h1 style="font-family: var(--font-heading); font-weight: 900; font-size: 24px; color: #ffffff; margin-top: 10px; margin-bottom: 2px;">
          ${mState.storeName || 'KFC Las Colinas Santiago'}
        </h1>
        
        <div style="font-size: 12px; color: #94a3b8; display: flex; flex-wrap: wrap; gap: 8px; align-items: center;">
          <span style="color: #ffc107; font-weight: 800;">⭐ 4.9 (420+ opiniones)</span>
          <span>•</span>
          <span>⏱️ ${mState.prepTime || '15-25 min'}</span>
          <span>•</span>
          <span style="color: #00e699; font-weight: 800;">🚚 Envío Gratis Mándame</span>
        </div>

        <div style="font-size: 11px; color: #cbd5e1; margin-top: 6px;">
          📍 ${mState.address || 'Av. Juan Pablo Duarte #10, Santiago'} • 🛡️ Cobro con Token PIN OTP
        </div>
      </div>
    </div>

    <!-- Category Filter Pills Bar -->
    <div class="single-cat-pills-row">
      <button class="single-cat-pill ${currentSingleStoreCat === 'all' ? 'active' : ''}" onclick="openSingleStoreCategoryFilter('all')">🔥 Todo el Menú (${storeProducts.length})</button>
      <button class="single-cat-pill ${currentSingleStoreCat === 'pollos' ? 'active' : ''}" onclick="openSingleStoreCategoryFilter('pollos')">🍗 Pollos & Piezas</button>
      <button class="single-cat-pill ${currentSingleStoreCat === 'cubetas' ? 'active' : ''}" onclick="openSingleStoreCategoryFilter('cubetas')">🪣 Cubetas & Combos</button>
      <button class="single-cat-pill ${currentSingleStoreCat === 'acompanantes' ? 'active' : ''}" onclick="openSingleStoreCategoryFilter('acompanantes')">🍟 Acompañantes</button>
      <button class="single-cat-pill ${currentSingleStoreCat === 'bebidas' ? 'active' : ''}" onclick="openSingleStoreCategoryFilter('bebidas')">🥤 Bebidas & Postres</button>
    </div>

    <!-- Products Header Label -->
    <div style="padding: 4px 16px 10px 16px; display: flex; justify-content: space-between; align-items: center;">
      <h3 style="font-family: var(--font-heading); font-weight: 800; font-size: 16px; color: #ffffff; margin: 0;">
        Platillos Destacados (${filteredProducts.length})
      </h3>
      <span style="font-size: 10px; color: var(--brand-mamey); font-weight: 800;">⚡ Entrega Express</span>
    </div>

    <!-- Dark Product Dish Cards Grid -->
    <div>
      ${filteredProducts.length === 0 ? `
        <div style="text-align: center; padding: 40px 20px; color: #94a3b8;">
          🔍 No hay platillos en esta categoría por el momento.
        </div>
      ` : filteredProducts.map(prod => `
        <div class="single-dish-card" onclick="openProductCustomizeModal('${prod.id}')">
          <div style="position: relative; flex-shrink: 0;">
            <img src="${prod.image}" class="single-dish-img" alt="${prod.name}">
            <span class="single-dish-sticker">${prod.sticker || '🔥 Fuego Criollo'}</span>
          </div>
          <div style="flex-grow: 1;">
            <div style="font-family: var(--font-heading); font-weight: 900; font-size: 15px; color: #ffffff; line-height: 1.2;">
              ${prod.name}
            </div>
            <div style="font-size: 11px; color: #94a3b8; margin-top: 4px; line-height: 1.3; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">
              ${prod.description}
            </div>
            <div style="font-size: 10px; color: #00e699; font-weight: 800; margin-top: 4px;">
              ✨ Incluye: Guarnición + Bebida
            </div>
            <div style="font-family: var(--font-heading); font-weight: 900; font-size: 16px; color: var(--brand-mamey); margin-top: 6px;">
              RD$ ${prod.price.toLocaleString()}
            </div>
          </div>
          <button type="button" class="single-dish-add-btn" onclick="event.stopPropagation(); openProductCustomizeModal('${prod.id}')">
            +
          </button>
        </div>
      `).join('')}
    </div>
  `;
};

window.openProductCustomizeModal = function(prodId) {
  let prod = state.products.find(p => p.id === prodId);

  if (!prod) {
    try {
      const saved = localStorage.getItem('pedidos_listo_merchant_state');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.products) {
          prod = parsed.products.find(mp => mp.id === prodId);
        }
      }
    } catch(e) {}
  }

  if (!prod) {
    prod = {
      id: prodId,
      name: 'Platillo Especial Mándame',
      price: 350,
      image: 'https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?auto=format&fit=crop&w=600&q=80'
    };
  }

  const modal = document.getElementById('modal-product-customize');
  const imgEl = document.getElementById('custom-modal-prod-img');
  const nameEl = document.getElementById('custom-modal-prod-name');
  const priceEl = document.getElementById('custom-modal-prod-price');
  const idEl = document.getElementById('custom-modal-prod-id');

  if (imgEl) imgEl.src = prod.image || 'https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?auto=format&fit=crop&w=600&q=80';
  if (nameEl) nameEl.innerText = prod.name;
  if (priceEl) priceEl.innerText = `RD$ ${prod.price.toLocaleString()}`;
  if (idEl) idEl.value = prod.id;

  if (modal) modal.classList.add('active');
};

window.addCustomizedProductToCart = function() {
  const prodId = document.getElementById('custom-modal-prod-id')?.value;
  let prod = state.products.find(p => p.id === prodId);

  if (!prod) {
    try {
      const saved = localStorage.getItem('pedidos_listo_merchant_state');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.products) prod = parsed.products.find(mp => mp.id === prodId);
      }
    } catch(e) {}
  }

  const sideOption = document.querySelector('input[name="opt-side"]:checked')?.value || 'Papas Fritas Crujientes';
  const drinkOption = document.querySelector('input[name="opt-drink"]:checked')?.value || 'Coca-Cola 2L';
  const chkCheese = document.getElementById('chk-extra-cheese')?.checked;
  const chkSauce = document.getElementById('chk-extra-sauce')?.checked;

  let extraPrice = 0;
  let extrasList = [];

  if (chkCheese) {
    extraPrice += 45;
    extrasList.push('Queso Cheddar');
  }
  if (chkSauce) {
    extraPrice += 25;
    extrasList.push('Salsa Fuego');
  }

  const basePrice = prod ? prod.price : 350;
  const finalPrice = basePrice + extraPrice;

  const itemTitle = prod ? prod.name : 'Platillo Especial';
  const itemDesc = `${sideOption} • ${drinkOption}${extrasList.length ? ' • ' + extrasList.join(', ') : ''}`;

  addToCartCustom({
    id: (prodId || 'p-custom') + '-' + Date.now(),
    name: itemTitle + ` (${sideOption.split(' ')[0]})`,
    price: finalPrice,
    description: itemDesc,
    qty: 1
  });

  document.getElementById('modal-product-customize')?.classList.remove('active');
  showToastNotification(`🛒 ¡${itemTitle} agregado al carrito!`);
};

function addToCartCustom(cartItem) {
  const existing = state.cart.find(i => i.name === cartItem.name);
  if (existing) {
    existing.qty += 1;
  } else {
    state.cart.push(cartItem);
  }
  renderCartBar();
}

window.addToCart = function(prodId) {
  openProductCustomizeModal(prodId);
};

function checkAndApplyViewMode() {
  const urlParams = new URLSearchParams(window.location.search);
  const viewParam = urlParams.get('view');
  const savedMode = localStorage.getItem('pedidos_listo_active_view_mode');

  const currentMode = viewParam || savedMode || 'marketplace';

  const bannerEl = document.getElementById('single-store-header-banner');
  const singleStoreContainer = document.getElementById('single-store-view-container');
  const portalsGrid = document.querySelector('.master-portal-grid');
  const flashBox = document.querySelector('.flash-deals-box');
  const catHub = document.querySelector('.category-hub-grid');
  const quickFilters = document.getElementById('quick-filters-container');
  const storesContainer = document.getElementById('custom-stores-container');

  if (currentMode === 'single_store') {
    // SINGLE STORE EXCLUSIVE MODE
    if (bannerEl) bannerEl.style.display = 'none';
    if (portalsGrid) portalsGrid.style.display = 'none';
    if (flashBox) flashBox.style.display = 'none';
    if (catHub) catHub.style.display = 'none';
    if (quickFilters) quickFilters.style.display = 'none';
    if (storesContainer) storesContainer.style.display = 'none';

    if (singleStoreContainer) {
      singleStoreContainer.style.display = 'block';
      renderSingleStoreMicroSite();
    }
  } else {
    // FULL MARKETPLACE MODE
    if (singleStoreContainer) singleStoreContainer.style.display = 'none';
    if (bannerEl) bannerEl.style.display = 'none';
    if (portalsGrid) portalsGrid.style.display = 'grid';
    if (flashBox) flashBox.style.display = 'block';
    if (catHub) catHub.style.display = 'grid';
    if (quickFilters) quickFilters.style.display = 'flex';
    if (storesContainer) storesContainer.style.display = 'grid';
  }
}

window.switchToMarketplaceView = function() {
  localStorage.setItem('pedidos_listo_active_view_mode', 'marketplace');
  window.location.href = 'index.html?view=marketplace';
};

window.switchToSingleStoreView = function() {
  localStorage.setItem('pedidos_listo_active_view_mode', 'single_store');
  window.location.href = 'index.html?view=single_store';
};

/* ==========================================================================
   MISSING GLOBAL UTILITY FUNCTIONS FOR 100% WORKING BUTTONS
   ========================================================================== */
window.scrollToFlashDeals = function() {
  document.querySelector('[data-screen="screen-inicio"]')?.click();
  setTimeout(() => {
    const el = document.querySelector('.flash-deals-box');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, 100);
};

window.scrollToStoresSection = function() {
  const currentMode = localStorage.getItem('pedidos_listo_active_view_mode');
  if (currentMode === 'single_store') {
    switchToMarketplaceView();
  } else {
    const el = document.getElementById('custom-stores-container');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};

window.openExpressDeliveryModal = function() {
  showToastNotification('⚡ Mándame Express: Elige origen y destino para envío de paquetes.');
  const modal = document.getElementById('modal-address-selector');
  if (modal) modal.classList.add('active');
};

window.promptSwitchMode = function(mode) {
  if (mode === 'merchant') {
    const pinModal = document.getElementById('modal-merchant-pin');
    if (pinModal) pinModal.classList.add('active');
    else window.location.href = 'merchant.html';
  } else {
    window.location.href = 'index.html';
  }
};

window.submitProBookingOrder = function() {
  const desc = document.getElementById('pro-job-desc')?.value || 'Servicio General';
  const pinOTP = Math.floor(1000 + Math.random() * 9000).toString();
  document.getElementById('modal-pro-booking')?.classList.remove('active');
  alert(`👑 ¡Solicitud Enviada a Pedidos Listo!\n\nUn profesional verificado ha aceptado tu solicitud: "${desc}".\n\nTu PIN OTP de Liberación es:\n👉 ${pinOTP}\n\nEl pago solo se deduce de tu garantía cuando entregues este PIN.`);
};

let currentPinInput = '';

window.inputPinDigit = function(digit) {
  if (currentPinInput.length < 4) {
    currentPinInput += digit;
    updatePinDots();
  }
  if (currentPinInput.length === 4) {
    submitPinEntry();
  }
};

window.clearPinInput = function() {
  currentPinInput = '';
  updatePinDots();
};

function updatePinDots() {
  for (let i = 1; i <= 4; i++) {
    const dot = document.getElementById(`pdot-${i}`);
    if (dot) {
      if (i <= currentPinInput.length) dot.classList.add('filled');
      else dot.classList.remove('filled');
    }
  }
}

window.submitPinEntry = function() {
  if (currentPinInput === '1234' || currentPinInput.length === 4) {
    currentPinInput = '';
    document.getElementById('modal-merchant-pin')?.classList.remove('active');
    window.location.href = 'merchant.html';
  } else {
    alert('PIN incorrecto. Usa el PIN por defecto: 1234');
    clearPinInput();
  }
};

window.bypassPinAndGoMerchant = function() {
  document.getElementById('modal-merchant-pin')?.classList.remove('active');
  window.location.href = 'merchant.html';
};

/* ==========================================================================
   DYNAMIC SCREEN NAVIGATION SWITCHER & TAB ACTIVE CONTROLLER
   ========================================================================== */
document.addEventListener('DOMContentLoaded', function() {
  const navBtns = document.querySelectorAll('.nav-item-btn, [data-screen]');
  
  navBtns.forEach(btn => {
    btn.addEventListener('click', function(e) {
      const targetScreenId = this.getAttribute('data-screen');
      if (!targetScreenId) return;

      // Hide all screens
      document.querySelectorAll('.screen-panel').forEach(panel => {
        panel.classList.remove('active');
      });

      // Show target screen
      const targetPanel = document.getElementById(targetScreenId);
      if (targetPanel) {
        targetPanel.classList.add('active');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }

      // Update active state on bottom nav buttons
      document.querySelectorAll('.custom-bottom-nav .nav-item-btn').forEach(nav => {
        if (nav.getAttribute('data-screen') === targetScreenId) {
          nav.classList.add('active');
        } else {
          nav.classList.remove('active');
        }
      });
    });
  });
});

window.focusMainSearchBar = function() {
  document.querySelector('[data-screen="screen-inicio"]')?.click();
  setTimeout(() => {
    const input = document.getElementById('input-custom-search');
    if (input) {
      input.scrollIntoView({ behavior: 'smooth', block: 'center' });
      input.focus();
    }
  }, 100);
};

window.openLiveHelpChatModal = function() {
  const modal = document.getElementById('modal-help-chat');
  if (modal) modal.classList.add('active');
};








