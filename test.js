document.addEventListener('DOMContentLoaded', function() {
    // Configuration
    const config = {
        panelData: [
            {
                title: "Web Development",
                content: "Custom websites built with modern technologies.",
                icon: "💻",
                theme: "blue"
            },
            {
                title: "Mobile Apps",
                content: "iOS and Android applications development.",
                icon: "📱",
                theme: "green"
            },
            {
                title: "UI/UX Design",
                content: "Beautiful, intuitive interface designs.",
                icon: "🎨",
                theme: "orange"
            },
            {
                title: "Contact Us",
                content: "Ready to start your project? Get in touch.",
                icon: "📧",
                theme: "purple",
                isContact: true
            }
        ],
        loading: false
    };

    // DOM Elements
    const panelsContainer = document.getElementById('panelsContainer');
    const panelsWrapper = document.getElementById('panelsWrapper');

    // Create all panels
    function createPanels() {
        panelsWrapper.innerHTML = '';
        config.panelData.forEach((panelData, index) => {
            const panel = document.createElement('div');
            panel.className = 'panel';
            panel.dataset.theme = panelData.theme;
            
            panel.innerHTML = `
                <div class="panel-content">
                    <h2>${panelData.title}</h2>
                    <p>${panelData.content}</p>
                    <div class="icon">${panelData.icon}</div>
                    ${panelData.isContact ? '<button class="contact-btn">Contact Now</button>' : ''}
                </div>
            `;
            
            panelsWrapper.appendChild(panel);
        });

        // Add contact button event
        const contactBtn = document.querySelector('.contact-btn');
        if (contactBtn) {
            contactBtn.addEventListener('click', function() {
                alert('Thank you for your interest! Our team will contact you soon.');
            });
        }
    }

    // Handle infinite scroll
    function setupInfiniteScroll() {
        panelsContainer.addEventListener('scroll', function() {
            if (config.loading) return;

            // Check if scrolled to 80% of container
            const scrollLeft = panelsContainer.scrollLeft;
            const scrollWidth = panelsContainer.scrollWidth;
            const clientWidth = panelsContainer.clientWidth;
            
            if (scrollLeft + clientWidth > scrollWidth * 0.8) {
                loadMorePanels();
            }
        });
    }

    // Load additional panels
    function loadMorePanels() {
        config.loading = true;
        
        // Create loading indicator
        const loadingPanel = document.createElement('div');
        loadingPanel.className = 'panel';
        loadingPanel.innerHTML = '<div class="panel-content">Loading...</div>';
        panelsWrapper.appendChild(loadingPanel);

        // Simulate API call
        setTimeout(() => {
            // Remove loading panel
            panelsWrapper.removeChild(loadingPanel);
            
            // Add new panel (in a real app, this would come from an API)
            const newPanelData = {
                title: `Service ${config.panelData.length + 1}`,
                content: "Additional service loaded dynamically.",
                icon: "✨",
                theme: "blue"
            };
            
            config.panelData.push(newPanelData);
            
            const newPanel = document.createElement('div');
            newPanel.className = 'panel';
            newPanel.dataset.theme = newPanelData.theme;
            newPanel.innerHTML = `
                <div class="panel-content">
                    <h2>${newPanelData.title}</h2>
                    <p>${newPanelData.content}</p>
                    <div class="icon">${newPanelData.icon}</div>
                </div>
            `;
            
            panelsWrapper.appendChild(newPanel);
            config.loading = false;
        }, 1000);
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
        setupInfiniteScroll();
        initKeyboardNav();
    }

    // Start the app
    init();
});