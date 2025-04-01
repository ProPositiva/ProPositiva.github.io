document.addEventListener('DOMContentLoaded', function() {
    // Configuration
    const config = {
        panels: [
            {
                title: "Web Development",
                content: "Custom websites built with modern technologies including React, Vue, and Node.js. We create fast, responsive, and SEO-friendly web applications tailored to your business needs.",
                icon: "💻",
                isContact: false
            },
            {
                title: "Mobile Apps",
                content: "iOS and Android applications developed with both native and cross-platform solutions. Our apps are optimized for performance and user experience across all devices.",
                icon: "📱",
                isContact: false
            },
            {
                title: "UI/UX Design",
                content: "Beautiful, intuitive interfaces designed for optimal user experience. We combine aesthetics with functionality to create memorable digital experiences.",
                icon: "🎨",
                isContact: false
            },
            {
                title: "Contact Us",
                content: "Ready to start your project? Get in touch with our team of experts to discuss how we can bring your vision to life.",
                icon: "📧",
                isContact: true
            }
        ],
        isScrolling: false,
        lastScrollPosition: 0,
        scrollThreshold: 100
    };

    // DOM Elements
    const panelsContainer = document.getElementById('panelsContainer');
    const panelsWrapper = document.getElementById('panelsWrapper');
    const panelsSection = document.querySelector('.panels-section');

    // Create all panels
    function createPanels() {
        panelsWrapper.innerHTML = '';
        config.panels.forEach((panel, index) => {
            const panelElement = document.createElement('div');
            panelElement.className = 'panel';
            
            panelElement.innerHTML = `
                <div class="panel-content">
                    <h2>${panel.title}</h2>
                    <p>${panel.content}</p>
                    <div class="icon">${panel.icon}</div>
                    ${panel.isContact ? '<button class="contact-btn">Contact Now</button>' : ''}
                </div>
            `;
            
            panelsWrapper.appendChild(panelElement);
            
            if (panel.isContact) {
                panelElement.querySelector('.contact-btn').addEventListener('click', function() {
                    alert('Thank you for your interest! Our team will contact you soon.');
                });
            }
        });
    }

    // Handle vertical scroll to horizontal translation
    function handleVerticalScroll() {
        if (config.isScrolling) return;
        
        const rect = panelsSection.getBoundingClientRect();
        const isInView = rect.top <= 0 && rect.bottom >= 0;
        
        if (isInView) {
            window.addEventListener('wheel', handleWheel, { passive: false });
        } else {
            window.removeEventListener('wheel', handleWheel);
        }
    }

    // Convert vertical wheel to horizontal scroll
    function handleWheel(e) {
        if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
            // Vertical scroll detected
            e.preventDefault();
            
            config.isScrolling = true;
            panelsContainer.scrollLeft += e.deltaY;
            
            clearTimeout(window.scrollEndTimer);
            window.scrollEndTimer = setTimeout(function() {
                config.isScrolling = false;
            }, 100);
        }
    }

    // Initialize keyboard navigation
    function initKeyboardNav() {
        document.addEventListener('keydown', function(e) {
            if (e.key === 'ArrowLeft') {
                panelsContainer.scrollBy({ left: -panelsContainer.clientWidth, behavior: 'smooth' });
            } else if (e.key === 'ArrowRight') {
                panelsContainer.scrollBy({ left: panelsContainer.clientWidth, behavior: 'smooth' });
            }
        });
    }

    // Initialize everything
    function init() {
        createPanels();
        initKeyboardNav();
        
        // Set up scroll listener
        window.addEventListener('scroll', handleVerticalScroll);
        
        // Initial check
        handleVerticalScroll();
    }

    // Start the app
    init();
});