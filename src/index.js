import React from 'react';
import ReactDOM from 'react-dom';

import './style.css';

import img1 from './img/blackT.png';
import img2 from './img/whiteT.png';
import img3 from './img/orangeT.png';
import img4 from './img/pinkT.png';
import img5 from './img/blackL.jpg';
import img6 from './img/grayL.png';
import img7 from './img/orangeB.png';
import img8 from './img/yellowB.png';



/*********************** Cart Functionality */

/* Ensures the page is already loaded before running code for buttons */
if (document.readyState == 'loading') {
  document.addEventListener('DOMContentLoaded', loaded)
} else {
  loaded()
}

function loaded() {
  // Add to cart button
  var addToCartButtons = document.getElementsByClassName('add-button')
  for (var i = 0; i < addToCartButtons.length; i++) {
    var btn = addToCartButtons[i]
    btn.addEventListener('click', cartAddClick)
  }

  // x (Remove from cart) button
  var removeFromCartButtons = document.getElementsByClassName('remove-button')
  for (var i = 0; i < removeFromCartButtons.length; i++) {
    var btn = removeFromCartButtons[i]
    btn.addEventListener('click', cartRemoveClick)
  }

  // Quantity input
  var qtyInputs = document.getElementsByClassName('preview-qty')
  for (var i = 0; i < qtyInputs.length; i++) {
    var input = qtyInputs[i]
    input.addEventListener('change', qtyChange)
  }

  // checkout button
  document.getElementById('checkout-button').addEventListener('click', checkout)
}

/* Add to cart */
function cartAddClick(event) {
  var itemCard = event.target.parentElement // get item card (parent of 'add to cart' button)
  var title = itemCard.getElementsByClassName('card-name')[0].innerText
  var price = itemCard.getElementsByClassName('card-cost')[0].innerText
  var imgSrc = itemCard.getElementsByClassName('card-img')[0].src
  
  addToCart(title, price, imgSrc)
  updateTotal()
}

// Cart preview - list items
function addToCart(title, price, imgSrc) {
  var cartRow = document.createElement('div')
  cartRow.classList.add('cart-row') // appear in a row

  var cartItems = document.getElementsByClassName('cart-items')[0]
  var cartItemNames = cartItems.getElementsByClassName('card-name')
  
  // Can only add to cart once per item
  for (var i = 0; i < cartItemNames.length; i++) {
    if (cartItemNames[i].innerText == title) {
      alert('This item is already in your cart. You may modify the quantity at the checkout page.')
      return
    }
  }

  // Preview item
  var cartRowContent = `
  <div class="cart-item cart-column">
    <img class="preview-img" src=${imgSrc} alt={props.altText}></img>
    <b class="card-name">${title}</b>
  </div>

  <div class="cart-item cart-column">
    <input class="preview-qty" type="number" value="1">
    <button class="remove-button">x</button>
  </div>

  <p class="cart-price cart-column">${price}</p>
  `
  cartRow.innerHTML = cartRowContent
  cartItems.append(cartRow)

  // elements under 'Quantity' column
  cartRow.getElementsByClassName('remove-button')[0].addEventListener('click', cartRemoveClick)
  cartRow.getElementsByClassName('preview-qty')[0].addEventListener('change', qtyChange)
}

/* Remove from cart */
function cartRemoveClick(event) {
  event.target.parentElement.parentElement.remove()
  updateTotal()
}

/* Change item quantity */
function qtyChange(event) {
  var qty = event.target

  // item quantity must be a positive number
  if (qty.value < 1 || isNaN(qty.value)) {
    qty.value = 1
  }
  updateTotal()
}

/* Checkout */
function checkout() {
  var cartItems = document.getElementsByClassName('cart-items')[0]

  if (!cartItems.hasChildNodes()) {
    alert("Your cart is empty")
  } else {
    alert("Thank you for your purchase!")
  }

  // empty cart
  while (cartItems.hasChildNodes()) {
    cartItems.removeChild(cartItems.firstChild)
  }
  updateTotal()
}

/* Update cart total $ */
function updateTotal() {
  var cartContainer = document.getElementsByClassName('cart-items')[0]
  var cartRows = cartContainer.getElementsByClassName('cart-row')
  var total = 0
  for (var i = 0; i < cartRows.length; i++) {
    var itemRow = cartRows[i]
    var priceElement = itemRow.getElementsByClassName('cart-price')[0]
    var qtyElement = itemRow.getElementsByClassName('preview-qty')[0]
    var price = parseFloat(priceElement.innerText.replace('$', '')) // remove $ sign
    var qty = qtyElement.value
    total += price * qty
  }
  document.getElementsByClassName('total-price')[0].innerText = '$' + total
}


/*********************** Cart Display */
window.onload = function() {
  var cartModal = document.getElementById("myCart");
  var cartBtn = document.getElementById("cartButton");
  var closeBtn = document.getElementById("modal-close");

  /* Display cart on cart button click */
  cartBtn.onclick = function() {
   cartModal.style.display = "block";
  }

  /* Close cart on x button click */
  closeBtn.onclick = function() {
    cartModal.style.display = "none";
  }

}


/*********************** Mock redirection - alert popup */
function RedirectAlert() {
  
  function alertMsg() {
    alert("Mock redirection to another website");
  }

  return (
    <div>
      <a class="white_hover" onClick={alertMsg}>
       <i class="fab fa-facebook fa-2x padding16"></i>
     </a>
      <a class="white_hover" onClick={alertMsg}>
       <i class="fab fa-instagram fa-2x padding16"></i>
     </a>
    </div>
  )
}

/*********************** Navigation bar */
function Navbar() {
  return (
    <nav class="navbar white-color">
      <a href="#"><img class="navbar-logo" src="logo.png" alt="Logo"></img></a>
      <button id="cartButton" class="navbar-cart"><i class="fas fa-shopping-cart fa-2x"></i></button>
    </nav>
  )
}


/** A single product card */
function Card(props){
  return (
    <div class="card">
      <img class="card-img" src={props.image} alt={props.altText}></img>
      <br></br>
      <b class="card-name">{props.productName}</b>
      <p class="card-cost">{props.cost}</p>
      <button class="add-button">Add to cart</button>
   </div>
  )
}

/*********************** Table of products */
function Catalog() {
  const card1 = <Card image={img1} altText="Black T-Shirt" productName="Black T-Shirt" cost="15$" />;
  const card2 = <Card image={img2} altText="White T-Shirt" productName="White T-Shirt" cost="15$" />;
  const card3 = <Card image={img3} altText="Orange T-Shirt" productName="Orange T-Shirt" cost="15$" />;
  const card4 = <Card image={img4} altText="Pink T-Shirt" productName="Pink T-Shirt" cost="15$" />;
  const card5 = <Card image={img5} altText="Black Longsleeve" productName="Black Longsleeve" cost="35$" />;
  const card6 = <Card image={img6} altText="Gray Longsleeve" productName="Gray Longsleeve" cost="35$" />;
  const card7 = <Card image={img7} altText="Orange Shorts" productName="Orange Shorts" cost="20$" />;
  const card8 = <Card image={img8} altText="Yellow Shorts" productName="Yellow Shorts" cost="20$" />;
  
  return(
    <div class="card_container">
      {card1}
      {card2}
      {card3}
      {card4}
      {card5}
      {card6}
      {card7}
      {card8}
    </div>
  )
}


/*********************** Render */
ReactDOM.render(<RedirectAlert />, document.getElementById('social'));
ReactDOM.render(<Navbar />, document.getElementById('navbar'));
ReactDOM.render(<Catalog />, document.getElementById('card'));