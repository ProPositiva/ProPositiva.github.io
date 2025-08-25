// Get the product ID from the URL
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');

// DOM Elements
const mainImage = document.getElementById('main-image');
const thumbnailGrid = document.getElementById('thumbnail-grid');
const detailTitle = document.getElementById('detail-title');
const detailCategory = document.getElementById('detail-category');
const detailDescription = document.getElementById('detail-description');
const videoContainer = document.getElementById('video-container');
const backButton = document.getElementById('back-button');

// Get product data from sessionStorage or sample data
function getProductById(id) {
    // First try to get from sessionStorage
    const storedProduct = sessionStorage.getItem('currentProduct');
    if (storedProduct) {
        const product = JSON.parse(storedProduct);
        if (product.id === parseInt(id)) {
            return product;
        }
    }
    
    // Fallback to sample data if not found in sessionStorage
    const products = [
        {
            id: 1,
            title: "Lote Listo para Construir en Condominio en Santo Domingo de Heredia",
            category: "Lotes",
            image: "Assets/Images/Catalog/Paso Domingo/Paso-Domingo-CRC-11.jpg",
            description: "Esta es su oportunidad de construir la casa que siempre ha deseado en una excelente ubicación. Este terreno en condominio cuenta con 225m2 de área y ha sido cuidadosamente seleccionado. Esquinero, de topografía suave, con la adecuada exposición al sol y listo para construcción. Se encuentra en el centro de Santo Domingo de Heredia, con acceso a vías principales, comercios y múltiples servicios. El condominio cuenta con acceso controlado, vigilancia las 24 hrs, cerramiento perimetral y planta de tratamiento. Disfrute de amenidades como: casa club, piscina, gimnasio, cancha de fútbol 5, juegos infantiles, fire pit y una infraestructura de primera. Servicios públicos disponibles: agua, planta de tratamiento, electricidad, internet. Cuota de mantenimiento $150. Contáctenos hoy mismo.",
            images: ["Assets/Images/Catalog/Paso Domingo/Paso-Domingo-CRC-1.jpg","Assets/Images/Catalog/Paso Domingo/Paso-Domingo-CRC-2.jpg","Assets/Images/Catalog/Paso Domingo/Paso-Domingo-CRC-3.jpg","Assets/Images/Catalog/Paso Domingo/Paso-Domingo-CRC-4.jpg","Assets/Images/Catalog/Paso Domingo/Paso-Domingo-CRC-5.jpg","Assets/Images/Catalog/Paso Domingo/Paso-Domingo-CRC-6.jpg","Assets/Images/Catalog/Paso Domingo/Paso-Domingo-CRC-7.jpg","Assets/Images/Catalog/Paso Domingo/Paso-Domingo-CRC-8.jpg","Assets/Images/Catalog/Paso Domingo/Paso-Domingo-CRC-9.jpg","Assets/Images/Catalog/Paso Domingo/Paso-Domingo-CRC-10.jpg","Assets/Images/Catalog/Paso Domingo/Paso-Domingo-CRC-11.jpg","Assets/Images/Catalog/Paso Domingo/Paso-Domingo-CRC-12.jpg","Assets/Images/Catalog/Paso Domingo/Paso-Domingo-CRC-13.jpg","Assets/Images/Catalog/Paso Domingo/Paso-Domingo-CRC-14.jpg","Assets/Images/Catalog/Paso Domingo/Paso-Domingo-CRC-15.jpg","Assets/Images/Catalog/Paso Domingo/paso_domingo-scaled-50A.jpg"],
            /* videos: ["https://www.youtube.com/embed/example1"] */
        },
        {
            id: 2,
            title: "Product 2",
            category: "Category 2",
            image: "images/product2.jpg",
            description: "Detailed description of Product 2 with all its features and specifications.\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc eu nisl.",
            images: ["images/product2.jpg", "images/product2-1.jpg"],
            videos: []
        },
        {
            id: 3,
            title: "Product 3",
            category: "Category 1",
            image: "images/product3.jpg",
            description: "Detailed description of Product 3 with all its features and specifications.\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc eu nisl.",
            images: ["images/product3.jpg", "images/product3-1.jpg", "images/product3-2.jpg"],
            videos: ["https://www.youtube.com/embed/example3"]
        },
        {
            id: 4,
            title: "Product 4",
            category: "Category 3",
            image: "images/product4.jpg",
            description: "Detailed description of Product 4 with all its features and specifications.\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc eu nisl.",
            images: ["images/product4.jpg", "images/product4-1.jpg"],
            videos: []
        },
        {
            id: 5,
            title: "Product 5",
            category: "Category 2",
            image: "images/product5.jpg",
            description: "Detailed description of Product 5 with all its features and specifications.\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc eu nisl.",
            images: ["images/product5.jpg", "images/product5-1.jpg", "images/product5-2.jpg"],
            videos: ["https://www.youtube.com/embed/example5"]
        },
        {
            id: 6,
            title: "Product 6",
            category: "Category 3",
            image: "images/product6.jpg",
            description: "Detailed description of Product 6 with all its features and specifications.\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc eu nisl.",
            images: ["images/product6.jpg", "images/product6-1.jpg"],
            videos: []
        }
    ];
    
    return products.find(product => product.id === parseInt(id));
}

// Render product details
function renderProductDetails(product) {
    if (!product) {
        handleProductNotFound();
        return;
    }
    
    // Set main product info
    document.title = `${product.title} | Product Catalog`;
    document.getElementById('item-title').textContent = product.title;
    detailTitle.textContent = product.title;
    detailCategory.textContent = product.category;
    
    // Format description with paragraphs
    detailDescription.innerHTML = product.description
        .split('\n\n')
        .map(para => para.startsWith('- ') ? `<li>${para.substring(2)}</li>` : `<p>${para}</p>`)
        .join('')
        .replace('<li>', '<ul><li>')
        .replace(/<\/li>(?![^<]*<\/ul>)/g, '</li></ul>');
    
    // Set main image
    mainImage.src = product.image;
    mainImage.alt = product.title;
    
    // Create thumbnails
    thumbnailGrid.innerHTML = '';
    product.images.forEach((image, index) => {
        const thumbnail = document.createElement('div');
        thumbnail.className = `thumbnail ${index === 0 ? 'active' : ''}`;
        thumbnail.innerHTML = `<img src="${image}" alt="${product.title} - ${index + 1}" loading="lazy">`;
        
        thumbnail.addEventListener('click', () => {
            // Update main image
            mainImage.src = image;
            
            // Update active thumbnail
            document.querySelectorAll('.thumbnail').forEach(t => t.classList.remove('active'));
            thumbnail.classList.add('active');
        });
        
        thumbnailGrid.appendChild(thumbnail);
    });
    
    // Add video if available
    videoContainer.innerHTML = '';
    if (product.videos && product.videos.length > 0) {
        product.videos.forEach(video => {
            const iframe = document.createElement('iframe');
            iframe.src = video;
            iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
            iframe.allowFullscreen = true;
            videoContainer.appendChild(iframe);
        });
    } else {
        videoContainer.style.display = 'none';
    }
    
    // Add zoom functionality
    mainImage.addEventListener('click', function() {
        this.classList.toggle('zoomed');
    });
    
    // Set up back button
    backButton.addEventListener('click', (e) => {
        e.preventDefault();
        const storedFilter = sessionStorage.getItem('currentFilter');
        if (storedFilter) {
            window.location.href = `catalog.html?filter=${encodeURIComponent(storedFilter)}`;
        } else {
            window.location.href = 'catalog.html';
        }
    });
    
    // Mark as loaded
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);
}

// Handle product not found
function handleProductNotFound() {
    document.body.innerHTML = `
        <header>
            <div class="container">
                <a href="catalog.html" class="back-button">
                    <i class="fas fa-arrow-left"></i> Back to Catalog
                </a>
                <h1>Product Not Found</h1>
            </div>
        </header>
        <main class="container">
            <div style="text-align: center; padding: 3rem;">
                <h2>We couldn't find that product</h2>
                <p>The requested product doesn't exist or may have been removed.</p>
                <a href="catalog.html" class="back-button" style="display: inline-flex; margin-top: 1.5rem;">
                    <i class="fas fa-arrow-left"></i> Return to Catalog
                </a>
            </div>
        </main>
        <footer>
            <div class="container">
                <p>&copy; Copyright Alianza ProPositiva 2025</p>
            </div>
        </footer>
    `;
    
    document.body.classList.add('loaded');
}

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    // Check if product ID exists
    if (!productId) {
        window.location.href = 'catalog.html';
        return;
    }
    
    const product = getProductById(productId);
    
    // Add keyboard navigation for zoom
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mainImage.classList.contains('zoomed')) {
            mainImage.classList.remove('zoomed');
        }
    });
    
    renderProductDetails(product);
});

// Second logo fade on scroll
document.addEventListener('DOMContentLoaded', function() {
  const secondLogo = document.querySelector('.second-logo');
  
  window.addEventListener('scroll', function() {
    if (window.scrollY > 10) {
      secondLogo.classList.add('scrolled');
    } else {
      secondLogo.classList.remove('scrolled');
    }
  });
});


// Improved Dock Menu Functionality
const dockWrapper = document.querySelector('.dock-wrapper');
let dockHideTimeout;

// Make the entire left edge trigger area interactive
dockWrapper.style.pointerEvents = 'auto';

dockWrapper.addEventListener('mouseenter', () => {
  clearTimeout(dockHideTimeout);
  dockWrapper.classList.add('dock-visible');
});

dockWrapper.addEventListener('mouseleave', () => {
  dockHideTimeout = setTimeout(() => {
    dockWrapper.classList.remove('dock-visible');
  }, 300);
});

// Handle dock item clicks
document.querySelectorAll('.dock-item').forEach(item => {
  item.addEventListener('click', (e) => {
    if (item.getAttribute('href').startsWith('#')) {
      e.preventDefault();
      const target = document.querySelector(item.getAttribute('href'));
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Mobile Touch Support
if ('ontouchstart' in window) {
  const dock = document.querySelector('.dock-wrapper');
  
  dock.addEventListener('touchstart', (e) => {
    e.currentTarget.classList.add('dock-visible');
  });

  document.addEventListener('touchstart', (e) => {
    if (!e.target.closest('.dock-wrapper')) {
      document.querySelector('.dock-wrapper').classList.remove('dock-visible');
    }
  }, { passive: true });
}