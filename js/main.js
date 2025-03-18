// Sample data for featured dishes
const featuredDishes = [
    {
        id: 1,
        name: "Butter Chicken",
        price: 15.99,
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=500&q=80",
        description: "Tender chicken in a rich, creamy tomato sauce",
        category: "Main Course"
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
    }
];

// Sample data for customer reviews
const customerReviews = [
    {
        name: "John Doe",
        rating: 5,
        comment: "The best Indian food I've ever had! The Butter Chicken was amazing.",
        date: "2024-02-15"
    },
    {
        name: "Sarah Smith",
        rating: 4,
        comment: "Great flavors and excellent service. Will definitely order again!",
        date: "2024-02-14"
    },
    {
        name: "Mike Johnson",
        rating: 5,
        comment: "Authentic taste and quick delivery. Highly recommended!",
        date: "2024-02-13"
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
    displayFeaturedDishes();
    displayCustomerReviews();
    updateCartCount();
    setupEventListeners();
    setupFilters();
});

// Display featured dishes
function displayFeaturedDishes(filteredDishes = featuredDishes) {
    const dishesGrid = document.querySelector('.dishes-grid');
    if (!dishesGrid) return;

    dishesGrid.innerHTML = filteredDishes.map(dish => `
        <div class="dish-card" data-category="${dish.category.toLowerCase()}">
            <img src="${dish.image}" alt="${dish.name}">
            <div class="dish-card-content">
                <h3>${dish.name}</h3>
                <div class="rating">
                    ${displayRating(dish.rating)}
                </div>
                <p>${dish.description}</p>
                <div class="dish-price">$${dish.price.toFixed(2)}</div>
                <div class="card-actions">
                    <button onclick="addToCart(${dish.id})" class="add-to-cart">
                        Add to Cart
                    </button>
                    <div class="quantity-controls" id="quantity-${dish.id}" style="display: none;">
                        <button onclick="updateQuantity(${dish.id}, -1)">-</button>
                        <span>1</span>
                        <button onclick="updateQuantity(${dish.id}, 1)">+</button>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

// Setup category filters
function setupFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    if (!filterBtns.length) return;

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');

            const category = btn.dataset.category;
            const filteredDishes = category === 'all' 
                ? featuredDishes 
                : featuredDishes.filter(dish => 
                    dish.category.toLowerCase() === category.toLowerCase()
                );

            displayFeaturedDishes(filteredDishes);
        });
    });
}

// Display customer reviews
function displayCustomerReviews() {
    const reviewsContainer = document.querySelector('.reviews-container');
    if (!reviewsContainer) return;

    reviewsContainer.innerHTML = customerReviews.map(review => `
        <div class="review-card">
            <div class="review-header">
                <h3>${review.name}</h3>
                <div class="rating">
                    ${displayRating(review.rating)}
                </div>
            </div>
            <p>${review.comment}</p>
            <div class="review-date">${formatDate(review.date)}</div>
        </div>
    `).join('');
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

// Add to cart functionality
function addToCart(dishId) {
    if (!currentUser) {
        showNotification('Please login to add items to cart', 'error');
        showAuthModal('login');
        return;
    }

    const dish = featuredDishes.find(d => d.id === dishId);
    if (dish) {
        const cartItem = cart.find(item => item.id === dishId);
        if (cartItem) {
            cartItem.quantity += 1;
        } else {
            cart.push({ ...dish, quantity: 1 });
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        showNotification(`${dish.name} added to cart!`);
        
        // Show quantity controls
        const quantityControls = document.getElementById(`quantity-${dishId}`);
        if (quantityControls) {
            quantityControls.style.display = 'flex';
            quantityControls.querySelector('span').textContent = cartItem ? cartItem.quantity : 1;
        }
    }
}

// Update item quantity in cart
function updateQuantity(dishId, change) {
    const cartItem = cart.find(item => item.id === dishId);
    if (cartItem) {
        cartItem.quantity += change;
        if (cartItem.quantity <= 0) {
            cart = cart.filter(item => item.id !== dishId);
            // Hide quantity controls
            const quantityControls = document.getElementById(`quantity-${dishId}`);
            if (quantityControls) {
                quantityControls.style.display = 'none';
            }
        } else {
            // Update quantity display
            const quantitySpan = document.querySelector(`#quantity-${dishId} span`);
            if (quantitySpan) {
                quantitySpan.textContent = cartItem.quantity;
            }
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
    }
}

// Update cart count
function updateCartCount() {
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = totalItems;
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
            // In a real application, you would send this data to a server
            showNotification('Message sent successfully!');
            contactForm.reset();
        });
    }
}