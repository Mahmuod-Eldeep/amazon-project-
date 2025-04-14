import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { renderCheckoutHeader } from "./checkout/checkoutHeader.js";
import { loadProducts, loadProductsFetch } from "../data/products.js";
import { loadCart } from "../data/cart.js";
// import '../data/cart-class.js';
// import '../data/backend.js';

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
  renderPaymentSummary();
  renderCheckoutHeader();
}

loadPage();

/*
async function loadPage() {
  await loadProductsFetch();
 const value =  await new Promise((resolve) => {
    loadCart(() => {
      resolve();
    });
  });
  renderOrderSummary();
  renderPaymentSummary();
  renderCheckoutHeader();
}
*/

/*
Promise.all([
 loadProductsFetch(),

   new Promise((resolve) => {
     loadCart(() => {
      resolve();
   })}),


]).then((value)=>{
  console.log(value);
  renderOrderSummary();
  renderPaymentSummary();
  renderCheckoutHeader();
});
*/

/*

new Promise((resolve) => {

  loadProducts(() => {
    resolve('value1');
  });
}).then((value) => {
  return new Promise((resolve) => {
    console.log(value);
    
    loadCart(() => {
      resolve('value2');
    });
  });
}).then((value2)=> {
  console.log(value2);
  renderOrderSummary();
  renderPaymentSummary();
  renderCheckoutHeader();
});
*/

/* loadProducts(() => {
  loadCart(() => {
    renderOrderSummary();
    renderPaymentSummary();
    renderCheckoutHeader();
  });
});
*/
