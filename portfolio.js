document.addEventListener('DOMContentLoaded', function() {
  // Elements
  const portfolioItems = document.querySelectorAll('.portfolio-item');
  const portfolioBackground = document.getElementById('portfolio-background');
  const currentProjectTitle = document.getElementById('current-project-title');
  const projectDetails = document.getElementById('project-details');
  const projectGallery = document.querySelector('.project-gallery');
  const galleryContent = document.querySelector('.gallery-content');
  
  // State
  let currentIndex = 0;
  let isScrolling = false;
  const scrollDelay = 800;

  // Initialize
  function init() {
    setupGallery();
    setupEventListeners();
    updateActiveProject(0, true);
  }

  // Gallery Setup
  function setupGallery() {
    portfolioItems.forEach(item => {
      const galleryItem = document.createElement('div');
      galleryItem.className = 'gallery-item';
      const mediaItems = JSON.parse(item.getAttribute('data-gallery'));
      
      mediaItems.forEach(mediaPath => {
        const media = mediaPath.endsWith('.mp4') ? 
          Object.assign(document.createElement('video'), { controls: true }) : 
          document.createElement('img');
        media.src = mediaPath;
        galleryItem.appendChild(media);
      });
      
      galleryContent.appendChild(galleryItem);
    });
    
    document.querySelector('.gallery-close').addEventListener('click', () => {
      projectGallery.classList.remove('active');
    });
  }

  // Update Active Project
  function updateActiveProject(index, immediate = false) {
    // Boundary check
    if (index < 0) index = portfolioItems.length - 1;
    if (index >= portfolioItems.length) index = 0;
    
    currentIndex = index;
    const activeItem = portfolioItems[index];
    const projectName = activeItem.querySelector('h3').textContent;
    
    // Update UI
    updateActiveItem(activeItem);
    updateHeader(projectName);
    updateBackground(activeItem.getAttribute('data-bg'), immediate);
    updateDetails(activeItem);
  }

  function updateActiveItem(item) {
    portfolioItems.forEach(i => i.classList.remove('active'));
    item.classList.add('active');
  }

  function updateHeader(name) {
    currentProjectTitle.textContent = `/${name}`;
  }

  function updateBackground(bgImage, immediate) {
    if (immediate) {
      portfolioBackground.style.backgroundImage = `url(${bgImage})`;
    } else {
      portfolioBackground.classList.add('fading');
      setTimeout(() => {
        portfolioBackground.style.backgroundImage = `url(${bgImage})`;
        setTimeout(() => portfolioBackground.classList.remove('fading'), 300);
      }, 100);
    }
  }

  function updateDetails(item) {
    document.getElementById('project-title').textContent = item.querySelector('h3').textContent;
    document.getElementById('project-description').textContent = item.getAttribute('data-description');
    document.getElementById('project-year').textContent = item.getAttribute('data-year');
    document.getElementById('project-location').textContent = item.getAttribute('data-location');
    projectDetails.classList.add('visible');
  }

  // Event Handlers
  function setupEventListeners() {
    // Vertical Scroll
    window.addEventListener('wheel', throttle(function(e) {
      if (Math.abs(e.deltaY) > 30) {
        e.preventDefault();
        handleScroll(e.deltaY > 0 ? 'down' : 'up');
      }
    }, scrollDelay));
    
    // Keyboard
    window.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowDown') handleScroll('down');
      if (e.key === 'ArrowUp') handleScroll('up');
    });
    
    // Touch
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
    
    // Project Click
    portfolioItems.forEach(item => {
      item.addEventListener('click', () => {
        projectGallery.classList.add('active');
        galleryContent.scrollTo({
          left: galleryContent.offsetWidth * currentIndex,
          behavior: 'smooth'
        });
      });
    });
  }

  function handleScroll(direction) {
    if (isScrolling) return;
    isScrolling = true;
    
    const newIndex = direction === 'down' ? 
      (currentIndex + 1) % portfolioItems.length : 
      (currentIndex - 1 + portfolioItems.length) % portfolioItems.length;
    
    updateActiveProject(newIndex);
    portfolioItems[newIndex].scrollIntoView({ behavior: 'smooth' });
    
    setTimeout(() => {
      isScrolling = false;
    }, scrollDelay);
  }

  function throttle(func, limit) {
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

  // Start
  init();
});