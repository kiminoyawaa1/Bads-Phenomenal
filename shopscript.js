// Get the cart button and create the cart container
const cartBtn = document.querySelector('.cart-btn');
const cartContainer = document.createElement('div');
cartContainer.classList.add('cart-container');
document.body.appendChild(cartContainer);

let cartItems = [];

// Function to update the cart count
function updateCartCount() {
  cartBtn.textContent = `Your Cart (${cartItems.length})`;
}

// Function to add a product to the cart
function addToCart(product) {
  const productName = product.dataset.name;
  const cartItem = document.createElement('div');
  cartItem.classList.add('cart-item');
  cartItem.innerHTML = `
    <img src="${product.querySelector('img').src}" alt="${productName}">
    <p>${productName}</p>
    <div class="quantity-controls">
      <button class="decrease-quantity">-</button>
      <input type="text" class="quantity" value="1">
      <button class="increase-quantity">+</button>
    </div>
    <input type="checkbox" class="checkout-checkbox">
  `;
  cartContainer.appendChild(cartItem);
  cartItems.push({
    name: productName,
    quantity: 1,
    checked: false // Add checked property with initial value false
  });

  updateCartCount();

  // Add animation for adding to cart
  cartItem.classList.add('slide-in');
  setTimeout(() => {
    cartItem.classList.remove('slide-in');
  }, 500); // Remove animation class after 500ms

  // Event listeners for quantity controls
  const quantityInput = cartItem.querySelector('.quantity');
  const increaseBtn = cartItem.querySelector('.increase-quantity');
  const decreaseBtn = cartItem.querySelector('.decrease-quantity');

  increaseBtn.addEventListener('click', () => {
    quantityInput.value++;
  });

  decreaseBtn.addEventListener('click', () => {
    if (quantityInput.value > 1) {
      quantityInput.value--;
    }
  });
}

// Function to handle the checkout process
function checkout() {
  const itemsToCheckout = cartItems.filter(item => item.checked);
  if (itemsToCheckout.length === 0) {
    alert('Please select at least one item for checkout.');
    return;
  }
  alert('Thank you for your purchase!'); // Placeholder for actual checkout process
  // Remove checked items from cart
  cartItems = cartItems.filter(item => !item.checked);
  // Remove checked items from cart container
  cartContainer.querySelectorAll('.cart-item').forEach(cartItem => {
    if (cartItem.querySelector('.checkout-checkbox').checked) {
      cartItem.remove();
    }
  });
  updateCartCount();
}

// Event listener for the cart button to toggle cart visibility
cartBtn.addEventListener('click', () => {
  cartContainer.classList.toggle('open');
});

// Event listener to close the cart when clicking outside of it
document.addEventListener('click', (e) => {
  if (!cartContainer.contains(e.target) && e.target !== cartBtn) {
    cartContainer.classList.remove('open');
  }
});

// Event listener to add a product to the cart when clicking "Add to Cart"
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('add-to-cart')) {
    addToCart(e.target.parentNode);
  }
});

// Add "Check Out" button to the cart container
const checkoutBtn = document.createElement('button');
checkoutBtn.textContent = 'Check Out';
checkoutBtn.classList.add('checkout-btn');
cartContainer.appendChild(checkoutBtn);

// Event listener for the "Check Out" button
checkoutBtn.addEventListener('click', checkout);

// Event listener for the checkbox buttons
cartContainer.addEventListener('change', (e) => {
  if (e.target.classList.contains('checkout-checkbox')) {
    const productName = e.target.parentNode.querySelector('p').textContent;
    const index = cartItems.findIndex(item => item.name === productName);
    cartItems[index].checked = e.target.checked;
  }
});

// Initial cart count update
updateCartCount();
