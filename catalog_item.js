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
            title: "Product 1",
            category: "Category 1",
            image: "images/product1.jpg",
            description: "Detailed description of Product 1 with all its features and specifications.\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc eu nisl.\n\nAdditional features:\n- High-quality materials\n- Eco-friendly production\n- 2-year warranty",
            images: ["images/product1.jpg", "images/product1-1.jpg", "images/product1-2.jpg"],
            videos: ["https://www.youtube.com/embed/example1"]
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