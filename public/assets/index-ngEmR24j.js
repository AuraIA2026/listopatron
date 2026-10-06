(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const a of r)if(a.type==="childList")for(const d of a.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&i(d)}).observe(document,{childList:!0,subtree:!0});function n(r){const a={};return r.integrity&&(a.integrity=r.integrity),r.referrerPolicy&&(a.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?a.credentials="include":r.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function i(r){if(r.ep)return;r.ep=!0;const a=n(r);fetch(r.href,a)}})();const M={storeName:"KFC Las Colinas Santiago",address:"Av. Juan Pablo Duarte #10, Santiago",phone:"809-555-0192",logoImage:"",status:"open",prepTime:"25-35 min",todaySales:4850,todayOrdersCount:6,products:[{id:"p-bucket-kfc",name:"Bucket Familiar KFC (8 Pzs)",price:999,category:"bocado",description:"8 piezas de pollo crujiente receta secreta con papas.",inStock:!0,isFlash:!1,image:"https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?auto=format&fit=crop&w=600&q=80"},{id:"p-yaroa-especial",name:"Combo Yaroa Especial Mándame",price:330,category:"bocado",description:"Yaroa de papa con pollo, carne molida y extra queso fundido.",inStock:!0,isFlash:!0,image:"https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80"},{id:"p-refresco-cola",name:"Refresco Cola 2L",price:55,category:"licor",description:"Refresco sabor cola bien frío 2 Litros.",inStock:!0,isFlash:!0,image:"https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=600&q=80"}],orders:[{id:"ORD-7719",clientName:"Arte",phone:"809-555-0192",items:"1x Bucket Familiar KFC (8 Pzs)",total:1054,pinOTP:"7492",status:"pending",time:"Hace 5 mins"}],coupons:[{code:"SOCIO20",discount:150,minSpend:500,usageCount:24}],reviews:[{id:"rev-1",clientName:"Arte",rating:5,date:"Ayer",comment:"¡Excelente comida y la Yaroa estaba súper caliente! Llegó en 15 mins.",reply:"¡Muchas gracias por elegirnos, Arte! 🧡"},{id:"rev-2",clientName:"Laura M.",rating:5,date:"Hace 2 días",comment:"El bucket familiar estuvo crujiente y fresco. Muy recomendado.",reply:""}],bankAccount:{bank:"Banco Popular Dominicano",number:"7829-1092-4912",holder:"KFC Las Colinas SRL / Arte"},settings:{radiusKm:"5 km",minSpend:500,hours:"08:00 AM - 11:00 PM"}};function F(){const t=localStorage.getItem("pedidos_listo_merchant_state");if(t)try{const e=JSON.parse(t);return{...M,...e}}catch{}return M}function y(t){localStorage.setItem("pedidos_listo_merchant_state",JSON.stringify(t)),window.dispatchEvent(new Event("pedidos_listo_state_updated"))}let o=F();function z(){const t=localStorage.getItem("pedidos_listo_user_session");if(t)try{return JSON.parse(t)}catch{}return{isLoggedIn:!0,ownerName:"Juan Pérez",email:"socio@pedidoslisto.com",phone:"809-555-0192",role:"merchant"}}function D(t){localStorage.setItem("pedidos_listo_user_session",JSON.stringify(t)),window.dispatchEvent(new Event("pedidos_listo_session_updated"))}let b=z();window.renderSessionBar=function(){const t=document.getElementById("user-session-status"),e=document.getElementById("btn-session-login"),n=document.getElementById("btn-session-logout");b&&b.isLoggedIn?(t&&(t.innerText=`🟢 Sesión: ${b.ownerName||"Propietario"} (${o.storeName||"Comercio Registrado"})`),e&&(e.innerText="⚙️ Mi Cuenta Partner"),n&&(n.style.display="inline-block")):(t&&(t.innerText="⚪ Sesión no iniciada (Invitado)"),e&&(e.innerText="🔑 Iniciar Sesión / Registrar Mi Negocio"),n&&(n.style.display="none"))};window.openPartnerLoginModal=function(){var t;(t=document.getElementById("modal-partner-login"))==null||t.classList.add("active")};window.switchToRegisterModal=function(){var t,e;(t=document.getElementById("modal-partner-login"))==null||t.classList.remove("active"),(e=document.getElementById("modal-register-merchant"))==null||e.classList.add("active")};window.handlePartnerLoginSubmit=function(t){var n,i;t.preventDefault();const e=((n=document.getElementById("login-email"))==null?void 0:n.value)||"socio@pedidoslisto.com";b={isLoggedIn:!0,ownerName:e.split("@")[0].toUpperCase(),email:e,phone:o.phone||"809-555-0192",role:"merchant"},D(b),renderSessionBar(),(i=document.getElementById("modal-partner-login"))==null||i.classList.remove("active"),alert(`🔑 ¡SESIÓN INICIADA EN PEDIDOS LISTO PARTNER!

Bienvenido, ${b.ownerName}.
Acceso concedido al Portal de Comercio & Impresión POS.`)};window.handleRegisterMerchantSubmit=function(t){var h,w,g,l,v,x,u,p,N,O,R,C;t.preventDefault();const e=(h=document.getElementById("reg-owner-name"))==null?void 0:h.value.trim(),n=(w=document.getElementById("reg-email"))==null?void 0:w.value.trim(),i=(g=document.getElementById("reg-owner-phone"))==null?void 0:g.value.trim(),r=(l=document.getElementById("reg-store-name"))==null?void 0:l.value.trim();(v=document.getElementById("reg-store-cat"))==null||v.value,(x=document.getElementById("reg-store-rnc"))==null||x.value.trim();const a=(u=document.getElementById("reg-store-address"))==null?void 0:u.value.trim(),d=(p=document.getElementById("reg-store-phone"))==null?void 0:p.value.trim(),c=(N=document.getElementById("reg-bank-name"))==null?void 0:N.value,f=(O=document.getElementById("reg-bank-number"))==null?void 0:O.value.trim(),m=(R=document.getElementById("reg-bank-holder"))==null?void 0:R.value.trim();b={isLoggedIn:!0,ownerName:e,email:n,phone:i,role:"merchant"},D(b),o.storeName=r,o.address=a,o.phone=d,o.bankAccount={bank:c,number:f,holder:m},y(o),I(),renderSessionBar(),(C=document.getElementById("modal-register-merchant"))==null||C.classList.remove("active"),alert(`✨ ¡REGISTRO EXITOSO EN PEDIDOS LISTO!

🏪 Comercio: "${r}"
👤 Propietario: ${e}
📍 Dirección: ${a}
🏦 Banco Depósitos: ${c}

¡Tu negocio ya está activo para vender, publicar platos e imprimir comandas!`)};window.handlePartnerLogout=function(){confirm("¿Deseas cerrar sesión en Pedidos Listo Partner?")&&(b={isLoggedIn:!1,ownerName:"",email:"",phone:"",role:"client"},D(b),renderSessionBar(),alert("🚪 Sesión cerrada con éxito."))};document.addEventListener("DOMContentLoaded",()=>{renderSessionBar(),I(),B(),k(),A(),T(),window.updateLiveMenuPreview&&window.updateLiveMenuPreview();const t=document.getElementById("bank-account-num"),e=document.getElementById("bank-account-holder"),n=document.getElementById("bank-name-select");t&&(t.value=o.bankAccount.number||""),e&&(e.value=o.bankAccount.holder||""),n&&(n.value=o.bankAccount.bank||"Banco Popular Dominicano");const i=document.getElementById("setting-hours"),r=document.getElementById("setting-radius"),a=document.getElementById("setting-min-spend");i&&(i.value=o.settings.hours||"08:00 AM - 11:00 PM"),r&&(r.value=o.settings.radiusKm||"5 km"),a&&(a.value=o.settings.minSpend||500),window.addEventListener("storage",()=>{o=F(),I(),B(),k(),A(),T()})});function I(){const t=document.getElementById("dash-today-sales");t&&(t.innerText=`RD$ ${o.todaySales.toLocaleString()}`);const e=document.getElementById("dash-today-orders");e&&(e.innerText=`${o.todayOrdersCount} Completados`);const n=document.getElementById("merchant-store-title");n&&(n.innerText=o.storeName||"KFC Las Colinas Santiago");const i=document.getElementById("card-store-name");i&&(i.innerText=o.storeName||"KFC Las Colinas Santiago");const r=document.getElementById("card-store-address");r&&(r.innerText=o.address||"Av. Juan Pablo Duarte #10, Santiago");const a=document.getElementById("dash-bank-account-text");a&&(a.innerText=`Depositado a ${o.bankAccount.bank} ***** ${o.bankAccount.number.slice(-4)}`);const d=document.getElementById("store-status-dot"),c=document.getElementById("store-status-label"),f=document.getElementById("select-store-status");f&&(f.value=o.status),d&&c&&(o.status==="open"?(d.style.background="#00e699",c.innerText="Abierto & Recibiendo Pedidos"):o.status==="busy"?(d.style.background="#ffc107",c.innerText="🟡 Alta Demanda (Pausa 15m)"):(d.style.background="#ef4444",c.innerText="🔴 Cerrado Temporalmente"));const m=document.getElementById("select-prep-time");m&&(m.value=o.prepTime);const h=document.getElementById("badge-pedidos-count");h&&(h.innerText=o.orders.length)}let S="";window.handleProductImageUpload=function(t){if(t.files&&t.files[0]){const e=t.files[0],n=new FileReader;n.onload=function(i){S=i.target.result;const r=document.getElementById("prod-img-preview-container"),a=document.getElementById("prod-img-preview");r&&a&&(a.src=S,r.style.display="flex"),window.updateLiveMenuPreview&&window.updateLiveMenuPreview()},n.readAsDataURL(e)}};window.removeUploadedImage=function(){S="";const t=document.getElementById("prod-file-input");t&&(t.value="");const e=document.getElementById("prod-img-preview-container");e&&(e.style.display="none"),window.updateLiveMenuPreview&&window.updateLiveMenuPreview()};window.quickEditMerchantPrice=function(t){const e=o.products.find(i=>i.id===t);if(!e)return;const n=prompt(`✏️ Editar precio para "${e.name}" (RD$):`,e.price);if(n!==null){const i=parseFloat(n);if(!isNaN(i)&&i>0){e.price=i,y(o),B();try{window.dispatchEvent(new Event("storage"))}catch{}alert(`✅ ¡Precio actualizado a RD$ ${i} para "${e.name}"!`)}else alert("⚠️ Ingresa un precio válido.")}};function B(){const t=document.getElementById("merchant-inventory-list"),e=document.getElementById("merchant-product-count");if(e&&(e.innerText=`${o.products.length} Productos`),!!t){if(o.products.length===0){t.innerHTML='<p style="text-align: center; color: var(--text-muted); padding: 20px;">No hay productos registrados en el catálogo.</p>';return}t.innerHTML=o.products.map(n=>`
    <div style="display: flex; align-items: center; justify-content: space-between; background: #f8fafc; border: 1px solid #e2e8f0; padding: 12px 14px; border-radius: 14px; margin-bottom: 10px;">
      <div style="display: flex; align-items: center; gap: 10px; flex-grow: 1; min-width: 0;">
        <img src="${n.image}" style="width: 48px; height: 48px; border-radius: 10px; object-fit: cover; flex-shrink: 0; border: 1px solid #cbd5e1;">
        <div style="min-width: 0;">
          <div style="font-weight: 800; font-size: 13px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
            ${n.name} ${n.isFlash?'<span style="color: var(--brand-mamey); font-size: 10px; font-weight: 900;">⚡ FLASH</span>':""}
          </div>
          <div style="display: flex; align-items: center; gap: 6px; margin-top: 2px;">
            <span style="font-family: var(--font-heading); font-weight: 900; color: var(--brand-mamey); font-size: 14px;">RD$ ${n.price}</span>
            <button type="button" style="background: #e2e8f0; color: #475569; border: none; padding: 2px 6px; border-radius: 6px; font-size: 10px; font-weight: 800; cursor: pointer;" onclick="quickEditMerchantPrice('${n.id}')">✏️ Precio</button>
          </div>
        </div>
      </div>

      <div style="display: flex; align-items: center; gap: 6px; flex-shrink: 0;">
        <span class="stock-badge ${n.inStock?"stock-in":"stock-out"}" style="padding: 4px 8px; border-radius: 6px; font-size: 10px; font-weight: 800; background: ${n.inStock?"#dcfce7":"#fee2e2"}; color: ${n.inStock?"#15803d":"#b91c1c"}; cursor: pointer;" onclick="toggleStockStatus('${n.id}')">
          ${n.inStock?"✓ En Stock":"❌ Agotado"}
        </span>
        <button style="background: #fee2e2; color: #ef4444; border: none; padding: 6px 8px; border-radius: 8px; font-weight: 800; font-size: 11px; cursor: pointer;" onclick="deleteMerchantProduct('${n.id}')">
          🗑️
        </button>
      </div>
    </div>
  `).join("")}}window.handleAddNewProduct=function(t){t&&t.preventDefault();const e=document.getElementById("prod-name"),n=document.getElementById("prod-price"),i=document.getElementById("prod-category"),r=document.getElementById("prod-desc"),a=document.getElementById("prod-is-flash"),d=e&&e.value.trim()!==""?e.value.trim():"Yaroa de Pollo & Queso Mofongo",c=n&&n.value!==""?parseFloat(n.value):450,f=i?i.value:"bocado",m=r&&r.value.trim()!==""?r.value.trim():"Platillo especial preparado fresco al momento con sazón criollo.",h=document.getElementById("prod-img")?document.getElementById("prod-img").value:"",w=S||h||"https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80",g=a?a.checked:!1,l=Array.from(document.querySelectorAll('input[name="opt-guarnicion"]:checked')).map(p=>p.value),v=Array.from(document.querySelectorAll('input[name="opt-bebida"]:checked')).map(p=>p.value),x=Array.from(document.querySelectorAll('input[name="opt-extra"]:checked')).map(p=>p.value),u={id:"prod-"+Date.now(),name:d,price:c,category:f,description:m,image:w,inStock:!0,isFlash:g,guarniciones:l,bebidas:v,extras:x};o.products||(o.products=[]),o.products.unshift(u),y(o);try{window.dispatchEvent(new Event("storage"))}catch{}I(),B(),e&&(e.value=""),n&&(n.value=""),r&&(r.value=""),removeUploadedImage(),alert(`✨ ¡PRODUCTO PUBLICADO EN VIVO!

Platillo: "${d}"
Precio: RD$ ${c}
Estado: 🟢 Activo en Pedidos Listo

¡Los clientes ya pueden ver y ordenar este producto en la app!`)};window.toggleStockStatus=function(t){const e=o.products.find(n=>n.id===t);e&&(e.inStock=!e.inStock,y(o),B())};window.deleteMerchantProduct=function(t){confirm("¿Seguro que deseas eliminar este producto del catálogo del comercio?")&&(o.products=o.products.filter(e=>e.id!==t),y(o),B())};function k(){const t=document.getElementById("merchant-orders-list");if(t){if(o.orders.length===0){t.innerHTML='<p style="text-align: center; color: var(--text-muted); padding: 20px; font-size: 13px;">No hay pedidos pendientes en este momento.</p>';return}t.innerHTML=o.orders.map(e=>`
    <div style="background: #ffffff; border-left: 5px solid ${e.status==="accepted"?"#00b0ff":"#00e699"}; padding: 16px; border-radius: 16px; margin-bottom: 14px; border: 1px solid #cbd5e1; box-shadow: 0 4px 14px rgba(0,0,0,0.06);">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
        <span style="font-weight: 900; font-size: 18px; color: var(--text-primary);">Orden #${e.id}</span>
        <span style="background: #0a0e1a; color: #00e699; font-size: 12px; font-weight: 900; padding: 5px 10px; border-radius: 8px;">
          ${e.status==="accepted"?"🧑‍🍳 EN PREPARACIÓN":"🛵 NUEVO PEDIDO"}
        </span>
      </div>

      <p style="font-size: 15px; font-weight: 800; color: var(--text-primary); margin-bottom: 8px; line-height: 1.4;">${e.items}</p>
      <div style="font-size: 13px; color: var(--text-muted); margin-bottom: 12px; display: flex; justify-content: space-between; align-items: center;">
        <span>Cliente: <strong style="color: #0f172a;">${e.clientName}</strong> (${e.phone})</span>
        <span style="font-family: var(--font-heading); font-weight: 900; color: var(--brand-mamey); font-size: 18px;">RD$ ${e.total}</span>
      </div>

      <div style="display: flex; gap: 8px; flex-wrap: wrap;">
        ${e.status==="pending"?`
          <button style="flex-grow: 1; min-height: 48px; background: var(--brand-mamey); color: white; border: none; padding: 12px 14px; border-radius: 12px; font-weight: 900; font-size: 14px; cursor: pointer; box-shadow: 0 4px 12px rgba(255,107,0,0.3);" onclick="acceptMerchantOrder('${e.id}')">
            👨‍🍳 Aceptar y Cocinar
          </button>
        `:`
          <button style="flex-grow: 1; min-height: 48px; background: #00b0ff; color: white; border: none; padding: 12px 14px; border-radius: 12px; font-weight: 900; font-size: 14px; cursor: pointer;" onclick="alert('🛵 Delivery notificado. En camino a recoger.')">
            🛵 Listo para Delivery
          </button>
        `}
        <button style="min-height: 48px; background: #121829; color: white; border: none; padding: 12px 14px; border-radius: 12px; font-weight: 900; font-size: 13px; cursor: pointer;" onclick="printPosTicket('${e.id}')">
          🖨️ Ticket POS
        </button>
        <button style="min-height: 48px; background: #25D366; color: white; border: none; padding: 12px 14px; border-radius: 12px; font-weight: 900; font-size: 13px; cursor: pointer;" onclick="window.open('https://api.whatsapp.com/send?phone=${e.phone}&text=Hola%20${e.clientName},%20tu%20pedido%20${e.id}%20esta%20siendo%20procesado%20en%20${o.storeName}', '_blank')">
          💬 WhatsApp
        </button>
      </div>
    </div>
  `).join("")}}window.acceptMerchantOrder=function(t){const e=o.orders.find(n=>n.id===t);e&&(e.status="accepted",y(o),k(),alert(`👨‍🍳 Orden #${t} ACEPTADA.

Notificación enviada al cliente. Tiempo estimado de cocina: ${o.prepTime}`))};window.handleVerifyPin=function(){const t=document.getElementById("verify-pin-input");if(!t)return;const e=t.value.trim();if(!e){alert("Ingresa el PIN de 4 dígitos del cliente.");return}const n=o.orders.find(i=>i.pinOTP===e);n?(n.status="delivered",o.todaySales+=n.total,o.todayOrdersCount+=1,o.orders=o.orders.filter(i=>i.id!==n.id),y(o),I(),k(),t.value="",alert(`🔓 ¡PIN OTP ${e} VALIDADO CON ÉXITO!

✅ Fondos de RD$ ${n.total} liberados al comercio.
✅ Pedido entregado satisfactoriamente.`)):alert(`❌ PIN Incorrecto (${e}). Pide al cliente el PIN OTP de 4 dígitos que aparece en su pantalla de la app.`)};window.printPosTicket=function(t){var i;const e=o.orders.find(r=>r.id===t)||o.orders[0];if(!e)return;const n=document.getElementById("pos-ticket-content");n&&(n.innerHTML=`
      <div style="text-align: center; border-bottom: 1px dashed #000; padding-bottom: 8px; margin-bottom: 8px;">
        <h4 style="margin: 0; font-size: 16px; font-weight: 900;">${o.storeName}</h4>
        <span style="font-size: 11px;">${o.address}</span><br>
        <span style="font-size: 11px;">Tel: ${o.phone}</span>
      </div>
      <div style="font-size: 11px; margin-bottom: 8px;">
        <strong>ORDEN #: ${e.id}</strong><br>
        Fecha: ${new Date().toLocaleDateString("es-DO")} ${new Date().toLocaleTimeString("es-DO")}<br>
        Cliente: ${e.clientName}<br>
        Tel: ${e.phone}
      </div>
      <div style="border-top: 1px dashed #000; border-bottom: 1px dashed #000; padding: 8px 0; margin-bottom: 8px; font-size: 12px;">
        ${e.items}
      </div>
      <div style="text-align: right; font-size: 14px; font-weight: 900; margin-bottom: 8px;">
        TOTAL: RD$ ${e.total}
      </div>
      <div style="text-align: center; font-size: 11px; border-top: 1px dashed #000; padding-top: 8px;">
        <strong>PIN OTP DE SEGURIDAD: ${e.pinOTP}</strong><br>
        *** Gracias por preferirnos ***
      </div>
    `),(i=document.getElementById("modal-pos-ticket"))==null||i.classList.add("active"),window.executeThermalPrintEngine(e)};let L=!1;window.executeThermalPrintEngine=function(t){if(L){console.warn("Impresión en curso, ignorando duplicado.");return}L=!0,setTimeout(()=>{L=!1},1500);try{const e=t||(o.orders&&o.orders.length>0?o.orders[0]:null),n=o.storeName||"KFC Las Colinas Santiago",i=o.address||"Av. Juan Pablo Duarte #10, Santiago",r=o.phone||"809-555-0192",a=e?e.id:"ORD-7719",d=e?e.clientName:"Juan Pérez",c=e?e.phone:"809-555-0192",f=e?e.items:`1x Bucket Familiar KFC (8 Pzs)
1x Refresco Cola 2L`,m=e?e.total:1054,h=e?e.pinOTP:"7492",w=`${new Date().toLocaleDateString("es-DO")} ${new Date().toLocaleTimeString("es-DO")}`,g=`
================================
${n.toUpperCase()}
${i}
Tel: ${r}
================================
ORDEN #: ${a}
FECHA: ${w}
CLIENTE: ${d} (${c})
--------------------------------
${f}
--------------------------------
TOTAL: RD$ ${m}
--------------------------------
PIN OTP SEGURIDAD: ${h}
*** GRACIAS POR PREFERIRNOS ***
================================



`;let l=!1;if(window.Android){if(typeof window.Android.printTicket=="function")try{window.Android.printTicket(g),l=!0}catch{}else if(typeof window.Android.printString=="function")try{window.Android.printString(g),l=!0}catch{}else if(typeof window.Android.print=="function")try{window.Android.print(),l=!0}catch{}}if(!l&&window.SunmiPrinter){if(typeof window.SunmiPrinter.printTicket=="function")try{window.SunmiPrinter.printTicket(g),l=!0}catch{}else if(typeof window.SunmiPrinter.printString=="function")try{window.SunmiPrinter.printString(g),l=!0}catch{}}if(!l&&window.sunmiInnerPrinter){if(typeof window.sunmiInnerPrinter.printText=="function")try{window.sunmiInnerPrinter.printText(g),l=!0}catch{}else if(typeof window.sunmiInnerPrinter.print=="function")try{window.sunmiInnerPrinter.print(g),l=!0}catch{}}if(l){console.log("Printed via Native Android/Sunmi Interface");return}const v=document.getElementById("pos-ticket-content"),x=v?v.innerHTML:`
      <div style="text-align:center;">
        <h3 style="margin:0;">${n}</h3>
        <p style="margin:2px 0;">${i}</p>
        <p style="margin:2px 0;">Tel: ${r}</p>
        <hr style="border:none;border-bottom:1px dashed #000;margin:6px 0;">
        <p style="text-align:left;"><strong>ORDEN #: ${a}</strong><br>Cliente: ${d}</p>
        <hr style="border:none;border-bottom:1px dashed #000;margin:6px 0;">
        <div style="text-align:left;">${f}</div>
        <hr style="border:none;border-bottom:1px dashed #000;margin:6px 0;">
        <p style="text-align:right;font-size:15px;font-weight:bold;">TOTAL: RD$ ${m}</p>
        <hr style="border:none;border-bottom:1px dashed #000;margin:6px 0;">
        <p style="text-align:center;"><strong>PIN OTP DE SEGURIDAD: ${h}</strong><br>*** GRACIAS POR PREFERIRNOS ***</p>
      </div>
    `;let u=document.getElementById("thermal-receipt-print-area");u||(u=document.createElement("div"),u.id="thermal-receipt-print-area",document.body.appendChild(u)),u.innerHTML=`
      <div style="font-family:'Courier New',Courier,monospace;width:58mm;max-width:58mm;margin:0 auto;padding:4px;color:#000;background:#fff;font-size:12px;font-weight:bold;line-height:1.2;">
        ${x}
      </div>
    `,setTimeout(()=>{try{window.print()}catch(p){console.error("Print error:",p)}},100)}catch(e){console.error("Print Engine Global Error:",e)}};function A(){const t=document.getElementById("merchant-coupons-list");if(t){if(o.coupons.length===0){t.innerHTML='<p style="font-size: 12px; color: var(--text-muted);">No has creado cupones propios aún.</p>';return}t.innerHTML=o.coupons.map(e=>`
    <div style="background: #fff3e6; border: 1px solid #ffe0b2; padding: 12px; border-radius: 12px; margin-bottom: 8px; display: flex; justify-content: space-between; align-items: center;">
      <div>
        <span style="font-family: var(--font-heading); font-weight: 900; font-size: 14px; color: var(--brand-mamey);">${e.code}</span>
        <span style="font-size: 11px; color: var(--text-muted); display: block;">RD$ ${e.discount} OFF en compras > RD$ ${e.minSpend}</span>
      </div>
      <span style="font-size: 10px; background: var(--brand-mamey); color: white; padding: 4px 8px; border-radius: 6px; font-weight: 800;">Usado ${e.usageCount||0} veces</span>
    </div>
  `).join("")}}window.handleCreateStoreCoupon=function(t){t.preventDefault();const e=document.getElementById("coupon-code").value.toUpperCase().trim(),n=parseFloat(document.getElementById("coupon-discount").value),i=parseFloat(document.getElementById("coupon-min-spend").value),r={code:e,discount:n,minSpend:i,usageCount:0};o.coupons.unshift(r),y(o),A(),t.target.reset(),alert(`✨ ¡Cupón "${e}" activado con éxito en tu local!`)};function T(){const t=document.getElementById("merchant-reviews-list");t&&(t.innerHTML=o.reviews.map(e=>`
    <div style="background: #f8fafc; border: 1px solid #e2e8f0; padding: 14px; border-radius: 12px; margin-bottom: 12px;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
        <span style="font-weight: 800; font-size: 13px;">${e.clientName}</span>
        <span style="color: var(--accent-gold); font-size: 12px; font-weight: 800;">${"⭐".repeat(e.rating)}</span>
      </div>
      <p style="font-size: 12px; color: var(--text-primary); margin-bottom: 6px;">"${e.comment}"</p>
      
      ${e.reply?`
        <div style="background: #fff3e6; border-left: 3px solid var(--brand-mamey); padding: 8px 10px; border-radius: 6px; font-size: 11px; margin-top: 6px;">
          <strong>Respuesta del Local:</strong> ${e.reply}
        </div>
      `:`
        <div style="margin-top: 8px; display: flex; gap: 6px;">
          <input type="text" id="reply-input-${e.id}" placeholder="Escribe tu respuesta..." style="flex-grow: 1; padding: 6px 10px; border-radius: 8px; border: 1px solid #cbd5e1; font-size: 11px;">
          <button onclick="handleReplyReview('${e.id}')" style="background: var(--brand-mamey); color: white; border: none; padding: 6px 10px; border-radius: 8px; font-weight: 800; font-size: 11px; cursor: pointer;">Responder</button>
        </div>
      `}
    </div>
  `).join(""))}window.handleReplyReview=function(t){const e=document.getElementById(`reply-input-${t}`);if(!e||!e.value.trim())return;const n=o.reviews.find(i=>i.id===t);n&&(n.reply=e.value.trim(),y(o),T(),alert("💬 Respuesta publicada con éxito."))};window.handleSaveBankAccount=function(t){t.preventDefault();const e=document.getElementById("bank-name-select").value,n=document.getElementById("bank-account-num").value,i=document.getElementById("bank-account-holder").value;o.bankAccount={bank:e,number:n,holder:i},y(o),I(),alert(`🏦 Datos bancarios de ${e} guardados con éxito.`)};window.handleSaveStoreSettings=function(t){t.preventDefault();const e=document.getElementById("setting-hours").value,n=document.getElementById("setting-radius").value,i=parseFloat(document.getElementById("setting-min-spend").value);o.settings={hours:e,radiusKm:n,minSpend:i},y(o),alert(`⚙️ Horarios (${e}) y Radio de Entrega (${n}) guardados con éxito.`)};window.switchMerchantTab=function(t){document.querySelectorAll(".merchant-tab-btn").forEach(i=>i.classList.remove("active")),document.querySelectorAll(".merchant-tab-content").forEach(i=>i.classList.remove("active"));const e=document.querySelector(`.merchant-tab-btn[data-tab="${t}"]`);e&&e.classList.add("active");const n=document.getElementById(`tab-${t}`);n&&n.classList.add("active")};window.playNotificationSoundSim=function(){alert(`🔔 [ALERTA AUDIBLE EN VIVO]

¡Simulación de Alerta de Sonido Partner: Nuevo pedido recibido!`)};let $="";window.openEditStoreModal=function(){var i;const t=document.getElementById("edit-store-name"),e=document.getElementById("edit-store-address"),n=document.getElementById("edit-store-phone");t&&(t.value=o.storeName||"KFC Las Colinas Santiago"),e&&(e.value=o.address||"Av. Juan Pablo Duarte #10, Santiago"),n&&(n.value=o.phone||"809-555-0192"),(i=document.getElementById("modal-edit-store"))==null||i.classList.add("active")};window.handleStoreLogoUpload=function(t){if(t.files&&t.files[0]){const e=t.files[0],n=new FileReader;n.onload=function(i){$=i.target.result;const r=document.getElementById("store-logo-preview-box"),a=document.getElementById("store-logo-preview");r&&a&&(a.src=$,r.style.display="flex")},n.readAsDataURL(e)}};window.handleSaveStoreProfile=function(t){var r;t.preventDefault();const e=document.getElementById("edit-store-name").value,n=document.getElementById("edit-store-address").value,i=document.getElementById("edit-store-phone").value;o.storeName=e,o.address=n,o.phone=i,$&&(o.logoImage=$),y(o),I(),(r=document.getElementById("modal-edit-store"))==null||r.classList.remove("active"),alert(`✅ ¡Nombre de tu comercio actualizado a "${e}" con éxito!`)};window.handleStoreStatusChange=function(t){o.status=t,y(o),I()};window.handlePrepTimeChange=function(t){o.prepTime=t,y(o)};let E=new Image,s={brightness:100,contrast:100,saturation:100,rotation:0,watermark:null};window.openPhotoEditorStudio=function(){const t=document.getElementById("prod-img-preview");if(!t||!t.src){alert("Primero sube una foto desde tu equipo.");return}E=new Image,E.crossOrigin="anonymous",E.onload=function(){var e;resetEditorControls(),(e=document.getElementById("modal-photo-editor"))==null||e.classList.add("active"),P()},E.src=S||t.src};window.closePhotoEditorStudio=function(){var t;(t=document.getElementById("modal-photo-editor"))==null||t.classList.remove("active")};window.resetEditorControls=function(){s={brightness:100,contrast:100,saturation:100,rotation:0,watermark:null};const t=document.getElementById("slider-brightness"),e=document.getElementById("slider-saturation"),n=document.getElementById("slider-contrast");t&&(t.value=100),e&&(e.value=100),n&&(n.value=100),P()};window.updateEditorFromSliders=function(){var i,r,a;const t=((i=document.getElementById("slider-brightness"))==null?void 0:i.value)||100,e=((r=document.getElementById("slider-saturation"))==null?void 0:r.value)||100,n=((a=document.getElementById("slider-contrast"))==null?void 0:a.value)||100;s.brightness=parseFloat(t),s.saturation=parseFloat(e),s.contrast=parseFloat(n),P()};window.applyFoodFilterPreset=function(t){t==="criollo"?(s.brightness=110,s.saturation=145,s.contrast=120):t==="hd"?(s.brightness=105,s.saturation=130,s.contrast=135):t==="parrilla"?(s.brightness=95,s.saturation=125,s.contrast=140):t==="fresco"?(s.brightness=115,s.saturation=135,s.contrast=110):t==="dark"?(s.brightness=85,s.saturation=120,s.contrast=145):(s.brightness=100,s.saturation=100,s.contrast=100);const e=document.getElementById("slider-brightness"),n=document.getElementById("slider-saturation"),i=document.getElementById("slider-contrast");e&&(e.value=s.brightness),n&&(n.value=s.saturation),i&&(i.value=s.contrast),P()};window.setEditorWatermark=function(t){s.watermark=t,P()};window.rotateEditorImage=function(){s.rotation=(s.rotation+90)%360,P()};function P(){const t=document.getElementById("editor-canvas");if(!t||!E.width)return;const e=t.getContext("2d"),n=E.width,i=E.height;s.rotation===90||s.rotation===270?(t.width=i,t.height=n):(t.width=n,t.height=i),e.clearRect(0,0,t.width,t.height),e.save(),e.filter=`brightness(${s.brightness}%) contrast(${s.contrast}%) saturate(${s.saturation}%)`,e.translate(t.width/2,t.height/2),e.rotate(s.rotation*Math.PI/180),e.drawImage(E,-n/2,-i/2,n,i),e.restore();const r=s.sticker||s.watermark;if(r){let a="",d="#ff6b00";r==="CHEF"||r==="CHEF_STAR"?(a="⭐ RECOMENDADO DEL CHEF",d="#121829"):r==="CRIOLLO"||r==="FIRE"||r==="SAZON"?(a="🔥 100% CRIOLLO DOMINICANO",d="#ff6b00"):r==="FLASH"||r==="FLASH_DELIVERY"?(a="⚡ OFERTA MÁNDAME FLASH",d="#ef4444"):r==="TOP"||r==="TOP_SELLER"?(a="👑 PATRÓN TOP SELLER",d="#8b5cf6"):r==="CHEESE"?(a="🧀 EXTRA QUESO FUNDIDO",d="#f59e0b"):(a="🔥 "+r,d="#ff6b00"),e.save();const c=Math.max(16,Math.floor(t.width/20));e.font=`900 ${c}px sans-serif`;const f=c*.8,h=e.measureText(a).width+f*2,w=c*1.8,g=t.width-h-20,l=t.height-w-20;e.fillStyle=d,e.shadowColor="rgba(0, 0, 0, 0.5)",e.shadowBlur=12,e.beginPath(),e.roundRect?e.roundRect(g,l,h,w,w/2):e.rect(g,l,h,w),e.fill(),e.fillStyle="#ffffff",e.textAlign="center",e.textBaseline="middle",e.fillText(a,g+h/2,l+w/2),e.restore()}}window.saveEditorResult=function(){const t=document.getElementById("editor-canvas");if(!t)return;S=t.toDataURL("image/jpeg",.92);const e=document.getElementById("prod-img-preview");e&&(e.src=S),window.updateLiveMenuPreview&&window.updateLiveMenuPreview(),closePhotoEditorStudio(),alert("✨ ¡Edición Ultra aplicada con éxito al platillo!")};window.requestExpressRiderAlert=function(){var t;(t=document.getElementById("modal-express-rider"))==null||t.classList.add("active")};window.confirmExpressRiderOrder=function(){var t;(t=document.getElementById("modal-express-rider"))==null||t.classList.remove("active"),alert(`🛵 ¡MOTOR DE APOYO CONFIRMADO!

Repartidor Kelvin Santos en camino a tu cocina. Llegada estimada en 4 minutos.`)};window.openPushBroadcastModal=function(){var t;(t=document.getElementById("modal-push-broadcast"))==null||t.classList.add("active")};window.sendPushBroadcastAlert=function(){var e,n;const t=((e=document.getElementById("input-push-msg"))==null?void 0:e.value)||"Promoción activa";(n=document.getElementById("modal-push-broadcast"))==null||n.classList.remove("active"),alert(`🚀 ¡Notificación Push Enviada con Éxito!

Mensaje enviado a 142 clientes cercanos:
"${t}"`)};window.openQuickFlashModal=function(){var t;(t=document.getElementById("modal-quick-flash"))==null||t.classList.add("active")};window.submitQuickFlashDeal=function(){var r;const t=document.getElementById("select-flash-product"),e=document.getElementById("select-flash-discount"),n=t?t.options[t.selectedIndex].text:"Platillo",i=e?e.value:"50";(r=document.getElementById("modal-quick-flash"))==null||r.classList.remove("active"),alert(`⚡ ¡Oferta Flash Activada!

El plato "${n}" ahora se muestra destacado en el inicio del cliente con ${i}% OFF.`)};window.testThermalPrinterSimulator=function(){printPosTicket("ORD-7719")};window.openSalesReportModal=function(){var t;(t=document.getElementById("modal-sales-report"))==null||t.classList.add("active")};window.downloadPdfReportSimulator=function(){var t;(t=document.getElementById("modal-sales-report"))==null||t.classList.remove("active"),alert("📥 Descargando Reporte Contable de Ventas Pedidos Listo Partner (Formato PDF / Excel)...")};window.openPinConfigModal=function(){var t;(t=document.getElementById("modal-pin-config"))==null||t.classList.add("active")};window.saveNewMerchantPin=function(){var e,n;const t=(e=document.getElementById("input-new-merchant-pin"))==null?void 0:e.value;if(!t||t.length!==4){alert("⚠️ Ingresa un PIN de exactamente 4 dígitos.");return}try{o.employeePin=t,o.pinRequired=!0,y(o)}catch{}(n=document.getElementById("modal-pin-config"))==null||n.classList.remove("active"),alert(`🔒 ¡PIN de Seguridad Actualizado!

El nuevo PIN de acceso para empleados es: ${t}`)};window.focusNewProductForm=function(){var e;const t=document.getElementById("card-form-add-product");t&&(t.scrollIntoView({behavior:"smooth",block:"center"}),(e=document.getElementById("prod-name"))==null||e.focus())};window.triggerEditorPhotoSelect=function(){const t=document.getElementById("prod-file-input");t&&t.click()};window.setEditorSticker=function(t){s.sticker=t,P()};window.updateLiveMenuPreview=function(){var l,v,x;const t=((l=document.getElementById("prod-name"))==null?void 0:l.value)||"Yaroa de Pollo & Queso Mofongo",e=((v=document.getElementById("prod-price"))==null?void 0:v.value)||"450",n=((x=document.getElementById("prod-desc"))==null?void 0:x.value)||"Plátano majado con ajo criollo, chicharrón crocante y salsa especial.";let i=S;if(!i){const u=document.getElementById("prod-img-preview");u&&u.src&&!u.src.endsWith("#")&&u.style.display!=="none"&&(i=u.src)}i||(i="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80");const r=document.getElementById("preview-live-title"),a=document.getElementById("preview-live-price"),d=document.getElementById("preview-live-desc"),c=document.getElementById("preview-live-img"),f=document.getElementById("preview-live-options-tags");r&&(r.innerText=t),a&&(a.innerText=`RD$ ${e}`),d&&(d.innerText=n),c&&(c.src=i);const m=document.querySelectorAll('input[name="opt-guarnicion"]:checked').length,h=document.querySelectorAll('input[name="opt-bebida"]:checked').length,w=document.querySelectorAll('input[name="opt-extra"]:checked').length,g=Array.from(document.querySelectorAll('input[name="tag-dietary"]:checked')).map(u=>u.value);if(f){let u="";g.length>0&&(u+=g.map(p=>`<span style="font-size: 9px; font-weight: 800; background: #e0f2fe; color: #0369a1; padding: 2px 6px; border-radius: 4px;">${p}</span>`).join(" ")+" "),u+=`
      <span style="font-size: 9px; font-weight: 800; background: #fff3e6; color: var(--brand-mamey); padding: 2px 6px; border-radius: 4px;">🍟 ${m} Guarniciones</span>
      <span style="font-size: 9px; font-weight: 800; background: #e0f2fe; color: #0284c7; padding: 2px 6px; border-radius: 4px;">🥤 ${h} Bebidas</span>
      <span style="font-size: 9px; font-weight: 800; background: #fef3c7; color: #d97706; padding: 2px 6px; border-radius: 4px;">🥓 ${w} Extras</span>
    `,f.innerHTML=u}};window.simulateClientModalClick=function(){var d,c,f;const t=((d=document.getElementById("prod-name"))==null?void 0:d.value)||"Yaroa de Pollo & Queso Mofongo",e=((c=document.getElementById("prod-price"))==null?void 0:c.value)||"450",n=((f=document.getElementById("prod-desc"))==null?void 0:f.value)||"Plátano majado con ajo criollo, chicharrón crocante y salsa especial.",i=Array.from(document.querySelectorAll('input[name="opt-guarnicion"]:checked')).map(m=>m.value),r=Array.from(document.querySelectorAll('input[name="opt-bebida"]:checked')).map(m=>m.value),a=Array.from(document.querySelectorAll('input[name="opt-extra"]:checked')).map(m=>m.value);alert(`📱 VISTA PREVIA DEL MODAL DE PERSONALIZACIÓN DEL CLIENTE:

🍔 Platillo: ${t}
💰 Precio Base: RD$ ${e}
📝 Nota: ${n}

🍟 Guarniciones Elegibles:
- ${i.join(`
- `)||"Ninguna"}

🥤 Bebidas Disponibles:
- ${r.join(`
- `)||"Ninguna"}

🥓 Extras & Salsas:
- ${a.join(`
- `)||"Ninguno"}

¡Así es como tus clientes personalizarán su pedido al ordenar en Pedidos Listo!`)};window.openSingleStoreView=function(){localStorage.setItem("pedidos_listo_active_view_mode","single_store"),window.location.href="index.html?view=single_store"};window.openFullAppView=function(){localStorage.setItem("pedidos_listo_active_view_mode","marketplace"),window.location.href="index.html?view=marketplace"};
