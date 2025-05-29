// js/settings.js
document.addEventListener('DOMContentLoaded', () => {
    // Populate SVG placeholders
    document.getElementById('profile-icon-placeholder').innerHTML = iconChevronRight;
    document.getElementById('notification-icon-placeholder').innerHTML = iconBell;
    document.getElementById('notification-arrow-placeholder').innerHTML = iconChevronRight;
    document.getElementById('password-icon-placeholder').innerHTML = iconLock;
    document.getElementById('password-arrow-placeholder').innerHTML = iconChevronRight;
    
    // Dark mode icon can be specific, e.g., a moon/sun
    const darkModeIconHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`;
    document.getElementById('darkmode-icon-placeholder').innerHTML = darkModeIconHTML;
    
    document.getElementById('about-icon-placeholder').innerHTML = iconInfo;
    document.getElementById('about-arrow-placeholder').innerHTML = iconChevronRight;
    document.getElementById('help-icon-placeholder').innerHTML = iconHelpCircle;
    document.getElementById('help-arrow-placeholder').innerHTML = iconChevronRight;
    document.getElementById('delete-icon-placeholder').innerHTML = iconTrash;


    // Event listener for delete account (example)
    const deleteButton = document.querySelector('.delete-button');
    if (deleteButton) {
        deleteButton.addEventListener('click', () => {
            if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
                alert('Account deletion initiated (simulation).');
                // Add actual deletion logic here
            }
        });
    }

    // Make list items navigable (simulation)
    const listItems = document.querySelectorAll('.settings-list li');
    listItems.forEach(item => {
        // Don't add to dark mode item as it has a toggle
        if (!item.querySelector('.switch')) {
            item.addEventListener('click', () => {
                const settingText = item.querySelector('span:first-of-type').textContent;
                alert(`Navigating to ${settingText} (simulation).`);
                // Example: window.navigateTo(settingText.toLowerCase().replace('/', '') + '.html');
            });
        }
    });
});