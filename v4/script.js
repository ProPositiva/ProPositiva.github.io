/* ═══════════════════════════════════════════════════════════════
   PROPOSITIVA — v4 script.js
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
    toggle.setAttribute('aria-label', 'Cerrar menú');
    document.body.style.overflow = 'hidden';
    menu.querySelector('a')?.focus();
  };
  const closeMenu = () => {
    menu.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Abrir menú');
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
  const sections = document.querySelectorAll('section[id]');
  const navLinks = menu.querySelectorAll('a[href^="#"]');
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

/* ── SMOOTH SCROLL — accounts for floating nav offset ── */
const initSmoothScroll = () => {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const navH = document.getElementById('site-header')?.offsetHeight || 60;
      const navTop = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-top')) || 16;
      const top = target.getBoundingClientRect().top + window.scrollY - navH - navTop - 16;
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
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  const revealTargets = [
    '.pillar-card', '.project-card', '.met-step',
    '.tech-column', '.team-card', '.traction-item',
    '.faq-item', '.stat-pill', '.section-heading',
    '.section-tag', '.section-sub', '.split-left',
    '.split-right', '.manifesto-body p',
    '.testimonial-card', '.newsletter-heading', '.cta-offer-col',
    '.comparison-table tbody tr', '.section-micro-cta',
  ];
  revealTargets.forEach(selector => {
    document.querySelectorAll(selector).forEach((el, i) => {
      el.classList.add('reveal');
      el.style.transitionDelay = `${i * 65}ms`;
      observer.observe(el);
    });
  });
};

/* ── COUNTER ANIMATION — only for integer data-count elements ── */
const initCounters = () => {
  const els = document.querySelectorAll('[data-count]');
  if (!els.length) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el     = entry.target;
      const target = parseInt(el.dataset.count, 10);
      if (isNaN(target)) return;

      let start = null;
      const duration = 1400;
      const prefix = el.textContent.replace(/[\d]+.*/, '');
      const suffix = el.textContent.replace(/^[^0-9]*[\d]+/, '');

      const step = ts => {
        if (!start) start = ts;
        const progress = Math.min((ts - start) / duration, 1);
        const eased    = 1 - Math.pow(1 - progress, 3);
        el.textContent = prefix + Math.round(eased * target) + suffix;
        if (progress < 1) requestAnimationFrame(step);
        else el.textContent = prefix + target + suffix;
      };
      requestAnimationFrame(step);
      observer.unobserve(el);
    });
  }, { threshold: 0.5 });

  els.forEach(el => observer.observe(el));
};

/* ── HEADER: hide on scroll down, show on scroll up (floating-nav compatible) ── */
const initScrollBehavior = () => {
  const header = document.getElementById('site-header');
  if (!header) return;
  let prev = 0, ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const cur = window.scrollY;
        if (cur > 200) {
          /* Combine translateX(-50%) for floating nav with hide/show translateY */
          const hideY = cur > prev ? '-120%' : '0%';
          header.style.transform = `translateX(-50%) translateY(${hideY})`;
        } else {
          header.style.transform = 'translateX(-50%) translateY(0%)';
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
    line.style.transform = 'translateY(5px)';
    line.style.transition = 'opacity 0.3s ease, transform 0.3s ease';

    setTimeout(() => {
      line.style.opacity = '1';
      line.style.transform = 'translateY(0)';
    }, 700 + i * 500);
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
          const dir = i % 2 === 0 ? 1 : -1;
          g.style.transform = `translate(${dir * 40}px, ${y * (0.06 + i * 0.025)}px)`;
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

/* ── FLOATING CTA — show after hero, hide when main CTA is visible ── */
const initFloatingCTA = () => {
  const floatEl = document.getElementById('floating-cta');
  const mainCTA = document.getElementById('cta');
  const hero    = document.getElementById('hero');
  if (!floatEl || !mainCTA || !hero) return;

  let ticking = false;
  const update = () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const pastHero  = window.scrollY > (hero.offsetHeight * 0.8);
        const ctaOnScreen = mainCTA.getBoundingClientRect().top < window.innerHeight;
        const show = pastHero && !ctaOnScreen;
        floatEl.classList.toggle('visible', show);
        floatEl.setAttribute('aria-hidden', !show);
        ticking = false;
      });
      ticking = true;
    }
  };
  window.addEventListener('scroll', update, { passive: true });
  update();
};

/* ── NEWSLETTER FORM — loading state + success message ── */
const initNewsletterForm = () => {
  const form   = document.getElementById('newsletter-form');
  const status = document.getElementById('newsletter-status');
  if (!form || !status) return;

  const lang = () => localStorage.getItem('lang') || 'es';
  const msgs = {
    loading: { es: 'Enviando...', en: 'Sending...' },
    success: { es: '¡Listo! Te avisamos pronto.', en: "You're in! We'll be in touch." },
    error:   { es: 'Algo falló. Intenta de nuevo.', en: 'Something went wrong. Try again.' },
  };

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const l   = lang();
    const btn = form.querySelector('button[type="submit"]');
    const input = form.querySelector('.newsletter-input');
    if (!btn || !input || !input.value) return;

    form.classList.add('loading');
    btn.setAttribute('aria-disabled', 'true');
    status.textContent = msgs.loading[l];
    status.className   = 'newsletter-status';

    /* Wire to real email service (Mailchimp/Convertkit/etc.) here.
       For now, simulate a 1.2s network call. */
    try {
      await new Promise(r => setTimeout(r, 1200));
      form.style.display = 'none';
      status.textContent = msgs.success[l];
      status.classList.add('newsletter-status--success');
    } catch {
      form.classList.remove('loading');
      btn.removeAttribute('aria-disabled');
      status.textContent = msgs.error[l];
      status.classList.add('newsletter-status--error');
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

/* ── I18N — TRANSLATIONS ── */
const TRANSLATIONS = {
  es: {
    'nav.nosotros':'Nosotros','nav.portafolio':'Portafolio','nav.metodologia':'Metodología','nav.cta':'Presenta tu idea',
    'hero.badge':'Venture Studio · Seed Capital · San José, CR',
    'hero.h1.1':'Conoces el problema.','hero.h1.2':'Falta quien lo construya.','hero.h1.3':'Somos el co-founder','hero.h1.4':'técnico que Latam','hero.h1.5':'necesitaba.',
    'hero.sub':'ProPositiva aporta capital semilla, equipo técnico dedicado y metodología de 7 pasos. Tú aportas el conocimiento del problema y el mercado. Juntos, de la idea a la operación.',
    'hero.btn1':'Ver portafolio','hero.btn2':'Nuestra metodología',
    'hero.stat.steps':'Pasos metodología','hero.stat.startups':'Startups co-creadas','hero.stat.capital':'Capital desplegado',
    'nos.tag':'Quiénes somos',
    'nos.h2':'No somos<br>un fondo.<br>Somos el<br><em>co-founder</em><br>tecnológico.',
    'nos.p1':'ProPositiva es para founders que conocen profundamente un problema de mercado pero necesitan <strong>el socio técnico, el capital y la metodología</strong> para convertirlo en un producto que opera.',
    'nos.p2':'No llegamos con dinero y nos vamos. Nos involucramos desde la definición del negocio hasta que el producto opera y genera valor real — siguiendo los 7 pasos de nuestra Metodología ProPositiva, adaptada específicamente para proyectos de software en América Latina.',
    'nos.p3':'Latam produce founders con visión de mercado extraordinaria.<br><strong>Lo que faltaba era el co-founder técnico estructurado para hacerla realidad.</strong>',
    'pillar1.h3':'Capital + equipo','pillar1.p':'No solo ponemos dinero. Desplegamos desarrolladores, diseñadores y estrategas junto al founder desde el día uno.',
    'pillar2.h3':'Metodología probada','pillar2.p':'7 pasos de gestión integral, adaptados de proyectos físicos a software. Del Sustainable Business Plan a la Operación exitosa.',
    'pillar3.h3':'Problema primero','pillar3.p':'Invertimos en soluciones a problemas verificados con mercado real — no en tecnología en busca de un cliente.',
    'pillar4.h3':'Velocidad con estructura','pillar4.p':'MVP en 8–12 semanas, no meses. Nuestra metodología elimina fricción sin sacrificar rigor ni escalabilidad.',
    'man.eyebrow':'Manifiesto','man.h2':'Las ideas no cambian nada.','man.accent':'Las soluciones sí.',
    'man.p1':'Latinoamérica tiene el talento. Tiene los problemas. Tiene el mercado.',
    'man.p2':'Lo que le ha faltado es un <strong>vehículo que combine capital, tecnología y metodología</strong> en un equipo que se compromete de verdad.',
    'man.p3':'En ProPositiva no invertimos en ideas. Invertimos en founders con la obsesión de resolverlas — y acompañamos cada paso del proceso, de la idea a la operación.',
    'man.p4':'Porque innovar sin ejecutar es solo entretenimiento.',
    'man.close':'El mejor software de la región aún no ha sido escrito.<br><strong>De Costa Rica. Para el mundo.</strong>',
    'port.tag':'Portafolio','port.h2':'Startups que ya<br>están en el mundo','port.apply':'Aplicar como fundador',
    'port.status.live':'En producción','port.status.beta':'Beta',
    'port.traction.startups':'Startups co-creadas','port.traction.capital':'Capital semilla desplegado','port.traction.countries':'Países con presencia','port.traction.steps':'Pasos de metodología',
    'test.tag':'Lo dicen los founders','test.h2':'El equipo que hace<br>la diferencia',
    'test.sub':'No llegamos con dinero y nos vamos. Esto es lo que dicen quienes construyeron con nosotros.',
    'test.q1':'"Llevaba años en gestión académica y sabía exactamente dónde fallaba el sistema. Lo que no sabía era cómo construir el software. ProPositiva llegó con equipo, metodología y capital. En 10 semanas teníamos un MVP real con usuarios reales. Hoy somos el sistema de 40 instituciones en tres países."',
    'test.q2':'"Intenté con freelancers, con agencias. Siempre terminé con código que nadie entendía y un producto que nadie quería usar. Con ProPositiva fue diferente — tienen metodología real, no solo código. Estructuraron el negocio antes de escribir una línea."',
    'test.q3':'"Soy médico, no ingeniero. Conocía el problema mejor que cualquier tecnólogo — lo que me faltaba era quien lo convirtiera en producto sin que yo tuviera que volverme CTO. ProPositiva hace exactamente eso."',
    'test.role1':'Co-fundador · EduFlow','test.role2':'Co-fundador · ClearPay CR','test.role3':'Fundador · MediLink',
    'met.tag':'Metodología ProPositiva','met.h2':'Gestión integral<br>de proyectos tech',
    'met.sub':'Nuestra metodología nació en la gestión de proyectos complejos y fue adaptada para el desarrollo de software. Siete pasos que llevan una idea desde el papel hasta la operación real — sin saltarse ninguna etapa crítica.',
    'met.phase.idea':'Idea','met.phase.producto':'Producto','met.phase.operacion':'Operación',
    'met.step1.h3':'Sustainable Business Plan','met.step1.tag':'Diseño del negocio','met.step1.p':'Transformamos la idea en una propuesta de valor concreta. Definimos el modelo de negocio, el mercado objetivo, la ventaja competitiva y los supuestos clave que guiarán todo el desarrollo.',
    'met.step2.h3':'Viabilidad y Factibilidad','met.step2.tag':'Validación','met.step2.p':'Definimos el alcance real del producto y demostramos la autosustentabilidad financiera. Validamos con usuarios reales antes de escribir una línea de código.',
    'met.step3.h3':'Financiamiento','met.step3.tag':'Capital','met.step3.p':'Aseguramos los fondos para llevar el proyecto a la realidad. Aquí entra el capital semilla de ProPositiva — combinando cash, equipo técnico y red de distribución.',
    'met.step4.h3':'Product Design & Compliance','met.step4.tag':'Diseño técnico','met.step4.p':'Diseño del producto y arquitectura técnica. Incluye constitución legal de la empresa, estructura de datos, contratos con usuarios y cumplimiento regulatorio relevante para el mercado objetivo.',
    'met.step5.h3':'Ejecución','met.step5.tag':'Build','met.step5.p':'Desarrollo del producto. Stack moderno, CI/CD desde el primer día, sprints cortos con entregables reales. MVP en producción en 8–12 semanas con usuarios reales desde el inicio.',
    'met.step6.h3':'Go-to-Market','met.step6.tag':'Launch','met.step6.p':'Primer contacto real del producto con el mercado. Estrategia de adquisición, onboarding de primeros clientes, medición de retención y ajuste del mensaje de ventas basado en datos reales.',
    'met.step7.h3':'Operación','met.step7.tag':'Escala','met.step7.p':'Puesta en marcha completa del producto o servicio. Optimización de costos de infraestructura, playbook de soporte, preparación para siguiente ronda de inversión y escalado regional.',
    'met.close':'No entregamos un producto y nos vamos.<br><strong>Acompañamos hasta que opera.</strong>',
    'stack.tag':'Stack tecnológico','stack.h2':'Tecnología sin excusas','stack.sub':'Cada proyecto inicia con ventaja tecnológica real. Herramientas modernas, patrones probados, observabilidad desde el día uno.',
    'inv.tag':'Cómo nos involucramos','inv.h3':'No somos proveedores.<br>Somos parte<br>del cap table.',
    'inv.item1.title':'Co-founder tecnológico','inv.item1.p':'Aportamos equity y trabajo. Tenemos skin in the game desde el día uno, igual que el founder.',
    'inv.item2.title':'Equipo técnico dedicado','inv.item2.p':'Desarrolladores, diseñadores UX y product managers trabajando en tu startup — no divididos entre 10 proyectos.',
    'inv.item3.title':'Red de distribución','inv.item3.p':'Acceso a nuestra red de empresas en Latam para los primeros clientes enterprise y pilotos pagos.',
    'inv.item4.title':'Serie A ready','inv.item4.p':'Te preparamos desde el MVP: métricas, narrativa, data room y conexiones con fondos regionales y de EE.UU.',
    'eq.tag':'El equipo','eq.h2':'Builders primero,<br>inversores segundo','eq.sub':'Venimos de haber construido productos, no solo de haberlos financiado.',
    'eq.role1':'Fundador / CEO','eq.bio1':'10+ años construyendo productos digitales en Costa Rica y EE.UU. Ex-CTO de startup de serie B. Experto en metodología de gestión integral de proyectos.',
    'eq.role2':'Cofundador / CTO','eq.bio2':'Full-stack engineer y arquitecto de software. Construyó sistemas para +500K usuarios en Latam. Lidera el equipo técnico embedded en cada startup.',
    'eq.role3':'VP de Portafolio','eq.bio3':'Especialista en go-to-market para startups B2B. Diseñó y ejecutó el paso 6 — Go-to-Market — de tres proyectos del portafolio.',
    'eq.note':'+ equipo de ingenieros, diseñadores y PMs embebidos en cada startup del portafolio.',
    'faq.tag':'Preguntas frecuentes','faq.h2':'Lo que más nos preguntan',
    'faq.q1':'¿Para quién es ProPositiva?','faq.a1':'Para founders que conocen profundamente un problema de mercado en Latam pero necesitan un socio técnico real para resolverlo. Aportamos capital semilla, equipo de ingeniería dedicado y nuestra Metodología de 7 pasos — de la idea a la operación. No somos un fondo que da dinero y se va; somos parte del cap table y del equipo desde el día uno.',
    'faq.q2':'¿Cuánto capital invierten por proyecto?','faq.a2':'Invertimos entre $50K y $250K USD en etapa pre-seed o seed, combinando capital cash con equipo técnico dedicado. El monto depende del alcance del MVP y el mercado objetivo. Participamos con equity y acompañamos hacia Serie A.',
    'faq.q3':'¿Qué es la Metodología ProPositiva y cómo aplica a tech?','faq.a3':'Es nuestra metodología de gestión integral de 7 pasos, originalmente desarrollada para proyectos complejos y adaptada para startups de software. Va desde el Sustainable Business Plan hasta la Operación exitosa, pasando por validación, financiamiento, diseño técnico, ejecución y go-to-market. Garantiza que ninguna etapa crítica se salte por apuro.',
    'faq.q4':'¿Qué tipo de startups buscan?','faq.a4':'Buscamos startups de software — SaaS, marketplaces, fintech, edtech, healthtech — con un problema real en Latam, fundadores con convicción y potencial de escala regional. No invertimos en hardware, real estate ni commodities.',
    'faq.q5':'¿Cuál es el proceso para aplicar?','faq.a5':'(1) Nos envías un one-pager o pitch deck; (2) si hay fit, agendamos 60 minutos para conocer el problema y el equipo; (3) en 2 semanas tienes decisión con feedback claro — aplique o no. Sin burocracia, sin NDA para la primera conversación.',
    'faq.q6':'¿Tienen que estar en Costa Rica?','faq.a6':'No. Tenemos portafolio activo en Costa Rica, Panamá, Guatemala, Colombia y México. Lo que importa es el problema, el mercado y el founder — no la geografía. Preferimos equipos con presencia en Latam o plan de expansión regional claro.',
    'news.tag':'Para founders en Latam','news.h2':'Recursos, metodología<br>y actualizaciones del portafolio.','news.sub':'Sin spam. Una vez al mes, solo lo que vale la pena leer.','news.placeholder':'tu@email.com','news.btn':'Suscribirme',
    'cta.tag':'Hablemos','cta.h2':'¿Tienes un problema<br>que resolver?','cta.sub':'Construyámoslo juntos.',
    'cta.col1.label':'ProPositiva pone','cta.col1.li1':'Capital semilla ($50K–$250K USD)','cta.col1.li2':'Equipo técnico dedicado','cta.col1.li3':'Metodología de 7 pasos','cta.col1.li4':'Red de distribución en Latam',
    'cta.col2.label':'Tú pones','cta.col2.li1':'La obsesión por el problema','cta.col2.li2':'Conocimiento del mercado','cta.col2.li3':'Compromiso de tiempo completo','cta.col2.li4':'Participación accionaria',
    'cta.body':'Mándanos tu one-pager o pitch deck. En 2 semanas tienes respuesta — aplique o no. Sin NDAs, sin rodeos.',
    'cta.btn1':'Enviar pitch deck','cta.trust3':'Respuesta en 2 semanas',
    'footer.tagline':'Venture studio & seed capital para startups de software en América Latina.',
    'footer.col1':'Empresa','footer.col2':'Portafolio','footer.col3':'Contacto',
    'footer.copy':'© 2026 ProPositiva. Todos los derechos reservados.',
    'dif.tag':'Por qué ProPositiva','dif.h2':'No todos los socios son iguales',
    'dif.sub':'Capital sin equipo es dinero. Equipo sin metodología es caos. ProPositiva es las tres cosas.',
    'dif.col1':'Fondo VC','dif.col2':'Aceleradora','dif.col3':'ProPositiva','dif.badge':'Nosotros','dif.partial':'Parcial',
    'dif.row1':'Capital semilla','dif.row2':'Equipo técnico dedicado','dif.row3':'Metodología estructurada',
    'dif.row4':'Co-founder en cap table','dif.row5':'Acompañamiento hasta operar',
    'dif.row6':'MVP en 8–12 semanas','dif.row7':'Red de distribución Latam','dif.row8':'Prep para Serie A',
    'microcta.man':'¿Eres el founder que buscamos?','microcta.man.arrow':'Aplica ahora →',
    'microcta.test':'Aplica como fundador',
    'microcta.met':'¿Quieres recorrer estos 7 pasos con nosotros?','microcta.met.arrow':'Presenta tu idea →',
  },
  en: {
    'nav.nosotros':'About','nav.portafolio':'Portfolio','nav.metodologia':'Methodology','nav.cta':'Pitch your idea',
    'hero.badge':'Venture Studio · Seed Capital · San José, CR',
    'hero.h1.1':'You know the problem.','hero.h1.2':'You need someone to build it.','hero.h1.3':'We\'re the tech co-founder','hero.h1.4':'Latam','hero.h1.5':'was missing.',
    'hero.sub':'ProPositiva brings seed capital, a dedicated technical team and a 7-step methodology. You bring the problem and market expertise. Together, from idea to operations.',
    'hero.btn1':'View portfolio','hero.btn2':'Our methodology',
    'hero.stat.steps':'Methodology steps','hero.stat.startups':'Co-created startups','hero.stat.capital':'Capital deployed',
    'nos.tag':'Who we are',
    'nos.h2':"We're not<br>just a fund.<br>We're your<br><em>tech</em><br>co-founder.",
    'nos.p1':'ProPositiva is for founders who know a market problem deeply but need <strong>the technical partner, capital and methodology</strong> to turn that knowledge into a product that operates.',
    'nos.p2':"We don't show up with a check and leave. We're involved from business definition to the moment the product generates real value — following our 7-step ProPositiva Methodology, designed for software projects in Latin America.",
    'nos.p3':'Latam produces founders with extraordinary market vision.<br><strong>What was missing was the structured technical co-founder to make it real.</strong>',
    'pillar1.h3':'Capital + team','pillar1.p':"We don't just put in money. We deploy developers, designers and strategists alongside the founder from day one.",
    'pillar2.h3':'Proven methodology','pillar2.p':'7 integrated management steps, adapted from complex projects to software. From the Sustainable Business Plan to successful Operations.',
    'pillar3.h3':'Problem first','pillar3.p':'We invest in solutions to verified problems with real markets — not in technology looking for a customer.',
    'pillar4.h3':'Speed with structure','pillar4.p':'MVP in 8–12 weeks, not months. Our methodology removes friction without sacrificing rigor or scalability.',
    'man.eyebrow':'Manifesto','man.h2':'Ideas change nothing.','man.accent':'Solutions do.',
    'man.p1':'Latin America has the talent. Has the problems. Has the market.',
    'man.p2':'What it has lacked is a <strong>vehicle combining capital, technology and methodology</strong> — a team that truly commits.',
    'man.p3':"At ProPositiva we don't invest in ideas. We invest in founders obsessed with solving them — and walk every step of the way, from idea to operation.",
    'man.p4':'Because innovating without executing is just entertainment.',
    'man.close':"The best software in the region hasn't been written yet.<br><strong>From Costa Rica. For the world.</strong>",
    'port.tag':'Portfolio','port.h2':'Startups already<br>in the world','port.apply':'Apply as a founder',
    'port.status.live':'Live','port.status.beta':'Beta',
    'port.traction.startups':'Co-created startups','port.traction.capital':'Seed capital deployed','port.traction.countries':'Countries with presence','port.traction.steps':'Methodology steps',
    'test.tag':'Founders speak','test.h2':'The team that makes<br>the difference',
    'test.sub':"We don't show up with money and disappear. Here's what those who built with us have to say.",
    'test.q1':'"I spent years in academic management and knew exactly where the system broke. What I didn\'t know was how to build the software. ProPositiva came with a team, methodology and capital. In 10 weeks we had a real MVP with real users. Today we run 40 institutions across three countries."',
    'test.q2':'"I tried freelancers, agencies. I always ended up with code nobody understood and a product nobody wanted to use. With ProPositiva it was different — they have real methodology, not just code. They structured the business before writing a single line."',
    'test.q3':'"I\'m a doctor, not an engineer. I understood the problem better than any technologist — what I needed was someone to turn it into a product without me having to become the CTO. ProPositiva does exactly that."',
    'test.role1':'Co-founder · EduFlow','test.role2':'Co-founder · ClearPay CR','test.role3':'Founder · MediLink',
    'met.tag':'ProPositiva Methodology','met.h2':'Integrated project<br>management for tech',
    'met.sub':'Our methodology was born in complex project management and adapted for software development. Seven steps that take an idea from paper to real operations — without skipping any critical stage.',
    'met.phase.idea':'Idea','met.phase.producto':'Product','met.phase.operacion':'Operations',
    'met.step1.h3':'Sustainable Business Plan','met.step1.tag':'Business design','met.step1.p':'We transform the idea into a concrete value proposition. We define the business model, target market, competitive advantage and key assumptions guiding all development.',
    'met.step2.h3':'Viability & Feasibility','met.step2.tag':'Validation','met.step2.p':'We define the real scope of the product and demonstrate financial self-sustainability. We validate with real users before writing a single line of code.',
    'met.step3.h3':'Financing','met.step3.tag':'Capital','met.step3.p':"We secure the funds to bring the project to life. This is where ProPositiva's seed capital enters — combining cash, technical team and distribution network.",
    'met.step4.h3':'Product Design & Compliance','met.step4.tag':'Technical design','met.step4.p':'Product design and technical architecture. Includes legal incorporation, data structure, user contracts, and regulatory compliance for the target market.',
    'met.step5.h3':'Execution','met.step5.tag':'Build','met.step5.p':'Product development. Modern stack, CI/CD from day one, short sprints with real deliverables. MVP in production in 8–12 weeks with real users from the start.',
    'met.step6.h3':'Go-to-Market','met.step6.tag':'Launch','met.step6.p':'First real contact of the product with the market. Acquisition strategy, onboarding of first customers, retention measurement and sales message adjustment based on real data.',
    'met.step7.h3':'Operations','met.step7.tag':'Scale','met.step7.p':'Full launch of the product or service. Infrastructure cost optimization, support playbook, preparation for the next investment round, and regional scaling.',
    'met.close':"We don't deliver a product and leave.<br><strong>We stay until it operates.</strong>",
    'stack.tag':'Tech stack','stack.h2':'Technology without excuses','stack.sub':'Every project starts with a real technological advantage. Modern tools, proven patterns, observability from day one.',
    'inv.tag':'How we get involved','inv.h3':"We're not vendors.<br>We're part of<br>the cap table.",
    'inv.item1.title':'Tech co-founder','inv.item1.p':'We put in equity and work. We have skin in the game from day one, just like the founder.',
    'inv.item2.title':'Dedicated technical team','inv.item2.p':"Developers, UX designers and product managers working on your startup — not split across 10 projects.",
    'inv.item3.title':'Distribution network','inv.item3.p':'Access to our network of companies in Latam for the first enterprise clients and paid pilots.',
    'inv.item4.title':'Series A ready','inv.item4.p':'We prepare you from the MVP: metrics, narrative, data room and connections with regional and US funds.',
    'eq.tag':'The team','eq.h2':'Builders first,<br>investors second','eq.sub':"We've built products ourselves, not just funded them.",
    'eq.role1':'Founder / CEO','eq.bio1':'10+ years building digital products in Costa Rica and the US. Former CTO of a Series B startup. Expert in integrated project management methodology.',
    'eq.role2':'Co-founder / CTO','eq.bio2':'Full-stack engineer and software architect. Built systems for 500K+ users across Latam. Leads the embedded technical team in each startup.',
    'eq.role3':'VP of Portfolio','eq.bio3':'B2B startup go-to-market specialist. Designed and executed step 6 — Go-to-Market — for three portfolio projects.',
    'eq.note':'+ engineers, designers and embedded PMs in each portfolio startup.',
    'faq.tag':'Frequently asked questions','faq.h2':'What we get asked most',
    'faq.q1':'Who is ProPositiva for?','faq.a1':'For founders who know a market problem deeply in Latam but need a real technical partner to solve it. We bring seed capital, a dedicated engineering team and our 7-step Methodology — from idea to operations. We\'re not a fund that writes a check and disappears; we\'re part of the cap table and the team from day one.',
    'faq.q2':'How much capital do you invest per project?','faq.a2':'We invest between $50K and $250K USD at pre-seed or seed stage, combining cash capital with a dedicated technical team. The amount depends on the MVP scope and target market. We participate with equity and support toward Series A.',
    'faq.q3':'What is the ProPositiva Methodology and how does it apply to tech?','faq.a3':'It\'s our 7-step integrated management methodology, originally developed for complex projects and adapted for software startups. It goes from the Sustainable Business Plan to successful Operations, through validation, financing, technical design, execution and go-to-market. It ensures no critical stage is skipped in the rush.',
    'faq.q4':'What type of startups are you looking for?','faq.a4':'We look for software startups — SaaS, marketplaces, fintech, edtech, healthtech — with a real problem in Latam, founders with conviction and potential for regional scale. We don\'t invest in hardware, real estate or commodities.',
    'faq.q5':'What is the application process?','faq.a5':'(1) Send us a one-pager or pitch deck; (2) if there\'s a fit, we schedule 60 minutes to get to know the problem and team; (3) in 2 weeks you have a clear decision with feedback — yes or no. No bureaucracy, no NDA for the first conversation.',
    'faq.q6':'Do you have to be in Costa Rica?','faq.a6':'No. We have active portfolio in Costa Rica, Panama, Guatemala, Colombia and Mexico. What matters is the problem, the market and the founder — not the geography. We prefer teams with presence in Latam or a clear regional expansion plan.',
    'news.tag':'For founders in Latam','news.h2':'Resources, methodology<br>and portfolio updates.','news.sub':"No spam. Once a month, only what's worth reading.",'news.placeholder':'you@email.com','news.btn':'Subscribe',
    'cta.tag':"Let's talk",'cta.h2':'Got a problem<br>to solve?','cta.sub':"Let's build it together.",
    'cta.col1.label':'ProPositiva brings','cta.col1.li1':'Seed capital ($50K–$250K USD)','cta.col1.li2':'Dedicated technical team','cta.col1.li3':'7-step methodology','cta.col1.li4':'Distribution network in Latam',
    'cta.col2.label':'You bring','cta.col2.li1':'Obsession with the problem','cta.col2.li2':'Market knowledge','cta.col2.li3':'Full-time commitment','cta.col2.li4':'Equity stake',
    'cta.body':'Send us your one-pager or pitch deck. In 2 weeks you have a response — yes or no. No NDAs, no runaround.',
    'cta.btn1':'Send pitch deck','cta.trust3':'2-week response',
    'footer.tagline':'Venture studio & seed capital for software startups in Latin America.',
    'footer.col1':'Company','footer.col2':'Portfolio','footer.col3':'Contact',
    'footer.copy':'© 2026 ProPositiva. All rights reserved.',
    'dif.tag':'Why ProPositiva','dif.h2':'Not all partners are equal',
    'dif.sub':'Capital without a team is just money. A team without methodology is chaos. ProPositiva is all three.',
    'dif.col1':'VC Fund','dif.col2':'Accelerator','dif.col3':'ProPositiva','dif.badge':'Us','dif.partial':'Partial',
    'dif.row1':'Seed capital','dif.row2':'Dedicated technical team','dif.row3':'Structured methodology',
    'dif.row4':'Co-founder on cap table','dif.row5':'Support until operations',
    'dif.row6':'MVP in 8–12 weeks','dif.row7':'Latam distribution network','dif.row8':'Series A prep',
    'microcta.man':"Are you the founder we're looking for?",'microcta.man.arrow':'Apply now →',
    'microcta.test':'Apply as a founder',
    'microcta.met':'Want to follow these 7 steps with us?','microcta.met.arrow':'Pitch your idea →',
  }
};

/* ── I18N — ENGINE ── */
const initI18n = () => {
  const stored  = localStorage.getItem('lang');
  const browser = navigator.language.startsWith('en') ? 'en' : 'es';
  const initial = stored || browser;

  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => [...document.querySelectorAll(sel)];

  const applyTranslations = (l) => {
    const t = TRANSLATIONS[l] || TRANSLATIONS.es;

    const txt = (sel, key) => { const el = $(sel); if (el && t[key] != null) el.textContent = t[key]; };
    const htm = (sel, key) => { const el = $(sel); if (el && t[key] != null) el.innerHTML   = t[key]; };

    /* ── FLOATING CTA ── */
    txt('.floating-cta-btn', 'nav.cta');

    /* ── NAV ── */
    txt('a[href="#nosotros"]',   'nav.nosotros');
    txt('a[href="#portafolio"]', 'nav.portafolio');
    txt('a[href="#metodologia"]','nav.metodologia');
    txt('.nav-cta',              'nav.cta');

    /* ── HERO ── */
    txt('.hero-badge span:last-child', 'hero.badge');
    $$('.hero-heading .hero-line').forEach((el, i) => {
      const k = `hero.h1.${i + 1}`; if (t[k] != null) el.textContent = t[k];
    });
    txt('.hero-sub', 'hero.sub');
    txt('.hero-actions a:first-child', 'hero.btn1');
    /* btn2 has an arrow <span> inside — preserve it */
    const btn2 = $('.hero-actions a:last-child');
    if (btn2 && t['hero.btn2']) {
      const arrow = btn2.querySelector('span');
      btn2.textContent = t['hero.btn2'] + ' ';
      if (arrow) btn2.appendChild(arrow);
    }
    $$('.hero-stats .stat-label').forEach((el, i) => {
      const k = ['hero.stat.steps','hero.stat.startups','hero.stat.capital'][i];
      if (k && t[k] != null) el.textContent = t[k];
    });

    /* ── NOSOTROS ── */
    txt('#nosotros .section-tag', 'nos.tag');
    htm('#nos-heading', 'nos.h2');
    $$('#nosotros .split-right p').forEach((el, i) => {
      const k = `nos.p${i + 1}`; if (t[k] != null) el.innerHTML = t[k];
    });
    $$('.pillar-card').forEach((card, i) => {
      const h = card.querySelector('h3'), p = card.querySelector('p');
      if (h && t[`pillar${i+1}.h3`]) h.textContent = t[`pillar${i+1}.h3`];
      if (p && t[`pillar${i+1}.p`])  p.textContent = t[`pillar${i+1}.p`];
    });

    /* ── MANIFIESTO ── */
    txt('#manifiesto .manifesto-eyebrow',     'man.eyebrow');
    txt('#man-heading',                        'man.h2');
    txt('#manifiesto .manifesto-heading--accent','man.accent');
    $$('#manifiesto .manifesto-body p').forEach((el, i) => {
      const k = ['man.p1','man.p2','man.p3','man.p4','man.close'][i];
      if (k && t[k] != null) el.innerHTML = t[k];
    });

    /* ── PORTAFOLIO ── */
    txt('#portafolio .section-tag',   'port.tag');
    htm('#port-heading',               'port.h2');
    txt('#portafolio .btn--outline-light','port.apply');
    txt('.project-status--live',       'port.status.live');
    $$('.project-status--beta').forEach(el => { if (t['port.status.beta']) el.textContent = t['port.status.beta']; });
    $$('.traction-label').forEach((el, i) => {
      const k = ['port.traction.startups','port.traction.capital','port.traction.countries','port.traction.steps'][i];
      if (k && t[k] != null) el.textContent = t[k];
    });

    /* ── TESTIMONIOS ── */
    txt('#testimonios .section-tag', 'test.tag');
    htm('#test-heading',              'test.h2');
    txt('#testimonios .section-sub', 'test.sub');
    $$('.testimonial-quote').forEach((el, i) => {
      const k = `test.q${i + 1}`; if (t[k] != null) el.textContent = t[k];
    });
    $$('.testimonial-author span').forEach((el, i) => {
      const k = `test.role${i + 1}`; if (t[k] != null) el.textContent = t[k];
    });

    /* ── METODOLOGÍA ── */
    txt('#metodologia .section-tag', 'met.tag');
    htm('#met-heading',               'met.h2');
    txt('#metodologia .section-sub', 'met.sub');
    $$('.met-phase span').forEach((el, i) => {
      const k = ['met.phase.idea','met.phase.producto','met.phase.operacion'][i];
      if (k && t[k] != null) el.textContent = t[k];
    });
    $$('.met-phase-label').forEach((el, i) => {
      const k = ['met.phase.idea','met.phase.producto','met.phase.operacion'][i];
      if (k && t[k] != null) el.textContent = t[k];
    });
    $$('.met-step').forEach((step, i) => {
      const n = i + 1;
      const h   = step.querySelector('h3');
      const tag = step.querySelector('.met-step-tag');
      const p   = step.querySelector('.met-step-body > p');
      if (h   && t[`met.step${n}.h3`])  h.textContent   = t[`met.step${n}.h3`];
      if (tag && t[`met.step${n}.tag`]) tag.textContent  = t[`met.step${n}.tag`];
      if (p   && t[`met.step${n}.p`])   p.textContent    = t[`met.step${n}.p`];
    });
    htm('.met-close p', 'met.close');

    /* ── STACK ── */
    txt('#stack .section-tag', 'stack.tag');
    txt('#stack-heading',       'stack.h2');
    txt('#stack .section-sub', 'stack.sub');
    txt('.involvement-left .section-tag','inv.tag');
    htm('.involvement-heading',          'inv.h3');
    $$('.model-list li').forEach((li, i) => {
      const n = i + 1;
      const s = li.querySelector('strong'), p = li.querySelector('p');
      if (s && t[`inv.item${n}.title`]) s.textContent = t[`inv.item${n}.title`];
      if (p && t[`inv.item${n}.p`])     p.textContent = t[`inv.item${n}.p`];
    });

    /* ── EQUIPO ── */
    txt('#equipo .section-tag', 'eq.tag');
    htm('#eq-heading',           'eq.h2');
    txt('#equipo .section-sub', 'eq.sub');
    $$('.team-card').forEach((card, i) => {
      const n = i + 1;
      const name = card.querySelector('.team-name');
      const bio  = card.querySelector('.team-role');
      if (name && t[`eq.role${n}`]) name.textContent = t[`eq.role${n}`];
      if (bio  && t[`eq.bio${n}`])  bio.textContent  = t[`eq.bio${n}`];
    });
    txt('.team-note', 'eq.note');

    /* ── FAQ ── */
    txt('#faq .section-tag', 'faq.tag');
    txt('#faq-heading',       'faq.h2');
    $$('.faq-item').forEach((item, i) => {
      const n = i + 1;
      const q = item.querySelector('.faq-question');
      const a = item.querySelector('.faq-answer p');
      if (q && t[`faq.q${n}`]) q.textContent = t[`faq.q${n}`];
      if (a && t[`faq.a${n}`]) a.textContent = t[`faq.a${n}`];
    });

    /* ── NEWSLETTER ── */
    txt('.newsletter-band .section-tag', 'news.tag');
    htm('.newsletter-heading',            'news.h2');
    txt('.newsletter-sub',                'news.sub');
    txt('.newsletter-form button',        'news.btn');
    const ni = $('.newsletter-input');
    if (ni && t['news.placeholder']) ni.placeholder = t['news.placeholder'];

    /* ── CTA ── */
    txt('#cta .section-tag', 'cta.tag');
    htm('#cta-heading',       'cta.h2');
    txt('.cta-sub',           'cta.sub');
    $$('.cta-offer-col').forEach((col, ci) => {
      const n = ci + 1;
      const label = col.querySelector('.cta-offer-label');
      if (label && t[`cta.col${n}.label`]) label.textContent = t[`cta.col${n}.label`];
      col.querySelectorAll('.cta-offer-list li').forEach((li, li_i) => {
        const k = `cta.col${n}.li${li_i + 1}`; if (t[k] != null) li.textContent = t[k];
      });
    });
    txt('.cta-body', 'cta.body');
    txt('.cta-actions a:first-child', 'cta.btn1');
    /* trust items have SVG children — replace only the trailing text node */
    const trustItems = $$('.cta-trust-item');
    if (trustItems[2] && t['cta.trust3']) {
      const tn = [...trustItems[2].childNodes].find(n => n.nodeType === 3 && n.textContent.trim());
      if (tn) tn.textContent = ' ' + t['cta.trust3'];
    }

    /* ── FOOTER ── */
    txt('.footer-tagline', 'footer.tagline');
    $$('.footer-col h4').forEach((el, i) => {
      const k = `footer.col${i + 1}`; if (t[k] != null) el.textContent = t[k];
    });
    txt('.footer-copy', 'footer.copy');

    /* ── GENERIC data-i18n sweep (comparison table, micro-CTAs, new elements) ── */
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const v = t[el.dataset.i18n]; if (v != null) el.textContent = v;
    });

    /* ── LANG BUTTON STATES ── */
    $$('[data-lang]').forEach(btn => {
      const active = btn.dataset.lang === l;
      btn.setAttribute('aria-pressed', active ? 'true' : 'false');
    });

    document.documentElement.lang = l;
    localStorage.setItem('lang', l);
  };

  /* Wire buttons */
  $$('[data-lang]').forEach(btn => btn.addEventListener('click', () => applyTranslations(btn.dataset.lang)));

  applyTranslations(initial);
};

/* ── INIT ALL ── */
const init = () => {
  initI18n();
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
  initFloatingCTA();
  initNewsletterForm();
  injectBreadcrumb();
  setTimeout(initAnalytics, 2000);
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
