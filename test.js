document.addEventListener('DOMContentLoaded', function() {
    const config = {
        panels: [
            {
                title: "Web Development",
                content: "We build modern, responsive websites using cutting-edge technologies that drive results.",
                isContact: false
            },
            {
                title: "Mobile Apps",
                content: "Native iOS and Android applications designed for performance and user engagement.",
                isContact: false
            },
            {
                title: "UI/UX Design",
                content: "Beautiful interfaces with intuitive user experiences that convert visitors to customers.",
                isContact: false
            },
            {
                title: "Contact Us",
                content: "Ready to start your project? Get in touch with our team today.",
                isContact: true
            }
        ],
        currentIndex: 0,
        isScrolling: false
    };

    const panelsStack = document.getElementById('panelsStack');
    const panelWidth = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--panel-width'));
    const panelSpacing = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--panel-spacing'));

    // Create all panels
    function createPanels() {
        config.panels.forEach((panel, index) => {
            const panelElement = document.createElement('div');
            panelElement.className = 'panel';
            panelElement.innerHTML = `
                <h2>${panel.title}</h2>
                <p>${panel.content}</p>
                ${panel.isContact ? '<button class="contact-btn">Contact Now</button>' : ''}
            `;
            panelsStack.appendChild(panelElement);
            
            if (panel.isContact) {
                panelElement.querySelector('.contact-btn').addEventListener('click', function() {
                    alert('Thank you for your interest! Our team will contact you shortly.');
                });
            }
        });
        
        positionPanels();
    }

    // Position panels in stack
    function positionPanels() {
        const panels = document.querySelectorAll('.panel');
        
        panels.forEach((panel, index) => {
            let zIndex = config.panels.length - index;
            let translateX = index * panelSpacing;
            let scale = 1 - (0.1 * index);
            let opacity = 1 - (0.2 * index);
            
            // Adjust for current scroll position
            if (index < config.currentIndex) {
                translateX = -panelWidth;
                scale = 0.9;
                opacity = 0;
            } else if (index > config.currentIndex + 2) {
                translateX = (index - config.currentIndex) * panelWidth;
                scale = 0.9;
                opacity = 0;
            } else if (index === config.currentIndex) {
                zIndex = config.panels.length;
            }
            
            panel.style.transform = `translateX(${translateX}px) scale(${scale})`;
            panel.style.zIndex = zIndex;
            panel.style.opacity = opacity;
        });
    }

    // Handle scroll events
    function handleScroll(e) {
        if (config.isScrolling) return;
        
        const delta = Math.sign(e.deltaY);
        const newIndex = config.currentIndex + delta;
        
        if (newIndex >= 0 && newIndex <= config.panels.length - 1) {
            config.isScrolling = true;
            config.currentIndex = newIndex;
            positionPanels();
            
            setTimeout(() => {
                config.isScrolling = false;
            }, 500);
        }
        
        // Prevent default only when we're actually moving panels
        if (newIndex >= 0 && newIndex <= config.panels.length - 1) {
            e.preventDefault();
        }
    }

    // Initialize
    function init() {
        createPanels();
        
        // Use wheel event for desktop
        window.addEventListener('wheel', handleScroll, { passive: false });
        
        // Touch events for mobile
        let touchStartX = 0;
        
        window.addEventListener('touchstart', (e) => {
            touchStartX = e.touches[0].clientX;
        }, { passive: true });
        
        window.addEventListener('touchmove', (e) => {
            if (config.isScrolling) return;
            
            const touchX = e.touches[0].clientX;
            const deltaX = touchStartX - touchX;
            
            if (Math.abs(deltaX) > 50) { // Threshold for swipe
                const delta = Math.sign(deltaX);
                const newIndex = config.currentIndex + delta;
                
                if (newIndex >= 0 && newIndex <= config.panels.length - 1) {
                    config.isScrolling = true;
                    config.currentIndex = newIndex;
                    positionPanels();
                    
                    setTimeout(() => {
                        config.isScrolling = false;
                    }, 500);
                }
            }
        }, { passive: true });
    }

    init();
});