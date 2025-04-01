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
// Service Panels with Original Structure
const servicePanels = document.querySelectorAll('.panel');
const hiddenPanel = document.querySelector('.hidden-panel');
const closePanelBtn = document.querySelector('.close-panel');
const serviceDetails = document.getElementById('service-details');

// Enhanced Service Content
const serviceContent = {
  consulting: `
    <div class="service-detail-content">
      <div class="process-header">
        <div>
          <div class="process-category">CONSULTORÍA</div>
          <div class="process-icon">
            <img src="Assets/Icons/consulting-icon.png" alt="Consultoría" class="icon-img">
          </div>
        </div>
        <div class="process-abbrev">CON</div>
      </div>
      <div class="detailed-description">
        <h3>CONSULTORÍA ESPECIALIZADA</h3>
        <p>Nuestro equipo de consultores ofrece soluciones arquitectónicas personalizadas para cada proyecto:</p>
        <ul>
          <li>Análisis de viabilidad técnica y económica</li>
          <li>Estudios de mercado y ubicación</li>
          <li>Optimización de espacios y flujos</li>
          <li>Asesoría en normativas y permisos</li>
          <li>Soluciones sostenibles y eficientes</li>
        </ul>
      </div>
    </div>
  `,
  management: `
    <div class="service-detail-content">
      <div class="process-header">
        <div>
          <div class="process-category">GESTIÓN DE PROYECTOS</div>
          <div class="process-icon">
            <img src="Assets/Icons/project-management-icon.png" alt="Gestión de Proyectos" class="icon-img">
          </div>
        </div>
        <div class="process-abbrev">GES</div>
      </div>
      <div class="detailed-description">
        <h3>GESTIÓN INTEGRAL DE PROYECTOS</h3>
        <p>Coordinamos todos los aspectos de su proyecto arquitectónico:</p>
        <ul>
          <li>Planificación estratégica y programación</li>
          <li>Control de presupuestos y cronogramas</li>
          <li>Selección y coordinación de contratistas</li>
          <li>Supervisión de obra y control de calidad</li>
          <li>Gestión de riesgos y soluciones</li>
        </ul>
      </div>
    </div>
  `,
  real-estate: `
    <div class="service-detail-content">
      <div class="process-header">
        <div>
          <div class="process-category">BIENES RAÍCES</div>
          <div class="process-icon">
            <img src="Assets/Icons/real-estate-icon.png" alt="Bienes Raíces" class="icon-img">
          </div>
        </div>
        <div class="process-abbrev">BIR</div>
      </div>
      <div class="detailed-description">
        <h3>SOLUCIONES INMOBILIARIAS INTEGRALES</h3>
        <p>Servicios completos para sus necesidades de bienes raíces:</p>
        <ul>
          <li>Evaluación y valoración de propiedades</li>
          <li>Asesoría legal y contractual</li>
          <li>Gestión de inversiones y desarrollos</li>
          <li>Estudios de mercado y tendencias</li>
          <li>Soluciones personalizadas</li>
        </ul>
      </div>
    </div>
  `
};

// Panel Click Handlers
servicePanels.forEach(panel => {
  panel.addEventListener('click', function() {
    const serviceType = this.getAttribute('data-service');
    serviceDetails.innerHTML = serviceContent[serviceType];
    hiddenPanel.classList.add('visible');
    document.body.style.overflow = 'hidden';
  });
});

// Close Panel Handler
closePanelBtn.addEventListener('click', function() {
  hiddenPanel.classList.remove('visible');
  document.body.style.overflow = 'auto';
});

// Scroll Trigger - More Subtle
window.addEventListener('scroll', function() {
  const servicesSection = document.getElementById('services');
  const scrollPosition = window.scrollY;
  const sectionPosition = servicesSection.offsetTop;
  const sectionHeight = servicesSection.offsetHeight;
  
  // Only trigger if we've scrolled past 60% of the section
  if (scrollPosition > sectionPosition + sectionHeight * 0.6) {
    if (!hiddenPanel.classList.contains('visible')) {
      hiddenPanel.classList.add('visible');
    }
  } else if (scrollPosition < sectionPosition + sectionHeight * 0.4) {
    hiddenPanel.classList.remove('visible');
  }
});
