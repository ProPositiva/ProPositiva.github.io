// Sample catalog data (in a real app, this would come from an API)
const catalogData = [
    {
        id: 1,
        title: "Product 1",
        category: "Category 1",
        image: "images/product1.jpg",
        description: "Detailed description of Product 1 with all its features and specifications.",
        images: ["images/product1-1.jpg", "images/product1-2.jpg"],
        videos: ["https://example.com/video1.mp4"]
    },
    {
        id: 2,
        title: "Product 2",
        category: "Category 2",
        image: "images/product2.jpg",
        description: "Detailed description of Product 2 with all its features and specifications.",
        images: ["images/product2-1.jpg", "images/product2-2.jpg"],
        videos: []
    },
    {
        id: 3,
        title: "Product 3",
        category: "Category 1",
        image: "images/product3.jpg",
        description: "Detailed description of Product 3 with all its features and specifications.",
        images: ["images/product3-1.jpg", "images/product3-2.jpg"],
        videos: ["https://example.com/video3.mp4"]
    },
    {
        id: 4,
        title: "Product 4",
        category: "Category 3",
        image: "images/product4.jpg",
        description: "Detailed description of Product 4 with all its features and specifications.",
        images: ["images/product4-1.jpg"],
        videos: []
    },
    {
        id: 5,
        title: "Product 5",
        category: "Category 2",
        image: "images/product5.jpg",
        description: "Detailed description of Product 5 with all its features and specifications.",
        images: ["images/product5-1.jpg", "images/product5-2.jpg"],
        videos: ["https://example.com/video5.mp4"]
    },
    {
        id: 6,
        title: "Product 6",
        category: "Category 3",
        image: "images/product6.jpg",
        description: "Detailed description of Product 6 with all its features and specifications.",
        images: ["images/product6-1.jpg"],
        videos: []
    }
];

// DOM Elements
const catalogGrid = document.querySelector('.catalog-grid');
const navLinks = document.querySelectorAll('nav a');

// Initialize the catalog
function initCatalog() {
    renderCatalogItems(catalogData);
    setupEventListeners();
    setupIntersectionObserver();
}

// Show loading state
function showLoadingState() {
    catalogGrid.innerHTML = '';
    for (let i = 0; i < 6; i++) {
        const loadingItem = document.createElement('div');
        loadingItem.className = 'catalog-item loading-item';
        catalogGrid.appendChild(loadingItem);
    }
}

// Render catalog items
function renderCatalogItems(items) {
    catalogGrid.innerHTML = '';
    
    if (items.length === 0) {
        catalogGrid.innerHTML = `
            <div class="no-results" style="grid-column: 1/-1; text-align: center; padding: 3rem;">
                <h3>No products found</h3>
                <p>Try another category or check back later</p>
            </div>
        `;
        return;
    }
    
    items.forEach((item, index) => {
        const itemElement = document.createElement('div');
        itemElement.className = 'catalog-item';
        itemElement.style.animationDelay = `${index * 0.1}s`;
        itemElement.innerHTML = `
            <img src="${item.image}" alt="${item.title}" loading="lazy">
            <div class="item-overlay">
                <h3 class="item-title">${item.title}</h3>
                <span class="item-category">${item.category}</span>
                <p class="item-description" style="margin-top: 0.5rem; font-size: 0.9rem; opacity: 0.9; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden;">
                    ${item.description}
                </p>
            </div>
        `;
        
        itemElement.addEventListener('click', (e) => {
            if (!e.target.classList.contains('item-description')) {
                itemElement.style.transform = 'scale(0.98)';
                setTimeout(() => {
                    window.location.href = `item.html?id=${item.id}`;
                }, 150);
            }
        });
        
        catalogGrid.appendChild(itemElement);
    });
}

// Filter items by category
function filterItems(category) {
    if (category === 'All') {
        renderCatalogItems(catalogData);
        return;
    }
    
    const filteredItems = catalogData.filter(item => item.category === category);
    renderCatalogItems(filteredItems);
}

// Set up intersection observer for animations
function setupIntersectionObserver() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('.catalog-item').forEach(item => {
        observer.observe(item);
    });
}

// Set up event listeners
function setupEventListeners() {
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Update active state
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            
            // Filter items
            filterItems(link.textContent);
        });
    });
}

// Initialize the catalog when the page loads
document.addEventListener('DOMContentLoaded', () => {
    showLoadingState();
    setTimeout(initCatalog, 800);
});