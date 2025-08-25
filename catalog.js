// ======================
// DOCK MENU FUNCTIONALITY
// ======================
(function initDockMenu() {
    'use strict';
    
    const dockWrapper = document.querySelector('.dock-wrapper');
    if (!dockWrapper) return;
    
    let dockHideTimeout;
    const dockMenu = dockWrapper.querySelector('.dock-menu');
    
    // Make the entire left edge trigger area interactive
    dockWrapper.style.pointerEvents = 'auto';

    // Mouse interactions
    dockWrapper.addEventListener('mouseenter', handleDockEnter);
    dockWrapper.addEventListener('mouseleave', handleDockLeave);
    
    // Handle dock item clicks using event delegation
    dockMenu.addEventListener('click', handleDockClick);
    
    // Mobile Touch Support
    if ('ontouchstart' in window) {
        dockWrapper.addEventListener('touchstart', handleDockTouch);
        document.addEventListener('touchstart', handleDocumentTouch, { passive: true });
    }

    function handleDockEnter() {
        clearTimeout(dockHideTimeout);
        dockWrapper.classList.add('dock-visible');
    }

    function handleDockLeave() {
        dockHideTimeout = setTimeout(() => {
            dockWrapper.classList.remove('dock-visible');
        }, 300);
    }

    function handleDockClick(e) {
        const dockItem = e.target.closest('.dock-item');
        if (!dockItem) return;
        
        if (dockItem.getAttribute('href').startsWith('#')) {
            e.preventDefault();
            const target = document.querySelector(dockItem.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    }

    function handleDockTouch(e) {
        e.currentTarget.classList.add('dock-visible');
    }

    function handleDocumentTouch(e) {
        if (!e.target.closest('.dock-wrapper')) {
            dockWrapper.classList.remove('dock-visible');
        }
    }
})();

// ======================
// CATALOG FUNCTIONALITY
// ======================
// Sample catalog data
const catalogData = [
    {
        id: 1,
		title: "Lote Listo para Construir en Condominio en Santo Domingo de Heredia",
		category: "Lotes",
		image: "Assets/Images/Catalog/Paso Domingo/Paso-Domingo-CRC-11.jpg",
		description: "Esta es su oportunidad de construir la casa que siempre ha deseado en una excelente ubicación. Este terreno en condominio cuenta con 225m2 de área y ha sido cuidadosamente seleccionado. Esquinero, de topografía suave, con la adecuada exposición al sol y listo para construcción. Se encuentra en el centro de Santo Domingo de Heredia, con acceso a vías principales, comercios y múltiples servicios. El condominio cuenta con acceso controlado, vigilancia las 24 hrs, cerramiento perimetral y planta de tratamiento. Disfrute de amenidades como: casa club, piscina, gimnasio, cancha de fútbol 5, juegos infantiles, fire pit y una infraestructura de primera. Servicios públicos disponibles: agua, planta de tratamiento, electricidad, internet. Cuota de mantenimiento $150. Contáctenos hoy mismo.",
        images: ["Assets/Images/Catalog/Paso Domingo/Paso-Domingo-CRC-11.jpg","Assets/Images/Catalog/Paso Domingo/Paso-Domingo-CRC-5.jpg","Assets/Images/Catalog/Paso Domingo/Paso-Domingo-CRC-6.jpg","Assets/Images/Catalog/Paso Domingo/Paso-Domingo-CRC-7.jpg","Assets/Images/Catalog/Paso Domingo/Paso-Domingo-CRC-8.jpg","Assets/Images/Catalog/Paso Domingo/Paso-Domingo-CRC-9.jpg","Assets/Images/Catalog/Paso Domingo/Paso-Domingo-CRC-10.jpg","Assets/Images/Catalog/Paso Domingo/Paso-Domingo-CRC-12.jpg","Assets/Images/Catalog/Paso Domingo/Paso-Domingo-CRC-13.jpg","Assets/Images/Catalog/Paso Domingo/Paso-Domingo-CRC-14.jpg","Assets/Images/Catalog/Paso Domingo/Paso-Domingo-CRC-15.jpg","Assets/Images/Catalog/Paso Domingo/paso_domingo-scaled-50A.jpg"],
		/* videos: ["https://www.youtube.com/embed/example1"] */
    }/* ,
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
    } */
];

// DOM Elements
const catalogGrid = document.querySelector('.catalog-grid');
const navLinks = document.querySelectorAll('header nav a');

// Initialize the catalog
function initCatalog() {
    renderCatalogItems(catalogData);
    setupEventListeners();
    setupIntersectionObserver();
}

// Show loading state
function showLoadingState() {
    catalogGrid.innerHTML = '';
    for (let i = 0; i < 1; i++) {
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
            <div class="item-info">
                <h3 class="item-title">${item.title}</h3>
                <span class="item-category">${item.category}</span>
                <p class="item-description">${item.description.substring(0, 80)}...</p>
            </div>
        `;
        
        itemElement.addEventListener('click', (e) => {
            if (!e.target.classList.contains('item-description')) {
                // Save both product data and current filter
                sessionStorage.setItem('currentProduct', JSON.stringify(item));
                const activeFilter = document.querySelector('nav a.active')?.textContent;
                if (activeFilter) {
                    sessionStorage.setItem('currentFilter', activeFilter);
                }
                
                // Navigate to detail page
                window.location.href = `catalog_item.html?id=${item.id}`;
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
    
    // Check for filter on page load
    const urlParams = new URLSearchParams(window.location.search);
    const filter = urlParams.get('filter');
    if (filter) {
        const activeLink = [...navLinks].find(link => link.textContent === filter);
        if (activeLink) {
            activeLink.classList.add('active');
            filterItems(filter);
        }
    }
}

// Initialize the catalog when the page loads
document.addEventListener('DOMContentLoaded', () => {
    showLoadingState();
    setTimeout(initCatalog, 800);
});