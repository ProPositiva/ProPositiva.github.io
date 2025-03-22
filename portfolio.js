/* // Get all portfolio items
const portfolioItems = document.querySelectorAll(".portfolio-item");
const portfolioBackground = document.getElementById("portfolio-background");

// Store the original background image
const originalBackground = portfolioBackground.style.backgroundImage;

// Function to handle portfolio item interaction
function handlePortfolioItemInteraction(item) {
  const bgImage = item.getAttribute("data-bg");
  portfolioBackground.style.backgroundImage = `url(${bgImage})`;

  // Add brackets to the text
  item.textContent = `[${item.getAttribute("data-text")}]`;
}

// Function to reset portfolio item interaction
function resetPortfolioItemInteraction(item) {
  portfolioBackground.style.backgroundImage = originalBackground;

  // Remove brackets from the text
  item.textContent = item.getAttribute("data-text");
}

// Add event listeners for hover (desktop) and click (mobile)
portfolioItems.forEach((item) => {
  // Hover for desktop
  item.addEventListener("mouseenter", () => {
    handlePortfolioItemInteraction(item);
  });

  item.addEventListener("mouseleave", () => {
    resetPortfolioItemInteraction(item);
  });

  // Click for mobile
  item.addEventListener("click", () => {
    if (window.innerWidth <= 768) { // Adjust breakpoint as needed
      handlePortfolioItemInteraction(item);
    }
  });
}); */



// Get all portfolio items
const portfolioItems = document.querySelectorAll(".portfolio-item");
const portfolioBackground = document.getElementById("portfolio-background");
const projectDetails = document.getElementById("project-details");
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

  // Show the project details ribbon
  projectDetails.style.display = "block";
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
    projectDetails.style.display = "none"; // Hide the ribbon
  }
});