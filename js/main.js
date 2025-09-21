document.addEventListener('DOMContentLoaded', () => {
  const navToggle = document.getElementById('nav-toggle');
  const navigation = document.getElementById('primary-navigation');

  const closeNav = () => {
    if (!navigation) return;
    navigation.classList.remove('is-open');
    if (navToggle) {
      navToggle.setAttribute('aria-expanded', 'false');
    }
  };

  if (navToggle && navigation) {
    navToggle.addEventListener('click', () => {
      const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!isExpanded));
      navigation.classList.toggle('is-open');
    });

    navigation.addEventListener('click', (event) => {
      if (event.target instanceof HTMLAnchorElement) {
        closeNav();
      }
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth > 820) {
        navigation.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  const yearSpan = document.getElementById('current-year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear().toString();
  }
});
