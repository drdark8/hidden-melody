// Sample product data
const products = [
    {
        id: 1,
        name: "گوشی هوشمند سامسونگ گلکسی S24",
        price: "۴۹,۹۹۹,۰۰۰",
        image: "images/samsung-s24.jpg",
        category: "موبایل"
    },
    {
        id: 2,
        name: "لپ‌تاپ اپل مک‌بوک پرو M3",
        price: "۱۲۹,۹۹۹,۰۰۰",
        image: "images/macbook-pro.jpg",
        category: "لپ‌تاپ"
    },
    {
        id: 3,
        name: "هدفون بی‌سیم اپل ایرپادز پرو",
        price: "۱۲,۹۹۹,۰۰۰",
        image: "images/airpods-pro.jpg",
        category: "لوازم جانبی"
    },
    {
        id: 4,
        name: "گوشی هوشمند اپل آیفون ۱۵ پرو",
        price: "۸۹,۹۹۹,۰۰۰",
        image: "images/iphone-15.jpg",
        category: "موبایل"
    },
    {
        id: 5,
        name: "لپ‌تاپ لنوو لژیون",
        price: "۷۹,۹۹۹,۰۰۰",
        image: "images/lenovo-legion.jpg",
        category: "لپ‌تاپ"
    },
    {
        id: 6,
        name: "کیبورد مکانیکی رازر",
        price: "۲,۹۹۹,۰۰۰",
        image: "images/razer-keyboard.jpg",
        category: "لوازم جانبی"
    }
];

// Cart functionality
let cart = [];

// Load featured products
function loadFeaturedProducts() {
    const productGrid = document.getElementById('featured-products');
    productGrid.innerHTML = '';

    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <p class="product-price">${product.price} تومان</p>
                <button onclick="addToCart(${product.id})" class="cta-button">افزودن به سبد خرید</button>
            </div>
        `;
        productGrid.appendChild(productCard);
    });
}

// Add to cart functionality
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        cart.push(product);
        updateCartCount();
        showNotification('محصول به سبد خرید اضافه شد');
    }
}

// Update cart count
function updateCartCount() {
    const cartCount = document.querySelector('.nav-links a:last-child');
    if (cartCount) {
        cartCount.innerHTML = `سبد خرید <i class="fas fa-shopping-cart"></i> (${cart.length})`;
    }
}

// Show notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Search functionality
const searchInput = document.querySelector('.search-bar input');
searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filteredProducts = products.filter(product => 
        product.name.toLowerCase().includes(searchTerm) ||
        product.category.toLowerCase().includes(searchTerm)
    );
    
    const productGrid = document.getElementById('featured-products');
    productGrid.innerHTML = '';

    filteredProducts.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <p class="product-price">${product.price} تومان</p>
                <button onclick="addToCart(${product.id})" class="cta-button">افزودن به سبد خرید</button>
            </div>
        `;
        productGrid.appendChild(productCard);
    });
});

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    loadFeaturedProducts();
    updateCartCount();
}); 
