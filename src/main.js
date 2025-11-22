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
