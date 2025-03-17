// Language Data
const languageData = {
  en: {
    heroTitle: "Innovative Architecture Solutions",
    heroTagline: "Transforming spaces, building futures.",
    heroCta: "View Our Work",
    aboutTitle: "About Us",
    aboutDescription: "We are a leading architecture firm specializing in innovative design and sustainable solutions.",
    aboutCta: "Learn More",
    servicesTitle: "Our Services",
    service1Title: "Consulting",
    service1Description: "Expert advice for your architectural needs.",
    service2Title: "Project Management",
    service2Description: "From concept to completion, we manage it all.",
    service3Title: "Real Estate",
    service3Description: "Helping you find the perfect space.",
    portfolioTitle: "Our Portfolio",
    portfolioShowMore: "Show More",
    portfolioShowLess: "Show Less",
    catalogTitle: "Our Catalog",
    catalogShowMore: "Show More",
    catalogShowLess: "Show Less",
    testimonialsTitle: "What Our Clients Say",
    partnersTitle: "Our Allies",
    contactTitle: "Contact Us",
    contactNameLabel: "Your Name",
    contactEmailLabel: "Your Email",
    contactMessageLabel: "Your Message",
    contactSubmit: "Send Message",
  },
  es: {
    heroTitle: "Soluciones de Arquitectura Innovadoras",
    heroTagline: "Transformando espacios, construyendo futuros.",
    heroCta: "Ver Nuestro Trabajo",
    aboutTitle: "Sobre Nosotros",
    aboutDescription: "Somos una firma líder en arquitectura especializada en diseño innovador y soluciones sostenibles.",
    aboutCta: "Saber Más",
    servicesTitle: "Nuestros Servicios",
    service1Title: "Consultoría",
    service1Description: "Asesoramiento experto para sus necesidades arquitectónicas.",
    service2Title: "Gestión de Proyectos",
    service2Description: "Desde el concepto hasta la finalización, lo gestionamos todo.",
    service3Title: "Bienes Raíces",
    service3Description: "Ayudándole a encontrar el espacio perfecto.",
    portfolioTitle: "Nuestro Portafolio",
    portfolioShowMore: "Mostrar Más",
    portfolioShowLess: "Mostrar Menos",
    catalogTitle: "Nuestro Catálogo",
    catalogShowMore: "Mostrar Más",
    catalogShowLess: "Mostrar Menos",
    testimonialsTitle: "Lo Que Dicen Nuestros Clientes",
    partnersTitle: "Nuestros Aliados",
    contactTitle: "Contáctenos",
    contactNameLabel: "Su Nombre",
    contactEmailLabel: "Su Correo Electrónico",
    contactMessageLabel: "Su Mensaje",
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

// Portfolio Data
const portfolioData = [
  {
    id: 1,
    title: "Proyecto 1",
    thumbnail: "Assets\Images\Projects\project1",
    images: ["assets/images/project1-1.jpg", "assets/images/project1-2.jpg"],
    videos: ["assets/videos/project1.mp4"],
    description: "Descripción detallada del Proyecto 1.",
    cost: "$50,000",
    time: "3 meses",
  },
  {
    id: 2,
    title: "Proyecto 2",
    thumbnail: "Assets\Images\Projects\project2",
    images: ["assets/images/project2-1.jpg", "assets/images/project2-2.jpg"],
    videos: ["assets/videos/project2.mp4"],
    description: "Descripción detallada del Proyecto 2.",
    cost: "$75,000",
    time: "6 meses",
  },
  {
    id: 3,
    title: "Proyecto 3",
    thumbnail: "Assets\Images\Projects\project3",
    images: ["assets/images/project2-1.jpg", "assets/images/project2-2.jpg"],
    videos: ["assets/videos/project2.mp4"],
    description: "Descripción detallada del Proyecto 3.",
    cost: "$100,000",
    time: "9 meses",
  },
  {
    id: 4,
    title: "Proyecto 4",
    thumbnail: "Assets\Images\Projects\project4",
    images: ["assets/images/project2-1.jpg", "assets/images/project2-2.jpg"],
    videos: ["assets/videos/project2.mp4"],
    description: "Descripción detallada del Proyecto 4.",
    cost: "$125,000",
    time: "12 meses",
  },
  // Add more projects as needed
];

// Function to generate portfolio grid
function generatePortfolioGrid(limit) {
  const portfolioGrid = document.getElementById("portfolio-grid");
  portfolioGrid.innerHTML = ""; // Clear existing content

  portfolioData.slice(0, limit).forEach((project) => {
    const projectItem = document.createElement("div");
    projectItem.classList.add("portfolio-item");
    projectItem.dataset.id = project.id; // Add project ID as data attribute

    const projectImage = document.createElement("img");
    projectImage.src = project.thumbnail;
    projectImage.alt = project.title;

    const projectTitle = document.createElement("h3");
    projectTitle.textContent = project.title;

    projectItem.appendChild(projectImage);
    projectItem.appendChild(projectTitle);
    portfolioGrid.appendChild(projectItem);

    // Add click event to show project details
    projectItem.addEventListener("click", () => showProjectDetails(project));
  });
}

// Function to show project details in modal
function showProjectDetails(project) {
  const modal = document.getElementById("project-details-modal");
  const modalContent = document.querySelector(".project-details-content");
  const projectTitle = document.getElementById("project-details-title");
  const projectDescription = document.getElementById("project-details-description");
  const projectCost = document.getElementById("project-details-cost");
  const projectTime = document.getElementById("project-details-time");
  const projectMedia = document.querySelector(".project-media");

  // Set the background image of the modal content
  modalContent.style.backgroundImage = `url(${project.thumbnail})`;

  // Populate project details
  projectTitle.textContent = project.title;
  projectDescription.textContent = project.description;
  projectCost.textContent = project.cost;
  projectTime.textContent = project.time;

  // Clear existing media content
  projectMedia.innerHTML = "";

  // Add images
  project.images.forEach((image) => {
    const img = document.createElement("img");
    img.src = image;
    img.alt = project.title;
    projectMedia.appendChild(img);
  });

  // Add videos
  project.videos.forEach((video) => {
    const vid = document.createElement("video");
    vid.controls = true;
    const source = document.createElement("source");
    source.src = video;
    source.type = "video/mp4";
    vid.appendChild(source);
    projectMedia.appendChild(vid);
  });

  // Show the modal
  modal.classList.add("active");

  // Add event listener to close button
  const closeButton = document.getElementById("close-modal-button");
  closeButton.addEventListener("click", () => {
    modal.classList.remove("active");
  });

  // Close modal when clicking outside the content
  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.classList.remove("active");
    }
  });
}

// Function to toggle "Show More" / "Show Less"
function togglePortfolioView() {
  const showMoreButton = document.getElementById("show-more-button");
  const portfolioGrid = document.getElementById("portfolio-grid");

  if (showMoreButton.textContent === languageData[currentLanguage].portfolioShowMore) {
    generatePortfolioGrid(portfolioData.length); // Show all projects
    showMoreButton.textContent = languageData[currentLanguage].portfolioShowLess;
  } else {
    generatePortfolioGrid(3); // Show only 3 projects
    showMoreButton.textContent = languageData[currentLanguage].portfolioShowMore;
  }
}

// Initialize portfolio grid with limited projects
generatePortfolioGrid(3);

// Add event listener to the "Show More" button
document.getElementById("show-more-button").addEventListener("click", togglePortfolioView);

// Catalog Data
const catalogData = [
  {
    id: 1,
    title: "Catálogo 1",
    thumbnail: "Assets\Images\Catalog\catalog1.jpg",
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
    images: ["assets/images/project2-1.jpg", "assets/images/project2-2.jpg"],
    videos: ["assets/videos/project2.mp4"],
    description: "Descripción detallada del Catálogo 3.",
    cost: "$100,000",
    time: "9 meses",
  },
  {
    id: 4,
    title: "Catálogo 4",
    thumbnail: "Assets\Images\Catalog\catalog14",
    images: ["assets/images/project2-1.jpg", "assets/images/project2-2.jpg"],
    videos: ["assets/videos/project2.mp4"],
    description: "Descripción detallada del Catálogo 4.",
    cost: "$125,000",
    time: "12 meses",
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
    dots: true,
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