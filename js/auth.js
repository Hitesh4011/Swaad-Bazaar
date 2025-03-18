// Authentication functionality
let currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;

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
                ${type === 'register' ? `
                    <div class="form-group">
                        <label for="confirmPassword">Confirm Password</label>
                        <input type="password" id="confirmPassword" required>
                    </div>
                    <div class="form-group">
                        <label for="name">Full Name</label>
                        <input type="text" id="name" required>
                    </div>
                ` : ''}
                <button type="submit" class="submit-btn">${type === 'login' ? 'Login' : 'Register'}</button>
            </form>
            <p class="switch-auth">
                ${type === 'login' ? 
                    'Don\'t have an account? <a href="#" onclick="showAuthModal(\'register\')">Register</a>' : 
                    'Already have an account? <a href="#" onclick="showAuthModal(\'login\')">Login</a>'}
            </p>
            <button class="close-btn" onclick="closeAuthModal()">×</button>
        </div>
    `;
    document.body.appendChild(modal);

    document.getElementById(`${type}Form`).addEventListener('submit', (e) => {
        e.preventDefault();
        if (type === 'login') {
            handleLogin();
        } else {
            handleRegister();
        }
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

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
        currentUser = { email: user.email, name: user.name };
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        updateAuthUI();
        closeAuthModal();
        showNotification('Successfully logged in!');
    } else {
        showNotification('Invalid email or password', 'error');
    }
}

function handleRegister() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const name = document.getElementById('name').value;

    if (password !== confirmPassword) {
        showNotification('Passwords do not match', 'error');
        return;
    }

    const users = JSON.parse(localStorage.getItem('users')) || [];
    if (users.some(u => u.email === email)) {                                                   
        showNotification('Email already registered', 'error');
        return;
    }

    users.push({ email, password, name });
    localStorage.setItem('users', JSON.stringify(users));
    
    currentUser = { email, name };
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    updateAuthUI();
    closeAuthModal();
    showNotification('Successfully registered!');
}

function handleLogout() {
    currentUser = null;
    localStorage.removeItem('currentUser');
    updateAuthUI();
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

// Initialize auth UI when DOM is loaded
document.addEventListener('DOMContentLoaded', updateAuthUI);