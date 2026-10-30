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

  const choices = {
    presence: {
      text: "Let's map your audience, message and the digital experience that will help people find you.",
      message: "Hello Kelnix, I need a stronger online presence."
    },
    process: {
      text: "Let's understand how work moves through your business and identify the right tool to bring clarity to the process.",
      message: "Hello Kelnix, I want to improve my business processes."
    },
    automation: {
      text: "Let's identify the repetitive tasks, the systems involved and where automation or AI can make a measurable difference.",
      message: "Hello Kelnix, I want to automate repetitive work."
    },
    idea: {
      text: "Let's turn the early idea into a clear problem, a useful first version and a practical route to build it.",
      message: "Hello Kelnix, I have an idea I'd like help shaping."
    }
  };
  const buttons = document.querySelectorAll('.start-option');
  const resultText = document.getElementById('choiceText');
  const resultLink = document.getElementById('choiceLink');
  buttons.forEach(button => {
    button.addEventListener('click', () => {
      const choice = choices[button.dataset.choice];
      if (!choice || !resultText || !resultLink) return;
      buttons.forEach(item => {
        const active = item === button;
        item.classList.toggle('active', active);
        item.setAttribute('aria-pressed', String(active));
      });
      resultText.textContent = choice.text;
      resultLink.href = 'https://wa.me/265882986170?text=' + encodeURIComponent(choice.message);
    });
  });
});