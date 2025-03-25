document.addEventListener('DOMContentLoaded', function() {
  // Elements
  const portfolioItems = Array.from(document.querySelectorAll('.portfolio-item'));
  const portfolioBackground = document.getElementById('portfolio-background');
  const currentProjectTitle = document.getElementById('current-project-title');
  const portfolioList = document.querySelector('.portfolio-list');
  const dropdown = document.querySelector('.project-dropdown');
  
  // State
  let currentIndex = 0;
  let isScrolling = false;
  let scrollTimeout = null;
  const scrollDelay = 800;
  let touchStartY = 0;

  // Initialize
  function initPortfolio() {
    updateActiveProject(0, true);
    initDropdown();
    setupEventListeners();
  }

  // Initialize dropdown
  function initDropdown() {
    portfolioItems.forEach((item, index) => {
      const dropdownItem = document.createElement('div');
      dropdownItem.className = 'project-dropdown-item';
      dropdownItem.textContent = item.querySelector('h3').textContent;
      dropdownItem.addEventListener('click', (e) => {
        e.stopPropagation();
        updateActiveProject(index);
        dropdown.style.display = 'none';
      });
      dropdown.appendChild(dropdownItem);
    });

    // Toggle dropdown on header click
    document.querySelector('#portfolio-title').addEventListener('click', (e) => {
      e.stopPropagation();
      dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
    });

    // Close dropdown when clicking elsewhere
    document.addEventListener('click', (e) => {
      if (!e.target.closest('#portfolio-title') && !e.target.closest('.project-dropdown')) {
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
    
    // Scroll to project
    if (!immediate) {
      isScrolling = true;
      activeItem.scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => { isScrolling = false; }, 1000);
    }
  }

  // Handle scroll events
  function handleScroll() {
    if (isScrolling) return;
    
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
  }

  // Setup event listeners
  function setupEventListeners() {
    // Scroll detection
    portfolioList.addEventListener('scroll', () => {
      if (!isScrolling) {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(handleScroll, 100);
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

    // Keyboard navigation
    window.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowDown') {
        updateActiveProject(currentIndex + 1);
      } else if (e.key === 'ArrowUp') {
        updateActiveProject(currentIndex - 1);
      }
    });

    // Intersection Observer for precise scroll detection
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !isScrolling) {
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