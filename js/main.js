const API_URL = 'https://d-market-backend-jules.vercel.app/api';

document.addEventListener('DOMContentLoaded', () => {
    // "Browse Models" button on home page
    const browseBtn = document.querySelector('.browse-btn');
    if (browseBtn) {
        browseBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = 'marketplace.html';
        });
    }

    // Model cards
    const modelCards = document.querySelectorAll('.model-card');
    modelCards.forEach(card => {
        card.addEventListener('click', () => {
            // In a real app, you'd pass the model ID to the product page
            window.location.href = 'product.html';
        });
        // Add a pointer cursor to indicate they are clickable
        card.style.cursor = 'pointer';
    });

    // Fetch models for the marketplace page
    if (window.location.pathname.endsWith('marketplace.html')) {
        fetchModels();
    }

    // Fetch product details for the product page
    if (window.location.pathname.endsWith('product.html')) {
        fetchProductDetails();
    }

    // Handle model upload
    const uploadForm = document.getElementById('upload-form');
    if (uploadForm) {
        uploadForm.addEventListener('submit', handleUpload);
    }

    // Fetch data for profile page
    if (window.location.pathname.endsWith('profile.html')) {
        fetchProfileData();
    }

    // Fetch data for admin page
    if (window.location.pathname.endsWith('admin.html')) {
        fetchAdminData();
    }
});

async function fetchModels() {
    try {
        const response = await fetch(`${API_URL}/models`);
        const models = await response.json();
        const modelsGrid = document.querySelector('.models-grid');
        modelsGrid.innerHTML = ''; // Clear mock data

        models.forEach(model => {
            const modelCard = document.createElement('div');
            modelCard.classList.add('model-card');
            modelCard.innerHTML = `
                <img src="${model.imageUrl}" alt="${model.name}">
                <h3>${model.name}</h3>
                <p>by ${model.uploader.username}</p>
            `;
            modelCard.addEventListener('click', () => {
                // Store model id in local storage to be picked up by product page
                localStorage.setItem('selectedModelId', model._id);
                window.location.href = 'product.html';
            });
            modelsGrid.appendChild(modelCard);
        });
    } catch (error) {
        console.error('Failed to fetch models:', error);
    }
}

async function fetchProductDetails() {
    const modelId = localStorage.getItem('selectedModelId');
    if (!modelId) {
        // Handle case where no model was selected
        return;
    }

    try {
        const response = await fetch(`${API_URL}/models/${modelId}`);
        const model = await response.json();

        document.querySelector('.product-details h1').textContent = model.name;
        document.querySelector('.product-details .price').textContent = `$${model.price}`;
        document.querySelector('.product-details .description p').textContent = model.description;
        document.querySelector('.seller-preview p').textContent = model.uploader.username;
        // In a real app, you would also update the 3D viewer and image gallery
    } catch (error) {
        console.error('Failed to fetch product details:', error);
    }
}

async function handleUpload(e) {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
        alert('You must be logged in to upload a model.');
        return;
    }

    const formData = {
        name: document.getElementById('model-name').value,
        description: document.getElementById('description').value,
        category: document.getElementById('category').value,
        tags: document.getElementById('tags').value,
        price: document.getElementById('price').value,
    };

    try {
        const res = await fetch(`${API_URL}/models/upload`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': token,
            },
            body: JSON.stringify(formData),
        });

        if (res.ok) {
            alert('Model uploaded successfully!');
            window.location.href = 'marketplace.html';
        } else {
            const data = await res.json();
            alert(`Error: ${data.msg}`);
        }
    } catch (error) {
        console.error('Upload failed:', error);
        alert('Upload failed. Please try again.');
    }
}

async function fetchProfileData() {
    const token = localStorage.getItem('token');
    if (!token) {
        document.querySelector('.profile-info h1').textContent = 'Please log in';
        return;
    }

    // Instead of decoding, we will get the user data from a /me endpoint
    try {
        const meRes = await fetch(`${API_URL}/auth/me`, { headers: { 'x-auth-token': token } });
        if (!meRes.ok) {
            localStorage.removeItem('token');
            window.location.reload();
            return;
        }
        const user = await meRes.json();
        const userId = user._id;

        const profileRes = await fetch(`${API_URL}/users/${userId}`);
        const profileData = await profileRes.json();

        const salesRes = await fetch(`${API_URL}/users/${userId}/sales`, { headers: { 'x-auth-token': token } });
        const salesData = await salesRes.json();

        if (profileRes.ok) {
            document.querySelector('.profile-avatar').src = profileData.user.avatar;
            document.querySelector('.profile-info h1').textContent = profileData.user.username;
            document.querySelector('.profile-info p').textContent = profileData.user.email;
            document.querySelector('.profile-stats .stat:nth-child(1) p').textContent = `$${salesData.totalSales.toFixed(2)}`;
            document.querySelector('.profile-stats .stat:nth-child(2) p').textContent = `$${profileData.user.balance.toFixed(2)}`;
            document.querySelector('.profile-stats .stat:nth-child(3) p').textContent = profileData.models.length;

            const modelsGrid = document.querySelector('.models-grid');
            modelsGrid.innerHTML = '';
            profileData.models.forEach(model => {
                const modelCard = document.createElement('div');
                modelCard.classList.add('model-card');
                modelCard.innerHTML = `
                    <img src="${model.imageUrl}" alt="${model.name}">
                    <h3>${model.name}</h3>
                    <p>$${model.price}</p>
                `;
                modelsGrid.appendChild(modelCard);
            });

            const withdrawBtn = document.querySelector('.withdraw-btn');
            withdrawBtn.onclick = async () => {
                try {
                    const withdrawRes = await fetch(`${API_URL}/users/${userId}/withdraw`, {
                        method: 'POST',
                        headers: { 'x-auth-token': token },
                    });
                    if (withdrawRes.ok) {
                        alert('Withdrawal successful!');
                        fetchProfileData(); // Refresh data
                    } else {
                        const errorData = await withdrawRes.json();
                        alert(`Error: ${errorData.msg}`);
                    }
                } catch (error) {
                    console.error('Withdrawal failed:', error);
                }
            };
        } else {
            alert(`Error: ${profileData.msg}`);
        }
    } catch (error) {
        console.error('Failed to fetch profile data:', error);
    }
}

async function fetchAdminData() {
    const token = localStorage.getItem('token');
    if (!token) {
        alert('You must be logged in as an admin to view this page.');
        return;
    }

    try {
        // Fetch stats
        const statsRes = await fetch(`${API_URL}/admin/stats`, {
            headers: { 'x-auth-token': token },
        });
        const statsData = await statsRes.json();
        if (statsRes.ok) {
            document.getElementById('total-sales').textContent = `$${statsData.totalSales.toFixed(2)}`;
            document.getElementById('platform-income').textContent = `$${statsData.platformIncome.toFixed(2)}`;
            document.getElementById('total-users').textContent = statsData.totalUsers;
            document.getElementById('total-models').textContent = statsData.totalModels;
        } else {
            alert(`Error: ${statsData.msg}`);
        }

        // Fetch users
        const usersRes = await fetch(`${API_URL}/admin/users`, {
            headers: { 'x-auth-token': token },
        });
        const usersData = await usersRes.json();
        if (usersRes.ok) {
            const usersTableBody = document.getElementById('users-table-body');
            usersTableBody.innerHTML = '';
            usersData.forEach(user => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${user._id}</td>
                    <td>${user.username}</td>
                    <td>${user.email}</td>
                    <td class="actions"><a href="#">Edit</a> <a href="#">Delete</a></td>
                `;
                usersTableBody.appendChild(row);
            });
        }

        // Fetch models
        const modelsRes = await fetch(`${API_URL}/models`);
        const modelsData = await modelsRes.json();
        if (modelsRes.ok) {
            const modelsTableBody = document.getElementById('models-table-body');
            modelsTableBody.innerHTML = '';
            modelsData.forEach(model => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${model._id}</td>
                    <td>${model.name}</td>
                    <td>${model.uploader.username}</td>
                    <td>$${model.price}</td>
                    <td class="actions"><a href="#">View</a> <a href="#">Delete</a></td>
                `;
                modelsTableBody.appendChild(row);
            });
        }
    } catch (error) {
        console.error('Failed to fetch admin data:', error);
    }
}