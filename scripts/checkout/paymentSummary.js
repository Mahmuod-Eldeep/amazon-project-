import {
  cart,
  updateCartAfterOrder,
  updateCheckoutQuantity,
} from "../../data/cart.js";
import { getProduct } from "../../data/products.js";
import { formatCurrency } from "../utils/money.js";
import { getDeliveryOptionById } from "../../data/deliveryOptions.js";
import { addOrder } from "../../data/orders.js";

export function renderPaymentSummary() {
  let producPriceCents = 0;
  let ShippingPriceCents = 0;

  cart.forEach((cartItem) => {
    const product = getProduct(cartItem.productId);

    producPriceCents += product.priceCents * cartItem.quantity;
    const deliveryOption = getDeliveryOptionById(cartItem.deliveryOptionsId);
    ShippingPriceCents += deliveryOption.priceCents;
  });
  const totalBeforeTaxCents = producPriceCents + ShippingPriceCents;
  const taxCents = totalBeforeTaxCents * 0.1;
  const totalCents = totalBeforeTaxCents + taxCents;

  const paymentSummaryHTML = `
    <div class="payment-summary-title">
            Order Summary
            </div>

            <div class="payment-summary-row">
            <div>Items (${updateCheckoutQuantity()}):</div>
            <div class="payment-summary-money">
            $${formatCurrency(producPriceCents)}
            </div>
            </div>

            <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">
            $${formatCurrency(ShippingPriceCents)}
            </div>
            </div>
            <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">
            $${formatCurrency(totalBeforeTaxCents)}
            </div>
            </div>
            <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">
            $${formatCurrency(taxCents)}
            </div>
            </div>
            <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">
            $${formatCurrency(totalCents)}
            </div>
            </div>
            <button class="place-order-button button-primary
            js-place-order">
            Place your order
            </button>
    `;
  document.querySelector(".js-payment-summary").innerHTML = paymentSummaryHTML;
  document
    .querySelector(".js-place-order")
    .addEventListener("click", async () => {
      try {
        const response = await fetch("https://supersimplebackend.dev/orders", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            cart,
          }),
        });
        const order = await response.json();
        addOrder(order);
        updateCartAfterOrder();
      } catch (error) {
        console.log("unexpected error  try again later");
      }

      window.location.href = "orders.html";
    });
}
