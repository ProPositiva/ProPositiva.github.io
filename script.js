// Initialize hero video
document.addEventListener('DOMContentLoaded', function() {
  const heroVideo = document.getElementById('hero-video');
  
  // Ensure video plays when loaded
  heroVideo.play().catch(error => {
    console.log('Video autoplay prevented:', error);
  });

  // Fallback if video fails to load
  heroVideo.addEventListener('error', function() {
    console.log('Video failed to load');
  });
});

// Language Data
const languageData = {
  en: {
    heroTitle: "Innovative Architecture Solutions",
    heroTagline: "Transforming spaces, building futures.",
    heroCta: "View Our Work",
    aboutTitle: "ABOUT US",
    aboutDescription: "WE ARE A LEADING ARCHITECTURE FIRM SPECIALIZING IN INNOVATIVE DESIGN AND SUSTAINABLE SOLUTIONS.",
    aboutCta: "Learn More",
    servicesTitle: "SERVICES",
    service1Title: "Consulting",
    service1Description: "Expert advice for your architectural needs.",
    service2Title: "Project Management",
    service2Description: "From concept to completion, we manage it all.",
    service3Title: "Real Estate",
    service3Description: "Helping you find the perfect space.",
    portfolioTitle: "PORTFOLIO",
    catalogTitle: "CATALOG",
    testimonialsTitle: "TESTIMONIALS",
    partnersTitle: "OUR ALLIES",
    contactTitle: "CONTACT US",
    contactNameLabel: "Name",
    contactEmailLabel: "Email",
    contactMessageLabel: "Message",
    contactSubmit: "Send Message",
    catalogButton1: "CATALOG",
    catalogButton2: "CONFIGURATOR"
  },
  es: {
    heroTitle: "Soluciones de Arquitectura Innovadoras",
    heroTagline: "Transformando espacios, construyendo futuros.",
    heroCta: "Ver Nuestro Trabajo",
    aboutTitle: "NOSOTROS",
    aboutDescription: "SOMOS UNA FIRMA LÍDER EN ARQUITECTURA ESPECIALIZADA EN DISEÑO INNOVADOR Y SOLUCIONES SOSTENIBLES.",
    aboutCta: "Conocer Más",
    servicesTitle: "SERVICIOS",
    service1Title: "Consultoría",
    service1Description: "Asesoramiento experto para sus necesidades arquitectónicas.",
    service2Title: "Gestión de Proyectos",
    service2Description: "Desde el concepto hasta la finalización, lo gestionamos todo.",
    service3Title: "Bienes Raíces",
    service3Description: "Ayudándole a encontrar el espacio perfecto.",
    portfolioTitle: "PORTAFOLIO",
    catalogTitle: "CATALOGO",
    testimonialsTitle: "TESTIMONIOS",
    partnersTitle: "NUESTROS ALIADOS",
    contactTitle: "CONTACTENOS",
    contactNameLabel: "Nombre",
    contactEmailLabel: "Correo Electrónico",
    contactMessageLabel: "Mensaje",
    contactSubmit: "Enviar",
    catalogButton1: "CATALOGO",
    catalogButton2: "CONFIGURADOR"
  }
};


// Get the language button and all elements with text to update
const languageButton = document.getElementById("language-button");
const elementsToUpdate = {
  heroTitle: document.getElementById("hero-title"),
  heroTagline: document.getElementById("hero-tagline"),
  heroCta: document.getElementById("hero-cta"),
  aboutTitle: document.getElementById("about-title"),
  aboutDescription: document.getElementById("about-description"),
  aboutCta: document.getElementById("about-cta"),
  servicesTitle: document.getElementById("services-title"),
  service1Title: document.getElementById("service-1-title"),
  service1Description: document.getElementById("service-1-description"),
  service2Title: document.getElementById("service-2-title"),
  service2Description: document.getElementById("service-2-description"),
  service3Title: document.getElementById("service-3-title"),
  service3Description: document.getElementById("service-3-description"),
  portfolioTitle: document.getElementById("portfolio-title"),
  catalogTitle: document.getElementById("catalog-title"),
  testimonialsTitle: document.getElementById("testimonials-title"),
  partnersTitle: document.getElementById("partners-title"),
  contactTitle: document.getElementById("contact-title"),
  contactNameLabel: document.getElementById("contact-name-label"),
  contactEmailLabel: document.getElementById("contact-email-label"),
  contactMessageLabel: document.getElementById("contact-message-label"),
  contactSubmit: document.getElementById("contact-submit"),
  catalogButton1: document.getElementById("catalog-button1"),
  catalogButton2: document.getElementById("catalog-button2")
};

// Set initial language to Spanish
let currentLanguage = "es";

// Function to update the language
function updateLanguage(language) {
  const data = languageData[language];
  for (const [key, element] of Object.entries(elementsToUpdate)) {
    if (element) {
      element.textContent = data[key];
    }
  }
}

// Toggle language on button click
languageButton.addEventListener("click", () => {
  if (currentLanguage === "en") {
    currentLanguage = "es";
    languageButton.textContent = "English";
  } else {
    currentLanguage = "en";
    languageButton.textContent = "Español";
  }
  updateLanguage(currentLanguage);
});

// Initialize with Spanish
updateLanguage(currentLanguage);
languageButton.textContent = "English";

// Get all portfolio items
const portfolioItems = document.querySelectorAll(".portfolio-item");
const portfolioBackground = document.getElementById("portfolio-background");

// Store the original background image
/* const originalBackground = portfolioBackground.style.backgroundImage; */

const firstProjectBg = document.querySelector(".portfolio-item").getAttribute("data-bg");
const originalBackground = `url(${firstProjectBg})`;
portfolioBackground.style.backgroundImage = originalBackground;

// Add event listeners for hover
portfolioItems.forEach((item) => {
  item.addEventListener("mouseenter", () => {
    // Change the background image with a delay
    setTimeout(() => {
      const bgImage = item.getAttribute("data-bg");
      portfolioBackground.style.backgroundImage = `url(${bgImage})`;
    }, 100); // 100ms delay

    // Add brackets to the text (including the link item)
    if (!item.classList.contains("portfolio-link")) {
      item.textContent = `[${item.getAttribute("data-text")}]`;
    } else {
      item.querySelector("a").textContent = `[${item.getAttribute("data-text")}]`;
    }
  });

  item.addEventListener("mouseleave", () => {
    // Reset the background image to the original with a delay
    setTimeout(() => {
      portfolioBackground.style.backgroundImage = originalBackground;
    }, 100); // 100ms delay

    // Remove brackets from the text (including the link item)
    if (!item.classList.contains("portfolio-link")) {
      item.textContent = item.getAttribute("data-text");
    } else {
      item.querySelector("a").textContent = item.getAttribute("data-text");
    }
  });
});

// Initialize Partners Carousel
$(document).ready(function () {
  $(".partners-carousel").slick({
    dots: false,
    infinite: true,
    speed: 300,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  });
});
// Second logo fade on scroll
document.addEventListener('DOMContentLoaded', function() {
  const secondLogo = document.querySelector('.second-logo');
  
  window.addEventListener('scroll', function() {
    if (window.scrollY > 10) {
      secondLogo.classList.add('scrolled');
    } else {
      secondLogo.classList.remove('scrolled');
    }
  });
});


// Improved Dock Menu Functionality
const dockWrapper = document.querySelector('.dock-wrapper');
let dockHideTimeout;

// Make the entire left edge trigger area interactive
dockWrapper.style.pointerEvents = 'auto';

dockWrapper.addEventListener('mouseenter', () => {
  clearTimeout(dockHideTimeout);
  dockWrapper.classList.add('dock-visible');
});

dockWrapper.addEventListener('mouseleave', () => {
  dockHideTimeout = setTimeout(() => {
    dockWrapper.classList.remove('dock-visible');
  }, 300);
});

// Handle dock item clicks
document.querySelectorAll('.dock-item').forEach(item => {
  item.addEventListener('click', (e) => {
    if (item.getAttribute('href').startsWith('#')) {
      e.preventDefault();
      const target = document.querySelector(item.getAttribute('href'));
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Mobile Touch Support
if ('ontouchstart' in window) {
  const dock = document.querySelector('.dock-wrapper');
  
  dock.addEventListener('touchstart', (e) => {
    e.currentTarget.classList.add('dock-visible');
  });

  document.addEventListener('touchstart', (e) => {
    if (!e.target.closest('.dock-wrapper')) {
      document.querySelector('.dock-wrapper').classList.remove('dock-visible');
    }
  }, { passive: true });
}