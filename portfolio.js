document.addEventListener('DOMContentLoaded', function() {
  // Elements
  const portfolioItems = Array.from(document.querySelectorAll('.portfolio-item'));
  const portfolioBackground = document.getElementById('portfolio-background');
  const projectDetails = document.getElementById('project-details');
  const currentProjectTitle = document.getElementById('current-project-title');
  const portfolioList = document.querySelector('.portfolio-list');
  const projectGallery = document.querySelector('.project-gallery');
  const galleryContent = document.querySelector('.gallery-content');
  const galleryClose = document.querySelector('.gallery-close');
  
  // State
  let currentIndex = 0;
  let isScrolling = false;
  let isHorizontalScrolling = false;
  const totalProjects = portfolioItems.length;
  let touchStartY = 0;
  let touchStartX = 0;
  let lastScrollTime = 0;
  const scrollDelay = 800;

  // Initialize
  function initPortfolio() {
    updateActiveProject(0, true);
    initGallery();
    setupEventListeners();
  }

  // Initialize gallery content
  function initGallery() {
    portfolioItems.forEach((item, index) => {
      const galleryItem = document.createElement('div');
      galleryItem.className = 'gallery-item';
      
      // Parse gallery items from data attribute
      const galleryItems = JSON.parse(item.getAttribute('data-gallery') || []);
      
      // Add all gallery media for this project
      galleryItems.forEach(mediaPath => {
        const mediaElement = mediaPath.endsWith('.mp4') || mediaPath.endsWith('.webm') 
          ? document.createElement('video') 
          : document.createElement('img');
        
        mediaElement.src = mediaPath;
        if (mediaElement.tagName === 'VIDEO') {
          mediaElement.controls = true;
          mediaElement.autoplay = false;
          mediaElement.loop = true;
        }
        galleryItem.appendChild(mediaElement);
      });
      
      galleryContent.appendChild(galleryItem);
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
    
    // Animate project title change
    const projectName = activeItem.getAttribute('data-title');
    gsap.to("#current-project-title", {
      duration: 0.3,
      opacity: 0,
      y: -20,
      onComplete: function() {
        currentProjectTitle.textContent = `/${projectName}`;
        gsap.to("#current-project-title", {
          duration: 0.3,
          opacity: 1,
          y: 0
        });
      }
    });
    
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
        }, 300);
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

  // Handle vertical scroll navigation
  function handleVerticalScroll(direction) {
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
    }, scrollDelay);
  }

  // Open gallery for current project
  function openGallery() {
    document.body.classList.add('gallery-active');
    projectGallery.classList.add('active');
    
    // Scroll to current project's gallery items
    const galleryItems = document.querySelectorAll('.gallery-item');
    if (galleryItems[currentIndex]) {
      galleryItems[currentIndex].scrollIntoView();
    }
  }

  // Close gallery
  function closeGallery() {
    document.body.classList.remove('gallery-active');
    projectGallery.classList.remove('active');
  }

  // Setup all event listeners
  function setupEventListeners() {
    // Vertical scroll (projects)
    window.addEventListener('wheel', (e) => {
      if (projectGallery.classList.contains('active')) return;
      if (Math.abs(e.deltaY) > 30) {
        e.preventDefault();
        handleVerticalScroll(e.deltaY > 0 ? 'down' : 'up');
      }
    }, { passive: false });

    // Keyboard navigation
    window.addEventListener('keydown', (e) => {
      if (projectGallery.classList.contains('active')) return;
      if (e.key === 'ArrowDown') handleVerticalScroll('down');
      if (e.key === 'ArrowUp') handleVerticalScroll('up');
    });

    // Touch events for vertical scroll
    window.addEventListener('touchstart', (e) => {
      if (projectGallery.classList.contains('active')) return;
      touchStartY = e.touches[0].clientY;
    }, { passive: true });

    window.addEventListener('touchend', (e) => {
      if (projectGallery.classList.contains('active')) return;
      const touchEndY = e.changedTouches[0].clientY;
      const diff = touchStartY - touchEndY;
      if (Math.abs(diff) > 50) {
        handleVerticalScroll(diff > 0 ? 'down' : 'up');
      }
    }, { passive: true });

    // Horizontal swipe in gallery
    galleryContent.addEventListener('touchstart', (e) => {
      touchStartX = e.touches[0].clientX;
    }, { passive: true });

    galleryContent.addEventListener('touchend', (e) => {
      const touchEndX = e.changedTouches[0].clientX;
      const diff = touchStartX - touchEndX;
      if (Math.abs(diff) > 50) {
        isHorizontalScrolling = true;
        if (diff > 0) {
          // Swipe left
          galleryContent.scrollBy({ left: galleryContent.offsetWidth, behavior: 'smooth' });
        } else {
          // Swipe right
          galleryContent.scrollBy({ left: -galleryContent.offsetWidth, behavior: 'smooth' });
        }
        setTimeout(() => { isHorizontalScrolling = false; }, 500);
      }
    }, { passive: true });

    // Click to open gallery
    portfolioItems.forEach(item => {
      item.addEventListener('click', () => {
        openGallery();
      });
    });

    // Close gallery
    galleryClose.addEventListener('click', closeGallery);

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