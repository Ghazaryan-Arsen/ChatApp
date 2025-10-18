document.addEventListener('DOMContentLoaded', () => {
    const loginModal = document.getElementById('login-modal');
    const registerModal = document.getElementById('register-modal');
    const loginBtn = document.getElementById('login-btn');
    const registerBtn = document.getElementById('register-btn');
    const closeBtns = document.querySelectorAll('.close-btn');

    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');

    // Show modals
    loginBtn.onclick = () => loginModal.style.display = 'block';
    registerBtn.onclick = () => registerModal.style.display = 'block';

    // Hide modals
    closeBtns.forEach(btn => {
        btn.onclick = () => {
            loginModal.style.display = 'none';
            registerModal.style.display = 'none';
        };
    });

    window.onclick = (event) => {
        if (event.target == loginModal || event.target == registerModal) {
            loginModal.style.display = 'none';
            registerModal.style.display = 'none';
        }
    };

    // Handle registration
    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const username = document.getElementById('register-username').value;
        const email = document.getElementById('register-email').value;
        const password = document.getElementById('register-password').value;

        try {
            const res = await fetch(`${API_URL}/auth/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, email, password }),
            });
            const data = await res.json();
            if (res.ok) {
                localStorage.setItem('token', data.token);
                alert('Registration successful!');
                window.location.reload();
            } else {
                alert(`Error: ${data.msg}`);
            }
        } catch (error) {
            console.error('Registration failed:', error);
            alert('Registration failed. Please try again.');
        }
    });

    // Handle login
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;

        try {
            const res = await fetch(`${API_URL}/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });
            const data = await res.json();
            if (res.ok) {
                localStorage.setItem('token', data.token);
                alert('Login successful!');
                window.location.reload();
            } else {
                alert(`Error: ${data.msg}`);
            }
        } catch (error) {
            console.error('Login failed:', error);
            alert('Login failed. Please try again.');
        }
    });

    // Check login state
    const token = localStorage.getItem('token');
    if (token) {
        const authButtons = document.querySelector('.auth-buttons');
        authButtons.innerHTML = '<a href="#" id="logout-btn">Logout</a>';
        document.getElementById('logout-btn').onclick = () => {
            localStorage.removeItem('token');
            window.location.reload();
        };
    }
});