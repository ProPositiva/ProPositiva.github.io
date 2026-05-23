/* ═══════════════════════════════════════════════════════════════
   PROPOSITIVA — script.js
   Venture Studio & Seed Capital
   Modular, performance-first, accessibility-aware
   ═══════════════════════════════════════════════════════════════ */

'use strict';

/* ── NAV: scroll + mobile toggle ── */
const initNav = () => {
  const header = document.getElementById('site-header');
  const toggle = document.getElementById('nav-toggle');
  const menu   = document.getElementById('nav-menu');
  if (!header || !toggle || !menu) return;

  let lastY = 0;
  const onScroll = () => {
    const y = window.scrollY;
    header.classList.toggle('scrolled', y > 40);
    if (Math.abs(y - lastY) > 60 && menu.classList.contains('open')) closeMenu();
    lastY = y;
  };
  window.addEventListener('scroll', onScroll, { passive: true });

  const openMenu = () => {
    menu.classList.add('open');
    toggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
    menu.querySelector('a')?.focus();
  };
  const closeMenu = () => {
    menu.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  };

  toggle.addEventListener('click', () =>
    menu.classList.contains('open') ? closeMenu() : openMenu()
  );
  menu.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && menu.classList.contains('open')) closeMenu();
  });

  /* Active link highlighting */
  const sections  = document.querySelectorAll('section[id]');
  const navLinks  = menu.querySelectorAll('a[href^="#"]');
  const highlightNav = () => {
    let current = '';
    sections.forEach(section => {
      if (window.scrollY >= section.offsetTop - 120) current = section.getAttribute('id');
    });
    navLinks.forEach(link => {
      link.removeAttribute('aria-current');
      if (link.getAttribute('href') === `#${current}`) link.setAttribute('aria-current', 'page');
    });
  };
  window.addEventListener('scroll', highlightNav, { passive: true });
};

/* ── SMOOTH SCROLL ── */
const initSmoothScroll = () => {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const navH = document.getElementById('site-header')?.offsetHeight || 72;
      const top  = target.getBoundingClientRect().top + window.scrollY - navH - 16;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
};

/* ── REVEAL ANIMATIONS ── */
const initReveal = () => {
  if (!('IntersectionObserver' in window)) {
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('in-view'));
    return;
  }
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  const revealTargets = [
    '.pillar-card', '.project-card', '.method-step',
    '.tech-column', '.team-card', '.traction-item',
    '.faq-item', '.stat-pill', '.section-heading',
    '.section-tag', '.section-sub', '.split-left',
    '.split-right', '.manifesto-body p',
  ];
  revealTargets.forEach(selector => {
    document.querySelectorAll(selector).forEach((el, i) => {
      el.classList.add('reveal');
      el.style.transitionDelay = `${i * 70}ms`;
      observer.observe(el);
    });
  });
};

/* ── COUNTER ANIMATION for traction numbers ── */
const initCounters = () => {
  const els = document.querySelectorAll('.traction-num[data-count], .stat-num');
  if (!els.length) return;

  const parseNum = str => {
    const m = str.match(/[\d.]+/);
    return m ? parseFloat(m[0]) : null;
  };
  const formatNum = (original, current) =>
    original.replace(/[\d.]+/, Math.round(current));

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const original = el.dataset.count ? el.dataset.count : el.textContent;
      const target   = parseNum(original);
      if (!target || isNaN(target)) return;

      let start = null;
      const duration = 1400;
      const step = ts => {
        if (!start) start = ts;
        const progress = Math.min((ts - start) / duration, 1);
        const eased    = 1 - Math.pow(1 - progress, 3);
        el.textContent = formatNum(original, eased * target);
        if (progress < 1) requestAnimationFrame(step);
        else el.textContent = original;
      };
      requestAnimationFrame(step);
      observer.unobserve(el);
    });
  }, { threshold: 0.5 });

  els.forEach(el => observer.observe(el));
};

/* ── HEADER: hide on scroll down, show on scroll up ── */
const initScrollBehavior = () => {
  const header = document.getElementById('site-header');
  if (!header) return;
  let prev = 0, ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const cur = window.scrollY;
        if (cur > 200) {
          header.style.transform = cur > prev ? 'translateY(-100%)' : 'translateY(0)';
        } else {
          header.style.transform = 'translateY(0)';
        }
        prev = cur;
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
};

/* ── TERMINAL TYPING ANIMATION ── */
const initTerminal = () => {
  const lines = document.querySelectorAll('.terminal-body .t-line');
  if (!lines.length) return;

  lines.forEach((line, i) => {
    line.style.opacity = '0';
    line.style.transform = 'translateY(4px)';
    line.style.transition = 'opacity 0.3s ease, transform 0.3s ease';

    setTimeout(() => {
      line.style.opacity = '1';
      line.style.transform = 'translateY(0)';
    }, 600 + i * 480);
  });
};

/* ── TICKER: pause on hover ── */
const initTicker = () => {
  const track = document.querySelector('.ticker-track');
  if (!track) return;
  const wrap = track.closest('.ticker-wrap');
  if (!wrap) return;
  wrap.addEventListener('mouseenter', () => track.style.animationPlayState = 'paused');
  wrap.addEventListener('mouseleave', () => track.style.animationPlayState = 'running');
};

/* ── HERO PARALLAX on bg glows (RAF-based) ── */
const initParallax = () => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (window.innerWidth < 900) return;

  const glows = document.querySelectorAll('.hero-glow');
  if (!glows.length) return;

  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const y = window.scrollY;
        glows.forEach((g, i) => {
          g.style.transform = `translate(${i % 2 === 0 ? 40 : -40}px, ${y * (0.06 + i * 0.03)}px)`;
        });
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
};

/* ── FAQ: keyboard navigation ── */
const initFAQ = () => {
  document.querySelectorAll('.faq-item').forEach(item => {
    const summary = item.querySelector('.faq-question');
    if (!summary) return;
    summary.addEventListener('keydown', e => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        item.nextElementSibling?.querySelector('.faq-question')?.focus();
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        item.previousElementSibling?.querySelector('.faq-question')?.focus();
      }
    });
  });
};

/* ── LAZY IMAGES polyfill ── */
const initLazyImages = () => {
  if ('loading' in HTMLImageElement.prototype) return;
  const images = document.querySelectorAll('img[loading="lazy"]');
  if (!images.length) return;
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) { img.src = img.dataset.src; img.removeAttribute('data-src'); }
        observer.unobserve(img);
      }
    });
  });
  images.forEach(img => observer.observe(img));
};

/* ── PRELOADS ── */
const initPreloads = () => {
  ['https://fonts.googleapis.com', 'https://fonts.gstatic.com'].forEach(href => {
    if (!document.querySelector(`link[href="${href}"]`)) {
      const link = Object.assign(document.createElement('link'), { rel: 'preconnect', href });
      document.head.appendChild(link);
    }
  });
};

/* ── ANALYTICS skeleton ── */
const initAnalytics = () => {
  document.querySelectorAll('.btn--primary, .nav-cta').forEach(btn => {
    btn.addEventListener('click', () => {
      if (typeof gtag !== 'undefined') {
        gtag('event', 'cta_click', { event_category: 'engagement', event_label: btn.textContent.trim() });
      }
    });
  });
  document.querySelectorAll('.faq-item').forEach(item => {
    item.addEventListener('toggle', () => {
      const q = item.querySelector('.faq-question')?.textContent?.trim();
      if (item.open && typeof gtag !== 'undefined') gtag('event', 'faq_open', { event_label: q });
    });
  });
};

/* ── STRUCTURED DATA: BreadcrumbList ── */
const injectBreadcrumb = () => {
  const path = window.location.pathname;
  if (path === '/' || path === '/index.html') return;
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.textContent = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://www.propositivacr.com/' },
      { '@type': 'ListItem', position: 2, name: document.title, item: window.location.href }
    ]
  });
  document.head.appendChild(script);
};

/* ── INIT ALL ── */
const init = () => {
  initPreloads();
  initNav();
  initSmoothScroll();
  initReveal();
  initCounters();
  initScrollBehavior();
  initLazyImages();
  initFAQ();
  initParallax();
  initTerminal();
  initTicker();
  injectBreadcrumb();
  setTimeout(initAnalytics, 2000);
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
