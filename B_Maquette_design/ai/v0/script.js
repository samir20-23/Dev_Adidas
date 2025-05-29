// Global state
let cart = []
let currentProduct = null
let isDarkMode = false

// Initialize app
document.addEventListener("DOMContentLoaded", () => {
  updateCartCount()
  loadDarkModePreference()
})

// Screen navigation
function showScreen(screenId) {
  // Hide all screens
  document.querySelectorAll(".screen").forEach((screen) => {
    screen.classList.remove("active")
  })

  // Show target screen
  document.getElementById(screenId).classList.add("active")

  // Update cart display if showing cart screen
  if (screenId === "cart-screen") {
    updateCartDisplay()
  }
}

// Product detail functionality
function showProductDetail(productId, price) {
  currentProduct = {
    id: productId,
    name: getProductName(productId),
    price: price,
    image: `/placeholder.svg?height=300&width=300`,
    color: "Blue",
    size: "9",
  }

  // Update product detail screen
  document.getElementById("product-title").textContent = "Adidas"
  document.getElementById("product-name").textContent = currentProduct.name
  document.getElementById("product-price").textContent = `$${price}`
  document.getElementById("main-product-image").src = currentProduct.image

  showScreen("product-detail-screen")
}

function getProductName(productId) {
  const names = {
    "adidas-campus": "Campus 00s",
    "adidas-gazelle": "Gazelle",
    "adidas-samba": "Samba",
    "adidas-stan-smith": "Stan Smith",
    "nike-air-max": "Air Max 90",
    "converse-chuck": "Chuck Taylor",
  }
  return names[productId] || "Sneaker"
}

// Cart functionality
function addToCart() {
  if (!currentProduct) return

  const existingItem = cart.find(
    (item) => item.id === currentProduct.id && item.color === currentProduct.color && item.size === currentProduct.size,
  )

  if (existingItem) {
    existingItem.quantity += 1
  } else {
    cart.push({
      ...currentProduct,
      quantity: 1,
    })
  }

  updateCartCount()
  showScreen("cart-screen")
  updateCartDisplay()
}

function removeFromCart(index) {
  cart.splice(index, 1)
  updateCartCount()
  updateCartDisplay()
}

function updateQuantity(index, change) {
  cart[index].quantity += change
  if (cart[index].quantity <= 0) {
    removeFromCart(index)
  } else {
    updateCartCount()
    updateCartDisplay()
  }
}

function updateCartCount() {
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0)
  const cartBadge = document.getElementById("cart-count")
  cartBadge.textContent = totalItems
  cartBadge.style.display = totalItems > 0 ? "flex" : "none"
}

function updateCartDisplay() {
  const cartItemsContainer = document.getElementById("cart-items")

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-cart"></i>
                <h3>Your cart is empty</h3>
                <p>Add some sneakers to get started</p>
            </div>
        `
    document.getElementById("subtotal").textContent = "$0"
    document.getElementById("total").textContent = "$10"
    return
  }

  cartItemsContainer.innerHTML = cart
    .map(
      (item, index) => `
        <div class="cart-item">
            <img src="${item.image}" alt="${item.name}" class="cart-item-image">
            <div class="cart-item-info">
                <h4>${item.name}</h4>
                <p>Color: ${item.color} | Size: ${item.size}</p>
                <span class="cart-item-price">$${item.price}</span>
            </div>
            <div class="quantity-controls">
                <button class="quantity-btn" onclick="updateQuantity(${index}, -1)">
                    <i class="fas fa-minus"></i>
                </button>
                <span>${item.quantity}</span>
                <button class="quantity-btn" onclick="updateQuantity(${index}, 1)">
                    <i class="fas fa-plus"></i>
                </button>
            </div>
        </div>
    `,
    )
    .join("")

  // Update totals
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const total = subtotal + 10 // $10 shipping

  document.getElementById("subtotal").textContent = `$${subtotal}`
  document.getElementById("total").textContent = `$${total}`
  document.getElementById("payment-subtotal").textContent = `$${subtotal}`
  document.getElementById("payment-total").textContent = `$${total}`
}

// Color and size selection
document.addEventListener("click", (e) => {
  // Color selection
  if (e.target.classList.contains("color-option")) {
    document.querySelectorAll(".color-option").forEach((option) => {
      option.classList.remove("active")
    })
    e.target.classList.add("active")

    if (currentProduct) {
      currentProduct.color = getColorName(e.target.style.backgroundColor)
    }
  }

  // Size selection
  if (e.target.classList.contains("size-option")) {
    document.querySelectorAll(".size-option").forEach((option) => {
      option.classList.remove("active")
    })
    e.target.classList.add("active")

    if (currentProduct) {
      currentProduct.size = e.target.textContent
    }
  }

  // Payment card selection
  if (e.target.closest(".payment-card")) {
    document.querySelectorAll(".payment-card").forEach((card) => {
      card.classList.remove("active")
    })
    e.target.closest(".payment-card").classList.add("active")
  }
})

function getColorName(backgroundColor) {
  const colorMap = {
    "rgb(45, 90, 135)": "Blue",
    "rgb(139, 69, 19)": "Brown",
    "rgb(0, 0, 0)": "Black",
    "rgb(255, 255, 255)": "White",
  }
  return colorMap[backgroundColor] || "Blue"
}

// Dark mode functionality
function toggleDarkMode() {
  isDarkMode = !isDarkMode
  document.body.classList.toggle("dark-mode", isDarkMode)
  document.getElementById("dark-mode-toggle").checked = isDarkMode
  localStorage.setItem("darkMode", isDarkMode)
}

function loadDarkModePreference() {
  const savedDarkMode = localStorage.getItem("darkMode") === "true"
  if (savedDarkMode) {
    isDarkMode = true
    document.body.classList.add("dark-mode")
    document.getElementById("dark-mode-toggle").checked = true
  }
}

// Payment processing
function processPayment() {
  // Simulate payment processing
  alert("Payment processed successfully! Thank you for your order.")

  // Clear cart and return to home
  cart = []
  updateCartCount()
  showScreen("home-screen")
}

// Favorite functionality
document.addEventListener("click", (e) => {
  if (e.target.closest(".favorite-btn")) {
    const heartIcon = e.target.closest(".favorite-btn").querySelector("i")
    heartIcon.classList.toggle("far")
    heartIcon.classList.toggle("fas")
    heartIcon.style.color = heartIcon.classList.contains("fas") ? "#ff3b30" : ""
  }
})

// Navigation functionality
document.querySelectorAll(".nav-item").forEach((item) => {
  item.addEventListener("click", function () {
    // Remove active class from all nav items
    document.querySelectorAll(".nav-item").forEach((nav) => {
      nav.classList.remove("active")
    })

    // Add active class to clicked item
    this.classList.add("active")
  })
})

// Smooth scrolling for better UX
document.addEventListener("scroll", () => {
  const header = document.querySelector(".header")
  if (window.scrollY > 10) {
    header.style.boxShadow = "0 2px 10px rgba(0,0,0,0.1)"
  } else {
    header.style.boxShadow = "none"
  }
})

// Touch gestures for mobile
let startX = 0
let startY = 0

document.addEventListener("touchstart", (e) => {
  startX = e.touches[0].clientX
  startY = e.touches[0].clientY
})

document.addEventListener("touchend", (e) => {
  const endX = e.changedTouches[0].clientX
  const endY = e.changedTouches[0].clientY
  const diffX = startX - endX
  const diffY = startY - endY

  // Swipe right to go back (only if horizontal swipe is dominant)
  if (diffX < -50 && Math.abs(diffX) > Math.abs(diffY)) {
    const currentScreen = document.querySelector(".screen.active")
    const currentId = currentScreen.id

    if (currentId === "product-detail-screen" || currentId === "cart-screen" || currentId === "payment-screen") {
      if (currentId === "payment-screen") {
        showScreen("cart-screen")
      } else {
        showScreen("home-screen")
      }
    } else if (currentId === "settings-screen") {
      showScreen("home-screen")
    }
  }
})
