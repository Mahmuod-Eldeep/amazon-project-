import { cart , updateCheckoutQuantity } from "../../data/cart.js";

export function renderCheckoutHeader() {
    document.querySelector('.js-return-to-home-link').innerHTML = updateCheckoutQuantity() + ' items';
}