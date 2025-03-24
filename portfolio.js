document.addEventListener('DOMContentLoaded', function() {
  // Elements
  const portfolioItems = Array.from(document.querySelectorAll('.portfolio-item'));
  const portfolioBackground = document.getElementById('portfolio-background');
  const projectDetails = document.getElementById('project-details');
  const currentProjectEl = document.getElementById('current-project');
  const totalProjectsEl = document.getElementById('total-projects');
  
  // State
  let currentIndex = 0;
  let isScrolling = false;
  const totalProjects = portfolioItems.length;
  let touchStartY = 0;
  
  // Initialize
  function initPortfolio() {
    totalProjectsEl.textContent = totalProjects;
    updateActiveProject(0);
    preloadImages();
    
    // Set initial active item
    portfolioItems.forEach((item, index) => {
      if (index === 0) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });
  }
  
  // Preload images for smoother transitions
  function preloadImages() {
    portfolioItems.forEach(item => {
      const bgImage = item.getAttribute('data-bg');
      const img = new Image();
      img.src = bgImage;
    });
  }
  
  // Update active project
  function updateActiveProject(index) {
    if (index < 0 || index >= totalProjects) return;
    
    // Update state
    currentIndex = index;
    currentProjectEl.textContent = index + 1;
    
    // Update active item
    portfolioItems.forEach(item => item.classList.remove('active'));
    const activeItem = portfolioItems[index];
    activeItem.classList.add('active');
    
    // Update background with loading state
    const bgImage = activeItem.getAttribute('data-bg');
    portfolioBackground.style.backgroundImage = `url(${bgImage})`;
    
    // Update details
    updateProjectDetails(activeItem);
    
    // Scroll to project (with smooth behavior)
    activeItem.scrollIntoView({ behavior: 'smooth' });
  }
  
  // Update project details panel
  function updateProjectDetails(item) {
    if (!item) return;
    
    document.getElementById('project-title').textContent = item.getAttribute('data-title') || '';
    document.getElementById('project-description').textContent = item.getAttribute('data-description') || '';
    document.getElementById('project-year').textContent = item.getAttribute('data-year') || '';
    document.getElementById('project-location').textContent = item.getAttribute('data-location') || '';
    
    // Show details panel
    projectDetails.classList.add('visible');
    
    // Hide after delay if no interaction
    setTimeout(() => {
      if (!projectDetails.matches(':hover')) {
        projectDetails.classList.remove('visible');
      }
    }, 5000);
  }
  
  // Handle scroll navigation
  function handleScroll(direction) {
    if (isScrolling) return;
    isScrolling = true;
    
    if (direction === 'down') {
      currentIndex = (currentIndex + 1) % totalProjects;
    } else {
      currentIndex = (currentIndex - 1 + totalProjects) % totalProjects;
    }
    
    updateActiveProject(currentIndex);
    
    // Reset scroll lock after animation completes
    setTimeout(() => {
      isScrolling = false;
    }, 800);
  }
  
  // Debounce function for scroll events
  function debounce(func, wait = 300) {
    let timeout;
    return function(...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), wait);
    };
  }
  
  // Event Listeners
  window.addEventListener('wheel', debounce((e) => {
    if (Math.abs(e.deltaY) > 50) {
      e.preventDefault();
      handleScroll(e.deltaY > 0 ? 'down' : 'up');
    }
  }), { passive: false });
  
  window.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown') handleScroll('down');
    if (e.key === 'ArrowUp') handleScroll('up');
  });
  
  // Touch events for mobile
  window.addEventListener('touchstart', (e) => {
    touchStartY = e.touches[0].clientY;
  }, { passive: true });
  
  window.addEventListener('touchend', (e) => {
    const touchEndY = e.changedTouches[0].clientY;
    const diff = touchStartY - touchEndY;
    if (Math.abs(diff) > 50) {
      handleScroll(diff > 0 ? 'down' : 'up');
    }
  }, { passive: true });
  
  // Click on project items
  portfolioItems.forEach(item => {
    item.addEventListener('click', () => {
      const index = portfolioItems.indexOf(item);
      updateActiveProject(index);
    });
  });
  
  // Show details on hover
  projectDetails.addEventListener('mouseenter', () => {
    projectDetails.classList.add('visible');
  });
  
  projectDetails.addEventListener('mouseleave', () => {
    projectDetails.classList.remove('visible');
  });
  
  // Initialize
  initPortfolio();
});