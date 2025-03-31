// Sample data for featured dishes
const featuredDishes = [
    {
        id: 1,
        name: "Butter Chicken",
        price: 15.99,
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=500&q=80",
        description: "Tender chicken in a rich, creamy tomato sauce",
        category: "Main Course",
        recipe: "1. Marinate chicken in yogurt and spices\n2. Grill until charred\n3. Simmer in rich tomato gravy\n4. Finish with cream and butter",
        ingredients: ["Chicken", "Tomatoes", "Cream", "Butter", "Spices"],
        nutritionalInfo: {
            calories: 450,
            protein: "30g",
            carbs: "12g",
            fat: "28g"
        }
    },
    {
        id: 2,
        name: "Paneer Tikka",
        price: 12.99,
        rating: 4.5,
        image: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&w=500&q=80",
        description: "Grilled cottage cheese with aromatic spices",
        category: "Appetizer"
    },
    {
        id: 3,
        name: "Chicken Biryani",
        price: 16.99,
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=500&q=80",
        description: "Fragrant rice dish with tender chicken and spices",
        category: "Main Course"
    },
    {
        id: 4,
        name: "Masala Dosa",
        price: 10.99,
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1630409346824-4f0e7b080087?auto=format&fit=crop&w=500&q=80",
        description: "Crispy rice crepe filled with spiced potatoes",
        category: "Breakfast"
    },
    {
        id: 5,
        name: "Gulab Jamun",
        price: 6.99,
        rating: 4.6,
        image: "https://images.unsplash.com/photo-1589119908995-c6837fa14848?auto=format&fit=crop&w=500&q=80",
        description: "Sweet milk dumplings in rose syrup",
        category: "Dessert"
    },
    {
        id: 6,
        name: "Palak Paneer",
        price: 13.99,
        rating: 4.4,
        image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=500&q=80",
        description: "Cottage cheese in creamy spinach gravy",
        category: "Main Course"
    },
    {
        id: 7,
        name: "Mango Lassi",
        price: 4.99,
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1626200419199-391ae4be7a41?auto=format&fit=crop&w=500&q=80",
        description: "Refreshing yogurt-based mango drink",
        category: "Beverage"
    },
    {
        id: 8,
        name: "Samosa",
        price: 5.99,
        rating: 4.6,
        image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=500&q=80",
        description: "Crispy pastry filled with spiced potatoes and peas",
        category: "Appetizer"
    },
    {
        id: 9,
        name: "Tandoori Roti",
        price: 2.99,
        rating: 4.5,
        image: "https://images.unsplash.com/photo-1626200419199-391ae4be7a41?auto=format&fit=crop&w=500&q=80",
        description: "Whole wheat bread baked in tandoor",
        category: "Bread"
    },
    {
        id: 10,
        name: "Rasmalai",
        price: 7.99,
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1589119908995-c6837fa14848?auto=format&fit=crop&w=500&q=80",
        description: "Soft cottage cheese dumplings in sweet milk",
        category: "Dessert"
    },
    {
        id: 11,
        name: "Masala Chai",
        price: 3.99,
        rating: 4.6,
        image: "https://images.unsplash.com/photo-1561336526-2914f13ceb36?auto=format&fit=crop&w=500&q=80",
        description: "Spiced Indian tea with milk",
        category: "Beverage"
    },
    {
        id: 12,
        name: "Veg Biryani",
        price: 13.99,
        rating: 4.5,
        image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=500&q=80",
        description: "Fragrant rice with mixed vegetables and spices",
        category: "Main Course"
    }
];

// Cart functionality
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// DOM Elements
const cartCount = document.querySelector('.cart-count');
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    displayDishesByCategory();
    updateCartCount();
    setupEventListeners();
});

// Show dish details modal
function showDishDetails(dishId) {
    const dish = featuredDishes.find(d => d.id === dishId);
    if (!dish) return;

    const modal = document.createElement('div');
    modal.className = 'dish-modal';
    modal.innerHTML = `
        <div class="dish-modal-content">
            <button class="close-btn" onclick="closeDishModal()">×</button>
            <div class="dish-modal-header">
                <img src="${dish.image}" alt="${dish.name}">
                <div class="dish-modal-info">
                    <h2>${dish.name}</h2>
                    <div class="rating">
                        ${displayRating(dish.rating)}
                    </div>
                    <p class="price">$${dish.price.toFixed(2)}</p>
                    <p class="description">${dish.description}</p>
                </div>
            </div>
            <div class="dish-modal-details">
                <div class="recipe-section">
                    <h3>Recipe</h3>
                    <p>${dish.recipe || 'Recipe details coming soon!'}</p>
                </div>
                <div class="ingredients-section">
                    <h3>Ingredients</h3>
                    <ul>
                        ${(dish.ingredients || ['Coming soon']).map(ing => `<li>${ing}</li>`).join('')}
                    </ul>
                </div>
                <div class="nutritional-info">
                    <h3>Nutritional Information</h3>
                    <div class="nutrition-grid">
                        ${dish.nutritionalInfo ? `
                            <div>Calories: ${dish.nutritionalInfo.calories}</div>
                            <div>Protein: ${dish.nutritionalInfo.protein}</div>
                            <div>Carbs: ${dish.nutritionalInfo.carbs}</div>
                            <div>Fat: ${dish.nutritionalInfo.fat}</div>
                        ` : 'Nutritional information coming soon!'}
                    </div>
                </div>
                <div class="user-rating-section">
                    <h3>Rate this dish</h3>
                    <div class="star-rating">
                        ${generateStarRating()}
                    </div>
                </div>
                <button onclick="addToCart(${dish.id})" class="add-to-cart modal-cart-btn">
                    Add to Cart
                </button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);

    // Add animation class after a brief delay
    setTimeout(() => modal.classList.add('show'), 10);

    // Setup star rating functionality
    setupStarRating();
}

function generateStarRating() {
    return `
        <div class="stars">
            ${Array(5).fill(0).map((_, i) => `
                <span class="star" data-rating="${i + 1}">★</span>
            `).join('')}
        </div>
        <p class="rating-text">Click to rate</p>
    `;
}

function setupStarRating() {
    const stars = document.querySelectorAll('.star');
    const ratingText = document.querySelector('.rating-text');

    stars.forEach(star => {
        star.addEventListener('mouseover', function() {
            const rating = this.dataset.rating;
            highlightStars(rating);
            ratingText.textContent = `${rating} star${rating > 1 ? 's' : ''}`;
        });

        star.addEventListener('mouseout', function() {
            stars.forEach(s => s.classList.remove('active'));
            ratingText.textContent = 'Click to rate';
        });

        star.addEventListener('click', function() {
            const rating = this.dataset.rating;
            submitRating(rating);
        });
    });
}

function highlightStars(rating) {
    const stars = document.querySelectorAll('.star');
    stars.forEach((star, index) => {
        star.classList.toggle('active', index < rating);
    });
}

function submitRating(rating) {
    // Here you would typically send this to a backend
    showNotification(`Thank you for rating ${rating} stars!`);
}

function closeDishModal() {
    const modal = document.querySelector('.dish-modal');
    if (modal) {
        modal.classList.remove('show');
        setTimeout(() => modal.remove(), 300);
    }
}

// Add to cart functionality with authentication check
function addToCart(dishId) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) {
        showNotification('Please login to add items to cart', 'error');
        showAuthModal('login');
        return;
    }

    const dish = featuredDishes.find(d => d.id === dishId);
    if (dish) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        const cartItem = cart.find(item => item.id === dishId);
        
        if (cartItem) {
            cartItem.quantity += 1;
        } else {
            cart.push({ ...dish, quantity: 1 });
        }
        
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        showNotification(`${dish.name} added to cart!`);
    }
}

// Helper function to display star rating
function displayRating(rating) {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
    
    return '★'.repeat(fullStars) + 
           (halfStar ? '½' : '') + 
           '☆'.repeat(emptyStars);
}

// Helper function to format date
function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// Update cart count
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    const cartCounts = document.querySelectorAll('.cart-count');
    cartCounts.forEach(count => {
        count.textContent = totalItems;
    });
}

// Show notification
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Setup event listeners
function setupEventListeners() {
    // Mobile menu toggle
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('show');
        });
    }

    // Search functionality
    const searchInput = document.querySelector('.search-container input');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            const filteredDishes = featuredDishes.filter(dish => 
                dish.name.toLowerCase().includes(searchTerm) ||
                dish.description.toLowerCase().includes(searchTerm)
            );
            displayFeaturedDishes(filteredDishes);
        });
    }

    // Contact form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(contactForm);
            showNotification('Message sent successfully!');
            contactForm.reset();
        });
    }
}

// Populate dishes by category
function displayDishesByCategory() {
    const categories = ['breakfast', 'appetizer', 'main-course', 'dessert', 'beverage'];

    categories.forEach(category => {
        const categoryContainer = document.getElementById(category);
        if (!categoryContainer) return;

        const filteredDishes = featuredDishes.filter(dish => 
            dish.category.toLowerCase() === category.replace('-', ' ')
        );

        categoryContainer.innerHTML = filteredDishes.map(dish => `
            <div class="dish-card" onclick="showDishDetails(${dish.id})">
                <img src="${dish.image}" alt="${dish.name}">
                <div class="dish-card-content">
                    <h3>${dish.name}</h3>
                    <p>${dish.description}</p>
                    <div class="dish-price">$${dish.price.toFixed(2)}</div>
                    <button onclick="addToCart(${dish.id}); event.stopPropagation();" class="add-to-cart">
                        Add to Cart
                    </button>
                </div>
            </div>
        `).join('');
    });
}

// Show the cart modal
function showCartModal() {
    const cartModal = document.getElementById('cartModal');
    populateCartItems();
    cartModal.classList.remove('hidden');
}

// Close the cart modal
function closeCartModal() {
    const cartModal = document.getElementById('cartModal');
    cartModal.classList.add('hidden');
}

// Populate cart items in the modal
function populateCartItems() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemsContainer = document.getElementById('cartItems');
    cartItemsContainer.innerHTML = '';

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
        return;
    }

    cart.forEach(item => {
        cartItemsContainer.innerHTML += `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}">
                <div class="cart-item-details">
                    <h3>${item.name}</h3>
                    <p>$${item.price.toFixed(2)}</p>
                </div>
                <div class="cart-item-actions">
                    <button onclick="updateCartItem(${item.id}, -1)">-</button>
                    <span>${item.quantity}</span>
                    <button onclick="updateCartItem(${item.id}, 1)">+</button>
                </div>
            </div>
        `;
    });
}

// Update cart item quantity
function updateCartItem(dishId, change) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const itemIndex = cart.findIndex(item => item.id === dishId);

    if (itemIndex !== -1) {
        cart[itemIndex].quantity += change;

        // Remove item if quantity is 0
        if (cart[itemIndex].quantity <= 0) {
            cart.splice(itemIndex, 1);
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        populateCartItems();
        updateCartCount();
    }
}

// Proceed to checkout
function proceedToCheckout() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (cart.length === 0) {
        showNotification('Your cart is empty!', 'error');
        return;
    }

    // Redirect to checkout page or handle checkout logic
    showNotification('Proceeding to checkout...');
    closeCartModal();
}

// Attach the cart modal functionality to the "Add to Cart" button
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', showCartModal);
});

// Make functions globally accessible
window.showDishDetails = showDishDetails;
window.closeDishModal = closeDishModal;
window.addToCart = addToCart;
window.submitRating = submitRating;
window.showCartModal = showCartModal;
window.closeCartModal = closeCartModal;
window.updateCartItem = updateCartItem;
window.proceedToCheckout = proceedToCheckout;