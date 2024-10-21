// Sample skincare products
const products = [
    { id: 1, name: 'Moisturizing Cream', price: 499, image: 'https://images-static.nykaa.com/media/catalog/product/d/e/dea0f2bCERAV00000001_05022412.jpg?tr=w-500' },
    { id: 2, name: 'Earth Rythm Sunscreen Lotion', price: 699, image: 'https://earthrhythm.com/cdn/shop/files/ultradefencehybridsunscreenspf50.jpg?v=1684403290&width=2048' },
    { id: 3, name: 'Minimalist 2% Salicylic Acid + LHA Face Wash', price: 299, image: 'https://m.media-amazon.com/images/I/618BfD7SyTL.jpg' },
    { id: 4, name: 'Tonlymoly Toner', price: 399, image: 'https://m.media-amazon.com/images/I/41DRCu0+efL._AC_UF350,350_QL80_.jpg' },
    { id: 5, name: 'Neutrogena hydroboost water gel', price: 499, image: 'https://pyxis.nymag.com/v1/imgs/10b/be7/9db4bf1165b41662cbdfa0ce74dff2c146.rsquare.w600.jpg' },
    { id: 6, name: 'Aqualogica Sunscreen', price: 499, image: 'https://aqualogica.in/cdn/shop/products/c92a9679-9594-4783-b23-28ca77730ec__20_a.jpg?v=1702548885' },
    { id: 7, name: 'Derm Co 2%Kojic acid serum', price: 398, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbSZrrLQMMFUzuWn10z9j5BZgDUPLexsYv7Q&s' },
    { id: 8, name: 'Minimalist 2% Salicylic acid serum ', price: 521, image: 'https://m.media-amazon.com/images/I/71SE3QtPs0L.jpg' },
];

// Display products on the page
const productContainer = document.getElementById("products");
const cartItems = document.getElementById("cart-items");
const wishlistItems = document.getElementById("wishlist-items");
let cart = [];
let wishlist = [];
let totalPrice = 0;

function renderProducts(filteredProducts) {
    productContainer.innerHTML = ''; // Clear previous products

    filteredProducts.forEach(product => {
        const productDiv = document.createElement("div");
        productDiv.classList.add("product");

        productDiv.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>Price: ₹${product.price}</p>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
            <button onclick="addToWishlist(${product.id})">Add to Wishlist</button>
        `;

        productContainer.appendChild(productDiv);
    });
}

// Initial render of all products
renderProducts(products);

// Function to add products to the cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    cart.push(product);

    const cartItem = document.createElement("li");
    cartItem.textContent = `${product.name} - ₹${product.price}`;
    cartItems.appendChild(cartItem);

    totalPrice += product.price;
    document.getElementById("total-price").textContent = totalPrice;
}

// Function to add products to the wishlist
function addToWishlist(productId) {
    const product = products.find(p => p.id === productId);
    wishlist.push(product);

    const wishlistItem = document.createElement("li");
    wishlistItem.textContent = `${product.name} - ₹${product.price}`;
    wishlistItems.appendChild(wishlistItem);
}

// Search products function (case-insensitive)
function searchProducts() {
    const searchTerm = document.getElementById('search-bar').value.toLowerCase(); // Convert search term to lowercase

    // Filter products based on the search term (case-insensitive)
    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm)
    );

    // Render filtered products
    renderProducts(filteredProducts);
}
