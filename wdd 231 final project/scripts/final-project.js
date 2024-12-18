
// Variables
var cartCountText = document.querySelector("#cart-count");
var signUpForm = document.querySelector(".email-sign-up");
var emailInput = document.querySelector("input[type='text']");
var signUpBtn = document.querySelector("#sign-up");
var itemButtons = document.querySelectorAll(".cart-btn");

// Cart count
var count = 0;

// Update cart count
function addToCart() {
    count++;
    cartCountText.textContent = count === 1 ? "1 item" : count + " items";
}

// Handle Add to Cart buttons
itemButtons.forEach(button => {
    button.addEventListener("click", addToCart);
});

// Email sign-up handler
signUpBtn.addEventListener("click", function() {
    if (emailInput.value) {
        var confirmationMsg = document.createElement("p");
        confirmationMsg.textContent = "Thank you for signing up, " + emailInput.value;
        signUpForm.innerHTML = "";
        signUpForm.appendChild(confirmationMsg);
    } else {
        alert("Please enter your email address.");
    }
});

// Responsive navigation for product page
document.getElementById("product-nav-toggle").addEventListener("click", function() {
    var nav = document.querySelector(".product-nav ul");
    nav.style.display = (nav.style.display === "block" ? "none" : "block");
});

// Filtering products by category
var navButtons = document.querySelectorAll(".product-nav .nav-btn");
navButtons.forEach(button => {
    button.addEventListener("click", function() {
        var category = this.getAttribute("data-category");
        var items = document.querySelectorAll(".products-grid .item-card");
        items.forEach(item => {
            if (category === "all" || item.getAttribute("data-category") === category) {
                item.style.display = "block";
            } else {
                item.style.display = "none";
            }
        });
    });
});

// Responsive navigation for main nav
document.getElementById("main-nav-toggle").addEventListener("click", function() {
    var nav = document.querySelector(".nav-links");
    nav.style.display = (nav.style.display === "block" ? "none" : "block");
});


// var navButtons = document.querySelectorAll(".product-nav .nav-btn");
// navButtons.forEach(button => {
//     button.addEventListener("click", function() {
//         var category = this.getAttribute("data-category");
//         var items = document.querySelectorAll(".products-grid .item-card");
//         items.forEach(item => {
//             if (category === "all" || item.getAttribute("data-category") === category) {
//                 item.style.display = "block";
//             } else {
//                 item.style.display = "none";
//             }
//         });
//     });
// });