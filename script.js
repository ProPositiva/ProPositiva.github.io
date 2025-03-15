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
    testimonialsTitle: "What Our Clients Say",
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
    testimonialsTitle: "Lo Que Dicen Nuestros Clientes",
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
  testimonialsTitle: document.getElementById("testimonials-title"),
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
    thumbnail: "assets/images/project1.jpg",
    images: ["assets/images/project1-1.jpg", "assets/images/project1-2.jpg"],
    videos: ["assets/videos/project1.mp4"],
    description: "Descripción detallada del Proyecto 1.",
    cost: "$50,000",
    time: "3 meses",
  },
  {
    id: 2,
    title: "Proyecto 2",
    thumbnail: "assets/images/project2.jpg",
    images: ["assets/images/project2-1.jpg", "assets/images/project2-2.jpg"],
    videos: ["assets/videos/project2.mp4"],
    description: "Descripción detallada del Proyecto 2.",
    cost: "$75,000",
    time: "6 meses",
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

// Function to show project details
function showProjectDetails(project) {
  const projectDetails = document.getElementById("project-details");
  projectDetails.innerHTML = `
    <h3>${project.title}</h3>
    <div class="project-media">
      ${project.images.map((image) => `<img src="${image}" alt="${project.title}">`).join("")}
      ${project.videos.map((video) => `<video controls><source src="${video}" type="video/mp4"></video>`).join("")}
    </div>
    <div class="project-info">
      <p><strong>Descripción:</strong> ${project.description}</p>
      <p><strong>Costo Estimado:</strong> ${project.cost}</p>
      <p><strong>Tiempo Estimado:</strong> ${project.time}</p>
    </div>
  `;

  // Show the project details section
  projectDetails.classList.add("active");

  // Add event listener to close the details section when clicking outside
  document.addEventListener("click", (event) => {
    if (!projectDetails.contains(event.target) && !event.target.closest(".portfolio-item")) {
      projectDetails.classList.remove("active");
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