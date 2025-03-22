// Authentication functionality
let currentUser = null;

// Make functions globally accessible
window.showLoginModal = showLoginModal;
window.showRegisterModal = showRegisterModal;
window.closeAuthModal = closeAuthModal;
window.handleLogin = handleLogin;
window.handleRegister = handleRegister;
window.handleLogout = handleLogout;

// Hardcoded demo user
const demoUser = {
    email: 'hitesh@gmail.com',
    password: '1234',
    name: 'Hitesh'
};

function showLoginModal() {
    closeAuthModal(); // Close any open modal first
    const modal = document.createElement('div');
    modal.className = 'auth-modal';
    modal.innerHTML = `
        <div class="auth-content">
            <h2>Login</h2>
            <form id="loginForm">
                <div class="form-group">
                    <label for="login-email">Email</label>
                    <input type="email" id="login-email" required>
                </div>
                <div class="form-group">
                    <label for="login-password">Password</label>
                    <input type="password" id="login-password" required>
                </div>
                <button type="submit" class="submit-btn">Login</button>
            </form>
            <p class="switch-auth">
                Don't have an account? <a href="#" onclick="showRegisterModal()">Register</a>
            </p>
            <button class="close-btn" onclick="closeAuthModal()">×</button>
        </div>
    `;
    document.body.appendChild(modal);

    document.getElementById('loginForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;
        handleLogin(email, password);
    });
}

function showRegisterModal() {
    closeAuthModal(); // Close any open modal first
    const modal = document.createElement('div');
    modal.className = 'auth-modal';
    modal.innerHTML = `
        <div class="auth-content">
            <h2>Register</h2>
            <form id="registerForm">
                <div class="form-group">
                    <label for="register-name">Full Name</label>
                    <input type="text" id="register-name" required>
                </div>
                <div class="form-group">
                    <label for="register-email">Email</label>
                    <input type="email" id="register-email" required>
                </div>
                <div class="form-group">
                    <label for="register-password">Password</label>
                    <input type="password" id="register-password" required>
                </div>
                <div class="form-group">
                    <label for="register-confirm-password">Confirm Password</label>
                    <input type="password" id="register-confirm-password" required>
                </div>
                <button type="submit" class="submit-btn">Register</button>
            </form>
            <p class="switch-auth">
                Already have an account? <a href="#" onclick="showLoginModal()">Login</a>
            </p>
            <button class="close-btn" onclick="closeAuthModal()">×</button>
        </div>
    `;
    document.body.appendChild(modal);

    document.getElementById('registerForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('register-name').value;
        const email = document.getElementById('register-email').value;
        const password = document.getElementById('register-password').value;
        const confirmPassword = document.getElementById('register-confirm-password').value;
        handleRegister(name, email, password, confirmPassword);
    });
}

function closeAuthModal() {
    const modal = document.querySelector('.auth-modal');
    if (modal) {
        modal.remove();
    }
}

function handleLogin(email, password) {
    // Fetch stored users from localStorage
    const users = JSON.parse(localStorage.getItem('users')) || [];

    // Check against demo user or registered users
    const user = users.find(user => user.email === email && user.password === password);
    
    if ((email === demoUser.email && password === demoUser.password) || user) {
        currentUser = user || demoUser; // If found in storage, use that user; otherwise, use demo user
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        updateAuthUI();
        closeAuthModal();
        showNotification('Successfully logged in!');
    } else {
        showNotification('Invalid email or password', 'error');
    }
}

function handleRegister(name, email, password, confirmPassword) {
    if (password !== confirmPassword) {
        showNotification('Passwords do not match!', 'error');
        return;
    }

    // Fetch existing users
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const existingUser = users.find(user => user.email === email);

    if (existingUser || email === demoUser.email) {
        showNotification('Email is already registered. Please login.', 'error');
    } else {
        users.push({ email, password, name });
        localStorage.setItem('users', JSON.stringify(users));
        showNotification('Registration successful! Please login.');
        closeAuthModal();
        showLoginModal();
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
            loginBtn.onclick = () => showLoginModal();
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
