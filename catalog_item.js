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

// Fetch product data (in a real app, this would be an API call)
function getProductById(id) {
    // This would be replaced with actual API call
    const products = [
        {
            id: 1,
            title: "Product 1",
            category: "Category 1",
            image: "images/product1.jpg",
            description: "Detailed description of Product 1 with all its features and specifications. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc eu nisl.",
            images: ["images/product1.jpg", "images/product1-1.jpg", "images/product1-2.jpg"],
            videos: ["https://www.youtube.com/embed/example1"]
        },
        {
            id: 2,
            title: "Product 2",
            category: "Category 2",
            image: "images/product2.jpg",
            description: "Detailed description of Product 2 with all its features and specifications. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc eu nisl.",
            images: ["images/product2.jpg", "images/product2-1.jpg"],
            videos: []
        }
    ];
    
    return products.find(product => product.id === parseInt(id));
}

// Render product details
function renderProductDetails(product) {
    if (!product) {
        // Handle product not found
        window.location.href = 'index.html';
        return;
    }
    
    // Set main product info
    document.title = `${product.title} | Product Catalog`;
    document.getElementById('item-title').textContent = product.title;
    detailTitle.textContent = product.title;
    detailCategory.textContent = product.category;
    detailDescription.textContent = product.description;
    
    // Set main image
    mainImage.src = product.image;
    mainImage.alt = product.title;
    
    // Create thumbnails
    thumbnailGrid.innerHTML = '';
    product.images.forEach((image, index) => {
        const thumbnail = document.createElement('div');
        thumbnail.className = 'thumbnail';
        thumbnail.innerHTML = `<img src="${image}" alt="${product.title} - ${index + 1}">`;
        
        thumbnail.addEventListener('click', () => {
            mainImage.src = image;
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
}

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    const product = getProductById(productId);
    renderProductDetails(product);
});