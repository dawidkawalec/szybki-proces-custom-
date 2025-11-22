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
        const pane = h.nextElementSibling;
        pane.style.maxHeight = null;
        pane.classList.remove('active'); // Also remove class active for consistency
      });

      if (!isActive) {
        header.classList.add('active');
        content.classList.add('active'); // Add class active for styling hooks if needed
        content.style.maxHeight = content.scrollHeight + "px";
      }
    });
  });
  
  // Helper to trigger first tab on load if none active (ONLY FOR DESKTOP INITIAL STATE)
  // On mobile, we might want all closed initially or first open. 
  // If we click the button, it adds '.active' to pane. 
  // CSS for desktop handles '.active' -> visibility visible.
  // CSS for mobile handles '.active' -> no height change (now removed), JS sets maxHeight.
  // So triggering this click is fine for desktop state. 
  // For mobile, if we want the first one open, we need to set maxHeight manually or let user open it.
  // Let's leave it as is, but maybe check viewport width? 
  // Actually, triggering the click adds '.active' class. 
  // On mobile, CSS '.active' no longer forces height: auto. So it will remain closed (max-height: 0) unless JS sets style.maxHeight.
  // This is GOOD. It means on mobile it starts closed, which is cleaner than a broken open state.
  // If user wants first open on mobile, we'd need explicit JS for that. Assuming closed is fine/better.
  
  if (tabButtons.length > 0 && !tabsContainer.querySelector('.practice-areas__tab-btn.active')) {
     // Only trigger if we are likely on desktop? Or just let it set the class state.
     // Setting class state is harmless now that mobile CSS doesn't auto-expand on class alone.
     tabButtons[0].click();
  }
}
