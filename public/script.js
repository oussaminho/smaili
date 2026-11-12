(() => {
  const root = document.documentElement;
  const languageButton = document.querySelector('.language-toggle');
  const languageFrench = document.querySelector('.lang-fr');
  const languageArabic = document.querySelector('.lang-ar');
  const menuButton = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.main-nav');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function setLanguage(language) {
    const isArabic = language === 'ar';
    root.lang = isArabic ? 'ar' : 'fr';
    root.dir = isArabic ? 'rtl' : 'ltr';
    document.querySelectorAll('[data-fr][data-ar]').forEach((element) => {
      element.textContent = element.dataset[language];
    });
    languageFrench.classList.toggle('is-active', !isArabic);
    languageArabic.classList.toggle('is-active', isArabic);
    languageButton.setAttribute('aria-label', isArabic ? 'Changer la langue vers le français' : 'Switch language to Arabic');
    document.title = isArabic
      ? 'Smaili Sport Club à Meknès | تايكوندو ولياقة'
      : 'Smaili Sport Club à Meknès | Taekwondo & Fitness';
    const description = isArabic
      ? 'اكتشف Smaili Sport Club في مكناس: التايكوندو، كمال الأجسام، اللياقة البدنية والأيروبيك في الرياض الزيتون.'
      : 'Smaili Sport Club à Meknès : taekwondo, musculation, fitness, aérobic et condition physique à Riyad Zitoun. Découvrez le club et ses athlètes.';
    document.querySelector('meta[name="description"]').content = description;
    document.querySelector('meta[property="og:title"]').content = document.title;
    document.querySelector('meta[property="og:description"]').content = description;
    document.querySelector('meta[property="og:locale"]').content = isArabic ? 'ar_MA' : 'fr_MA';
    document.querySelector('meta[name="twitter:title"]').content = document.title;
    document.querySelector('meta[name="twitter:description"]').content = description;
  }

  languageButton.addEventListener('click', () => {
    setLanguage(root.lang === 'fr' ? 'ar' : 'fr');
  });

  function closeMenu() {
    menuButton.setAttribute('aria-expanded', 'false');
    nav.classList.remove('is-open');
    document.body.classList.remove('menu-open');
  }

  menuButton.addEventListener('click', () => {
    const opening = menuButton.getAttribute('aria-expanded') !== 'true';
    menuButton.setAttribute('aria-expanded', String(opening));
    nav.classList.toggle('is-open', opening);
    document.body.classList.toggle('menu-open', opening);
  });

  nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeMenu();
  });
  window.addEventListener('resize', () => {
    if (window.innerWidth > 700) closeMenu();
  }, { passive: true });

  const year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());

  if (!reducedMotion && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, currentObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          currentObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -25px 0px' });
    document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));
  } else {
    document.querySelectorAll('.reveal').forEach((element) => element.classList.add('is-visible'));
  }
})();
