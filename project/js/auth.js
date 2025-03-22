// Authentication functionality
let currentUser = null;

// Make functions globally accessible
window.showAuthModal = showAuthModal;
window.closeAuthModal = closeAuthModal;
window.handleLogin = handleLogin;
window.handleLogout = handleLogout;

// Hardcoded user for demo
const demoUser = {
    email: 'hitesh@gmail.com',
    password: '1234',
    name: 'Hitesh'
};

function showAuthModal(type = 'login') {
    const modal = document.createElement('div');
    modal.className = 'auth-modal';
    modal.innerHTML = `
        <div class="auth-content">
            <h2>${type === 'login' ? 'Login' : 'Register'}</h2>
            <form id="${type}Form">
                <div class="form-group">
                    <label for="email">Email</label>
                    <input type="email" id="email" required>
                </div>
                <div class="form-group">
                    <label for="password">Password</label>
                    <input type="password" id="password" required>
                </div>
                <button type="submit" class="submit-btn">${type === 'login' ? 'Login' : 'Register'}</button>
            </form>
            <button class="close-btn" onclick="closeAuthModal()">×</button>
        </div>
    `;
    document.body.appendChild(modal);

    // Add event listener to the form
    const form = document.getElementById(`${type}Form`);
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        handleLogin(email, password);
    });
}

function closeAuthModal() {
    const modal = document.querySelector('.auth-modal');
    if (modal) {
        modal.remove();
    }
}

function handleLogin(email, password) {
    if (email === demoUser.email && password === demoUser.password) {
        currentUser = { email: demoUser.email, name: demoUser.name };
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        updateAuthUI();
        closeAuthModal();
        showNotification('Successfully logged in!');
    } else {
        showNotification('Invalid email or password', 'error');
    }
}

function handleLogout() {
    currentUser = null;
    localStorage.removeItem('currentUser');
    localStorage.removeItem('cart'); // Clear cart on logout
    updateAuthUI();
    updateCartCount(); // Update cart display
    showNotification('Successfully logged out!');
}

function updateAuthUI() {
    const loginBtns = document.querySelectorAll('.login-btn');
    loginBtns.forEach(loginBtn => {
        if (currentUser) {
            loginBtn.textContent = 'Logout';
            loginBtn.onclick = handleLogout;
        } else {
            loginBtn.textContent = 'Login';
            loginBtn.onclick = () => showAuthModal('login');
        }
    });
}

// Initialize auth state and event listeners
function initializeAuth() {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
    }
    updateAuthUI();
}

// Run initialization when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeAuth);
} else {
    initializeAuth();
}