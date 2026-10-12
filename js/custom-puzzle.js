/**
 * CEREBRUM & CO. - Custom Photo Puzzle Builder & Strict Form Validation
 * Vanilla JavaScript Implementation
 */

(function () {
  'use strict';

  // Config & State
  const PIECE_OPTIONS = {
    '100': { price: 39.00, days: 3, dims: '8" × 10" (20 × 25 cm)', desc: 'Ideal for beginners and young solvers' },
    '500': { price: 59.00, days: 4, dims: '18" × 24" (46 × 61 cm)', desc: 'Balanced weekend family challenge' },
    '1000': { price: 89.00, days: 5, dims: '20" × 28" (51 × 71 cm)', desc: 'The gold standard for enthusiast collectors' },
    '2000': { price: 139.00, days: 7, dims: '29" × 39" (74 × 99 cm)', desc: 'Masterclass grandeur with micro-cut interlocking' }
  };

  const BOX_OPTIONS = {
    'matte-tin': { price: 0.00, label: 'Collector Matte Tin' },
    'mahogany': { price: 25.00, label: 'Handcrafted Mahogany Chest (+ $25)' },
    'book-box': { price: 15.00, label: 'Luxury Archival Book Box (+ $15)' }
  };

  let currentPieceCount = '1000';
  let currentBoxType = 'matte-tin';
  let currentImageUrl = '';

  function updatePricing() {
    const basePrice = PIECE_OPTIONS[currentPieceCount].price;
    const boxAddon = BOX_OPTIONS[currentBoxType].price;
    const total = basePrice + boxAddon;

    const priceElem = document.getElementById('custom-calc-price');
    const dimsElem = document.getElementById('custom-calc-dims');
    const timeElem = document.getElementById('custom-calc-time');
    const piecesElem = document.getElementById('custom-calc-pieces');

    if (priceElem) priceElem.textContent = `$${total.toFixed(2)}`;
    if (dimsElem) dimsElem.textContent = PIECE_OPTIONS[currentPieceCount].dims;
    if (timeElem) timeElem.textContent = `${PIECE_OPTIONS[currentPieceCount].days} Business Days`;
    if (piecesElem) piecesElem.textContent = `${currentPieceCount} Laser-Cut Pieces`;
  }

  function setupStrictValidation(form) {
    if (!form) return;

    const nameInput = form.querySelector('[name="customer_name"]');
    const phoneInput = form.querySelector('[name="customer_phone"]');
    const emailInput = form.querySelector('[name="customer_email"]');

    // 1. NAME FIELD: Block all numbers. If a user types a number, it must NOT appear.
    if (nameInput) {
      nameInput.addEventListener('keydown', (e) => {
        // Allow control and navigation keys
        if (['Backspace', 'Delete', 'Tab', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Enter', 'Escape'].includes(e.key)) {
          return;
        }
        if (e.ctrlKey || e.metaKey) return;

        // Block all numbers
        if (/[0-9]/.test(e.key)) {
          e.preventDefault();
          window.showToast('Numbers are strictly prohibited in the Name field.', 'error', 'Invalid Character');
        }
      });

      nameInput.addEventListener('input', (e) => {
        const original = e.target.value;
        const cleaned = original.replace(/[0-9]/g, '');
        if (cleaned !== original) {
          e.target.value = cleaned;
          window.showToast('Numbers were automatically removed.', 'error', 'Sanitized');
        }
        validateName(nameInput);
      });
    }

    // 2. PHONE FIELD: Block all letters. Only valid phone number formats allowed.
    if (phoneInput) {
      phoneInput.addEventListener('keydown', (e) => {
        if (['Backspace', 'Delete', 'Tab', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Enter', 'Escape'].includes(e.key)) {
          return;
        }
        if (e.ctrlKey || e.metaKey) return;

        // Block all letters
        if (/[a-zA-Z]/.test(e.key)) {
          e.preventDefault();
          window.showToast('Letters are strictly prohibited in the Phone field.', 'error', 'Invalid Character');
        }
      });

      phoneInput.addEventListener('input', (e) => {
        const original = e.target.value;
        const cleaned = original.replace(/[a-zA-Z]/g, '');
        if (cleaned !== original) {
          e.target.value = cleaned;
          window.showToast('Letters were automatically removed.', 'error', 'Sanitized');
        }
        validatePhone(phoneInput);
      });
    }

    // 3. EMAIL FIELD: Must validate with strict Regex before allowing submission.
    if (emailInput) {
      emailInput.addEventListener('input', () => {
        validateEmail(emailInput);
      });
      emailInput.addEventListener('blur', () => {
        validateEmail(emailInput);
      });
    }

    // Form Submit Listener
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const isNameValid = validateName(nameInput);
      const isPhoneValid = validatePhone(phoneInput);
      const isEmailValid = validateEmail(emailInput);

      if (!isNameValid || !isPhoneValid || !isEmailValid) {
        window.showToast('Please fix highlighted form errors before commissioning your puzzle.', 'error', 'Validation Error');
        return;
      }

      // Successful commission
      const total = PIECE_OPTIONS[currentPieceCount].price + BOX_OPTIONS[currentBoxType].price;
      const customItem = {
        id: `custom-puzzle-${Date.now()}`,
        name: `Custom Photo Jigsaw (${currentPieceCount} Pieces - ${BOX_OPTIONS[currentBoxType].label})`,
        price: total,
        image: currentImageUrl,
        difficulty: currentPieceCount >= 1000 ? 'Hard' : 'Medium'
      };

      window.addToCart(customItem.id, customItem.name, customItem.price, customItem.image, customItem.difficulty);
      window.showToast(`Custom Photo Puzzle successfully commissioned! Placed in your cart.`, 'success', 'Bespoke Order Created');

      form.reset();
      nameInput.classList.remove('is-valid');
      phoneInput.classList.remove('is-valid');
      emailInput.classList.remove('is-valid');
    });
  }

  function validateName(input) {
    if (!input) return false;
    const val = input.value.trim();
    const errorEl = document.getElementById(`${input.id}-error`);
    // Min 2 letters, letters, spaces, hyphens only
    const valid = /^[a-zA-Z\s'-]{2,50}$/.test(val) && !/[0-9]/.test(val);

    if (valid) {
      input.classList.remove('is-invalid');
      input.classList.add('is-valid');
      if (errorEl) errorEl.classList.remove('active');
      return true;
    } else {
      input.classList.add('is-invalid');
      input.classList.remove('is-valid');
      if (errorEl) {
        errorEl.textContent = val.length === 0 ? 'Full name is required.' : 'Name must contain only letters (min 2 characters, no numbers).';
        errorEl.classList.add('active');
      }
      return false;
    }
  }

  function validatePhone(input) {
    if (!input) return false;
    const val = input.value.trim();
    const errorEl = document.getElementById(`${input.id}-error`);
    // Phone must contain only digits, plus, hyphens, parens, spaces; min 7 digits; strictly NO letters
    const hasLetters = /[a-zA-Z]/.test(val);
    const digitCount = (val.match(/\d/g) || []).length;
    const valid = !hasLetters && digitCount >= 7 && digitCount <= 16 && /^[\+]?[(]?[0-9]{1,4}[)]?[-\s\./0-9]*$/.test(val);

    if (valid) {
      input.classList.remove('is-invalid');
      input.classList.add('is-valid');
      if (errorEl) errorEl.classList.remove('active');
      return true;
    } else {
      input.classList.add('is-invalid');
      input.classList.remove('is-valid');
      if (errorEl) {
        errorEl.textContent = hasLetters 
          ? 'Letters are strictly forbidden in phone numbers.' 
          : 'Please enter a valid phone number (at least 7 digits, e.g. +1 555-019-2834).';
        errorEl.classList.add('active');
      }
      return false;
    }
  }

  function validateEmail(input) {
    if (!input) return false;
    const val = input.value.trim();
    const errorEl = document.getElementById(`${input.id}-error`);
    // Strict RFC 5322 compatible regex
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
    const valid = emailRegex.test(val);

    if (valid) {
      input.classList.remove('is-invalid');
      input.classList.add('is-valid');
      if (errorEl) errorEl.classList.remove('active');
      return true;
    } else {
      input.classList.add('is-invalid');
      input.classList.remove('is-valid');
      if (errorEl) {
        errorEl.textContent = 'Please enter a strictly valid email format (e.g. solver@domain.com).';
        errorEl.classList.add('active');
      }
      return false;
    }
  }

  function initImageUpload() {
    const fileInput = document.getElementById('photo-upload-input');
    const previewImg = document.getElementById('custom-preview-image');
    const fileNameDisplay = document.getElementById('upload-filename');

    if (fileInput && previewImg) {
      fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (!file.type.startsWith('image/')) {
          window.showToast('Please upload a valid image file (JPEG, PNG, WebP).', 'error', 'Invalid File');
          return;
        }

        if (file.size > 25 * 1024 * 1024) {
          window.showToast('File size exceeds 25MB limit. Please upload a lighter image.', 'error', 'File Too Large');
          return;
        }

        const reader = new FileReader();
        reader.onload = (loadEvent) => {
          previewImg.src = loadEvent.target.result;
          currentImageUrl = loadEvent.target.result;
          if (fileNameDisplay) fileNameDisplay.textContent = `Uploaded: ${file.name} (${(file.size / 1024 / 1024).toFixed(1)} MB)`;
          window.showToast(`High-res artwork "${file.name}" loaded into preview matrix!`, 'success', 'Photo Imported');
        };
        reader.readAsDataURL(file);
      });
    }

    // Sample Photo Presets
    const presetBtns = document.querySelectorAll('.sample-preset-btn');
    presetBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const url = btn.getAttribute('data-img-url');
        if (url && previewImg) {
          previewImg.src = url;
          currentImageUrl = url;
          if (fileNameDisplay) fileNameDisplay.textContent = `Preset: ${btn.getAttribute('data-preset-name')}`;
          window.showToast(`Preset artwork "${btn.getAttribute('data-preset-name')}" applied`, 'info');
        }
      });
    });
  }

  function initPieceSelectors() {
    const pieceBtns = document.querySelectorAll('.piece-selector-btn');
    pieceBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        pieceBtns.forEach(b => {
          b.classList.remove('border-amber-600', 'bg-amber-50', 'dark:bg-amber-950/40', 'dark:border-amber-500');
          b.classList.add('border-slate-200', 'dark:border-slate-700');
        });
        btn.classList.add('border-amber-600', 'bg-amber-50', 'dark:bg-amber-950/40', 'dark:border-amber-500');
        btn.classList.remove('border-slate-200', 'dark:border-slate-700');

        currentPieceCount = btn.getAttribute('data-pieces');
        updatePricing();
      });
    });

    const boxSelect = document.getElementById('custom-box-select');
    if (boxSelect) {
      boxSelect.addEventListener('change', (e) => {
        currentBoxType = e.target.value;
        updatePricing();
      });
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    const previewImg = document.getElementById('custom-preview-image');
    if (previewImg) currentImageUrl = previewImg.src;
    initPieceSelectors();
    initImageUpload();
    updatePricing();
    const customForm = document.getElementById('custom-puzzle-form');
    setupStrictValidation(customForm);
  });

})();
