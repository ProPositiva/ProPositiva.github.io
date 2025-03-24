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
  
  // Initialize
  totalProjectsEl.textContent = totalProjects;
  updateActiveProject(0);
  
  // Core Functions
  function updateActiveProject(index) {
    // Update state
    currentIndex = index;
    currentProjectEl.textContent = index + 1;
    
    // Update active item
    portfolioItems.forEach(item => item.classList.remove('active'));
    const activeItem = portfolioItems[index];
    activeItem.classList.add('active');
    
    // Update background
    const bgImage = activeItem.getAttribute('data-bg');
    portfolioBackground.style.backgroundImage = `url(${bgImage})`;
    
    // Update details
    updateProjectDetails(activeItem);
    
    // Scroll to project
    activeItem.scrollIntoView({ behavior: 'smooth' });
  }
  
  function updateProjectDetails(item) {
    document.getElementById('project-title').textContent = item.getAttribute('data-title');
    document.getElementById('project-description').textContent = item.getAttribute('data-description');
    document.getElementById('project-year').textContent = item.getAttribute('data-year');
    document.getElementById('project-location').textContent = item.getAttribute('data-location');
    projectDetails.classList.add('visible');
  }
  
  // Event Handlers
  function handleScroll(direction) {
    if (isScrolling) return;
    isScrolling = true;
    
    if (direction === 'down') {
      currentIndex = (currentIndex + 1) % totalProjects;
    } else {
      currentIndex = (currentIndex - 1 + totalProjects) % totalProjects;
    }
    
    updateActiveProject(currentIndex);
    setTimeout(() => { isScrolling = false; }, 800);
  }
  
  // Event Listeners
  window.addEventListener('wheel', (e) => {
    if (Math.abs(e.deltaY) > 50) {
      e.preventDefault();
      handleScroll(e.deltaY > 0 ? 'down' : 'up');
    }
  });
  
  window.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown') handleScroll('down');
    if (e.key === 'ArrowUp') handleScroll('up');
  });
  
  // Touch support for mobile
  let touchStartY = 0;
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
});