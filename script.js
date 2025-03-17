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

// Function to show project details in split-screen
function showProjectDetails(project) {
  const overlay = document.getElementById("project-details-overlay");
  const projectDetails = document.getElementById("project-details");

  // Populate project details
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
    <button class="close-button">Cerrar</button>
  `;

  // Show the overlay
  overlay.classList.add("active");

  // Add event listener to close button
  const closeButton = projectDetails.querySelector(".close-button");
  closeButton.addEventListener("click", () => {
    overlay.classList.remove("active");
  });

  // Close overlay when clicking outside the details section
  overlay.addEventListener("click", (event) => {
    if (event.target === overlay) {
      overlay.classList.remove("active");
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