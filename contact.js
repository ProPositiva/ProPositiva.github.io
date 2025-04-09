// Initialize Partners Carousel
$(document).ready(function () {
  $(".partners-carousel").slick({
    dots: false,
    infinite: true,
    speed: 300,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  });
});

// Second logo fade on scroll
document.addEventListener('DOMContentLoaded', function() {
  const secondLogo = document.querySelector('.second-logo');
  
  window.addEventListener('scroll', function() {
    if (window.scrollY > 10) {
      secondLogo.classList.add('scrolled');
    } else {
      secondLogo.classList.remove('scrolled');
    }
  });
});



// Improved Dock Menu Functionality
const dockWrapper = document.querySelector('.dock-wrapper');
let dockHideTimeout;

// Make the entire left edge trigger area interactive
dockWrapper.style.pointerEvents = 'auto';

dockWrapper.addEventListener('mouseenter', () => {
  clearTimeout(dockHideTimeout);
  dockWrapper.classList.add('dock-visible');
});

dockWrapper.addEventListener('mouseleave', () => {
  dockHideTimeout = setTimeout(() => {
    dockWrapper.classList.remove('dock-visible');
  }, 300);
});

// Handle dock item clicks
document.querySelectorAll('.dock-item').forEach(item => {
  item.addEventListener('click', (e) => {
    if (item.getAttribute('href').startsWith('#')) {
      e.preventDefault();
      const target = document.querySelector(item.getAttribute('href'));
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Mobile Touch Support
if ('ontouchstart' in window) {
  const dock = document.querySelector('.dock-wrapper');
  
  dock.addEventListener('touchstart', (e) => {
    e.currentTarget.classList.add('dock-visible');
  });

  document.addEventListener('touchstart', (e) => {
    if (!e.target.closest('.dock-wrapper')) {
      document.querySelector('.dock-wrapper').classList.remove('dock-visible');
    }
  }, { passive: true });
}

