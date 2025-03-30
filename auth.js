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
            <form id="loginForm" method="POST">
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
        const lemail = document.getElementById('login-email').value;
        const lpassword = document.getElementById('login-password').value;
        handleLogin(lemail, lpassword);
    });
}

function showRegisterModal() {
    closeAuthModal(); // Close any open modal first
    const modal = document.createElement('div');
    modal.className = 'auth-modal';
    modal.innerHTML = `
        <div class="auth-content">
            <h2>Register</h2>
            <form id="registerForm" method="POST">
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
        const rname = document.getElementById('register-name').value;
        const remail = document.getElementById('register-email').value;
        const rpassword = document.getElementById('register-password').value;
        const rconfirmPassword = document.getElementById('register-confirm-password').value;
        handleRegister(rname, remail, rpassword, rconfirmPassword);
    });
}

function closeAuthModal() {
    const modal = document.querySelector('.auth-modal');
    if (modal) {
        modal.remove();
    }
}

function handleLogin(email, password) {
    fetch('http://localhost/swaad-bazaar/login.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            email: email,
            password: password
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === "success") {
            currentUser = { email, name: data.name };
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
            updateAuthUI();
            closeAuthModal();
            showNotification('Successfully logged in!');
        } else {
            showNotification(data.message, "error");
        }
    })
    .catch(error => showNotification("Something went wrong!", "error"));
}

function handleRegister(name, email, password, confirmPassword) {
    if (password !== confirmPassword) {
        showNotification('Passwords do not match!', 'error');
        return;
    }

    fetch('http://localhost/swaad-bazaar/registration.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            name: name,
            email: email,
            password: password
        })
    })
    .then(response => response.json())
    .then(data => {
        showNotification(data.message, data.status === "success" ? "success" : "error");
        if (data.status === "success") {
            closeAuthModal();
            showLoginModal();
        }
    })
    .catch(error => {
        console.error('Error:', error);
        showNotification("Something went wrong!", "error")
    });
}

function handleLogout() {
    fetch('http://localhost/swaad-bazaar/logout.php', { method: 'GET' })
    .then(() => {
        currentUser = null;
        localStorage.removeItem('currentUser');
        updateAuthUI();
        showNotification('Successfully logged out!');
    });
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
