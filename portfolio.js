document.addEventListener('DOMContentLoaded', function() {
  // Elements
  const portfolioItems = Array.from(document.querySelectorAll('.portfolio-item'));
  const portfolioBackground = document.getElementById('portfolio-background');
  const currentProjectTitle = document.getElementById('current-project-title');
  const projectDetails = document.getElementById('project-details');
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
    initDropdown();
    initGallery();
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
        dropdown.style.display = 'none';
      });
      dropdown.appendChild(dropdownItem);
    });

    // Toggle dropdown on header click
    document.querySelector('.portfolio-header').addEventListener('click', (e) => {
      e.stopPropagation();
      const dropdown = document.querySelector('.project-dropdown');
      dropdown.style.display = dropdown.style.display === 'none' ? 'block' : 'none';
    });

    // Close dropdown when clicking elsewhere
    document.addEventListener('click', () => {
      dropdown.style.display = 'none';
    });
  }

  // Initialize gallery
  function initGallery() {
    portfolioItems.forEach(item => {
      const galleryItem = document.createElement('div');
      galleryItem.className = 'gallery-item';
      const mediaItems = JSON.parse(item.getAttribute('data-gallery') || [];
      
      mediaItems.forEach(mediaPath => {
        const media = mediaPath.endsWith('.mp4') ? 
          Object.assign(document.createElement('video'), { 
            controls: true,
            autoplay: false,
            loop: true 
          }) : 
          document.createElement('img');
        media.src = mediaPath;
        galleryItem.appendChild(media);
      });
      
      galleryContent.appendChild(galleryItem);
    });
  }

  // Update active project
  function updateActiveProject(index, immediate = false) {
    if (index < 0) index = portfolioItems.length - 1;
    if (index >= portfolioItems.length) index = 0;
    
    currentIndex = index;
    const activeItem = portfolioItems[index];
    const projectName = activeItem.querySelector('h3').textContent;

    // Reset all items
    portfolioItems.forEach(item => {
      item.classList.remove('active');
      const h3 = item.querySelector('h3');
      const preview = item.querySelector('.project-preview');
      h3.style.position = 'static';
      h3.style.transform = 'none';
      preview.style.position = 'static';
      preview.style.transform = 'none';
    });

    // Update active item
    activeItem.classList.add('active');
    currentProjectTitle.textContent = `/${projectName}`;

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
    activeItem.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  function updateProjectDetails(item) {
    document.getElementById('project-title').textContent = item.querySelector('h3').textContent;
    document.getElementById('project-description').textContent = item.getAttribute('data-description');
    document.getElementById('project-year').textContent = item.getAttribute('data-year');
    document.getElementById('project-location').textContent = item.getAttribute('data-location');
    projectDetails.classList.add('visible');
  }

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
    
    setTimeout(() => {
      isScrolling = false;
    }, scrollDelay);
  }

  function openGallery() {
    document.body.classList.add('gallery-active');
    document.querySelector('.project-gallery').classList.add('active');
    
    const galleryItems = document.querySelectorAll('.gallery-item');
    if (galleryItems[currentIndex]) {
      galleryItems[currentIndex].scrollIntoView();
    }
  }

  function closeGallery() {
    document.body.classList.remove('gallery-active');
    document.querySelector('.project-gallery').classList.remove('active');
  }

  function setupEventListeners() {
    // Vertical scroll
    window.addEventListener('wheel', (e) => {
      if (document.querySelector('.project-gallery').classList.contains('active')) return;
      if (Math.abs(e.deltaY) > 30) {
        e.preventDefault();
        handleVerticalScroll(e.deltaY > 0 ? 'down' : 'up');
      }
    }, { passive: false });

    // Keyboard navigation
    window.addEventListener('keydown', (e) => {
      if (document.querySelector('.project-gallery').classList.contains('active')) return;
      if (e.key === 'ArrowDown') handleVerticalScroll('down');
      if (e.key === 'ArrowUp') handleVerticalScroll('up');
    });

    // Touch events for vertical scroll
    window.addEventListener('touchstart', (e) => {
      if (document.querySelector('.project-gallery').classList.contains('active')) return;
      touchStartY = e.touches[0].clientY;
    }, { passive: true });

    window.addEventListener('touchend', (e) => {
      if (document.querySelector('.project-gallery').classList.contains('active')) return;
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
          galleryContent.scrollBy({ left: galleryContent.offsetWidth, behavior: 'smooth' });
        } else {
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
  }

  // Initialize everything
  initPortfolio();
});