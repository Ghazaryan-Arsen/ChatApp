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
            window.location.href = 'product.html';
        });
        // Add a pointer cursor to indicate they are clickable
        card.style.cursor = 'pointer';
    });
});