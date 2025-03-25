document.addEventListener('DOMContentLoaded', function() {
  // Elements
  const portfolioItems = Array.from(document.querySelectorAll('.portfolio-item'));
  const portfolioBackground = document.getElementById('portfolio-background');
  const currentProjectTitle = document.getElementById('current-project-title');
  const centeredProjectName = document.getElementById('centered-project-name');
  const centeredProjectPreview = document.getElementById('centered-project-preview');
  const projectDetails = document.getElementById('project-details');
  const galleryContent = document.querySelector('.gallery-content');
  
  // State
  let currentIndex = 0;
  let isScrolling = false;
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
      });
      dropdown.appendChild(dropdownItem);
    });

    // Close dropdown when clicking elsewhere
    document.addEventListener('click', (e) => {
      if (!e.target.closest('/ #portfolio-title')) {
        dropdown.style.display = 'none';
      }
    });
  }

  // Initialize gallery
  function initGallery() {
    portfolioItems.forEach(item => {
      const galleryItem = document.createElement('div');
      galleryItem.className = 'gallery-item';
      const mediaItems = JSON.parse(item.getAttribute('data-gallery') || []);
      
      mediaItems.forEach(mediaPath => {
        const media = mediaPath.endsWith('.mp4') ? 
          Object.assign(document.createElement('video'), { controls: true }) : 
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
    const projectPreview = activeItem.querySelector('.project-preview').textContent;

    // Update all project name displays
    currentProjectTitle.textContent = `/ ${projectName}`;
    centeredProjectName.textContent = projectName;
    centeredProjectPreview.textContent = projectPreview;

    // Update background
    if (immediate) {
      portfolioBackground.style.backgroundImage = `url(${activeItem.getAttribute('data-bg')})`;
    } else {
      portfolioBackground.classList.add('fading');
      setTimeout(() => {
        portfolioBackground.style.backgroundImage = `url(${activeItem.getAttribute('data-bg')})`;
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

  // [Rest of your existing JavaScript for scrolling, etc.]
  
  // Initialize the portfolio
  initPortfolio();
});