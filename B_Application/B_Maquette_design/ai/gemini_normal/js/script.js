// js/script.js

document.addEventListener('DOMContentLoaded', () => {
    // Light/Dark Mode Toggle
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        // Check local storage for theme preference
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            document.body.classList.add('dark-mode');
            themeToggle.classList.add('active');
        }

        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            themeToggle.classList.toggle('active');

            // Save theme preference to local storage
            if (document.body.classList.contains('dark-mode')) {
                localStorage.setItem('theme', 'dark');
            } else {
                localStorage.setItem('theme', 'light');
            }
        });
    }

    // Product Detail Page - Color and Size Selection
    const colorOptionsContainer = document.querySelector('.color-options');
    const sizeOptionsContainer = document.querySelector('.size-options');

    if (colorOptionsContainer) {
        colorOptionsContainer.addEventListener('click', (event) => {
            const selectedColor = event.target.closest('.color-option');
            if (selectedColor) {
                // Remove 'selected' class from all color options
                colorOptionsContainer.querySelectorAll('.color-option').forEach(option => {
                    option.classList.remove('selected');
                });
                // Add 'selected' class to the clicked color option
                selectedColor.classList.add('selected');
                // You could also update a hidden input or state here
                console.log('Selected color:', selectedColor.dataset.color);
            }
        });
    }

    if (sizeOptionsContainer) {
        sizeOptionsContainer.addEventListener('click', (event) => {
            const selectedSize = event.target.closest('.size-option');
            if (selectedSize) {
                // Remove 'selected' class from all size options
                sizeOptionsContainer.querySelectorAll('.size-option').forEach(option => {
                    option.classList.remove('selected');
                });
                // Add 'selected' class to the clicked size option
                selectedSize.classList.add('selected');
                // You could also update a hidden input or state here
                console.log('Selected size:', selectedSize.dataset.size);
            }
        });
    }

    // Example: Add to cart button click (UI feedback only)
    const addToCartBtn = document.querySelector('.add-to-cart-btn');
    if (addToCartBtn) {
        addToCartBtn.addEventListener('click', () => {
            alert('Item added to cart! (This is a UI demo, no actual cart functionality)');
            // In a real app, you would handle:
            // 1. Getting selected color and size
            // 2. Sending data to a backend API
            // 3. Updating a cart icon/count
            // 4. Redirecting or showing a success message
        });
    }

    // Home Screen Category Selection
    const categoryPills = document.querySelectorAll('.category-pill');
    if (categoryPills.length > 0) {
        categoryPills.forEach(pill => {
            pill.addEventListener('click', () => {
                categoryPills.forEach(p => p.classList.remove('active'));
                pill.classList.add('active');
                console.log('Category selected:', pill.textContent.trim());
                // In a real app, you would filter product listings based on this category
            });
        });
    }
});