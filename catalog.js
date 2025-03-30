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
    // Add more products as needed
];

// DOM Elements
const catalogGrid = document.querySelector('.catalog-grid');
const navLinks = document.querySelectorAll('nav a');

// Initialize the catalog
function initCatalog() {
    renderCatalogItems(catalogData);
    setupEventListeners();
}

// Render catalog items
function renderCatalogItems(items) {
    catalogGrid.innerHTML = '';
    
    items.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'catalog-item';
        itemElement.innerHTML = `
            <img src="${item.image}" alt="${item.title}">
            <div class="item-overlay">
                <h3 class="item-title">${item.title}</h3>
                <span class="item-category">${item.category}</span>
            </div>
        `;
        
        itemElement.addEventListener('click', () => {
            window.location.href = `item.html?id=${item.id}`;
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
document.addEventListener('DOMContentLoaded', initCatalog);