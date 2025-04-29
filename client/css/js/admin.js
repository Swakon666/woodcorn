document.getElementById('productForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append('name', e.target.name.value);
    formData.append('category', e.target.category.value);
    formData.append('price', e.target.price.value);
    formData.append('image', e.target.image.files[0]);

    try {
        const response = await fetch('http://localhost:5000/api/products', {
            method: 'POST',
            body: formData
        });

        if (response.ok) {
            alert('Товар добавлен!');
            e.target.reset();
            loadProducts();
        }
    } catch (error) {
        console.error('Ошибка:', error);
    }
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
    const list = document.querySelector('.product-list');
    list.innerHTML = products.map(product => `
        <div class="product-item">
            <img src="${product.image}" alt="${product.name}" width="100">
            <h3>${product.name}</h3>
            <p>Категория: ${product.category}</p>
            <p>Цена: ${product.price.toFixed(2)} ₽</p>
        </div>
    `).join('');
}

loadProducts();