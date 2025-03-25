document.addEventListener('DOMContentLoaded', function() {
  // Elements
  const portfolioItems = Array.from(document.querySelectorAll('.portfolio-item'));
  const portfolioBackground = document.getElementById('portfolio-background');
  const currentProjectTitle = document.getElementById('current-project-title');
  const projectDetails = document.getElementById('project-details');
  const portfolioList = document.querySelector('.portfolio-list');
  
  // State
  let currentIndex = 0;
  let isScrolling = false;
  let scrollEndTimer = null;
  const scrollDelay = 800;
  let touchStartY = 0;

  // Initialize
  function initPortfolio() {
    // Set initial project
    updateActiveProject(0, true);
    initDropdown();
    setupEventListeners();
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
    if (index < 0 || index >= portfolioItems.length) return;
    
    currentIndex = index;
    const activeItem = portfolioItems[index];
    const projectName = activeItem.querySelector('h3').textContent;

    // Update UI
    currentProjectTitle.textContent = projectName;
    
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
  }

  function updateProjectDetails(item) {
    document.getElementById('project-title').textContent = item.querySelector('h3').textContent;
    document.getElementById('project-description').textContent = item.getAttribute('data-description');
    document.getElementById('project-year').textContent = item.getAttribute('data-year');
    document.getElementById('project-location').textContent = item.getAttribute('data-location');
    projectDetails.classList.add('visible');
  }

  // Improved scroll handling
  function handleScrollEnd() {
    if (isScrolling) return;
    isScrolling = true;
    
    // Find which project is currently in view
    const portfolioRect = portfolioList.getBoundingClientRect();
    let closestItem = null;
    let closestDistance = Infinity;
    
    portfolioItems.forEach((item, index) => {
      const itemRect = item.getBoundingClientRect();
      const distance = Math.abs(portfolioRect.top - itemRect.top);
      
      if (distance < closestDistance) {
        closestDistance = distance;
        closestItem = index;
      }
    });
    
    if (closestItem !== null && closestItem !== currentIndex) {
      currentIndex = closestItem;
      updateActiveProject(currentIndex);
    }
    
    isScrolling = false;
  }

  // Setup event listeners
  function setupEventListeners() {
    // Mouse wheel/trackpad
    portfolioList.addEventListener('wheel', (e) => {
      e.preventDefault();
      
      if (Math.abs(e.deltaY) > 5) {
        clearTimeout(scrollEndTimer);
        scrollEndTimer = setTimeout(handleScrollEnd, 100);
      }
    }, { passive: false });

    // Keyboard navigation
    window.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        updateActiveProject(currentIndex + 1);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        updateActiveProject(currentIndex - 1);
      }
    });

    // Touch events for mobile
    portfolioList.addEventListener('touchstart', (e) => {
      touchStartY = e.touches[0].clientY;
    }, { passive: true });

    portfolioList.addEventListener('touchend', (e) => {
      const touchEndY = e.changedTouches[0].clientY;
      const diff = touchStartY - touchEndY;
      
      if (Math.abs(diff) > 50) {
        if (diff > 0) {
          updateActiveProject(currentIndex + 1);
        } else {
          updateActiveProject(currentIndex - 1);
        }
      }
    }, { passive: true });

    // Click project items
    portfolioItems.forEach(item => {
      item.addEventListener('click', () => {
        const index = portfolioItems.indexOf(item);
        updateActiveProject(index);
      });
    });

    // Improved Intersection Observer
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const index = portfolioItems.indexOf(entry.target);
          if (index !== -1 && index !== currentIndex) {
            currentIndex = index;
            updateActiveProject(index);
          }
        }
      });
    }, {
      root: portfolioList,
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