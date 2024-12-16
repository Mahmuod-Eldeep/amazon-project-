export const cart = [];


export function addToCart(productId, selectedQuantity) {

    const matchingItem = cart.find(cartItem => cartItem.productId === productId);

    if (matchingItem) {
        matchingItem.quantity += selectedQuantity
    } else {

        cart.push({
            productId: productId,
            quantity: selectedQuantity,
        });
    }
}


export function showAddMessage(addedToCartMessage) {
    if (addedToCartMessage.timeoutId) {
        clearTimeout(addedToCartMessage.timeoutId);
    }
    addedToCartMessage.style.opacity = 1;
    addedToCartMessage.timeoutId = setTimeout(() => {
        addedToCartMessage.style.opacity = 0;
    }, 1500);

}



