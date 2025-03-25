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
    currentProjectTitle.textContent = `/${firstProjectName}`;
    
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

  function updateProjectDetails(item) {
    document.getElementById('project-title').textContent = item.querySelector('h3').textContent;
    document.getElementById('project-description').textContent = item.getAttribute('data-description');
    document.getElementById('project-year').textContent = item.getAttribute('data-year');
    document.getElementById('project-location').textContent = item.getAttribute('data-location');
    projectDetails.classList.add('visible');
  }

  // Handle scroll navigation
  function handleScroll(direction) {
    const now = Date.now();
    if (isScrolling || now - lastScrollTime < scrollDelay) return;
    
    lastScrollTime = now;
    isScrolling = true;
    
    if (direction === 'down') {
      currentIndex = (currentIndex + 1) % totalProjects;
    } else {
      currentIndex = (currentIndex - 1 + totalProjects) % totalProjects;
    }
    
    updateActiveProject(currentIndex);
    
    setTimeout(() => {
      isScrolling = false;
    }, scrollDelay);
  }

  // Setup event listeners
  function setupEventListeners() {
    // Wheel scroll
    window.addEventListener('wheel', (e) => {
      if (Math.abs(e.deltaY) > 30) {
        e.preventDefault();
        handleScroll(e.deltaY > 0 ? 'down' : 'up');
      }
    }, { passive: false });

    // Keyboard navigation
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

    // Click project items
    portfolioItems.forEach(item => {
      item.addEventListener('click', () => {
        const index = portfolioItems.indexOf(item);
        updateActiveProject(index);
      });
    });

    // Intersection Observer for scroll detection
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !isScrolling) {
          const index = portfolioItems.indexOf(entry.target);
          if (index !== -1 && index !== currentIndex) {
            updateActiveProject(index);
          }
        }
      });
    }, {
      root: null,
      rootMargin: '0px',
      threshold: 0.7
    });

    // Observe all portfolio items
    portfolioItems.forEach(item => {
      observer.observe(item);
    });
  }

  // Initialize everything
  initPortfolio();
});