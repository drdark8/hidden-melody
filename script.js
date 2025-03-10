document.addEventListener('DOMContentLoaded', function () {
    console.log("صفحه بارگذاری شد!");
    
    const products = [
        {
            id: 1,
            name: "پیتزا مرغ",
            price: 25000
        },
        {
            id: 2,
            name: "کباب کوبیده",
            price: 15000
        }
    ];

    // نمایش محصولات در کنسول
    products.forEach(product => {
        console.log(`نام محصول: ${product.name}, قیمت: ${product.price}`);
    });
});
