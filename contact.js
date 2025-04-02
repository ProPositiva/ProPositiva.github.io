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
    portfolioShowMore: "Show More",
    portfolioShowLess: "Show Less",
    catalogTitle: "CATALOG",
    catalogShowMore: "Show More",
    catalogShowLess: "Show Less",
    testimonialsTitle: "What Our Clients Say",
    partnersTitle: "OUR ALLIES",
    contactTitle: "CONTACT US",
    contactNameLabel: "Name",
    contactEmailLabel: "Email",
    contactMessageLabel: "Message",
    contactSubmit: "Send Message",
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
    portfolioShowMore: "Mostrar Más",
    portfolioShowLess: "Mostrar Menos",
    catalogTitle: "CATALOGO",
    catalogShowMore: "Mostrar Más",
    catalogShowLess: "Mostrar Menos",
    testimonialsTitle: "Lo Que Dicen los Clientes",
    partnersTitle: "NUESTROS ALIADOS",
    contactTitle: "CONTACTENOS",
    contactNameLabel: "Nombre",
    contactEmailLabel: "Correo Electrónico",
    contactMessageLabel: "Mensaje",
    contactSubmit: "Enviar Mensaje",
  },
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
  portfolioShowMore: document.getElementById("show-more-button"),
  catalogTitle: document.getElementById("catalog-title"),
  catalogShowMore: document.getElementById("show-more-catalog-button"),
  testimonialsTitle: document.getElementById("testimonials-title"),
  partnersTitle: document.getElementById("partners-title"),
  contactTitle: document.getElementById("contact-title"),
  contactNameLabel: document.getElementById("contact-name-label"),
  contactEmailLabel: document.getElementById("contact-email-label"),
  contactMessageLabel: document.getElementById("contact-message-label"),
  contactSubmit: document.getElementById("contact-submit"),
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


// Initialize Partners Carousel
$(document).ready(function () {
  $(".partners-carousel").slick({
    dots: false,
    infinite: true,
    speed: 300,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    centerMode: true,
    centerPadding: '60px',
    arrows: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          centerMode: true,
          centerPadding: '40px'
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: true,
          centerPadding: '40px'
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: true,
          centerPadding: '20px'
        },
      },
    ],
  });
  
  // Custom arrow positioning
  $('.slick-prev').css('left', '25px');
  $('.slick-next').css('right', '25px');
});