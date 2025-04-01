document.addEventListener('DOMContentLoaded', function() {
    // Configuration
    const config = {
        initialPanels: 4,
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
        loadThreshold: 0.8 // Load more when 80% scrolled
    };

    // DOM Elements
    const panelsContainer = document.getElementById('panelsContainer');
    const panelsWrapper = document.getElementById('panelsWrapper');
    let isLoading = false;

    // Initialize panels
    function initPanels() {
        panelsWrapper.innerHTML = '';
        config.panelData.forEach((panel, index) => {
            createPanel(panel, index);
        });
    }

    // Create a single panel
    function createPanel(data, index) {
        const panel = document.createElement('div');
        panel.className = 'panel';
        panel.dataset.theme = data.theme;
        
        const isContact = data.isContact || false;
        
        panel.innerHTML = `
            <div class="panel-content">
                <h2>${data.title}</h2>
                <p>${data.content}</p>
                <div class="icon">${data.icon}</div>
                ${isContact ? '<button class="contact-btn">Contact Now</button>' : ''}
            </div>
        `;
        
        panelsWrapper.appendChild(panel);
        
        // Add event listener to contact button if exists
        if (isContact) {
            panel.querySelector('.contact-btn').addEventListener('click', function() {
                alert('Thank you for your interest! Our team will contact you soon.');
            });
        }
    }

    // Handle scroll events
    function handleScroll() {
        if (isLoading) return;
        
        const scrollLeft = panelsContainer.scrollLeft;
        const scrollWidth = panelsContainer.scrollWidth;
        const clientWidth = panelsContainer.clientWidth;
        const scrollPosition = (scrollLeft + clientWidth) / scrollWidth;
        
        if (scrollPosition > config.loadThreshold) {
            loadMorePanels();
        }
    }

    // Simulate loading more panels
    function loadMorePanels() {
        isLoading = true;
        
        // Show loading indicator
        const loadingPanel = document.createElement('div');
        loadingPanel.className = 'panel';
        loadingPanel.innerHTML = '<div class="panel-content">Loading more...</div>';
        panelsWrapper.appendChild(loadingPanel);
        
        // Simulate API call delay
        setTimeout(() => {
            // Remove loading indicator
            panelsWrapper.removeChild(loadingPanel);
            
            // Add new panels (in a real app, this would come from an API)
            const newPanel = {
                title: "Additional Service " + (config.panelData.length + 1),
                content: "This is a dynamically loaded panel with more content about our services.",
                icon: "✨",
                theme: "blue"
            };
            
            config.panelData.push(newPanel);
            createPanel(newPanel, config.panelData.length - 1);
            
            isLoading = false;
        }, 1000);
    }

    // Initialize intersection observer for scroll detection
    function initIntersectionObserver() {
        const options = {
            root: panelsContainer,
            threshold: 0.1
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && 
                    entry.target === panelsWrapper.lastElementChild && 
                    !isLoading) {
                    loadMorePanels();
                }
            });
        }, options);
        
        if (panelsWrapper.lastElementChild) {
            observer.observe(panelsWrapper.lastElementChild);
        }
    }

    // Initialize the app
    function init() {
        initPanels();
        initIntersectionObserver();
        
        // Add scroll event listener as fallback
        panelsContainer.addEventListener('scroll', handleScroll);
        
        // Add keyboard navigation
        document.addEventListener('keydown', function(e) {
            if (e.key === 'ArrowLeft') {
                panelsContainer.scrollBy({ left: -window.innerWidth / 2, behavior: 'smooth' });
            } else if (e.key === 'ArrowRight') {
                panelsContainer.scrollBy({ left: window.innerWidth / 2, behavior: 'smooth' });
            }
        });
    }

    // Start the application
    init();
});