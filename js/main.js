/* ========================================
   ADUBEA'S KITCHEN – MENU ENGINE v2
   Supports:
   ✔ Daily meals
   ✔ Weekday specials auto-detection
   ✔ Protein-based pricing
   ✔ Fixed combo meals
   ✔ Swallow meals selector
   ✔ Extras tab pricing
   ✔ WhatsApp-ready cart formatting
======================================== */

const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long'
}).toLowerCase();


/* ========================================
   DAILY MEALS (AVAILABLE EVERY DAY)
======================================== */
function getMealImage(mealName) {

    // Remove protein text inside brackets
    const cleanName = mealName
        .replace(/\(.*?\)/g, "")
        .trim();

    return "images/meals/" +
    cleanName
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9\-]/g, "")
    + ".webp";

}

const dailyMeals = [

{
name: "Jollof Rice",
type: "protein",
options: [
{ name: "Chicken", price: 60 },
{ name: "Fried Fish", price: 60 },
{ name: "Turkey", price: 70 },
{ name: "Goat Meat", price: 70 },
{ name: "Tilapia", price: 90 }
]
},

{
name: "Fried Rice",
type: "protein",
options: [
{ name: "Chicken", price: 60 },
{ name: "Fried Fish", price: 60 },
{ name: "Turkey", price: 70 },
{ name: "Goat Meat", price: 70 },
{ name: "Tilapia", price: 90 }
]
},

{
name: "Plain Rice + Palava Sauce",
type: "fixed",
price: 60
},

{
name: "Adubified Spaghetti",
type: "fixed",
price: 60
},

{
name: "Plantain + Abom",
type: "fixed",
price: 70
},

{
name: "Yam + Abom",
type: "fixed",
price: 70
},

{
name: "Yam Chips",
type: "protein",
options: [
{ name: "Chicken", price: 60 },
{ name: "Fried Fish", price: 60 },
{ name: "Turkey", price: 70 },
{ name: "Tilapia", price: 80 }
]
}

];


/* ========================================
   WEEKDAY SPECIALS
======================================== */

const weekdaySpecials = {

monday: [

{
name: "Kenkey",
type: "protein",
options: [
{ name: "Half Tilapia", price: 45 },
{ name: "Full Tilapia", price: 80 },
{ name: "Chicken Wings", price: 40 },
{ name: "Turkey", price: 50 },
{ name: "Fried Fish", price: 40 }
]
}

],

tuesday: [

{
name: "Eba + Okro Soup",
type: "swallow",
options: [
{ name: "Chicken", price: 60 },
{ name: "Goat Meat", price: 70 },
{ name: "Fish", price: 60 },
{ name: "Crab", price: 70 },
{ name: "Snail", price: 70 },
{ name: "Salmon", price: 70 },
{ name: "Wele", price: 60 }
]
},

{
name: "Mpoto Mpoto",
type: "fixed",
price: 60
}

],

wednesday: [

{
name: "Gari Foto",
type: "fixed",
price: 60
}

],

thursday: [

{
name: "Angwamo Special",
type: "fixed",
price: 60
}

],

friday: [

{
name: "Waakye Special",
type: "fixed",
price: 60
},

{
name: "Red Red Special",
type: "fixed",
price: 60
}

],

saturday: [

    {
    name: "Omo tuo",
    type: "fixed",
    price: 60
    }
    
    ],

sunday: [

        {
        name: "Mpoto Mpoto",
        type: "fixed",
        price: 60
        }
        
        ]

};


/* ========================================
   EXTRAS TAB
======================================== */

const extras = [

{ name: "Egg", price: 10 },
{ name: "Pear", price: 5 },
{ name: "Sausage", price: 10 },
{ name: "Chicken", price: 20 },
{ name: "Goat Meat", price: 30 },
{ name: "Snail", price: 30 },
{ name: "Crab", price: 30 },
{ name: "Fried Fish", price: 20 },
{ name: "Salmon", price: 30 },
{ name: "Koobi", price: 15 },
{ name: "Wele", price: 15 }

];


/* ========================================
   DRINKS (EDIT LATER IF NEEDED)
======================================== */

const drinks = [

{ name: "Coca Cola", price: 10 },
{ name: "Fanta", price: 10 },
{ name: "Sprite", price: 10 },
{ name: "Malta", price: 12 },
{ name: "Water", price: 5 }

];


/* ========================================
   AUTO TODAY'S MENU ENGINE
======================================== */

function getTodaysMeals() {

let todaysMenu = [...dailyMeals];

if (weekdaySpecials[today]) {

todaysMenu = todaysMenu.concat(
weekdaySpecials[today]
);

}

return todaysMenu;

}


/* ========================================
   MASTER MENU DATA OBJECT
======================================== */

const menuData = {

todayMeals: getTodaysMeals(),

weekdaySpecials,

extras,

drinks

};


/* ========================================
   MENU RENDERER ENGINE
======================================== */

function renderMenu(category) {

const container = document.getElementById("menu-items");

container.innerHTML = "";

let items = [];

if (category === "today") items = menuData.todayMeals;

if (category === "extras") items = menuData.extras;

if (category === "drinks") items = menuData.drinks;


items.forEach(item => {

const card = document.createElement("div");

card.classList.add("menu-card");


/* FIXED PRICE MEALS */

if (item.type === "fixed" || category === "extras" || category === "drinks") {

card.innerHTML = `

<h3>${item.name}</h3>

<p>GHS ${item.price}</p>

<button onclick="addToCart('${item.name}', ${item.price})">

Add to Cart

</button>

`;

}


/* PROTEIN SELECTOR MEALS */

if (item.type === "protein") {

let optionsHTML = `<select onchange="updateProteinSelection(this, '${item.name}')">`;

optionsHTML += `<option value="">Select Protein</option>`;

item.options.forEach(opt => {

optionsHTML += `

<option value="${opt.name}|${opt.price}">

${opt.name} - GHS ${opt.price}

</option>

`;

});

optionsHTML += "</select>";

card.innerHTML = `

<h3>${item.name}</h3>

${optionsHTML}

<button onclick="addProteinMeal('${item.name}', this.previousElementSibling.value)">

Add to Cart

</button>

`;

}


/* SWALLOW MEALS */

if (item.type === "swallow") {

let optionsHTML = `<select onchange="updateProteinSelection(this, '${item.name}')">`;

optionsHTML += `<option value="">Select Protein</option>`;

item.options.forEach(opt => {

optionsHTML += `

<option value="${opt.name}|${opt.price}">

${opt.name} - GHS ${opt.price}

</option>

`;

});

optionsHTML += "</select>";

card.innerHTML = `

<h3>${item.name}</h3>

${optionsHTML}

<button onclick="addProteinMeal('${item.name}', this.previousElementSibling.value)">

Add to Cart

</button>

`;

}


container.appendChild(card);

});

}


/* ========================================
   PROTEIN CART HANDLER
======================================== */

function addProteinMeal(mealName, selectedValue) {

if (!selectedValue) {

alert("Please select a protein");

return;

}

const [protein, price] = selectedValue.split("|");

addToCart(`${mealName} (${protein})`, Number(price));

}

// Default category
let currentCategory = 'today';

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


document.addEventListener('DOMContentLoaded', function() {
    const paymentSelect = document.getElementById('paymentMode');
    const momoDetails = document.getElementById('momoDetails');

    paymentSelect.addEventListener('change', function() {
        if (this.value === 'Mobile Money') {
            momoDetails.style.display = 'block';
        } else{
            momoDetails.style.display = 'none';
        }
    });
});
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

    let items = [];

    if (category === "today") items = menuData.todayMeals;
    if (category === "extras") items = menuData.extras;
    if (category === "drinks") items = menuData.drinks;

    menuGrid.innerHTML = "";

    items.forEach((item, index) => {

        const card = document.createElement("div");
        card.className = "menu-item reveal";

        let imagePath = getMealImage(item.name);

let content = `
<img class="menu-item-image"
src="${imagePath}"
onerror="this.src='images/meals/default.webp'">

<div class="menu-item-content">
<h3 class="menu-item-name">${item.name}</h3>
`;

        // FIXED MEALS
        if (item.type === "fixed" || category !== "today") {

            content += `
            <span class="menu-item-price">GHS ${item.price}</span>

            <button class="add-to-cart-btn">
            Add to Order
            </button>
            `;

            card.innerHTML = content;

            card.querySelector(".add-to-cart-btn").addEventListener("click", () => {

                addToCart({
                    name: item.name,
                    price: item.price
                });

            });

        }

        // PROTEIN SELECTOR
        if (item.type === "protein" || item.type === "swallow") {

            let selector = `<select class="protein-select">
            <option value="">Select Protein</option>`;

            item.options.forEach(opt => {

                selector += `
                <option value="${opt.name}|${opt.price}">
                ${opt.name} - GHS ${opt.price}
                </option>
                `;

            });

            selector += `</select>`;

            content += selector;

            content += `
            <button class="add-to-cart-btn">
            Add to Order
            </button>
            `;

            card.innerHTML = content;

            const select = card.querySelector(".protein-select");

            card.querySelector(".add-to-cart-btn")
            .addEventListener("click", () => {

                if (!select.value) {

                    alert("Please select a protein");

                    return;

                }

                const [protein, price] = select.value.split("|");

                addToCart({

                    name: `${item.name} (${protein})`,
                    price: Number(price)

                });

            });

        }

        menuGrid.appendChild(card);

        setTimeout(() => {
            card.classList.add("active");
        }, index * 100);

    });

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



function addToCart(itemData) {

    const existingItem = cart.find(
        i => i.name === itemData.name
    );

    const mealImage = getMealImage(itemData.name);

    if (existingItem) {

        existingItem.quantity++;

    } else {

        cart.push({

            id: Date.now() + Math.random(),

            name: itemData.name,

            price: itemData.price,

            image: mealImage, 

            quantity: 1

        });

    }

    saveCart();

    updateCartUI();

    showNotification(itemData.name + " added to cart");

}

function removeFromCart(id) {

    cart = cart.filter(item => item.id !== id);

    saveCart();

    updateCartUI();

}

function updateQuantity(id, change) {

    const item = cart.find(i => i.id === id);

    if (!item) return;

    item.quantity += change;

    if (item.quantity <= 0) {

        removeFromCart(id);

    } else {

        saveCart();

        updateCartUI();

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

    const itemCount = cart.reduce(
        (count, item) => count + item.quantity, 0
    );

    // Update badge
    cartBadge.textContent = itemCount;

    cartBadge.style.display =
        itemCount > 0 ? 'flex' : 'none';


    // Update mobile cart bar if exists
    const mobileCartBar =
        document.getElementById('mobileCartBar');

    if (mobileCartBar) {

        const mobileTotal =
            document.getElementById('mobileCartTotal');

        const mobileCartBadge =
            document.getElementById('mobileCartBadge');

        if (itemCount > 0) {

            mobileCartBar.style.display = 'flex';

            mobileTotal.textContent =
                'GHS ' + total;

            mobileCartBadge.textContent =
                itemCount;

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

                <img class="order-item-image"
                src="${item.image?.includes('images/')
        ? item.image
        : 'images/meals/' + (item.image || getMealImage(item.name))}"
                onerror="this.src='images/meals/default.webp'">

                <div class="order-item-details">

                    <h4 class="order-item-name">
                        ${item.name}
                    </h4>

                    <div class="order-item-controls">

                        <div class="quantity-selector">

                            <button class="quantity-btn"
                            onclick="updateQuantity(${item.id}, -1)">
                                <i class="fas fa-minus"></i>
                            </button>

                            <span class="quantity-value">
                                ${item.quantity}
                            </span>

                            <button class="quantity-btn"
                            onclick="updateQuantity(${item.id}, 1)">
                                <i class="fas fa-plus"></i>
                            </button>

                        </div>

                        <span class="order-item-price">
                            GHS ${item.price * item.quantity}
                        </span>

                        <button class="remove-item"
                        onclick="removeFromCart(${item.id})">
                            <i class="fas fa-trash"></i>
                        </button>

                    </div>

                </div>

            </div>

        `).join('');

        orderFooter.style.display = 'block';

        totalAmount.textContent =
            calculateTotal();

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

    message += 'Customer Name: ' + name + '\n';
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
    renderMenuItems('today');
    updateCartUI();
}

init();
