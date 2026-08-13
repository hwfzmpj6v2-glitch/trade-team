/* =========================================================================
   Osobní CV — doplňkové chování stránky.
   Vše je nepovinné: bez JS zůstane stránka plně čitelná a použitelná.
   ========================================================================= */

(function () {
  'use strict';

  var root = document.documentElement;

  /* ---------- přepínač světlého a tmavého režimu ---------- */

  var themeButton = document.querySelector('.theme-toggle');

  if (themeButton) {
    themeButton.addEventListener('click', function () {
      // Bez uložené volby se řídíme nastavením systému — první kliknutí
      // proto musí přepnout na opak toho, co uživatel právě vidí.
      var current = root.dataset.theme;

      if (!current) {
        var systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        current = systemDark ? 'dark' : 'light';
      }

      var next = current === 'dark' ? 'light' : 'dark';
      root.dataset.theme = next;

      try {
        localStorage.setItem('theme', next);
      } catch (e) {
        /* Soukromý režim může localStorage zakázat — volba pak platí jen do reloadu. */
      }
    });
  }

  /* ---------- mobilní menu ---------- */

  var menuButton = document.querySelector('.topbar__toggle');
  var menu = document.getElementById('menu');

  if (menuButton && menu) {
    menuButton.addEventListener('click', function () {
      var open = menu.classList.toggle('is-open');
      menuButton.setAttribute('aria-expanded', String(open));
    });

    // Po kliknutí na položku menu zavřít, ať kotva není schovaná pod seznamem.
    menu.addEventListener('click', function (event) {
      if (event.target.closest('a')) {
        menu.classList.remove('is-open');
        menuButton.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ---------- zvýraznění právě čtené sekce v navigaci ---------- */

  var links = Array.prototype.slice.call(document.querySelectorAll('.topbar__menu a'));

  if (links.length && 'IntersectionObserver' in window) {
    var byId = {};
    var sections = [];

    links.forEach(function (link) {
      var section = document.querySelector(link.getAttribute('href'));
      if (section) {
        byId[section.id] = link;
        sections.push(section);
      }
    });

    var visible = new Set();

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          visible.add(entry.target.id);
        } else {
          visible.delete(entry.target.id);
        }
      });

      // Aktivní je první viditelná sekce v pořadí dokumentu.
      var active = null;
      for (var i = 0; i < sections.length; i++) {
        if (visible.has(sections[i].id)) {
          active = sections[i].id;
          break;
        }
      }

      links.forEach(function (link) {
        link.removeAttribute('aria-current');
      });

      if (active && byId[active]) {
        byId[active].setAttribute('aria-current', 'true');
      }
    }, { rootMargin: '-25% 0px -60% 0px' });

    sections.forEach(function (section) {
      observer.observe(section);
    });
  }

  /* ---------- e-mail složený až v prohlížeči ---------- */

  function address(el) {
    var user = el.dataset.user;
    var domain = el.dataset.domain;

    // Dokud jsou v HTML zástupné texty v hranatých závorkách, adresa neexistuje.
    if (!user || !domain || user.charAt(0) === '[' || domain.charAt(0) === '[') return null;

    return user + '@' + domain;
  }

  // Odkaz v kontaktech: zobrazí adresu jako text.
  document.querySelectorAll('.js-email').forEach(function (el) {
    var mail = address(el);

    if (!mail) {
      el.removeAttribute('href');
      return;
    }

    el.textContent = mail;
    el.href = 'mailto:' + mail;
  });

  // Tlačítko: popisek zůstane, mění se jen cíl. Volitelně předvyplní předmět.
  document.querySelectorAll('.js-email-btn').forEach(function (el) {
    var mail = address(el);
    if (!mail) return;

    var subject = el.dataset.subject;
    el.href = 'mailto:' + mail + (subject ? '?subject=' + encodeURIComponent(subject) : '');
  });

  /* ---------- rok v patičce ---------- */

  document.querySelectorAll('.js-year').forEach(function (el) {
    el.textContent = String(new Date().getFullYear());
  });
})();
