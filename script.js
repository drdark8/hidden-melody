let cart = [];

function addToCart(productName, price) {
    cart.push({ name: productName, price: price });
    alert(`${productName} به سبد خرید اضافه شد!`);
}
