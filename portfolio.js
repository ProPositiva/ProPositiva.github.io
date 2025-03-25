document.addEventListener('DOMContentLoaded', function() {
  // Elements
  const portfolioItems = Array.from(document.querySelectorAll('.portfolio-item'));
  const portfolioBackground = document.getElementById('portfolio-background');
  const currentProjectTitle = document.getElementById('current-project-title');
  const portfolioList = document.querySelector('.portfolio-list');
  const dropdown = document.querySelector('.project-dropdown');
  
  // Arrow controls
  const arrowUp = document.querySelector('.arrow-up');
  const arrowDown = document.querySelector('.arrow-down');
  const arrowLeft = document.querySelector('.arrow-left');
  const arrowRight = document.querySelector('.arrow-right');
  
  // State
  let currentIndex = 0;
  let isScrolling = false;
  let scrollTimeout = null;
  const scrollDelay = 800;
  let touchStartY = 0;
  let touchStartX = 0;
  let currentMediaIndex = 0;
  let currentProjectMedia = [];
  let isHorizontalSwipe = false;

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

    document.querySelector('#portfolio-title').addEventListener('click', (e) => {
      e.stopPropagation();
      dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
    });

    document.addEventListener('click', (e) => {
      if (!e.target.closest('#portfolio-title') && !e.target.closest('.project-dropdown')) {
        dropdown.style.display = 'none';
      }
    });
  }

  // Load media for current project
  function loadProjectMedia() {
    const item = portfolioItems[currentIndex];
    currentProjectMedia = JSON.parse(item.getAttribute('data-gallery') || '[]');
    currentMediaIndex = -1;
    
    const mainImage = item.getAttribute('data-bg');
    if (mainImage) {
      currentProjectMedia.unshift(mainImage);
      currentMediaIndex = 0;
    }
  }

  // Update background media with mobile video fix
  function updateBackgroundMedia() {
    if (currentProjectMedia.length === 0) return;
    
    const mediaSrc = currentProjectMedia[currentMediaIndex];
    const isVideo = mediaSrc.match(/\.(mp4|webm|ogg)$/i);
    
    portfolioBackground.innerHTML = '';
    portfolioBackground.style.backgroundImage = 'none';
    
    if (isVideo) {
      const video = document.createElement('video');
      video.src = mediaSrc;
      video.autoplay = true;
      video.loop = true;
      video.muted = true;
      video.playsInline = true;
      video.className = 'background-media';
      video.style.objectFit = 'cover';
      video.style.width = '100%';
      video.style.height = '100%';
      video.style.position = 'absolute';
      video.style.top = '0';
      video.style.left = '0';
      
      // Mobile video autoplay fix
      if (/Mobi|Android/i.test(navigator.userAgent)) {
        video.setAttribute('playsinline', '');
        video.setAttribute('muted', '');
        const playPromise = video.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => {
            video.controls = true;
          });
        }
      }
      
      portfolioBackground.appendChild(video);
    } else {
      portfolioBackground.style.backgroundImage = `url(${mediaSrc})`;
    }
  }

  // Update active project
  function updateActiveProject(index, immediate = false) {
    if (index < 0 || index >= portfolioItems.length) return;
    
    currentIndex = index;
    const activeItem = portfolioItems[index];
    const projectName = activeItem.querySelector('h3').textContent;

    currentProjectTitle.textContent = projectName;
    loadProjectMedia();
    currentMediaIndex = 0;
    updateBackgroundMedia();
    
    if (!immediate) {
      isScrolling = true;
      activeItem.scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => { isScrolling = false; }, 1000);
    }
  }

  // Navigation functions
  function nextProject() {
    if (isScrolling) return;
    updateActiveProject(currentIndex + 1);
  }

  function prevProject() {
    if (isScrolling) return;
    updateActiveProject(currentIndex - 1);
  }

  function nextMedia() {
    if (currentProjectMedia.length === 0) return;
    currentMediaIndex = (currentMediaIndex + 1) % currentProjectMedia.length;
    updateBackgroundMedia();
  }

  function prevMedia() {
    if (currentProjectMedia.length === 0) return;
    currentMediaIndex = (currentMediaIndex - 1 + currentProjectMedia.length) % currentProjectMedia.length;
    updateBackgroundMedia();
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

  // Setup event listeners with improved mobile swiping
  function setupEventListeners() {
    arrowUp.addEventListener('click', prevProject);
    arrowDown.addEventListener('click', nextProject);
    arrowLeft.addEventListener('click', prevMedia);
    arrowRight.addEventListener('click', nextMedia);

    window.addEventListener('keydown', (e) => {
      if (e.target.tagName === 'INPUT') return;
      
      switch(e.key) {
        case 'ArrowUp': e.preventDefault(); prevProject(); break;
        case 'ArrowDown': e.preventDefault(); nextProject(); break;
        case 'ArrowLeft': e.preventDefault(); prevMedia(); break;
        case 'ArrowRight': e.preventDefault(); nextMedia(); break;
      }
    });

    portfolioList.addEventListener('scroll', () => {
      if (!isScrolling) {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(handleScroll, 100);
      }
    });

    // Improved touch handling for both vertical and horizontal swipes
    portfolioBackground.addEventListener('touchstart', function(e) {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
      isHorizontalSwipe = false;
    }, { passive: true });

    portfolioBackground.addEventListener('touchmove', function(e) {
      if (!isHorizontalSwipe) {
        const xDiff = Math.abs(e.touches[0].clientX - touchStartX);
        const yDiff = Math.abs(e.touches[0].clientY - touchStartY);
        isHorizontalSwipe = xDiff > yDiff;
      }
    }, { passive: true });

    portfolioBackground.addEventListener('touchend', function(e) {
      const touchEndX = e.changedTouches[0].clientX;
      const touchEndY = e.changedTouches[0].clientY;
      const xDiff = touchStartX - touchEndX;
      const yDiff = touchStartY - touchEndY;

      if (isHorizontalSwipe && Math.abs(xDiff) > 50) {
        e.preventDefault();
        if (xDiff > 0) {
          nextMedia();
        } else {
          prevMedia();
        }
      } else if (!isHorizontalSwipe && Math.abs(yDiff) > 50) {
        if (yDiff > 0) {
          nextProject();
        } else {
          prevProject();
        }
      }
    }, { passive: false });

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

    portfolioItems.forEach(item => {
      observer.observe(item);
    });
  }

  // Initialize everything
  initPortfolio();
});