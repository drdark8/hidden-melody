// Sample product data with more products
const products = [
    {
        id: 1,
        name: "گوشی هوشمند سامسونگ گلکسی S24",
        price: "۴۹,۹۹۹,۰۰۰",
        image: "https://images.samsung.com/is/image/samsung/p6pim/levant/2401/gallery/levant-galaxy-s24-s928-sm-s928bzkcmea-thumb-539209096",
        category: "موبایل",
        description: "گوشی هوشمند سامسونگ گلکسی S24 با پردازنده قدرتمند و دوربین پیشرفته",
        specs: {
            screen: "6.7 اینچ",
            processor: "Snapdragon 8 Gen 3",
            ram: "8GB",
            storage: "256GB",
            battery: "4500mAh"
        }
    },
    {
        id: 2,
        name: "لپ‌تاپ اپل مک‌بوک پرو M3",
        price: "۱۲۹,۹۹۹,۰۰۰",
        image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mbp-spacegray-select-202310?wid=904&hei=840&fmt=jpeg",
        category: "لپ‌تاپ",
        description: "لپ‌تاپ اپل مک‌بوک پرو با پردازنده M3 و نمایشگر Retina",
        specs: {
            screen: "14 اینچ",
            processor: "Apple M3",
            ram: "16GB",
            storage: "512GB SSD",
            battery: "Up to 22 hours"
        }
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

// User data
let currentUser = {
    name: "کاربر",
    email: "",
    phone: "",
    address: "",
    orders: []
};

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
            <img src="${product.image}" alt="${product.name}" class="product-image" onerror="this.src='images/placeholder.jpg'">
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <p class="product-price">${product.price} تومان</p>
                <div class="product-actions">
                    <button onclick="showProductDetails(${product.id})" class="cta-button secondary">جزئیات</button>
                    <button onclick="addToCart(${product.id})" class="cta-button primary">افزودن به سبد خرید</button>
                </div>
            </div>
        `;
        productGrid.appendChild(productCard);
    });
}

// Show product details
function showProductDetails(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <div class="product-details">
                <img src="${product.image}" alt="${product.name}" class="product-detail-image" onerror="this.src='images/placeholder.jpg'">
                <div class="product-detail-info">
                    <h2>${product.name}</h2>
                    <p class="product-price">${product.price} تومان</p>
                    <p class="product-description">${product.description}</p>
                    <div class="product-specs">
                        <h3>مشخصات فنی:</h3>
                        <ul>
                            ${Object.entries(product.specs).map(([key, value]) => `
                                <li><strong>${key}:</strong> ${value}</li>
                            `).join('')}
                        </ul>
                    </div>
                    <button onclick="addToCart(${product.id})" class="cta-button primary">افزودن به سبد خرید</button>
                </div>
            </div>
        </div>
    `;

    document.body.appendChild(modal);

    // Close modal functionality
    const closeBtn = modal.querySelector('.close-modal');
    closeBtn.onclick = () => modal.remove();
    modal.onclick = (e) => {
        if (e.target === modal) modal.remove();
    };
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

// Show cart modal
function showCart() {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content cart-modal">
            <span class="close-modal">&times;</span>
            <h2>سبد خرید</h2>
            <div class="cart-items">
                ${cart.map((item, index) => `
                    <div class="cart-item">
                        <img src="${item.image}" alt="${item.name}" class="cart-item-image" onerror="this.src='images/placeholder.jpg'">
                        <div class="cart-item-info">
                            <h3>${item.name}</h3>
                            <p>${item.price} تومان</p>
                        </div>
                        <button onclick="removeFromCart(${index})" class="remove-item">&times;</button>
                    </div>
                `).join('')}
            </div>
            <div class="cart-summary">
                <h3>جمع کل: ${calculateTotal()} تومان</h3>
                <button onclick="proceedToCheckout()" class="cta-button primary">نهایی کردن خرید</button>
            </div>
        </div>
    `;

    document.body.appendChild(modal);

    const closeBtn = modal.querySelector('.close-modal');
    closeBtn.onclick = () => modal.remove();
    modal.onclick = (e) => {
        if (e.target === modal) modal.remove();
    };
}

// Remove from cart
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartCount();
    showCart();
}

// Calculate total
function calculateTotal() {
    return cart.reduce((total, item) => {
        const price = parseInt(item.price.replace(/,/g, ''));
        return total + price;
    }, 0).toLocaleString('fa-IR');
}

// Proceed to checkout
function proceedToCheckout() {
    if (cart.length === 0) {
        showNotification('سبد خرید شما خالی است');
        return;
    }

    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content checkout-modal">
            <span class="close-modal">&times;</span>
            <h2>نهایی کردن خرید</h2>
            <form id="checkout-form">
                <div class="form-group">
                    <label>نام و نام خانوادگی</label>
                    <input type="text" required value="${currentUser.name}">
                </div>
                <div class="form-group">
                    <label>شماره موبایل</label>
                    <input type="tel" required value="${currentUser.phone}">
                </div>
                <div class="form-group">
                    <label>آدرس</label>
                    <textarea required>${currentUser.address}</textarea>
                </div>
                <div class="form-group">
                    <label>روش پرداخت</label>
                    <select required>
                        <option value="">انتخاب کنید</option>
                        <option value="online">پرداخت آنلاین</option>
                        <option value="cash">پرداخت در محل</option>
                    </select>
                </div>
                <div class="order-summary">
                    <h3>خلاصه سفارش</h3>
                    <p>تعداد محصولات: ${cart.length}</p>
                    <p>جمع کل: ${calculateTotal()} تومان</p>
                </div>
                <button type="submit" class="cta-button primary">ثبت سفارش</button>
            </form>
        </div>
    `;

    document.body.appendChild(modal);

    const closeBtn = modal.querySelector('.close-modal');
    closeBtn.onclick = () => modal.remove();
    modal.onclick = (e) => {
        if (e.target === modal) modal.remove();
    };

    // Handle form submission
    const form = modal.querySelector('#checkout-form');
    form.onsubmit = (e) => {
        e.preventDefault();
        // Here you would typically send the order to a server
        showNotification('سفارش شما با موفقیت ثبت شد');
        cart = [];
        updateCartCount();
        modal.remove();
    };
}

// Show user settings
function showUserSettings() {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content settings-modal">
            <span class="close-modal">&times;</span>
            <h2>تنظیمات کاربری</h2>
            <form id="settings-form">
                <div class="form-group">
                    <label>نام و نام خانوادگی</label>
                    <input type="text" value="${currentUser.name}">
                </div>
                <div class="form-group">
                    <label>ایمیل</label>
                    <input type="email" value="${currentUser.email}">
                </div>
                <div class="form-group">
                    <label>شماره موبایل</label>
                    <input type="tel" value="${currentUser.phone}">
                </div>
                <div class="form-group">
                    <label>آدرس</label>
                    <textarea>${currentUser.address}</textarea>
                </div>
                <div class="order-history">
                    <h3>تاریخچه سفارشات</h3>
                    ${currentUser.orders.map(order => `
                        <div class="order-item">
                            <p>شماره سفارش: ${order.id}</p>
                            <p>تاریخ: ${order.date}</p>
                            <p>مبلغ: ${order.total} تومان</p>
                        </div>
                    `).join('')}
                </div>
                <button type="submit" class="cta-button primary">ذخیره تغییرات</button>
            </form>
        </div>
    `;

    document.body.appendChild(modal);

    const closeBtn = modal.querySelector('.close-modal');
    closeBtn.onclick = () => modal.remove();
    modal.onclick = (e) => {
        if (e.target === modal) modal.remove();
    };

    // Handle form submission
    const form = modal.querySelector('#settings-form');
    form.onsubmit = (e) => {
        e.preventDefault();
        // Here you would typically update user data on a server
        showNotification('تغییرات با موفقیت ذخیره شد');
        modal.remove();
    };
}

// Update cart count
function updateCartCount() {
    const cartCount = document.querySelector('.cart-link');
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
            <img src="${product.image}" alt="${product.name}" class="product-image" onerror="this.src='images/placeholder.jpg'">
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <p class="product-price">${product.price} تومان</p>
                <div class="product-actions">
                    <button onclick="showProductDetails(${product.id})" class="cta-button secondary">جزئیات</button>
                    <button onclick="addToCart(${product.id})" class="cta-button primary">افزودن به سبد خرید</button>
                </div>
            </div>
        `;
        productGrid.appendChild(productCard);
    });
});

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    loadFeaturedProducts();
    updateCartCount();

    // Add event listeners
    document.querySelector('.cart-link').addEventListener('click', (e) => {
        e.preventDefault();
        showCart();
    });

    // Add filter functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            const category = button.textContent;
            const filteredProducts = category === 'همه' 
                ? products 
                : products.filter(product => product.category === category);
            
            const productGrid = document.getElementById('featured-products');
            productGrid.innerHTML = '';

            filteredProducts.forEach(product => {
                const productCard = document.createElement('div');
                productCard.className = 'product-card';
                productCard.innerHTML = `
                    <img src="${product.image}" alt="${product.name}" class="product-image" onerror="this.src='images/placeholder.jpg'">
                    <div class="product-info">
                        <h3 class="product-title">${product.name}</h3>
                        <p class="product-price">${product.price} تومان</p>
                        <div class="product-actions">
                            <button onclick="showProductDetails(${product.id})" class="cta-button secondary">جزئیات</button>
                            <button onclick="addToCart(${product.id})" class="cta-button primary">افزودن به سبد خرید</button>
                        </div>
                    </div>
                `;
                productGrid.appendChild(productCard);
            });
        });
    });
}); 
