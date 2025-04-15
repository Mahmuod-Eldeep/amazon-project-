import { Orders } from "../data/orders.js";
import { getProduct } from "../data/products.js";
import { loadProducts, loadProductsFetch } from "../data/products.js";
import { loadCart } from "../data/cart.js";

document.addEventListener("DOMContentLoaded", () => {
  const savedQuantity = localStorage.getItem("cartQuantity");
  if (savedQuantity) {
    document.querySelector(".js-cart-quantity").innerHTML = savedQuantity;
  }
});

async function loadPage() {
  try {
    await Promise.all([
      loadProductsFetch(),
      new Promise((resolve) => {
        loadCart(() => {
          resolve();
        });
      }),
    ]);
  } catch (error) {
    console.log("Unexpected error loading products, Please try again later.");
  }

  renderOrderSummary();
}

loadPage();

export function renderOrderSummary() {
  let orderSummaryHTML = ``;
  Orders.forEach((orderItem) => {
    const orderId = orderItem.id;
    orderItem.products.forEach((product) => {
      const productId = product.productId;
      const matchingProduct = getProduct(productId);
      const date = new Date(orderItem.orderTime);
      date.setDate(date.getDate() + 1);
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const day = date.getDate().toString().padStart(2, "0");
      const readableDate = `${year}-${month}-${day}`;
      const total = orderItem.totalCostCents / 100;
      const orderPlaced = orderItem.orderTime;

      orderSummaryHTML += `
    <div class="order-container
    js-order-item-container-${orderItem.id}">

    <div class="order-header">
    <div class="order-header-left-section">
    <div class="order-date"> 
        <div class="order-header-label">Order Placed:</div>
        <div>${orderPlaced}</div>
    </div>
    <div class="order-total">
        <div class="order-header-label">Total:</div>
        <div>${total}</div>
    </div>
    </div>

    <div class="order-header-right-section">
    <div class="order-header-label">Order ID:</div>
    <div>${orderId}</div>
    </div>
    </div>

    <div class="order-details-grid">
    <div class="product-image-container">
    <img src="${matchingProduct.image}">
    </div>

    <div class="product-details">
    <div class="product-name">
       ${matchingProduct.name}
    </div>
    <div class="product-delivery-date">
        Arriving on: ${readableDate}
    </div>
    <div class="product-quantity">
        Quantity: ${product.quantity}
    </div>
    <button class="buy-again-button button-primary">
        <img class="buy-again-icon" src="images/icons/buy-again.png">
        <span class="buy-again-message">Buy it again</span>
    </button>
    </div>

    <div class="product-actions">
    <a href="tracking.html?orderId=2664&productId=1">
        <button class="track-package-button button-secondary">
        Track package
        </button>
    </a>
    </div>
    </div>
    </div>
    `;
    });
  });

  document.querySelector(".js-order-container").innerHTML = orderSummaryHTML;
}
