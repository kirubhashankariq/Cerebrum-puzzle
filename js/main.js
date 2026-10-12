/**
 * CEREBRUM & CO. - Puzzle & Brain Game Specialty Store
 * Core Application Logic (Theme, RTL, Mobile Nav, Toast, Complete Cart & Checkout)
 * Strictly Vanilla JavaScript
 */

(function () {
  'use strict';

  // --- LOCAL STORAGE KEYS ---
  const THEME_KEY = 'cerebrum_theme';
  const DIR_KEY = 'cerebrum_direction';
  const CART_KEY = 'cerebrum_cart_items';
  const PROMO_KEY = 'cerebrum_applied_promo';

  let appliedDiscount = 0; // percentage e.g. 0.15 for 15%
  let appliedPromoCode = '';
  let selectedShippingCost = 0; // 0 for standard, 14 for express
  let currentCheckoutStep = 1;

  // --- THEME MANAGEMENT ---
  function initTheme() {
    const savedTheme = localStorage.getItem(THEME_KEY);
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const isDark = savedTheme ? savedTheme === 'dark' : prefersDark;

    if (isDark) {
      document.documentElement.classList.add('dark');
      document.documentElement.style.backgroundColor = '#0B0F19';
      document.documentElement.style.colorScheme = 'dark';
      if (document.body) document.body.style.backgroundColor = '#0B0F19';
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.style.backgroundColor = '#FFFFFF';
      document.documentElement.style.colorScheme = 'light';
      if (document.body) document.body.style.backgroundColor = '#FFFFFF';
    }
    updateThemeIcons(isDark);
  }

  function toggleTheme() {
    const isDark = document.documentElement.classList.toggle('dark');
    localStorage.setItem(THEME_KEY, isDark ? 'dark' : 'light');
    document.documentElement.style.backgroundColor = isDark ? '#0B0F19' : '#FFFFFF';
    document.documentElement.style.colorScheme = isDark ? 'dark' : 'light';
    if (document.body) {
      document.body.style.backgroundColor = isDark ? '#0B0F19' : '#FFFFFF';
    }
    updateThemeIcons(isDark);
    window.showToast(isDark ? 'Dark mode enabled' : 'Light mode enabled', 'info', 'Theme Updated');
  }

  function updateThemeIcons(isDark) {
    const themeButtons = document.querySelectorAll('.theme-toggle-btn');
    themeButtons.forEach((btn) => {
      const sunIcon = btn.querySelector('.icon-sun');
      const moonIcon = btn.querySelector('.icon-moon');
      const label = btn.querySelector('.theme-label');
      if (sunIcon && moonIcon) {
        if (isDark) {
          sunIcon.classList.remove('hidden');
          moonIcon.classList.add('hidden');
        } else {
          sunIcon.classList.add('hidden');
          moonIcon.classList.remove('hidden');
        }
      }
      if (label) {
        label.textContent = isDark ? 'Light' : 'Dark';
      }
      btn.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
      btn.setAttribute('title', isDark ? 'Switch to light mode' : 'Switch to dark mode');
    });
  }

  // --- DIRECTION (RTL / LTR) MANAGEMENT ---
  function initDirection() {
    const savedDir = localStorage.getItem(DIR_KEY) || 'ltr';
    document.documentElement.setAttribute('dir', savedDir);
    updateDirectionLabels(savedDir);
  }

  function toggleDirection() {
    const currentDir = document.documentElement.getAttribute('dir') || 'ltr';
    const nextDir = currentDir === 'ltr' ? 'rtl' : 'ltr';
    document.documentElement.setAttribute('dir', nextDir);
    localStorage.setItem(DIR_KEY, nextDir);
    updateDirectionLabels(nextDir);
    window.showToast(nextDir.toUpperCase() + ' direction enabled', 'info', 'Layout Direction');
  }

  function updateDirectionLabels(dir) {
    const dirButtons = document.querySelectorAll('.rtl-toggle-btn');
    dirButtons.forEach((btn) => {
      const label = btn.querySelector('.rtl-label');
      if (label) {
        label.textContent = dir === 'rtl' ? 'LTR' : 'RTL';
      }
      const titleText = dir === 'rtl' ? 'Switch to LTR layout' : 'Switch to RTL layout';
      btn.setAttribute('aria-label', titleText);
      btn.setAttribute('title', titleText);
    });
  }

  // --- MOBILE NAVIGATION (STRICTLY BELOW 1024PX) ---
  function initMobileMenu() {
    const hamburgerBtn = document.getElementById('mobile-menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu-drawer');
    const closeBtn = document.getElementById('mobile-menu-close');
    const backdrop = document.getElementById('mobile-menu-backdrop');

    if (!hamburgerBtn || !mobileMenu) return;

    function openMenu() {
      mobileMenu.classList.remove('hidden');
      if (backdrop) backdrop.classList.remove('hidden');
      document.body.classList.add('overflow-hidden');
    }

    function closeMenu() {
      mobileMenu.classList.add('hidden');
      if (backdrop) backdrop.classList.add('hidden');
      document.body.classList.remove('overflow-hidden');
    }

    hamburgerBtn.addEventListener('click', openMenu);
    if (closeBtn) closeBtn.addEventListener('click', closeMenu);
    if (backdrop) backdrop.addEventListener('click', closeMenu);

    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach((link) => {
      link.addEventListener('click', closeMenu);
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth >= 1024 && !mobileMenu.classList.contains('hidden')) {
        closeMenu();
      }
    });
  }

  // --- ACTIVE LINK HIGHLIGHTING ---
  function highlightActiveLink() {
    const pathname = window.location.pathname;
    let pageName = pathname.substring(pathname.lastIndexOf('/') + 1);

    if (pageName.includes('?')) pageName = pageName.split('?')[0];
    if (pageName.includes('#')) pageName = pageName.split('#')[0];

    // Normalize root path to index.html
    if (!pageName || pageName === '' || pageName === '/') {
      pageName = 'index.html';
    }

    const navLinks = document.querySelectorAll('.nav-link-item');
    navLinks.forEach((link) => {
      const href = link.getAttribute('href');
      let linkPage = href ? href.split('?')[0].split('#')[0] : '';
      if (linkPage.startsWith('./')) linkPage = linkPage.substring(2);

      const isActive = (linkPage === pageName) ||
                       (pageName === 'index.html' && (linkPage === '' || linkPage === 'index.html'));

      if (isActive) {
        link.classList.add('active');
        link.setAttribute('aria-current', 'page');
      } else {
        link.classList.remove('active');
        link.removeAttribute('aria-current');
      }
    });
  }

  // --- TOAST NOTIFICATION SYSTEM ---
  window.showToast = function (message, type = 'info', title = '') {
    let container = document.getElementById('toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    
    let iconSvg = '';
    if (type === 'success') {
      iconSvg = `<svg class="w-5 h-5 text-emerald-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>`;
    } else if (type === 'error') {
      iconSvg = `<svg class="w-5 h-5 text-red-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>`;
    } else {
      iconSvg = `<svg class="w-5 h-5 text-amber-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>`;
    }

    toast.innerHTML = `
      ${iconSvg}
      <div class="flex-1 min-w-0">
        ${title ? `<p class="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-100 mb-0.5">${title}</p>` : ''}
        <p class="text-sm font-medium text-slate-800 dark:text-slate-200 leading-snug">${message}</p>
      </div>
      <button class="text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 text-lg leading-none p-1 focus:outline-none" aria-label="Close notification">&times;</button>
    `;

    const closeBtn = toast.querySelector('button');
    closeBtn.addEventListener('click', () => {
      toast.remove();
    });

    container.appendChild(toast);

    setTimeout(() => {
      if (toast.parentElement) {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(10px)';
        toast.style.transition = 'all 0.25s ease';
        setTimeout(() => toast.remove(), 250);
      }
    }, 4000);
  };

  // --- CART STATE MANAGEMENT ---
  function getCart() {
    try {
      return JSON.parse(localStorage.getItem(CART_KEY)) || [];
    } catch (e) {
      return [];
    }
  }

  function saveCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    updateCartBadges();
    renderCartModal();
  }

  window.addToCart = function (id, name, price, image, difficulty) {
    const cart = getCart();
    const existing = cart.find(item => item.id === id);
    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({
        id: id,
        name: name,
        price: parseFloat(price),
        image: image || '',
        difficulty: difficulty || 'Hard',
        quantity: 1
      });
    }
    saveCart(cart);
    window.showToast(`"${name}" added to your collection!`, 'success', 'Cart Updated');
  };

  window.addToCartFromCard = function (btn, id, name, price, difficulty) {
    const container = btn.closest('article') || btn.closest('.flat-card') || btn.closest('div');
    const img = container ? container.querySelector('img') : null;
    const imgSrc = img ? (img.getAttribute('src') || img.src) : '';
    window.addToCart(id, name, price, imgSrc, difficulty);
  };

  window.changeQuantity = function (id, delta) {
    const cart = getCart();
    const item = cart.find(i => i.id === id);
    if (!item) return;

    item.quantity += delta;
    if (item.quantity <= 0) {
      window.removeFromCart(id);
      return;
    }
    saveCart(cart);
  };

  window.removeFromCart = function (id) {
    let cart = getCart();
    cart = cart.filter(item => item.id !== id);
    saveCart(cart);
    window.showToast('Item removed from trunk', 'info', 'Cart Updated');
  };

  function updateCartBadges() {
    const cart = getCart();
    const totalCount = cart.reduce((acc, item) => acc + item.quantity, 0);
    const badges = document.querySelectorAll('.cart-count-badge');
    badges.forEach(b => {
      b.textContent = totalCount;
    });
  }

  // --- CART & CHECKOUT RENDERING ENGINE ---
  function renderCartModal() {
    const modalItemsContainer = document.getElementById('cart-modal-items');
    const subtotalEl = document.getElementById('cart-subtotal-val');
    const discountEl = document.getElementById('cart-discount-val');
    const shippingEl = document.getElementById('cart-shipping-val');
    const totalEl = document.getElementById('cart-modal-total');
    const checkoutFinalTotal = document.getElementById('checkout-final-total');
    const proceedBtn = document.getElementById('cart-proceed-btn');

    if (!modalItemsContainer) return;

    const cart = getCart();

    if (cart.length === 0) {
      modalItemsContainer.innerHTML = `
        <div class="py-12 text-center text-slate-500 dark:text-slate-400">
          <svg class="w-12 h-12 mx-auto mb-3 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/></svg>
          <p class="font-bold text-base text-slate-800 dark:text-slate-200">Your puzzle trunk is empty.</p>
          <p class="text-xs mt-1 max-w-xs mx-auto">Explore our cast metal burrs, wooden boxes, and speed cubes to begin solving.</p>
          <a href="products.html" class="btn-primary inline-flex mt-4 !py-2 !px-4 text-xs">Browse Specialty Catalog</a>
        </div>
      `;
      if (subtotalEl) subtotalEl.textContent = '$0.00';
      if (discountEl) discountEl.textContent = '-$0.00';
      if (shippingEl) shippingEl.textContent = 'FREE';
      if (totalEl) totalEl.textContent = '$0.00';
      if (checkoutFinalTotal) checkoutFinalTotal.textContent = '$0.00';
      if (proceedBtn) {
        proceedBtn.disabled = true;
        proceedBtn.classList.add('opacity-50', 'cursor-not-allowed');
      }
      return;
    }

    if (proceedBtn) {
      proceedBtn.disabled = false;
      proceedBtn.classList.remove('opacity-50', 'cursor-not-allowed');
    }

    let rawSubtotal = 0;
    modalItemsContainer.innerHTML = cart.map(item => {
      const lineTotal = item.price * item.quantity;
      rawSubtotal += lineTotal;
      return `
        <div class="flex items-center gap-3 sm:gap-4 py-3.5">
          <img src="${item.image}" alt="${item.name}" class="w-14 h-14 sm:w-16 sm:h-16 object-cover border border-theme flex-shrink-0" />
          <div class="flex-1 min-w-0">
            <h4 class="text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100 truncate">${item.name}</h4>
            <div class="flex items-center gap-2 mt-1 text-xs">
              <span class="font-bold text-amber-700 dark:text-amber-400">$${item.price.toFixed(2)}</span>
              <span class="text-slate-400">•</span>
              <span class="text-slate-500">${item.difficulty} Tier</span>
            </div>
            <!-- Quantity Increment / Decrement Controls -->
            <div class="flex items-center gap-1.5 mt-2">
              <button onclick="window.changeQuantity('${item.id}', -1)" class="w-6 h-6 border border-theme flex items-center justify-center font-bold text-xs hover:bg-slate-200 dark:hover:bg-slate-800" aria-label="Decrease quantity">−</button>
              <span class="w-8 text-center text-xs font-bold text-slate-900 dark:text-slate-100">${item.quantity}</span>
              <button onclick="window.changeQuantity('${item.id}', 1)" class="w-6 h-6 border border-theme flex items-center justify-center font-bold text-xs hover:bg-slate-200 dark:hover:bg-slate-800" aria-label="Increase quantity">+</button>
            </div>
          </div>
          <div class="text-right flex-shrink-0">
            <p class="text-xs sm:text-sm font-black text-slate-900 dark:text-slate-100">$${lineTotal.toFixed(2)}</p>
            <button onclick="window.removeFromCart('${item.id}')" class="text-[11px] font-semibold text-red-600 hover:text-red-700 mt-2 block ml-auto">Remove</button>
          </div>
        </div>
      `;
    }).join('');

    // Calculate totals
    const discountAmount = rawSubtotal * appliedDiscount;
    const finalTotal = Math.max(0, rawSubtotal - discountAmount + selectedShippingCost);

    if (subtotalEl) subtotalEl.textContent = `$${rawSubtotal.toFixed(2)}`;
    if (discountEl) discountEl.textContent = `-$${discountAmount.toFixed(2)} ${appliedDiscount > 0 ? '(15% Off)' : ''}`;
    if (shippingEl) shippingEl.textContent = selectedShippingCost > 0 ? `$${selectedShippingCost.toFixed(2)}` : 'FREE';
    if (totalEl) totalEl.textContent = `$${finalTotal.toFixed(2)}`;
    if (checkoutFinalTotal) checkoutFinalTotal.textContent = `$${finalTotal.toFixed(2)}`;
  }

  // --- CHECKOUT STEP TRANSITIONS ---
  function setCheckoutStep(step) {
    currentCheckoutStep = step;
    const stepItems = document.getElementById('cart-step-items');
    const stepForm = document.getElementById('checkout-form');
    const stepReceipt = document.getElementById('cart-step-receipt');

    const tab1 = document.getElementById('step-tab-1');
    const tab2 = document.getElementById('step-tab-2');
    const tab3 = document.getElementById('step-tab-3');

    // Update visibility
    if (step === 1) {
      if (stepItems) stepItems.classList.remove('hidden');
      if (stepForm) stepForm.classList.add('hidden');
      if (stepReceipt) stepReceipt.classList.add('hidden');

      if (tab1) tab1.className = 'py-2.5 border-b-2 border-amber-600 text-amber-700 dark:text-amber-400 font-extrabold';
      if (tab2) tab2.className = 'py-2.5 border-b-2 border-transparent text-slate-400';
      if (tab3) tab3.className = 'py-2.5 border-b-2 border-transparent text-slate-400';
    } else if (step === 2) {
      if (stepItems) stepItems.classList.add('hidden');
      if (stepForm) stepForm.classList.remove('hidden');
      if (stepReceipt) stepReceipt.classList.add('hidden');

      if (tab1) tab1.className = 'py-2.5 border-b-2 border-transparent text-slate-500';
      if (tab2) tab2.className = 'py-2.5 border-b-2 border-amber-600 text-amber-700 dark:text-amber-400 font-extrabold';
      if (tab3) tab3.className = 'py-2.5 border-b-2 border-transparent text-slate-400';
    } else if (step === 3) {
      if (stepItems) stepItems.classList.add('hidden');
      if (stepForm) stepForm.classList.add('hidden');
      if (stepReceipt) stepReceipt.classList.remove('hidden');

      if (tab1) tab1.className = 'py-2.5 border-b-2 border-transparent text-slate-400';
      if (tab2) tab2.className = 'py-2.5 border-b-2 border-transparent text-slate-400';
      if (tab3) tab3.className = 'py-2.5 border-b-2 border-emerald-600 text-emerald-700 dark:text-emerald-400 font-extrabold';
    }
  }

  // --- CHECKOUT STRICT FORM VALIDATION & LOGIC ---
  function initCheckoutFormLogic() {
    const form = document.getElementById('checkout-form');
    if (!form) return;

    const nameInput = document.getElementById('checkout-name');
    const emailInput = document.getElementById('checkout-email');
    const phoneInput = document.getElementById('checkout-phone');
    const addressInput = document.getElementById('checkout-address');
    const cityInput = document.getElementById('checkout-city');
    const zipInput = document.getElementById('checkout-zip');

    // Strict Name Validation: Block numbers
    if (nameInput) {
      nameInput.addEventListener('keydown', (e) => {
        if (['Backspace', 'Delete', 'Tab', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Enter', 'Escape'].includes(e.key)) return;
        if (e.ctrlKey || e.metaKey) return;
        if (/[0-9]/.test(e.key)) {
          e.preventDefault();
          window.showToast('Numbers are forbidden in recipient name.', 'error', 'Invalid Character');
        }
      });
      nameInput.addEventListener('input', (e) => {
        const cleaned = e.target.value.replace(/[0-9]/g, '');
        if (cleaned !== e.target.value) {
          e.target.value = cleaned;
          window.showToast('Numbers were automatically removed.', 'error', 'Sanitized');
        }
      });
    }

    // Strict Phone Validation: Block letters
    if (phoneInput) {
      phoneInput.addEventListener('keydown', (e) => {
        if (['Backspace', 'Delete', 'Tab', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Enter', 'Escape'].includes(e.key)) return;
        if (e.ctrlKey || e.metaKey) return;
        if (/[a-zA-Z]/.test(e.key)) {
          e.preventDefault();
          window.showToast('Letters are forbidden in phone number.', 'error', 'Invalid Character');
        }
      });
      phoneInput.addEventListener('input', (e) => {
        const cleaned = e.target.value.replace(/[a-zA-Z]/g, '');
        if (cleaned !== e.target.value) {
          e.target.value = cleaned;
          window.showToast('Letters were automatically removed.', 'error', 'Sanitized');
        }
      });
    }

    // Payment Method Switching Tabs
    let selectedPaymentMethod = 'card';
    const cardBtn = document.getElementById('pay-method-card');
    const paypalBtn = document.getElementById('pay-method-paypal');
    const wireBtn = document.getElementById('pay-method-wire');

    const cardPanel = document.getElementById('card-payment-panel');
    const paypalPanel = document.getElementById('paypal-payment-panel');
    const wirePanel = document.getElementById('wire-payment-panel');

    function selectPaymentTab(method) {
      selectedPaymentMethod = method;
      [cardBtn, paypalBtn, wireBtn].forEach(b => {
        if (!b) return;
        b.classList.remove('border-2', 'border-amber-600', 'bg-theme-primary', 'text-slate-900', 'dark:text-slate-100');
        b.classList.add('border', 'border-theme', 'bg-theme-secondary', 'text-slate-600', 'dark:text-slate-400');
      });

      if (cardPanel) cardPanel.classList.add('hidden');
      if (paypalPanel) paypalPanel.classList.add('hidden');
      if (wirePanel) wirePanel.classList.add('hidden');

      if (method === 'card') {
        if (cardBtn) cardBtn.classList.add('border-2', 'border-amber-600', 'bg-theme-primary', 'text-slate-900', 'dark:text-slate-100');
        if (cardPanel) cardPanel.classList.remove('hidden');
      } else if (method === 'paypal') {
        if (paypalBtn) paypalBtn.classList.add('border-2', 'border-amber-600', 'bg-theme-primary', 'text-slate-900', 'dark:text-slate-100');
        if (paypalPanel) paypalPanel.classList.remove('hidden');
      } else if (method === 'wire') {
        if (wireBtn) wireBtn.classList.add('border-2', 'border-amber-600', 'bg-theme-primary', 'text-slate-900', 'dark:text-slate-100');
        if (wirePanel) wirePanel.classList.remove('hidden');
      }
    }

    if (cardBtn) cardBtn.addEventListener('click', () => selectPaymentTab('card'));
    if (paypalBtn) paypalBtn.addEventListener('click', () => selectPaymentTab('paypal'));
    if (wireBtn) wireBtn.addEventListener('click', () => selectPaymentTab('wire'));

    // Card formatting helpers
    const cardNumInput = document.getElementById('card-number');
    const cardExpInput = document.getElementById('card-exp');
    const cardCvvInput = document.getElementById('card-cvv');
    const cardHolderInput = document.getElementById('card-holder');

    if (cardNumInput) {
      cardNumInput.addEventListener('input', (e) => {
        let v = e.target.value.replace(/\D/g, '').substring(0, 16);
        let parts = [];
        for (let i = 0; i < v.length; i += 4) {
          parts.push(v.substring(i, i + 4));
        }
        e.target.value = parts.join(' ');
      });
    }

    if (cardExpInput) {
      cardExpInput.addEventListener('input', (e) => {
        let v = e.target.value.replace(/\D/g, '').substring(0, 4);
        if (v.length >= 3) {
          e.target.value = v.substring(0, 2) + '/' + v.substring(2);
        } else {
          e.target.value = v;
        }
      });
    }

    if (cardHolderInput) {
      cardHolderInput.addEventListener('input', (e) => {
        e.target.value = e.target.value.replace(/[0-9]/g, '');
      });
    }

    // Shipping radio calculation
    const shippingRadios = document.querySelectorAll('input[name="shipping_method"]');
    shippingRadios.forEach(r => {
      r.addEventListener('change', (e) => {
        selectedShippingCost = e.target.value === 'express' ? 14.00 : 0.00;
        renderCartModal();
      });
    });

    // Form Submission & Order Placement
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameVal = nameInput ? nameInput.value.trim() : '';
      const emailVal = emailInput ? emailInput.value.trim() : '';
      const phoneVal = phoneInput ? phoneInput.value.trim() : '';
      const addressVal = addressInput ? addressInput.value.trim() : '';
      const cityVal = cityInput ? cityInput.value.trim() : '';
      const zipVal = zipInput ? zipInput.value.trim() : '';

      // Validate Name
      if (!nameVal || nameVal.length < 2 || /[0-9]/.test(nameVal)) {
        window.showToast('Please provide a valid recipient name (letters only).', 'error', 'Address Error');
        if (nameInput) nameInput.focus();
        return;
      }

      // Validate Email (Strict Regex)
      const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
      if (!emailRegex.test(emailVal)) {
        window.showToast('Please provide a valid email for shipment tracking.', 'error', 'Address Error');
        if (emailInput) emailInput.focus();
        return;
      }

      // Validate Phone (at least 7 digits)
      const digitCount = (phoneVal.match(/\d/g) || []).length;
      if (digitCount < 7 || /[a-zA-Z]/.test(phoneVal)) {
        window.showToast('Please enter a valid phone number (digits only, min 7 digits).', 'error', 'Address Error');
        if (phoneInput) phoneInput.focus();
        return;
      }

      // Validate Street Address & City
      if (!addressVal || addressVal.length < 4) {
        window.showToast('Please enter a valid street delivery address.', 'error', 'Address Error');
        if (addressInput) addressInput.focus();
        return;
      }
      if (!cityVal || !zipVal) {
        window.showToast('Please enter city and postal code.', 'error', 'Address Error');
        return;
      }

      // Validate Payment Details if card selected
      if (selectedPaymentMethod === 'card') {
        const rawCard = cardNumInput ? cardNumInput.value.replace(/\s/g, '') : '';
        const expVal = cardExpInput ? cardExpInput.value.trim() : '';
        const cvvVal = cardCvvInput ? cardCvvInput.value.trim() : '';

        if (rawCard.length < 15) {
          window.showToast('Please enter a valid 16-digit payment card number.', 'error', 'Payment Error');
          if (cardNumInput) cardNumInput.focus();
          return;
        }
        if (!/^\d{2}\/\d{2}$/.test(expVal)) {
          window.showToast('Card expiry must be in MM/YY format.', 'error', 'Payment Error');
          if (cardExpInput) cardExpInput.focus();
          return;
        }
        if (cvvVal.length < 3) {
          window.showToast('Please enter a valid 3-4 digit CVV security code.', 'error', 'Payment Error');
          if (cardCvvInput) cardCvvInput.focus();
          return;
        }
      }

      // ORDER SUCCESS CONFIRMATION
      const cart = getCart();
      const rawSubtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      const discount = rawSubtotal * appliedDiscount;
      const chargedAmount = Math.max(0, rawSubtotal - discount + selectedShippingCost);

      const randomOrderId = 'CRB-2026-' + Math.floor(10000 + Math.random() * 90000);

      // Populate Receipt Elements
      const receiptOrderEl = document.getElementById('receipt-order-id');
      const receiptAmountEl = document.getElementById('receipt-amount-paid');
      const receiptNameEl = document.getElementById('receipt-customer-name');

      if (receiptOrderEl) receiptOrderEl.textContent = randomOrderId;
      if (receiptAmountEl) receiptAmountEl.textContent = `$${chargedAmount.toFixed(2)}`;
      if (receiptNameEl) receiptNameEl.textContent = nameVal;

      // Clear cart
      saveCart([]);
      setCheckoutStep(3);
      window.showToast(`Order ${randomOrderId} successfully placed! Confirmation dispatched.`, 'success', 'Order Confirmed');
    });
  }

  function initCartModalEvents() {
    const openBtns = document.querySelectorAll('.open-cart-btn');
    const modal = document.getElementById('cart-modal');
    const closeBtn = document.getElementById('cart-modal-close');
    const clearBtn = document.getElementById('cart-clear-btn');
    const proceedBtn = document.getElementById('cart-proceed-btn');
    const backBtn = document.getElementById('back-to-items-btn');
    const receiptCloseBtn = document.getElementById('receipt-close-btn');
    const promoApplyBtn = document.getElementById('cart-promo-apply-btn');
    const promoInput = document.getElementById('cart-promo-input');

    if (!modal) return;

    openBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        setCheckoutStep(1);
        renderCartModal();
        modal.classList.remove('hidden');
        document.body.classList.add('overflow-hidden');
      });
    });

    function closeModal() {
      modal.classList.add('hidden');
      document.body.classList.remove('overflow-hidden');
      setCheckoutStep(1);
    }

    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (receiptCloseBtn) receiptCloseBtn.addEventListener('click', closeModal);

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal();
      }
    });

    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        saveCart([]);
        window.showToast('Trunk has been cleared', 'info');
      });
    }

    if (proceedBtn) {
      proceedBtn.addEventListener('click', () => {
        const cart = getCart();
        if (cart.length === 0) {
          window.showToast('Your trunk is empty. Select a puzzle first!', 'error', 'Cart Empty');
          return;
        }
        setCheckoutStep(2);
      });
    }

    if (backBtn) {
      backBtn.addEventListener('click', () => {
        setCheckoutStep(1);
      });
    }

    // Promo Code Handler
    if (promoApplyBtn && promoInput) {
      promoApplyBtn.addEventListener('click', () => {
        const code = promoInput.value.trim().toUpperCase();
        if (code === 'CEREBRUM15') {
          appliedDiscount = 0.15;
          appliedPromoCode = 'CEREBRUM15';
          renderCartModal();
          window.showToast('15% VIP Society discount applied to your order!', 'success', 'Promo Code Applied');
        } else if (code === '') {
          appliedDiscount = 0;
          renderCartModal();
        } else {
          window.showToast('Invalid promo code. Did you solve the Weekly Riddle?', 'error', 'Invalid Code');
        }
      });
    }

    initCheckoutFormLogic();
  }

  // --- FOOTER NEWSLETTER VALIDATION ---
  function initFooterNewsletter() {
    const forms = document.querySelectorAll('.newsletter-form');
    forms.forEach(form => {
      const emailInput = form.querySelector('input[type="email"]');
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        if (!emailInput) return;
        const email = emailInput.value.trim();
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(email)) {
          window.showToast('Please enter a valid email address (e.g., solver@domain.com)', 'error', 'Invalid Email');
          emailInput.classList.add('is-invalid');
          return;
        }
        emailInput.classList.remove('is-invalid');
        emailInput.classList.add('is-valid');
        window.showToast('Welcome to the VIP Brain Solver Society! Check your inbox for the welcome riddle.', 'success', 'Subscribed');
        form.reset();
        setTimeout(() => emailInput.classList.remove('is-valid'), 3000);
      });
    });
  }

  // Immediate synchronous execution upon script evaluation
  initTheme();
  initDirection();

  // --- DOM READY INITIALIZATION ---
  document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initDirection();
    initMobileMenu();
    highlightActiveLink();
    updateCartBadges();
    initCartModalEvents();
    initFooterNewsletter();

    // Attach theme toggle listeners across all buttons
    document.querySelectorAll('.theme-toggle-btn').forEach(btn => {
      btn.addEventListener('click', toggleTheme);
    });

    // Attach RTL toggle listeners across all buttons
    document.querySelectorAll('.rtl-toggle-btn').forEach(btn => {
      btn.addEventListener('click', toggleDirection);
    });
  });

})();
