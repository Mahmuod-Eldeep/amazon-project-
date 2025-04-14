export const Orders = JSON.parse(localStorage.getItem("orders")) || [];

export function addOrder(order) {
  Orders.unshift(order);
  saveToStorge();
}

function saveToStorge( ) {
localStorage.setItem("orders", JSON.stringify(Orders));
}