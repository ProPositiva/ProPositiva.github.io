// Get all portfolio items
const portfolioItems = document.querySelectorAll(".portfolio-item");
const portfolioBackground = document.getElementById("portfolio-background");

// Store the original background image
const originalBackground = portfolioBackground.style.backgroundImage;

// Function to handle portfolio item interaction
function handlePortfolioItemInteraction(item) {
  const bgImage = item.getAttribute("data-bg");
  const text = item.getAttribute("data-text");

  // Change the background image
  portfolioBackground.style.backgroundImage = `url(${bgImage})`;

  // Add brackets to the text
  item.textContent = `[${text}]`;
}

// Function to reset portfolio item interaction
function resetPortfolioItemInteraction(item) {
  const text = item.getAttribute("data-text");

  // Reset the background image
  portfolioBackground.style.backgroundImage = originalBackground;

  // Remove brackets from the text
  item.textContent = text;
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
});