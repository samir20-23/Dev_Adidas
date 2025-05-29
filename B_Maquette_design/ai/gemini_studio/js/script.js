<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
    <title>Product Detail - Sneaker App</title>
    <link rel="stylesheet" href="css/common.css">
    <link rel="stylesheet" href="css/product_detail.css">
</head>
<body>
    <div class="app-container">
        <header class="app-header product-header">
            <a href="index.html" class="icon-left back-arrow" aria-label="Back">
                 <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
            </a>
            <h1 class="title">Detail</h1>
            <div class="header-icons-right">
                <div class="icon-right" id="adidas-logo-detail-placeholder"></div>
                <div class="icon-right" id="heart-icon-detail-placeholder"></div>
                <a href="cart.html" class="icon-right" id="cart-icon-detail-placeholder"></a>
            </div>
        </header>

        <main class="main-content product-detail-content">
            <section class="product-image-section">
                <img src="https://via.placeholder.com/350x250/E0E0E0/000000?text=Adidas+Campus+00s+Green" alt="Adidas Campus 00s - Green/White" id="mainProductImage" class="main-product-image">
                <!-- Image gallery dots if multiple views -->
                <div class="image-dots">
                    <span class="dot active"></span>
                    <span class="dot"></span>
                    <span class="dot"></span>
                    <span class="dot"></span>
                    <span class="dot"></span>
                </div>
            </section>

            <section class="product-info-card">
                <div class="product-title-price">
                    <h2 id="productName">Adidas Campus 00s</h2>
                    <p class="price" id="productPrice">$349</p>
                </div>

                <div class="options-section">
                    <label for="colorOptions">Color: <span id="selectedColorName">Green/White</span></label>
                    <div class="color-swatches" id="colorOptions">
                        <button class="color-swatch active" data-color="Green/White" data-image="https://via.placeholder.com/350x250/90EE90/000000?text=Campus+Green" style="background-image: url('https://via.placeholder.com/30x30/90EE90/000000?text=')"></button>
                        <button class="color-swatch" data-color="Brown" data-image="https://via.placeholder.com/350x250/A52A2A/FFFFFF?text=Campus+Brown" style="background-image: url('https://via.placeholder.com/30x30/A52A2A/FFFFFF?text=')"></button>
                        <button class="color-swatch" data-color="Green/Black" data-image="https://via.placeholder.com/350x250/006400/FFFFFF?text=Campus+G/B" style="background-image: url('https://via.placeholder.com/30x30/006400/FFFFFF?text=')"></button>
                        <button class="color-swatch" data-color="Black" data-image="https://via.placeholder.com/350x250/333333/FFFFFF?text=Campus+Black" style="background-image: url('https://via.placeholder.com/30x30/333333/FFFFFF?text=')"></button>
                    </div>
                </div>

                <div class="options-section">
                    <label for="sizeOptions">Size</label>
                    <div class="size-options" id="sizeOptions">
                        <button class="size-btn" data-size="40">40</button>
                        <button class="size-btn" data-size="41">41</button>
                        <button class="size-btn active" data-size="42">42</button> <!-- Default selected -->
                        <button class="size-btn" data-size="43">43</button>
                        <button class="size-btn" data-size="44">44</button>
                    </div>
                </div>

                <div class="product-description">
                    <h3>Product Details</h3>
                    <p id="productDescriptionText">
                        The adidas classic Campus 80s shoe returns as a fresh, low style. Features a suede upper, leather lining and a tough rubber cupsole. Iconic serrated 3-Stripes and heel patch complete the signature look... <a href="#" class="read-more">Read more</a>
                    </p>
                </div>
                 <div class="reviews-section">
                    <span>@adidasSneakers</span> <!-- Placeholder for reviews link/info -->
                </div>
            </section>
            
            <button class="btn btn-primary add-to-cart-btn">
                <span id="cart-icon-btn-placeholder"></span> Add to cart
            </button>
        </main>
    </div>

    <script src="js/common.js"></script>
    <script src="js/product_detail.js"></script>
</body>
</html>