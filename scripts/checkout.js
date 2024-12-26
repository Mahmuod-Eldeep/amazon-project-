import { cart, removeFromCart, updateCheckoutQuantity, updateQuantity } from "../data/cart.js";
import { products } from "../data/products.js";
import { formatCurrency } from "./utils/money.js"
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js'
import { deliveryOptions } from '../data/deliveryOptions.js'







let cartSummaryHTML = '';

let matchingProduct;
cart.forEach((cartItem) => {
    const productId = cartItem.productId;
    products.forEach((product) => {
        if (product.id === productId) {
            matchingProduct = product;
        }
    })

    const deliveryOptionId = cartItem.deliveryOptionsId;
    let deliveryOption;

    deliveryOptions.forEach((option) => {
        if (option.id === deliveryOptionId) {
            deliveryOption = option;
        }
    });
    const today = dayjs();
    const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
    const dateString = deliveryDate.format('dddd, MMMM D');

    cartSummaryHTML += `
      <div class="cart-item-container
       js-cart-item-container-${matchingProduct.id}">
        <div class="delivery-date">
        Delivery date: ${dateString}
        </div>

        <div class="cart-item-details-grid">
        <img class="product-image" src="${matchingProduct.image}">

        <div class="cart-item-details">
            <div class="product-name">
           ${matchingProduct.name}
            </div> 
            <div class="product-price">
            $${formatCurrency(matchingProduct.priceCents)}
            </div>
            <div class="product-quantity">
            <span>
                Quantity: <span class="quantity-label js-quantity-label">${cartItem.quantity}</span>
            </span>
            <span class="update-quantity-link link-primary js-update-link" data-product-id="${matchingProduct.id}">
                Update 
            </span>
            <span class="delete-quantity-link link-primary 
            js-delete-link" data-product-id="${matchingProduct.id}" >
                Delete
            </span>
            </div>
        </div>

        <div class="delivery-options">
            <div class="delivery-options-title">
            Choose a delivery option:
            </div>
          ${deliveryOptionsHTML(matchingProduct, cartItem)}
        </div>
        </div>
    </div>
    `;
});



function deliveryOptionsHTML(matchingProduct, cartItem) {
    let html = ``;
    deliveryOptions.forEach((deliveryOption) => {
        const today = dayjs();
        const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
        const dateString = deliveryDate.format('dddd, MMMM D');
        const priceString = deliveryOption.priceCents === 0 ? 'FREE' : `$${formatCurrency(deliveryOption.priceCents)} -`
        const isChecked = deliveryOption.id === cartItem.deliveryOptionsId;




        html +=
            ` 
        <div class="delivery-option">
            <input type="radio"  ${isChecked ? 'checked' : ''}
        class="delivery-option-input" name = "delivery-option-${matchingProduct.id}" >
            <div>
                <div class="delivery-option-date">
                    ${dateString}
                </div>
                <div class="delivery-option-price">
                    ${priceString} Shipping
                </div>
            </div>                                                                                                                                                        
            </div >
            `
    })
    return html;
}




document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML;

document.querySelector('.js-return-to-home-link').innerHTML = updateCheckoutQuantity() + ' items';


document.querySelectorAll('.js-delete-link')
    .forEach((link) => {
        link.addEventListener('click', () => {
            const productId = link.dataset.productId;
            removeFromCart(productId);
            const container = document.querySelector(`.js - cart - item - container - ${productId} `);

            container.remove();
            document.querySelector('.js-return-to-home-link').innerHTML = updateCheckoutQuantity() + ' items';
        });
    });
document.querySelectorAll('.js-update-link').forEach((link) => {
    link.addEventListener('click', () => {
        const productId = link.dataset.productId;
        console.log('Product ID:', productId);
        const container = document.querySelector(`.js - cart - item - container - ${productId} `);

        const quantityLabel = container.querySelector('.js-quantity-label');
        const updateLink = link.textContent.trim();

        if (updateLink === "Update") {
            // تحويل النص إلى مربع إدخال
            const currentQuantity = quantityLabel.textContent.trim(); // الحصول على الكمية الحالية
            quantityLabel.innerHTML = `< input type = "number" class="quantity-input" value = "${currentQuantity}" min = "1" style = "width: 50px;" > `;
            link.textContent = "Save";
        } else if (updateLink === "Save") {

            const quantityInput = container.querySelector('.quantity-input');
            const newQuantity = Number(quantityInput.value.trim()); // تحويل النص إلى رقم
            quantityLabel.innerHTML = newQuantity;
            link.textContent = "Update";
            updateQuantity(productId, newQuantity);
            document.querySelector('.js-return-to-home-link').innerHTML = updateCheckoutQuantity() + ' items';

        }
    });
});


