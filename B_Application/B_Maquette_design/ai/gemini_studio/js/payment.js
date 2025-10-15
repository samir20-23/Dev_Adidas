// js/payment.js
document.addEventListener('DOMContentLoaded', () => {
    // Placeholder for logos (replace with actual SVGs or <img> tags if complex)
    document.getElementById('mastercard-logo-placeholder').innerHTML = `<img src="https://via.placeholder.com/40x25/FF5F00/FFFFFF?text=MC" alt="Mastercard">`;
    document.getElementById('paypal-logo-placeholder').innerHTML = `<img src="https://via.placeholder.com/40x25/003087/FFFFFF?text=PayPal" alt="PayPal">`;
    document.getElementById('visa-logo-placeholder').innerHTML = `<img src="https://via.placeholder.com/40x25/1A1F71/FFFFFF?text=VISA" alt="Visa">`;

    document.getElementById('plus-icon-payment-placeholder').innerHTML = iconPlusCircle;
    // Cash icon placeholder (could be a dollar sign or wallet icon)
    const cashIconHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect><circle cx="12" cy="12" r="2"></circle><path d="M12 2v2M12 20v2M2 12h2M20 12h2"></path></svg>`; // Example wallet/money icon
    document.getElementById('cash-icon-payment-placeholder').innerHTML = cashIconHTML;

    const paymentOptions = document.querySelectorAll('.payment-option');
    paymentOptions.forEach(option => {
        option.addEventListener('click', () => {
            // Remove 'selected' class from all
            paymentOptions.forEach(opt => opt.classList.remove('selected'));
            // Add 'selected' class to the clicked one
            option.classList.add('selected');
            // Ensure the radio button inside is checked
            option.querySelector('input[type="radio"]').checked = true;
        });
    });

    // Button click handlers (simulation)
    document.getElementById('addNewCardBtn').addEventListener('click', () => {
        alert('Navigate to Add New Card screen (Simulation)');
    });
    document.getElementById('cashOnDeliveryBtn').addEventListener('click', () => {
        alert('Selected Cash on Delivery (Simulation)');
        // Could also update the radio selection if COD was part of the radio group
    });

    document.querySelector('.pay-now-btn').addEventListener('click', () => {
        const selectedMethod = document.querySelector('input[name="paymentMethod"]:checked');
        if (selectedMethod) {
            alert(`Processing payment with ${selectedMethod.parentElement.querySelector('.card-name').textContent} (Simulation)`);
            // Navigate to order confirmation or similar
        } else {
            // This case might occur if "Cash on Delivery" doesn't use radio and is selected
            alert('Processing payment (Simulation)');
        }
    });
});