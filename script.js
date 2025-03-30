// Language Data
const languageData = {
  en: {
    heroTitle: "Innovative Architecture Solutions",
    heroTagline: "Transforming spaces, building futures.",
    heroCta: "View Our Work",
    aboutTitle: "About Us",
    aboutDescription: "We are a leading architecture firm specializing in innovative design and sustainable solutions.",
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
    testimonialsTitle: "What Our Clients Say",
    partnersTitle: "OUR ALLIES",
    contactTitle: "CONTACT US",
    contactNameLabel: "Name",
    contactEmailLabel: "Email",
    contactMessageLabel: "Message",
    contactSubmit: "Send Message",
    processHeading1: "We combine our passion for architectural design",
    processHeading2: "with our technical knowledge to help you grow.",
    processCategory1: "CONSULTING",
    processCategory2: "MANAGEMENT",
    processCategory3: "REAL ESTATE",
    catalogButton1: "CATALOG",
    catalogButton2: "CONFIGURATOR"
  },
  es: {
    heroTitle: "Soluciones de Arquitectura Innovadoras",
    heroTagline: "Transformando espacios, construyendo futuros.",
    heroCta: "Ver Nuestro Trabajo",
    aboutTitle: "Sobre Nosotros",
    aboutDescription: "Somos una firma líder en arquitectura especializada en diseño innovador y soluciones sostenibles.",
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
    testimonialsTitle: "Lo Que Dicen los Clientes",
    partnersTitle: "NUESTROS ALIADOS",
    contactTitle: "CONTACTENOS",
    contactNameLabel: "Nombre",
    contactEmailLabel: "Correo Electrónico",
    contactMessageLabel: "Mensaje",
    contactSubmit: "Enviar Mensaje",
    processHeading1: "Combinamos nuestra pasión por el diseño arquitectónico",
    processHeading2: "con nuestro conocimiento técnico para ayudarte a crecer.",
    processCategory1: "CONSULTORÍA",
    processCategory2: "GESTIÓN",
    processCategory3: "BIENES RAÍCES",
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
  service1Title: document.querySelector(".process-item:nth-child(1) .process-category"),
  service1Description: document.getElementById("service-1-description"),
  service2Title: document.querySelector(".process-item:nth-child(2) .process-category"),
  service2Description: document.getElementById("service-2-description"),
  service3Title: document.querySelector(".process-item:nth-child(3) .process-category"),
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
  processHeading1: document.querySelector(".heading-line:nth-child(1)"),
  processHeading2: document.querySelector(".heading-line:nth-child(2)"),
  catalogButton1: document.querySelector(".catalog-link:first-child"),
  catalogButton2: document.querySelector(".catalog-link:last-child")
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
const originalBackground = portfolioBackground.style.backgroundImage;

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

// Initialize scroll animations for services section
document.addEventListener('DOMContentLoaded', function() {
  // Set header height CSS variable
  const header = document.querySelector('header');
  if (header) {
    document.documentElement.style.setProperty(
      '--header-height', 
      `${header.offsetHeight}px`
    );
  }

  // Intersection Observer for scroll animations
  const animateOnScroll = function() {
    const itemsToAnimate = document.querySelectorAll('.process-item');
    
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    itemsToAnimate.forEach(item => {
      observer.observe(item);
    });
  };

  // Initialize effects
  animateOnScroll();

  // Resize observer for header height changes
  const resizeObserver = new ResizeObserver(entries => {
    for (let entry of entries) {
      if (entry.target === header) {
        document.documentElement.style.setProperty(
          '--header-height', 
          `${entry.contentRect.height}px`
        );
      }
    }
  });

  if (header) {
    resizeObserver.observe(header);
  }
});