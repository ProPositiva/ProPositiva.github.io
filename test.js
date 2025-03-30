document.addEventListener('DOMContentLoaded', function() {
  // Intersection Observer for process items
  const processItems = document.querySelectorAll('.process-item, .process-cta');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  });

  processItems.forEach(item => {
    observer.observe(item);
  });

  // Optional: Parallax effect for the heading
  const processHeading = document.querySelector('.process-heading');
  const stickyWrapper = document.querySelector('.sticky-wrapper');

  if (processHeading && stickyWrapper) {
    window.addEventListener('scroll', function() {
      const scrollPosition = window.scrollY;
      const wrapperOffset = stickyWrapper.offsetTop;
      const wrapperHeight = stickyWrapper.offsetHeight;
      
      if (scrollPosition > wrapperOffset && scrollPosition < wrapperOffset + wrapperHeight) {
        const progress = (scrollPosition - wrapperOffset) / wrapperHeight;
        processHeading.style.transform = `translateY(${progress * -50}px)`;
        processHeading.style.opacity = 1 - (progress * 0.5);
      }
    });
  }
});