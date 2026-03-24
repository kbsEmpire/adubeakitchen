/* ========================================
   Adubea's Kitchen - MAIN JAVASCRIPT
   ======================================== 
   Copyright 2026 Adubea's Kitchen
 * Use of this source code is governed by a BSD-style license that can be
 * found in the LICENSE file.
   */

// ========================================
// MENU DATA - UPDATED MENU
// ========================================
const menuData = {
    local: [
        {
            id: 1,
            name: "Jollof Rice Special",
            description: "Premium spiced tomato rice with chicken & salad",
            price: 40,
            image: "https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?w=400&h=300&fit=crop"
        },
        {
            id: 2,
            name: "Fried Rice Combo",
            description: "Nigerian style fried rice with chicken & peas",
            price: 38,
            image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&h=300&fit=crop"
        },
        {
            id: 3,
            name: "Banku & Tilapia",
            description: "Fermented corn dough with grilled tilapia & pepper",
            price: 50,
            image: "https://images.unsplash.com/photo-1564834724105-918b73d1b9e0?w=400&h=300&fit=crop"
        },
        {
            id: 4,
            name: "Kenkey & Fried Fish",
            description: "Fermented corn dough with spicy fried fish",
            price: 35,
            image: "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=400&h=300&fit=crop"
        },
        {
            id: 5,
            name: "Fufu & Light Soup",
            description: "Pounded cassava with goat meat & pepper",
            price: 55,
            image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=400&h=300&fit=crop"
        },
        {
            id: 6,
            name: "Waakye Special",
            description: "Rice & beans with shrimps, spaghetti & fish",
            price: 35,
            image: "https://images.unsplash.com/photo-1599974579688-8dbdd335c77f?w=400&h=300&fit=crop"
        }
    ],
    continental: [
        {
            id: 7,
            name: "Spaghetti Bolognese",
            description: "Classic Italian pasta with rich meat sauce",
            price: 45,
            image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400&h=300&fit=crop"
        },
        {
            id: 8,
            name: "Chicken Alfredo",
            description: "Fettuccine in creamy parmesan sauce with chicken",
            price: 55,
            image: "https://images.unsplash.com/photo-1645112411341-6c4fd023714a?w=400&h=300&fit=crop"
        },
        {
            id: 9,
            name: "Beef Stir Fry",
            description: "Tender beef with vegetables in soy sauce",
            price: 50,
            image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&h=300&fit=crop"
        },
        {
            id: 10,
            name: "Chicken Stir Fry",
            description: "Grilled chicken with mixed vegetables & rice",
            price: 48,
            image: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=400&h=300&fit=crop"
        },
        {
            id: 11,
            name: "Grilled Salmon",
            description: "Fresh Atlantic salmon with herbs & vegetables",
            price: 85,
            image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&h=300&fit=crop"
        },
        {
            id: 12,
            name: "Beef Steak",
            description: "Premium cut steak with pepper sauce & chips",
            price: 95,
            image: "https://images.unsplash.com/photo-1546833998-877b37c2e5c6?w=400&h=300&fit=crop"
        }
    ],
    drinks: [
        {
            id: 13,
            name: "Vanilla Milkshake",
            description: "Creamy vanilla shake with whipped cream",
            price: 20,
            image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=400&h=300&fit=crop"
        },
        {
            id: 14,
            name: "Chocolate Milkshake",
            description: "Rich chocolate shake with chocolate chips",
            price: 22,
            image: "https://images.unsplash.com/photo-1579954115545-a95591f28bfc?w=400&h=300&fit=crop"
        },
        {
            id: 15,
            name: "Strawberry Milkshake",
            description: "Fresh strawberry shake with real fruit",
            price: 22,
            image: "https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=400&h=300&fit=crop"
        },
        {
            id: 16,
            name: "Oreo Milkshake",
            description: "Crushed Oreo cookies blended to perfection",
            price: 25,
            image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=400&h=300&fit=crop"
        },
        {
            id: 17,
            name: "Special Shake",
            description: "Ask for our special of the day",
            price: 30,
            image: "https://images.unsplash.com/photo-1579954115545-a95591f28bfc?w=400&h=300&fit=crop"
        },
        {
            id: 18,
            name: "Fresh Juice",
            description: "Mango, pineapple, orange or mixed",
            price: 15,
            image: "images/drinks/image.webp"
        },
        {
            id: 19,
            name: "Soft Drinks",
            description: "Coca Cola, Fanta, Sprite, Guinness",
            price: 8,
            image: "https://images.unsplash.com/photo-1581006852262-e4307cf6283a?w=400&h=300&fit=crop"
        },
        {
            id: 20,
            name: "Bottled Water",
            description: "Pure water 500ml",
            price: 5,
            image: "https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=400&h=300&fit=crop"
        }
    ],
};

// Default category
let currentCategory = 'local';

// ========================================
// CART STATE
// ========================================
let cart = JSON.parse(localStorage.getItem('adubeaKitchenCart')) || [];

// ========================================
// DOM ELEMENTS
// ========================================
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const menuGrid = document.getElementById('menuGrid');
const tabButtons = document.querySelectorAll('.tab-btn');
const orderPanel = document.getElementById('orderPanel');
const cartOverlay = document.getElementById('cartOverlay');
const floatingCart = document.getElementById('floatingCart');
const closeCart = document.getElementById('closeCart');
const orderItems = document.getElementById('orderItems');
const orderFooter = document.getElementById('orderFooter');
const totalAmount = document.getElementById('totalAmount');
const cartBadge = document.getElementById('cartBadge');
const orderForm = document.getElementById('orderForm');
const revealElements = document.querySelectorAll('.reveal');

// ========================================
// NAVBAR SCROLL EFFECT
// ========================================
function handleNavbarScroll() {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}

window.addEventListener('scroll', handleNavbarScroll);
handleNavbarScroll();

// ========================================
// MOBILE MENU
// ========================================
function toggleMobileMenu() {
    hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
}

function closeMobileMenu() {
    hamburger.classList.remove('active');
    mobileMenu.classList.remove('active');
    document.body.style.overflow = '';
}

hamburger.addEventListener('click', toggleMobileMenu);

document.querySelectorAll('.mobile-nav-link, .mobile-cta').forEach(link => {
    link.addEventListener('click', closeMobileMenu);
});

// ========================================
// ACTIVE NAV LINK ON SCROLL
// ========================================
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#' + sectionId) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', updateActiveNavLink);

// ========================================
// RENDER MENU ITEMS
// ========================================
function renderMenuItems(category) {
    const items = menuData[category];
    
    menuGrid.innerHTML = items.map(item => `
        <div class="menu-item" data-id="${item.id}">
            <div class="menu-item-image">
                <img src="${item.image}" alt="${item.name}" loading="lazy">
            </div>
            <div class="menu-item-content">
                <div class="menu-item-header">
                    <h3 class="menu-item-name">${item.name}</h3>
                    <span class="menu-item-price">GHS ${item.price}</span>
                </div>
                <p class="menu-item-description">${item.description}</p>
                <div class="menu-item-actions">
                    <div class="quantity-selector">
                        <button class="quantity-btn minus" data-id="${item.id}">
                            <i class="fas fa-minus"></i>
                        </button>
                        <span class="quantity-value" id="qty-${item.id}">1</span>
                        <button class="quantity-btn plus" data-id="${item.id}">
                            <i class="fas fa-plus"></i>
                        </button>
                    </div>
                    <button class="add-to-cart-btn" data-id="${item.id}">
                        Add to Order
                    </button>
                </div>
            </div>
        </div>
    `).join('');

    // Quantity button listeners
    document.querySelectorAll('.quantity-btn.minus').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const id = parseInt(btn.dataset.id);
            const qtyElement = document.getElementById('qty-' + id);
            let qty = parseInt(qtyElement.textContent);
            if (qty > 1) {
                qty--;
                qtyElement.textContent = qty;
            }
        });
    });

    document.querySelectorAll('.quantity-btn.plus').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const id = parseInt(btn.dataset.id);
            const qtyElement = document.getElementById('qty-' + id);
            let qty = parseInt(qtyElement.textContent);
            qty++;
            qtyElement.textContent = qty;
        });
    });

    // Add to cart button listeners
    document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const id = parseInt(btn.dataset.id);
            const qty = parseInt(document.getElementById('qty-' + id).textContent);
            addToCart(id, qty);
        });
    });

    // Reveal animation
    setTimeout(() => {
        const items = menuGrid.querySelectorAll('.menu-item');
        items.forEach((item, index) => {
            item.classList.add('reveal');
            setTimeout(() => {
                item.classList.add('active');
            }, index * 100);
        });
    }, 50);
}

// ========================================
// TAB SWITCHING
// ========================================
function switchTab(category) {
    currentCategory = category;
    
    tabButtons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.category === category) {
            btn.classList.add('active');
        }
    });

    renderMenuItems(category);
}

tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        switchTab(btn.dataset.category);
    });
});

// ========================================
// CART MANAGEMENT
// ========================================
function findItemById(id) {
    for (const category in menuData) {
        const item = menuData[category].find(i => i.id === id);
        if (item) return item;
    }
    return null;
}

function addToCart(id, quantity = 1) {
    const item = findItemById(id);
    if (!item) return;

    const existingItem = cart.find(i => i.id === id);
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            id: item.id,
            name: item.name,
            price: item.price,
            image: item.image,
            quantity: quantity
        });
    }

    saveCart();
    updateCartUI();
    showNotification(item.name + ' added to cart!');
}

function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    saveCart();
    updateCartUI();
}

function updateQuantity(id, change) {
    const item = cart.find(i => i.id === id);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(id);
        } else {
            saveCart();
            updateCartUI();
        }
    }
}

function saveCart() {
    localStorage.setItem('adubeaKitchenCart', JSON.stringify(cart));
}

function calculateTotal() {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

function updateCartUI() {
    const total = calculateTotal();
    const itemCount = cart.reduce((count, item) => count + item.quantity, 0);
    
    // Update badge
    cartBadge.textContent = itemCount;
    cartBadge.style.display = itemCount > 0 ? 'flex' : 'none';

    // Update mobile cart bar if exists
    const mobileCartBar = document.getElementById('mobileCartBar');
    if (mobileCartBar) {
        const mobileTotal = document.getElementById('mobileCartTotal');
        const mobileCartBadge = document.getElementById('mobileCartBadge');
        if (itemCount > 0) {
            mobileCartBar.style.display = 'flex';
            mobileTotal.textContent = 'GHS ' + total;
            mobileCartBadge.textContent = itemCount;
        } else {
            mobileCartBar.style.display = 'none';
        }
    }

    // Update panel
    if (cart.length === 0) {
        orderItems.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-basket"></i>
                <p>Your cart is empty</p>
                <span>Add items from our menu</span>
            </div>
        `;
        orderFooter.style.display = 'none';
    } else {
        orderItems.innerHTML = cart.map(item => `
            <div class="order-item">
                <div class="order-item-image">
                    <img src="${item.image}" alt="${item.name}">
                </div>
                <div class="order-item-details">
                    <h4 class="order-item-name">${item.name}</h4>
                    <div class="order-item-controls">
                        <div class="quantity-selector">
                            <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">
                                <i class="fas fa-minus"></i>
                            </button>
                            <span class="quantity-value">${item.quantity}</span>
                            <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">
                                <i class="fas fa-plus"></i>
                            </button>
                        </div>
                        <span class="order-item-price">GHS ${item.price * item.quantity}</span>
                        <button class="remove-item" onclick="removeFromCart(${item.id})">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
        
        orderFooter.style.display = 'block';
        totalAmount.textContent = calculateTotal();
    }
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerHTML = '<i class="fas fa-check-circle"></i><span>' + message + '</span>';
    
    notification.style.cssText = 'position:fixed;top:100px;right:20px;background:var(--color-gold);color:var(--color-matte-black);padding:15px 25px;border-radius:8px;display:flex;align-items:center;gap:10px;font-weight:500;box-shadow:var(--shadow-elevated);z-index:2000;animation:slideIn 0.3s ease,fadeOut 0.3s ease 2.7s forwards';
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Add notification styles
const style = document.createElement('style');
style.textContent = '@keyframes slideIn{from{transform:translateX(100%);opacity:0}to{transform:translateX(0);opacity:1}}@keyframes fadeOut{from{opacity:1}to{opacity:0}}';
document.head.appendChild(style);

// ========================================
// CART PANEL TOGGLE
// ========================================
function openCart() {
    orderPanel.classList.add('active');
    cartOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeCartPanel() {
    orderPanel.classList.remove('active');
    cartOverlay.classList.remove('active');
    document.body.style.overflow = '';
}

floatingCart.addEventListener('click', openCart);
closeCart.addEventListener('click', closeCartPanel);
cartOverlay.addEventListener('click', closeCartPanel);

// Mobile cart bar button
const mobileCartBtn = document.getElementById('mobileCartBtn');
if (mobileCartBtn) {
    mobileCartBtn.addEventListener('click', openCart);
}

// ========================================
// WHATSAPP ORDER - Updated format
// ========================================
orderForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('customerName').value.trim();
    const location = document.getElementById('customerLocation').value.trim();
    const payment = document.getElementById('paymentMode').value.trim();
    const notes = document.getElementById('specialInstructions').value.trim();
    
    if (!name || !location) {
        alert('Please enter your name and delivery location.');
        return;
    }
    
    if (cart.length === 0) {
        alert('Your cart is empty. Please add items to your order.');
        return;
    }
    
    // Build WhatsApp message - New format
    let message = 'Hello Adubea\'s Kitchen 👋\n';
    message += 'I would like to place an order.\n\n';
    message += '=====================\n';
    message += 'Order Details:\n';
    message += '=====================\n\n';
    
    cart.forEach(item => {
        message += item.name + ' x' + item.quantity + '\n';
    });
    
    message += '\n========================\n';
    message += 'Total amount: GHS ' + calculateTotal() + '\n';
    message += '========================\n\n';

    message += 'Delivery Location: ' + location + '\n';
    message += 'Payment Mode: ' + payment + '\n';
    
    if (notes) {
        message += 'Notes: ' + notes + '\n';
    }
    
    // Encode and open WhatsApp
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = 'https://wa.me/233550008800?text=' + encodedMessage;
    
    // Use window.location.href for better mobile compatibility
    window.location.href = whatsappUrl;
});

// Global functions
window.updateQuantity = updateQuantity;
window.removeFromCart = removeFromCart;

// ========================================
// SCROLL REVEAL ANIMATION
// ========================================
function revealOnScroll() {
    const windowHeight = window.innerHeight;
    const elementVisible = 100;
    
    revealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        
        if (elementTop < windowHeight - elementVisible) {
            element.classList.add('active');
        }
    });
}

window.addEventListener('scroll', revealOnScroll);
revealOnScroll();

// ========================================
// HERO ANIMATION
// ========================================
function animateHero() {
    const heroTitle = document.querySelector('.hero-title');
    const heroTagline = document.querySelector('.hero-tagline');
    const heroButtons = document.querySelector('.hero-buttons');
    
    if (heroTitle) {
        heroTitle.style.opacity = '0';
        heroTitle.style.transform = 'translateY(30px)';
        setTimeout(() => {
            heroTitle.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            heroTitle.style.opacity = '1';
            heroTitle.style.transform = 'translateY(0)';
        }, 200);
    }
    
    if (heroTagline) {
        heroTagline.style.opacity = '0';
        heroTagline.style.transform = 'translateY(30px)';
        setTimeout(() => {
            heroTagline.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            heroTagline.style.opacity = '1';
            heroTagline.style.transform = 'translateY(0)';
        }, 400);
    }
    
    if (heroButtons) {
        heroButtons.style.opacity = '0';
        heroButtons.style.transform = 'translateY(30px)';
        setTimeout(() => {
            heroButtons.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            heroButtons.style.opacity = '1';
            heroButtons.style.transform = 'translateY(0)';
        }, 600);
    }
}

window.addEventListener('load', animateHero);

// ========================================
// SMOOTH SCROLL
// ========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// ========================================
// INITIALIZE
// ========================================
function init() {
    renderMenuItems('local');
    updateCartUI();
}

init();

