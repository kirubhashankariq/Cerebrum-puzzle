/**
 * CEREBRUM & CO. - Contact Form Logic & Strict Validation
 * Vanilla JavaScript Implementation
 */

(function () {
  'use strict';

  function initContactForm() {
    const form = document.getElementById('contact-inquiry-form');
    if (!form) return;

    const nameInput = document.getElementById('contact-name');
    const phoneInput = document.getElementById('contact-phone');
    const emailInput = document.getElementById('contact-email');
    const messageInput = document.getElementById('contact-message');
    const charCountEl = document.getElementById('message-char-count');

    // 1. NAME FIELD: Block all numbers. If a user types a number, it must NOT appear.
    if (nameInput) {
      nameInput.addEventListener('keydown', (e) => {
        if (['Backspace', 'Delete', 'Tab', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Enter', 'Escape'].includes(e.key)) {
          return;
        }
        if (e.ctrlKey || e.metaKey) return;

        if (/[0-9]/.test(e.key)) {
          e.preventDefault();
          window.showToast('Numbers are strictly prohibited in the Name field.', 'error', 'Invalid Key');
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

        if (/[a-zA-Z]/.test(e.key)) {
          e.preventDefault();
          window.showToast('Letters are strictly prohibited in the Phone field.', 'error', 'Invalid Key');
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

    // 3. EMAIL FIELD: Must validate with strict Regex before allowing form submission.
    if (emailInput) {
      emailInput.addEventListener('input', () => {
        validateEmail(emailInput);
      });
      emailInput.addEventListener('blur', () => {
        validateEmail(emailInput);
      });
    }

    // Message character counter
    if (messageInput && charCountEl) {
      messageInput.addEventListener('input', () => {
        charCountEl.textContent = `${messageInput.value.length} / 1000`;
      });
    }

    // Form Submission
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const isNameValid = validateName(nameInput);
      const isPhoneValid = validatePhone(phoneInput);
      const isEmailValid = validateEmail(emailInput);

      let isMsgValid = true;
      if (messageInput) {
        if (messageInput.value.trim().length < 10) {
          messageInput.classList.add('is-invalid');
          const err = document.getElementById('contact-message-error');
          if (err) err.classList.add('active');
          isMsgValid = false;
        } else {
          messageInput.classList.remove('is-invalid');
          messageInput.classList.add('is-valid');
          const err = document.getElementById('contact-message-error');
          if (err) err.classList.remove('active');
        }
      }

      if (!isNameValid || !isPhoneValid || !isEmailValid || !isMsgValid) {
        window.showToast('Please correct all validation errors highlighted above.', 'error', 'Submission Blocked');
        return;
      }

      // Success modal / toast
      window.showToast('Your message has been securely relayed to our Master Puzzle Concierge team! Expected response within 4 hours.', 'success', 'Inquiry Dispatched');
      
      form.reset();
      if (charCountEl) charCountEl.textContent = '0 / 1000';
      nameInput.classList.remove('is-valid');
      phoneInput.classList.remove('is-valid');
      emailInput.classList.remove('is-valid');
      if (messageInput) messageInput.classList.remove('is-valid');
    });
  }

  function validateName(input) {
    if (!input) return false;
    const val = input.value.trim();
    const errorEl = document.getElementById(`${input.id}-error`);
    const valid = /^[a-zA-Z\s'-]{2,60}$/.test(val) && !/[0-9]/.test(val);

    if (valid) {
      input.classList.remove('is-invalid');
      input.classList.add('is-valid');
      if (errorEl) errorEl.classList.remove('active');
      return true;
    } else {
      input.classList.add('is-invalid');
      input.classList.remove('is-valid');
      if (errorEl) {
        errorEl.textContent = val.length === 0 ? 'Full name is required.' : 'Name must contain only letters and spaces (no numbers).';
        errorEl.classList.add('active');
      }
      return false;
    }
  }

  function validatePhone(input) {
    if (!input) return false;
    const val = input.value.trim();
    const errorEl = document.getElementById(`${input.id}-error`);
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
        errorEl.textContent = 'Please provide a valid email format (e.g. name@domain.com).';
        errorEl.classList.add('active');
      }
      return false;
    }
  }

  // Accordion Logic for FAQ on Contact Page
  function initAccordions() {
    const accordions = document.querySelectorAll('.faq-accordion-toggle');
    accordions.forEach(acc => {
      acc.addEventListener('click', () => {
        const panel = acc.nextElementSibling;
        const icon = acc.querySelector('.faq-icon');
        const isOpen = !panel.classList.contains('hidden');

        if (isOpen) {
          panel.classList.add('hidden');
          if (icon) icon.textContent = '+';
        } else {
          panel.classList.remove('hidden');
          if (icon) icon.textContent = '−';
        }
      });
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    initContactForm();
    initAccordions();
  });

})();
