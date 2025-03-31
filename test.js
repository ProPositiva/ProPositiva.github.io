document.addEventListener('DOMContentLoaded', function() {
    const cursor = document.querySelector('.cursor');
    
    document.addEventListener('mousemove', function(e) {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });
    
    const hoverables = document.querySelectorAll('a, button, .service-card, .work-item');
    hoverables.forEach(function(el) {
        el.addEventListener('mouseenter', function() {
            cursor.classList.add('cursor-hover');
        });
        el.addEventListener('mouseleave', function() {
            cursor.classList.remove('cursor-hover');
        });
    });
    
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
    
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.service-card, .work-item, .about-content, .contact-form');
        
        elements.forEach(function(element) {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    document.querySelectorAll('.service-card, .work-item, .about-content, .contact-form').forEach(function(el) {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    animateOnScroll();
    
    window.addEventListener('scroll', animateOnScroll);
    
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.style.backgroundColor = 'rgba(10, 10, 10, 0.9)';
            header.style.backdropFilter = 'blur(10px)';
        } else {
            header.style.backgroundColor = 'transparent';
            header.style.backdropFilter = 'none';
        }
    });
    
    const menuBtn = document.querySelector('.menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    menuBtn.addEventListener('click', function() {
        menuBtn.classList.toggle('open');
        navLinks.classList.toggle('active');
    });
    
    const heroImage = document.querySelector('.hero-image .image-container');
    
    if (heroImage) {
        window.addEventListener('mousemove', function(e) {
            const x = (window.innerWidth - e.pageX) / 20;
            const y = (window.innerHeight - e.pageY) / 20;
            heroImage.style.transform = `translate(-50%, -50%) translateX(${x}px) translateY(${y}px)`;
        });
    }
    
    const workItems = document.querySelectorAll('.work-item');
    
    workItems.forEach(function(item) {
        item.addEventListener('mousemove', function(e) {
            const x = e.pageX - item.getBoundingClientRect().left;
            const y = e.pageY - item.getBoundingClientRect().top;
            
            const centerX = item.offsetWidth / 2;
            const centerY = item.offsetHeight / 2;
            
            const angleX = (centerY - y) / 10;
            const angleY = (x - centerX) / 10;
            
            item.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg)`;
        });
        
        item.addEventListener('mouseleave', function() {
            item.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
        });
    });
});