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
    contactTitle: "Contact Us",
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
    contactTitle: "Contáctenos",
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

// Catalog Data
const catalogData = [
  {
    id: 1,
    title: "Catálogo 1",
    thumbnail: "Assets/Images/Catalog/catalog1.jpg",
    description: "Descripción detallada del Catálogo 1.",
  },
  {
    id: 2,
    title: "Catálogo 2",
    thumbnail: "Assets\Images\Catalog\catalog2.jpg",
    description: "Descripción detallada del Catálogo 2.",
  },
  {
    id: 3,
    title: "Catálogo 3",
    thumbnail: "Assets\Images\Catalog\catalog3",
  },
  {
    id: 4,
    title: "Catálogo 4",
    thumbnail: "Assets\Images\Catalog\catalog4",
  },
  // Add more catalog items as needed
];

// Function to generate catalog grid
function generateCatalogGrid(limit) {
  const catalogGrid = document.getElementById("catalog-grid");
  catalogGrid.innerHTML = ""; // Clear existing content

  catalogData.slice(0, limit).forEach((item) => {
    const catalogItem = document.createElement("div");
    catalogItem.classList.add("catalog-item");

    const catalogImage = document.createElement("img");
    catalogImage.src = item.thumbnail;
    catalogImage.alt = item.title;

    const catalogTitle = document.createElement("h3");
    catalogTitle.textContent = item.title;

    catalogItem.appendChild(catalogImage);
    catalogItem.appendChild(catalogTitle);
    catalogGrid.appendChild(catalogItem);
  });
}

// Function to toggle "Show More" / "Show Less" for catalog
function toggleCatalogView() {
  const showMoreButton = document.getElementById("show-more-catalog-button");
  const catalogGrid = document.getElementById("catalog-grid");

  if (showMoreButton.textContent === languageData[currentLanguage].catalogShowMore) {
    generateCatalogGrid(catalogData.length); // Show all catalog items
    showMoreButton.textContent = languageData[currentLanguage].catalogShowLess;
  } else {
    generateCatalogGrid(3); // Show only 3 catalog items
    showMoreButton.textContent = languageData[currentLanguage].catalogShowMore;
  }
}

// Initialize catalog grid with limited items
generateCatalogGrid(3);

// Add event listener to the "Show More" button for catalog
document.getElementById("show-more-catalog-button").addEventListener("click", toggleCatalogView);

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