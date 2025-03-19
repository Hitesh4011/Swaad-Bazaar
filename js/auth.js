// Authentication functionality
let currentUser = null;

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

    document.getElementById(`${type}Form`).addEventListener('submit', (e) => {
        e.preventDefault();
        handleLogin();
    });
}

function closeAuthModal() {
    const modal = document.querySelector('.auth-modal');
    if (modal) {
        modal.remove();
    }
}

function handleLogin() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

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
    const loginBtn = document.querySelector('.login-btn');
    if (loginBtn) {
        if (currentUser) {
            loginBtn.textContent = 'Logout';
            loginBtn.onclick = handleLogout;
        } else {
            loginBtn.textContent = 'Login';
            loginBtn.onclick = () => showAuthModal('login');
        }
    }
}

// Check if user was previously logged in
document.addEventListener('DOMContentLoaded', () => {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
        updateAuthUI();
    }
});