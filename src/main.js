import './style.scss'

// Dynamiczny rok w stopce
const yearEl = document.querySelector('#year');
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

// FAQ Accordion Logic
const faqHeaders = document.querySelectorAll('.faq__header');

faqHeaders.forEach(header => {
  header.addEventListener('click', () => {
    const currentItem = header.parentElement;
    const isActive = currentItem.classList.contains('faq__item--active');

    // Opcjonalnie: Zamykanie innych otwartych elementów (zachowanie Accordion)
    document.querySelectorAll('.faq__item').forEach(item => {
      item.classList.remove('faq__item--active');
      const btn = item.querySelector('.faq__header');
      if (btn) btn.setAttribute('aria-expanded', 'false');
    });

    // Jeśli kliknięty element nie był aktywny, otwieramy go
    if (!isActive) {
      currentItem.classList.add('faq__item--active');
      header.setAttribute('aria-expanded', 'true');
    }
  });
});

// Initialize Swiper for Reviews
if (typeof Swiper !== 'undefined') {
  new Swiper('.reviews-swiper', {
    slidesPerView: 'auto',
    spaceBetween: 32,
    centeredSlides: false,
    loop: true,
    navigation: {
      nextEl: '.reviews__btn--next',
      prevEl: '.reviews__btn--prev',
    },
    breakpoints: {
      320: {
        spaceBetween: 16,
      },
      1024: {
        spaceBetween: 32,
      },
    }
  });
} else {
  console.warn('Swiper library not loaded');
}

// Mobile Menu Logic
const hamburger = document.querySelector('.header__hamburger');
const mobileMenu = document.querySelector('.mobile-menu');
const body = document.body;

if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.contains('is-open');
    
    if (isOpen) {
      mobileMenu.classList.remove('is-open');
      hamburger.classList.remove('is-active');
      hamburger.setAttribute('aria-expanded', 'false');
      body.style.overflow = ''; 
    } else {
      mobileMenu.classList.add('is-open');
      hamburger.classList.add('is-active');
      hamburger.setAttribute('aria-expanded', 'true');
      body.style.overflow = 'hidden'; 
    }
  });
}

// Mobile Submenu Toggles
const mobileSubmenuBtns = document.querySelectorAll('.mobile-menu__btn');

mobileSubmenuBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const parent = btn.parentElement;
    const submenu = parent.querySelector('.mobile-menu__submenu');
    
    parent.classList.toggle('is-active');
    
    if (submenu) {
      submenu.classList.toggle('is-open');
    }
  });
});

const mobileLinks = document.querySelectorAll('.mobile-menu__link, .mobile-menu__sublink, .mobile-menu__cta');
mobileLinks.forEach(link => {
  link.addEventListener('click', () => {
    if (mobileMenu.classList.contains('is-open')) {
      mobileMenu.classList.remove('is-open');
      hamburger.classList.remove('is-active');
      hamburger.setAttribute('aria-expanded', 'false');
      body.style.overflow = '';
    }
  });
});

// Practice Areas Tabs Logic
const tabsContainer = document.querySelector('.practice-areas');
if (tabsContainer) {
  const tabButtons = tabsContainer.querySelectorAll('.practice-areas__tab-btn');
  const tabContents = tabsContainer.querySelectorAll('.practice-areas__content-pane');
  const mobileAccordions = tabsContainer.querySelectorAll('.practice-areas__mobile-header');

  // Desktop Tabs Functionality
  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.dataset.tab;

      // Remove active class from all buttons and contents
      tabButtons.forEach(b => b.classList.remove('active'));
      tabContents.forEach(c => c.classList.remove('active'));

      // Add active class to clicked button and target content
      btn.classList.add('active');
      const targetContent = document.getElementById(`area-${targetId}`);
      if (targetContent) {
        targetContent.classList.add('active');
      }
    });
  });

  // Mobile Accordion Functionality
  mobileAccordions.forEach(header => {
    header.addEventListener('click', () => {
      const content = header.nextElementSibling;
      const isActive = header.classList.contains('active');

      // Close all others (optional, accordion style)
      mobileAccordions.forEach(h => {
        h.classList.remove('active');
        h.nextElementSibling.style.maxHeight = null;
      });

      if (!isActive) {
        header.classList.add('active');
        content.style.maxHeight = content.scrollHeight + "px";
      }
    });
  });
  
  // Helper to trigger first tab on load if none active
  if (tabButtons.length > 0 && !tabsContainer.querySelector('.practice-areas__tab-btn.active')) {
     tabButtons[0].click();
  }
}
