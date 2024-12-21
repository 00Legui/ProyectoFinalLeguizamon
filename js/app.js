let products = [];

async function loadProducts() {
    try {
        const storedProducts = JSON.parse(localStorage.getItem('products'));
        
        if (storedProducts && Array.isArray(storedProducts.products)) {
            products = storedProducts.products;
        } else {
            const response = await fetch('./json/products.json');
            const data = await response.json();
            products = data.products;
            localStorage.setItem('products', JSON.stringify({ products }));
        }
        
        renderProducts(products);
    } catch (error) {
        showNotification('Error al cargar los productos', 'error');
        console.error('Error:', error);
    }
}

function updateStock(productId, quantity) {
    if (!productId || typeof quantity !== 'number' || quantity < 0) {
        showNotification('Datos de actualización de stock inválidos', 'error');
        return false;
    }

    const productIndex = products.findIndex(({id}) => id === productId);
    if (productIndex !== -1) {
        const newStock = products[productIndex].stock - quantity;
        if (newStock >= 0) {
            products[productIndex].stock = newStock;
            try {
                localStorage.setItem('products', JSON.stringify({ products }));
                return true;
            } catch (error) {
                showNotification('Error al guardar en localStorage', 'error');
                return false;
            }
        }
        showNotification('No hay suficiente stock disponible', 'error');
        return false;
    }
    return false;
}

function checkStock(productId, quantity) {
    if (!productId || typeof quantity !== 'number' || quantity < 0) return false;
    const product = products.find(({id}) => id === productId);
    return product && product.stock >= quantity;
}

function showNotification(message, type = 'info') {
    if (!message) return;
    
    Swal.fire({
        text: message,
        icon: type === 'error' ? 'error' : 'success',
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true
    });
}

function resetProducts() {
    Swal.fire({
        title: '¿Estás seguro?',
        text: '¿Deseas reiniciar todos los productos? Esto restaurará el stock original.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, reiniciar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            try {
                localStorage.removeItem('products');
                localStorage.removeItem('cart');
                
                location.reload();
                
                showNotification('Productos reiniciados correctamente', 'info');
            } catch (error) {
                showNotification('Error al reiniciar productos', 'error');
            }
        }
    });
}

const productDetailsContainer = document.createElement('div');
productDetailsContainer.id = 'product-details';
productDetailsContainer.style.display = 'none';
productDetailsContainer.style.position = 'fixed';
productDetailsContainer.style.top = '50%';
productDetailsContainer.style.left = '50%';
productDetailsContainer.style.transform = 'translate(-50%, -50%)';
productDetailsContainer.style.backgroundColor = 'white';
productDetailsContainer.style.padding = '20px';
productDetailsContainer.style.borderRadius = '8px';
productDetailsContainer.style.boxShadow = '0 0 10px rgba(0,0,0,0.5)';
productDetailsContainer.style.zIndex = '1001';
document.body.appendChild(productDetailsContainer);
  
let cart = [];
try {
    cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (!Array.isArray(cart)) cart = [];
} catch (error) {
    showNotification('Error al cargar el carrito', 'error');
}
  
function renderProducts(productList = products) {
    const productContainer = document.getElementById("products");
  
    console.log("Total de productos:", products.length);
    console.log("Productos a mostrar:", productList.length);
    
    const categoryFilter = document.getElementById("category-filter");
    const priceFilter = document.getElementById("price-filter");
    
    if (!categoryFilter || !priceFilter) {
        showNotification("Error al obtener los filtros", "error");
        return;
    }
    
    const {value: categoria} = categoryFilter;
    const {value: precio} = priceFilter;
    console.log("Filtros actuales:", {categoria, precio});

    if (!productContainer) {
        showNotification("No se pudo encontrar el contenedor de productos.", "error");
        return;
    }
  
    productContainer.innerHTML = "";
  
    if (!Array.isArray(productList) || productList.length === 0) {
        productContainer.innerHTML = "<p>No hay productos disponibles con esos filtros.</p>";
        return;
    }
  
    productList.forEach(({id, image, name, price, category, stock}) => {
        if (!id || !name || typeof price !== 'number' || !category || typeof stock !== 'number') {
            return;
        }

        const productDiv = document.createElement("div");
        productDiv.classList.add("product");
        productDiv.innerHTML = `
            <img src="./images/${image}" alt="${name}" style="max-width: 100px;">
            <span>${name} - $${price} (${category})</span>
            <p>Stock disponible: ${stock}</p>
            <button onclick="showProductDetails(${id})" class="details-btn">Ver detalles</button>
            <button onclick="addToCart(${id})" ${stock === 0 ? 'disabled' : ''}>
                ${stock === 0 ? 'Sin stock' : 'Agregar'}
            </button>
        `;
        productContainer.appendChild(productDiv);
    });
}

function showProductDetails(productId) {
    if (!productId) return;
    
    const product = products.find(({id}) => id === productId);
    if (!product) return;

    const {name, image, description, price, stock, id} = product;
    if (!name || !image || !description || typeof price !== 'number' || typeof stock !== 'number') return;

    productDetailsContainer.innerHTML = `
        <h3>${name}</h3>
        <img src="./images/${image}" alt="${name}" style="max-width: 200px;">
        <p>${description}</p>
        <p>Precio: $${price}</p>
        <p>Stock disponible: ${stock}</p>
        <button onclick="addToCart(${id})" ${stock === 0 ? 'disabled' : ''}>
            ${stock === 0 ? 'Sin stock' : 'Agregar al carrito'}
        </button>
        <button onclick="closeProductDetails()">Cerrar</button>
    `;
    productDetailsContainer.style.display = 'block';
}

function closeProductDetails() {
    if (productDetailsContainer) {
        productDetailsContainer.style.display = 'none';
    }
}
  
function addToCart(productId) {
    if (!productId) {
        showNotification('ID de producto inválido', 'error');
        return;
    }

    const producto = products.find(({id}) => id === productId);
  
    if (!producto) {
        showNotification(`El producto con ID ${productId} no existe.`, 'error');
        return;
    }
  
    if (producto.stock <= 0) {
        showNotification('No hay suficiente stock disponible', 'error');
        return;
    }
  
    const cartItem = cart.find(({id}) => id === productId);
    
    if (cartItem) {
        cartItem.quantity++;
    } else {
        cart.push({...producto, quantity: 1});
    }
    
    try {
        producto.stock--;
        localStorage.setItem('products', JSON.stringify({ products }));
        localStorage.setItem('cart', JSON.stringify(cart));
        
        showNotification(`${producto.name} agregado al carrito`, 'info');
        renderCart();
        renderProducts();
    } catch (error) {
        showNotification('Error al actualizar el carrito', 'error');
    }
}

function removeFromCart(productId) {
    if (!productId) return;

    const cartItem = cart.find(({id}) => id === productId);
    const producto = products.find(({id}) => id === productId);
    
    if (cartItem && producto) {
        try {
            producto.stock += cartItem.quantity;
            localStorage.setItem('products', JSON.stringify({ products }));
            
            cart = cart.filter(({id}) => id !== productId);
            localStorage.setItem('cart', JSON.stringify(cart));
            
            showNotification(`Producto eliminado del carrito`, 'info');
            renderCart();
            renderProducts();
        } catch (error) {
            showNotification('Error al eliminar del carrito', 'error');
        }
    }
}
 
function clearCart() {
    if (!Array.isArray(cart) || cart.length === 0) {
        showNotification('El carrito ya está vacío', 'info');
        return;
    }

    Swal.fire({
        title: '¿Estás seguro?',
        text: '¿Deseas vaciar todo el carrito?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, vaciar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            try {
                cart.forEach(item => {
                    if (!item || !item.id) return;
                    const producto = products.find(({id}) => id === item.id);
                    if (producto) {
                        producto.stock += item.quantity;
                    }
                });

                localStorage.setItem('products', JSON.stringify({ products }));
                
                cart = [];
                localStorage.setItem('cart', JSON.stringify(cart));
                
                showNotification('Carrito vaciado correctamente', 'info');
                renderCart();
                renderProducts();
            } catch (error) {
                showNotification('Error al vaciar el carrito', 'error');
            }
        }
    });
}

function renderCart() {
    const cartContainer = document.getElementById("cart");
  
    if (!cartContainer) {
        showNotification("No se pudo encontrar el contenedor del carrito.", "error");
        return;
    }
  
    cartContainer.innerHTML = "";
  
    if (!Array.isArray(cart) || cart.length === 0) {
        cartContainer.innerHTML = "<p>Tu carrito está vacío.</p>";
        return;
    }
  
    cart.forEach(({image, name, price, quantity, id}) => {
        if (!id || !name || typeof price !== 'number' || typeof quantity !== 'number') return;

        const cartItemDiv = document.createElement("div");
        cartItemDiv.classList.add("cart-item");
        cartItemDiv.innerHTML = `
            <img src="./images/${image}" alt="${name}" style="max-width: 50px;">
            <span>${name} - $${price} x ${quantity}</span>
            <span>Subtotal: $${price * quantity}</span>
            <button onclick="removeFromCart(${id})">Eliminar</button>
        `;
        cartContainer.appendChild(cartItemDiv);
    });
  
    const total = cart.reduce((sum, {price, quantity}) => {
        if (typeof price !== 'number' || typeof quantity !== 'number') return sum;
        return sum + (price * quantity);
    }, 0);

    const totalDiv = document.createElement("div");
    totalDiv.innerHTML = `
        <strong>Total: $${total}</strong>
        <button onclick="clearCart()" class="clear-cart-btn">Vaciar Carrito</button>
        <button onclick="checkout()" class="checkout-btn">Finalizar Compra</button>
    `;
    cartContainer.appendChild(totalDiv);
}

function checkout() {
    if (!Array.isArray(cart) || cart.length === 0) {
        showNotification('El carrito está vacío', 'error');
        return;
    }
    
    try {
        cart = [];
        localStorage.setItem('cart', JSON.stringify(cart));
        showNotification('¡Compra realizada con éxito!', 'info');
        renderCart();
    } catch (error) {
        showNotification('Error al procesar la compra', 'error');
    }
}
  
function applyFilters() {
    const categoryFilter = document.getElementById("category-filter");
    const priceFilter = document.getElementById("price-filter");

    if (!categoryFilter || !priceFilter) {
        showNotification("Error al obtener los filtros", "error");
        return;
    }

    const categoryValue = categoryFilter.value;
    const priceValue = Number(priceFilter.value);

    console.log("Aplicando filtros:", { categoryValue, priceValue });

    let filteredProducts = Array.isArray(products) ? [...products] : [];

    if (categoryValue && categoryValue !== "all") {
        filteredProducts = filteredProducts.filter(({category}) => category === categoryValue);
    }

    if (!isNaN(priceValue) && priceValue > 0) {
        filteredProducts = filteredProducts.filter(({price}) => price <= priceValue);
    }

    console.log("Productos después de filtrar:", filteredProducts.length);
    renderProducts(filteredProducts);
}

try {
    const savedCategoryFilter = localStorage.getItem('categoryFilter');
    const savedPriceFilter = localStorage.getItem('priceFilter');
    
    const categoryFilterElement = document.getElementById("category-filter");
    const priceFilterElement = document.getElementById("price-filter");

    if (savedCategoryFilter && categoryFilterElement) {
        categoryFilterElement.value = savedCategoryFilter;
    }
    if (savedPriceFilter && priceFilterElement) {
        priceFilterElement.value = savedPriceFilter;
    }
} catch (error) {
    showNotification('Error al cargar filtros guardados', 'error');
}
  
document.addEventListener('DOMContentLoaded', function() {
    const categoryFilter = document.getElementById("category-filter");
    const priceFilter = document.getElementById("price-filter");

    if (categoryFilter && priceFilter) {
        categoryFilter.value = "all";
        priceFilter.value = "";
        
        loadProducts();
        renderCart();
    } else {
        showNotification("Error al inicializar los filtros", "error");
    }

    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.innerHTML = savedTheme === 'dark' ? '☀️ Modo Claro' : '🌙 Modo Oscuro';
        themeToggle.addEventListener('click', toggleTheme);
    }
});

function toggleTheme() {
    const theme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', theme);
    
    localStorage.setItem('theme', theme);
    
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.innerHTML = theme === 'dark' ? '☀️ Modo Claro' : '🌙 Modo Oscuro';
    }
}