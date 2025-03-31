document.addEventListener('DOMContentLoaded', function() {
    // Custom cursor functionality
    const cursor = document.querySelector('.custom-cursor');
    
    document.addEventListener('mousemove', function(e) {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });
    
    // Cursor hover effects
    const hoverElements = document.querySelectorAll(
        'a, button, .service-item, .project-card, .main-button'
    );
    
    hoverElements.forEach(function(element) {
        element.addEventListener('mouseenter', function() {
            cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
            cursor.style.opacity = '0.7';
        });
        
        element.addEventListener('mouseleave', function() {
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
            cursor.style.opacity = '1';
        });
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Scroll animations
    function animateOnScroll() {
        const elements = document.querySelectorAll(
            '.service-item, .project-card, .about-content, .contact-form'
        );
        
        elements.forEach(function(element) {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Set initial state for animated elements
    document.querySelectorAll(
        '.service-item, .project-card, .about-content, .contact-form'
    ).forEach(function(el) {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // Run once on load
    animateOnScroll();
    
    // Run on scroll
    window.addEventListener('scroll', animateOnScroll);
    
    // Header scroll effect
    const header = document.querySelector('.main-header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.style.backgroundColor = 'rgba(15, 15, 15, 0.9)';
            header.style.backdropFilter = 'blur(10px)';
        } else {
            header.style.backgroundColor = 'transparent';
            header.style.backdropFilter = 'none';
        }
    });
    
    // Mobile menu toggle
    const menuButton = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');
    
    menuButton.addEventListener('click', function() {
        menuButton.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Parallax effect for hero visual
    const heroVisual = document.querySelector('.hero-visual .visual-element');
    
    if (heroVisual) {
        window.addEventListener('mousemove', function(e) {
            const x = (window.innerWidth - e.pageX) / 20;
            const y = (window.innerHeight - e.pageY) / 20;
            heroVisual.style.transform = `translate(-50%, -50%) translateX(${x}px) translateY(${y}px)`;
        });
    }
    
    // Project card tilt effect
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(function(card) {
        card.addEventListener('mousemove', function(e) {
            const x = e.pageX - card.getBoundingClientRect().left;
            const y = e.pageY - card.getBoundingClientRect().top;
            
            const centerX = card.offsetWidth / 2;
            const centerY = card.offsetHeight / 2;
            
            const angleX = (centerY - y) / 10;
            const angleY = (x - centerX) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg)`;
        });
        
        card.addEventListener('mouseleave', function() {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
        });
    });
});