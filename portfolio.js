document.addEventListener('DOMContentLoaded', function() {
  // Elements
  const portfolioItems = Array.from(document.querySelectorAll('.portfolio-item'));
  const portfolioBackground = document.getElementById('portfolio-background');
  const currentProjectTitle = document.getElementById('current-project-title');
  const projectDetails = document.getElementById('project-details');
  
  // State
  let currentIndex = 0;
  let isScrolling = false;
  const totalProjects = portfolioItems.length;
  let touchStartY = 0;
  let lastScrollTime = 0;
  const scrollDelay = 800;

  // Initialize
  function initPortfolio() {
    // Initialize with first project already showing
    const firstProjectName = portfolioItems[0].querySelector('h3').textContent;
    currentProjectTitle.textContent = `${firstProjectName}`;
    
    initDropdown();
    setupEventListeners();
    updateActiveProject(0, true);
  }

  // Initialize dropdown
  function initDropdown() {
    const dropdown = document.querySelector('.project-dropdown');
    
    portfolioItems.forEach((item, index) => {
      const dropdownItem = document.createElement('div');
      dropdownItem.className = 'project-dropdown-item';
      dropdownItem.textContent = item.querySelector('h3').textContent;
      dropdownItem.addEventListener('click', (e) => {
        e.stopPropagation();
        updateActiveProject(index);
      });
      dropdown.appendChild(dropdownItem);
    });

    // Close dropdown when clicking elsewhere
    document.addEventListener('click', (e) => {
      if (!e.target.closest('#portfolio-title')) {
        dropdown.style.display = 'none';
      }
    });
  }

  // Update active project
  function updateActiveProject(index, immediate = false) {
    if (index < 0) index = totalProjects - 1;
    if (index >= totalProjects) index = 0;
    
    currentIndex = index;
    const activeItem = portfolioItems[index];
    const projectName = activeItem.querySelector('h3').textContent;

    // Update header project name immediately
    currentProjectTitle.textContent = `${projectName}`;

    // Update background
    const bgImage = activeItem.getAttribute('data-bg');
    if (immediate) {
      portfolioBackground.style.backgroundImage = `url(${bgImage})`;
    } else {
      portfolioBackground.classList.add('fading');
      setTimeout(() => {
        portfolioBackground.style.backgroundImage = `url(${bgImage})`;
        setTimeout(() => portfolioBackground.classList.remove('fading'), 300);
      }, 100);
    }
    
    // Update details
    updateProjectDetails(activeItem);
    
    // Scroll to project
    activeItem.scrollIntoView({ 
      behavior: 'smooth',
      block: 'nearest'
    });
  }

