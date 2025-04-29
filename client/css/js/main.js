document.addEventListener('DOMContentLoaded', () => {
    loadProducts();
    initFilters();
});

async function loadProducts() {
    try {
        const response = await fetch('http://localhost:5000/api/products');
        const products = await response.json();
        renderProducts(products);
    } catch (error) {
        console.error('Ошибка:', error);
    }
}

function renderProducts(products) {
    const grid = document.querySelector('.products-grid');
    grid.innerHTML = products.map(product => `
        <div class="product-card" data-category="${product.category}">
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>Цена: ${product.price.toFixed(2)} ₽</p>
            <button class="btn" onclick="addToCart(${product.id})">Купить</button>
        </div>
    `).join('');
}

function initFilters() {
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            filterProducts(btn.dataset.category);
        });
    });
}

function filterProducts(category) {
    const products = document.querySelectorAll('.product-card');
    products.forEach(product => {
        product.style.display = (category === 'all' || product.dataset.category === category) 
            ? 'block' 
            : 'none';
    });
}

function searchProducts() {
    const query = document.getElementById('searchInput').value.toLowerCase();
    const products = document.querySelectorAll('.product-card');
    products.forEach(product => {
        const name = product.querySelector('h3').textContent.toLowerCase();
        product.style.display = name.includes(query) ? 'block' : 'none';
    });
}