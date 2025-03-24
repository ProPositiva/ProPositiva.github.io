// Get all portfolio items
const portfolioItems = document.querySelectorAll(".portfolio-item");
const portfolioBackground = document.getElementById("portfolio-background");
const projectDetailsSection = document.getElementById("project-details-section");
const projectName = document.getElementById("project-name");
const projectDescription = document.getElementById("project-description");

// Store the original background image
const originalBackground = portfolioBackground.style.backgroundImage;

// Function to handle portfolio item hover
function handlePortfolioItemHover(item) {
  const text = item.getAttribute("data-text");

  // Add brackets and change color
  item.textContent = `[${text}]`;
  item.style.color = "#ecb306"; // Change text color to gold
  item.style.transform = "scale(1.05)"; // Slightly increase size
}

// Function to reset portfolio item hover
function resetPortfolioItemHover(item) {
  const text = item.getAttribute("data-text");

  // Remove brackets and reset color
  item.textContent = text;
  item.style.color = "#ffffff"; // Reset text color to white
  item.style.transform = "scale(1)"; // Reset size
}

// Function to handle portfolio item click
function handlePortfolioItemClick(item) {
  const bgImage = item.getAttribute("data-bg");
  const text = item.getAttribute("data-text");
  const description = item.getAttribute("data-description");

  // Change the background image
  portfolioBackground.style.backgroundImage = `url(${bgImage})`;

  // Update project details
  projectName.textContent = text;
  projectDescription.textContent = description;

  // Show the project details section
  projectDetailsSection.style.display = "block";
}

// Add event listeners for hover and click
portfolioItems.forEach((item) => {
  // Hover for desktop
  item.addEventListener("mouseenter", () => {
    handlePortfolioItemHover(item);
  });

  item.addEventListener("mouseleave", () => {
    resetPortfolioItemHover(item);
  });

  // Click for background image and project details
  item.addEventListener("click", () => {
    handlePortfolioItemClick(item);
  });
});

// Optional: Reset to default when clicking outside the portfolio items
document.addEventListener("click", (event) => {
  if (!event.target.closest(".portfolio-item")) {
    portfolioBackground.style.backgroundImage = originalBackground;
    projectDetailsSection.style.display = "none"; // Hide the project details section
  }
});

let currentProjectIndex = 0;
const portfolioItems = Array.from(document.querySelectorAll(".portfolio-item"));
const totalProjects = portfolioItems.length;

// Initialize
document.getElementById("total-projects").textContent = totalProjects;
updateActiveProject(0);

// Handle wheel events
window.addEventListener("wheel", (e) => {
  e.preventDefault();
  
  if (e.deltaY > 0) {
    // Scroll down - next project
    currentProjectIndex = (currentProjectIndex + 1) % totalProjects;
  } else {
    // Scroll up - previous project
    currentProjectIndex = (currentProjectIndex - 1 + totalProjects) % totalProjects;
  }
  
  updateActiveProject(currentProjectIndex);
});

// Handle keyboard arrows
window.addEventListener("keydown", (e) => {
  if (e.key === "ArrowDown") {
    currentProjectIndex = (currentProjectIndex + 1) % totalProjects;
    updateActiveProject(currentProjectIndex);
  } else if (e.key === "ArrowUp") {
    currentProjectIndex = (currentProjectIndex - 1 + totalProjects) % totalProjects;
    updateActiveProject(currentProjectIndex);
  }
});

function updateActiveProject(index) {
  // Update counter
  document.getElementById("current-project").textContent = index + 1;
  
  // Get current project
  const project = portfolioItems[index];
  
  // Update background
  const bgImage = project.getAttribute("data-bg");
  document.getElementById("portfolio-background").style.backgroundImage = `url(${bgImage})`;
  
  // Update details
  document.getElementById("project-name").textContent = project.getAttribute("data-text");
  document.getElementById("project-description").textContent = project.getAttribute("data-description");
  
  // Scroll to project
  project.scrollIntoView({ behavior: "smooth" });
  
  // Highlight active project
  portfolioItems.forEach(item => item.classList.remove("active"));
  project.classList.add("active");
}