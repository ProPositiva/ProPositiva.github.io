document.addEventListener('DOMContentLoaded', function() {
    // Configuration
    const config = {
        panelData: [
            {
                title: "Web Development",
                content: "Custom websites built with modern technologies like React, Vue, and Node.js.",
                icon: "💻",
                theme: "blue"
            },
            {
                title: "Mobile Apps",
                content: "iOS and Android applications developed with native and cross-platform solutions.",
                icon: "📱",
                theme: "green"
            },
            {
                title: "UI/UX Design",
                content: "Beautiful, intuitive interfaces designed for optimal user experience.",
                icon: "🎨",
                theme: "orange"
            },
            {
                title: "Contact Us",
                content: "Ready to start your project? Get in touch with our team.",
                icon: "📧",
                theme: "purple",
                isContact: true
            }
        ],
        loadThreshold: 0.8
    };

    // DOM Elements
    const panelsContainer = document.getElementById('panelsContainer');
    const panelsWrapper = document.getElementById('panelsWrapper');
    let isLoading = false;

    // Initialize panels
    function initPanels() {
        panelsWrapper.innerHTML = '';
        config.panelData.forEach(createPanel);
        setupContactButton();
    }

    // Create a single panel
    function createPanel(data) {
        const panel = document.createElement('div');
        panel.className = 'panel';
        panel.dataset.theme = data.theme;
        
        panel.innerHTML = `
            <div class="panel-content">
                <h2>${data.title}</h2>
                <p>${data.content}</p>
                <div class="icon">${data.icon}</div>
                ${data.isContact ? '<button class="contact-btn">Contact Now</button>' : ''}
            </div>
        `;
        
        panelsWrapper.appendChild(panel);
        return panel;
    }

    // Setup contact button event
    function setupContactButton() {
        const contactBtn = document.querySelector('.contact-btn');
        if (contactBtn) {
            contactBtn.addEventListener('click', function() {
                alert('Thank you for your interest! Our team will contact you soon.');
            });
        }
    }

    // Handle infinite loading
    function setupInfiniteScroll() {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && !isLoading) {
                loadMoreContent();
            }
        }, { threshold: config.loadThreshold });

        if (panelsWrapper.lastElementChild) {
            observer.observe(panelsWrapper.lastElementChild);
        }
    }

    // Simulate loading more content
    function loadMoreContent() {
        isLoading = true;
        
        // Simulate API delay
        setTimeout(() => {
            const newPanel = {
                title: `Service ${config.panelData.length + 1}`,
                content: "Additional service content loaded dynamically as you scroll.",
                icon: "✨",
                theme: "blue"
            };
            
            config.panelData.push(newPanel);
            createPanel(newPanel);
            isLoading = false;
        }, 1000);
    }

    // Initialize keyboard navigation
    function initKeyboardNav() {
        document.addEventListener('keydown', function(e) {
            if (e.key === 'ArrowLeft') {
                panelsContainer.scrollBy({ left: -window.innerWidth / 2, behavior: 'smooth' });
            } else if (e.key === 'ArrowRight') {
                panelsContainer.scrollBy({ left: window.innerWidth / 2, behavior: 'smooth' });
            }
        });
    }

    // Initialize everything
    function init() {
        initPanels();
        setupInfiniteScroll();
        initKeyboardNav();
    }

    // Start the application
    init();
});