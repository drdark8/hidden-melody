document.addEventListener("DOMContentLoaded", () => {
    const productsContainer = document.getElementById("products");
    const cartCount = document.getElementById("cart-count");
    const cartModal = document.getElementById("cart-modal");
    const cartItems = document.getElementById("cart-items");
    const closeModal = document.querySelector(".close");
    const checkoutButton = document.getElementById("checkout");
    const themeToggle = document.getElementById("theme-toggle");

    let cart = [];

    // دریافت محصولات از فایل JSON
    fetch("products.json")
        .then(response => response.json())
        .then(products => {
            products.forEach(product => {
                let productElement = document.createElement("div");
                productElement.classList.add("product");
                productElement.innerHTML = `
                    <img src="${product.image}" alt="${product.name}">
                    <h3>${product.name}</h3>
                    <p>${product.price} تومان</p>
                    <button onclick="addToCart(${product.id})">افزودن به سبد خرید</button>
                `;
                productsContainer.appendChild(productElement);
            });
        });

    // افزودن به سبد خرید
    window.addToCart = (id) => {
        fetch("products.json")
            .then(response => response.json())
            .then(products => {
                let product = products.find(p => p.id === id);
                cart.push(product);
                cartCount.textContent = cart.length;
                renderCart();
            });
    };

    // نمایش سبد خرید
    document.getElementById("cart-btn").addEventListener("click", () => {
        cartModal.style.display = "block";
    });

    // بستن مودال
    closeModal.addEventListener("click", () => {
        cartModal.style.display = "none";
    });

    // نمایش محصولات در سبد خرید
    function renderCart() {
        cartItems.innerHTML = "";
        cart.forEach(item => {
            let li = document.createElement("li");
            li.textContent = `${item.name} - ${item.price} تومان`;
            cartItems.appendChild(li);
        });
    }

    // تغییر حالت تاریک
    themeToggle.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
    });
});
