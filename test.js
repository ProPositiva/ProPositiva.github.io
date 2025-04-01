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
            }
        ],
        // Contact panel is always last
        contactPanel: {
            title: "Contact Us",
            content: "Ready to start your project? Get in touch.",
            icon: "📧",
            theme: "purple",
            isContact: true
        }
    };

    // DOM Elements
    const panelsContainer = document.getElementById('panelsContainer');
    const panelsWrapper = document.getElementById('panelsWrapper');

    // Create all panels
    function createPanels() {
        panelsWrapper.innerHTML = '';
        
        // Create regular panels
        config.panelData.forEach((panelData) => {
            createPanel(panelData);
        });
        
        // Always add contact panel last
        createPanel(config.contactPanel);
    }

    // Create a single panel
    function createPanel(panelData) {
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
        
        // Add contact button event if this is the contact panel
        if (panelData.isContact) {
            panel.querySelector('.contact-btn').addEventListener('click', function() {
                alert('Thank you for your interest! Our team will contact you soon.');
            });
        }
    }

    // Initialize keyboard navigation
    function initKeyboardNav() {
        document.addEventListener('keydown', function(e) {
            if (e.key === 'ArrowUp') {
                panelsContainer.scrollBy({ top: -panelsContainer.clientHeight, behavior: 'smooth' });
            } else if (e.key === 'ArrowDown') {
                panelsContainer.scrollBy({ top: panelsContainer.clientHeight, behavior: 'smooth' });
            }
        });
    }

    // Check if mobile device
    function isMobile() {
        return window.matchMedia("(max-width: 768px)").matches;
    }

    // Initialize everything
    function init() {
        createPanels();
        initKeyboardNav();
        
        // Switch to horizontal scroll on mobile
        if (isMobile()) {
            panelsContainer.style.scrollSnapType = 'x mandatory';
        }
    }

    // Start the app
    init();
});