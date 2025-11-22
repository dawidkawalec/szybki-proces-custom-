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
// Sprawdzamy czy Swiper jest załadowany (z CDN)
if (typeof Swiper !== 'undefined') {
  new Swiper('.reviews-swiper', {
    slidesPerView: 'auto', // Slajdy mają width z CSS (400px)
    spaceBetween: 32, // Odstęp (space-l/xl)
    centeredSlides: false, // Zaczynamy od lewej
    loop: true, // Pętla
    navigation: {
      nextEl: '.reviews__btn--next',
      prevEl: '.reviews__btn--prev',
    },
    breakpoints: {
      // Mobile
      320: {
        spaceBetween: 16,
      },
      // Desktop
      1024: {
        spaceBetween: 32,
      },
    }
  });
} else {
  console.warn('Swiper library not loaded');
}
