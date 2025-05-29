<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
    <title>Shopping Cart - Sneaker App</title>
    <link rel="stylesheet" href="css/common.css">
    <link rel="stylesheet" href="css/cart.css">
</head>
<body>
    <div class="app-container">
        <header class="app-header cart-header">
            <a href="index.html" class="icon-left back-arrow" aria-label="Back">
                 <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
            </a>
            <h1 class="title">Cart</h1>
            <div class="icon-right" id="adidas-logo-cart-placeholder"></div>
        </header>

        <main class="main-content cart-content">
            <!-- Empty Cart State -->
            <div class="empty-cart-container" id="emptyCartView">
                <div class="empty-cart-icon" id="cart-icon-empty-placeholder">
                    <!-- Placeholder for large cart icon -->
                </div>
                <h2>Your cart is empty!</h2>
                <p>Looks like you haven't added anything to your cart yet.</p>
                <button class="btn btn-primary" onclick="navigateTo('index.html')">Shop Now</button>
            </div>

            <!-- Cart Items View (Initially Hidden or populated by JS) -->
            <div class="cart-items-container" id="cartItemsView" style="display: none;">
                <!-- Example Cart Item (to be dynamically generated) -->
                <!-- 
                <div class="cart-item">
                    <img src="https://via.placeholder.com/80x80/E0E0E0/000000?text=Shoe" alt="Product Image" class="cart-item-image">
                    <div class="cart-item-details">
                        <h3>Adidas Campus 00s</h3>
                        <p class="item-meta">Color: Green/White, Size: 42</p>
                        <div class="quantity-selector">
                            <button class="quantity-btn minus">-</button>
                            <span class="quantity-value">1</span>
                            <button class="quantity-btn plus">+</button>
                        </div>
                    </div>
                    <div class="cart-item-price-remove">
                        <p class="item-price">$349</p>
                        <button class="remove-item-btn" aria-label="Remove item">
                            <svg width="18" height="18" viewBox="0 0 24 24">...</svg> Trash
                        </button>
                    </div>
                </div>
                -->
                <div class="cart-summary">
                    <div class="summary-row">
                        <span>Subtotal</span>
                        <span id="cartSubtotal">$0.00</span>
                    </div>
                    <div class="summary-row">
                        <span>Shipping</span>
                        <span>Free</span>
                    </div>
                    <div class="summary-row total">
                        <span>Total</span>
                        <span id="cartTotal">$0.00</span>
                    </div>
                    <button class="btn btn-primary btn-checkout" onclick="navigateTo('payment.html')">Checkout</button>
                </div>
            </div>
        </main>

        <nav class="bottom-nav">
            <a href="index.html" id="nav-home-cart"><span>Home</span></a>
            <a href="cart.html" class="active" id="nav-cart-or-plus-cart"><span>Cart</span></a>
            <a href="favorites.html" id="nav-favorites-cart"><span>Favorites</span></a>
            <a href="settings.html" id="nav-profile-cart"><span>Profile</span></a>
        </nav>
    </div>

    <script src="js/common.js"></script>
    <script src="js/cart.js"></script>
</body>
</html>