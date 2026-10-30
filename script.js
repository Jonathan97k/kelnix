document.addEventListener('DOMContentLoaded', () => {
  const menuButton = document.getElementById('hamburger');
  const navMenu = document.getElementById('navMenu');
  const setMenuOpen = (open) => {
    if (!menuButton || !navMenu) return;
    navMenu.classList.toggle('active', open);
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  };
  if (menuButton && navMenu) {
    menuButton.addEventListener('click', () => setMenuOpen(menuButton.getAttribute('aria-expanded') !== 'true'));
    navMenu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setMenuOpen(false)));
    document.addEventListener('keydown', event => { if (event.key === 'Escape') setMenuOpen(false); });
    document.addEventListener('click', event => {
      if (!navMenu.contains(event.target) && !menuButton.contains(event.target)) setMenuOpen(false);
    });
  }
  const year = document.getElementById('currentYear');
  if (year) year.textContent = String(new Date().getFullYear());
});