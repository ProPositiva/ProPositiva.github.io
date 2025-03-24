document.addEventListener('DOMContentLoaded', function() {
  // Elements
  const portfolioItems = Array.from(document.querySelectorAll('.portfolio-item'));
  const portfolioBackground = document.getElementById('portfolio-background');
  const projectDetails = document.getElementById('project-details');
  const currentProjectTitle = document.getElementById('current-project-title');
  const portfolioTitle = document.getElementById('portfolio-title');
  
  // State
  let currentIndex = 0;
  let isScrolling = false;
  let isAnimating = false;
  const totalProjects = portfolioItems.length;
  let touchStartY = 0;
  let lastScrollTime = 0;
  const scrollDelay = 1000;

  // Initialize
  function initPortfolio() {
    updateActiveProject(0, true);
    preloadImages();
  }

  // Preload images
  function preloadImages() {
    portfolioItems.forEach(item => {
      const bgImage = item.getAttribute('data-bg');
      const img = new Image();
      img.src = bgImage;
    });
  }

  // Update active project
  function updateActiveProject(index, immediate = false) {
    if (index < 0) index = totalProjects - 1;
    if (index >= totalProjects) index = 0;
    
    // Update state
    currentIndex = index;
    
    // Update active item
    portfolioItems.forEach(item => item.classList.remove('active'));
    const activeItem = portfolioItems[index];
    activeItem.classList.add('active');
    
    // Update project title
    const projectName = activeItem.getAttribute('data-title');
    currentProjectTitle.textContent = `/${projectName}`;
    
    // Update background
    const bgImage = activeItem.getAttribute('data-bg');
    
    if (immediate) {
      portfolioBackground.style.backgroundImage = `url(${bgImage})`;
    } else {
      portfolioBackground.classList.add('fading');
      setTimeout(() => {
        portfolioBackground.style.backgroundImage = `url(${bgImage})`;
        setTimeout(() => {
          portfolioBackground.classList.remove('fading');
        }, 500);
      }, 100);
    }
    
    // Update details
    updateProjectDetails(activeItem);
  }

  // Update project details
  function updateProjectDetails(item) {
    if (!item) return;
    
    document.getElementById('project-title').textContent = item.getAttribute('data-title') || '';
    document.getElementById('project-description').textContent = item.getAttribute('data-description') || '';
    document.getElementById('project-year').textContent = item.getAttribute('data-year') || '';
    document.getElementById('project-location').textContent = item.getAttribute('data-location') || '';
    
    // Show details panel
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
    
    // Scroll to project
    portfolioItems[currentIndex].scrollIntoView({ 
      behavior: 'smooth',
      block: 'nearest'
    });
    
    setTimeout(() => {
      isScrolling = false;
    }, 800);
  }

  // Throttle function
  function throttle(func, limit = 300) {
    let lastFunc;
    let lastRan;
    return function() {
      const context = this;
      const args = arguments;
      if (!lastRan) {
        func.apply(context, args);
        lastRan = Date.now();
      } else {
        clearTimeout(lastFunc);
        lastFunc = setTimeout(function() {
          if ((Date.now() - lastRan) >= limit) {
            func.apply(context, args);
            lastRan = Date.now();
          }
        }, limit - (Date.now() - lastRan));
      }
    };
  }

  // Event Listeners
  window.addEventListener('wheel', throttle((e) => {
    if (Math.abs(e.deltaY) > 30) {
      e.preventDefault();
      handleScroll(e.deltaY > 0 ? 'down' : 'up');
    }
  }), { passive: false });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown') handleScroll('down');
    if (e.key === 'ArrowUp') handleScroll('up');
  });

  // Touch events
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

  // Intersection Observer
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.7
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !isScrolling) {
        const index = portfolioItems.indexOf(entry.target);
        if (index !== -1 && index !== currentIndex) {
          updateActiveProject(index);
        }
      }
    });
  }, observerOptions);

  // Observe all items
  portfolioItems.forEach(item => {
    observer.observe(item);
  });

  // Initialize
  initPortfolio();
});