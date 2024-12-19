export let cart = JSON.parse(localStorage.getItem('cart'));



function saveToCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}


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
    saveToCart();
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

export function removeFromCart(productId) {
    const newCart = [];
    cart.forEach((cartItem) => {

        if (cartItem.productId !== productId) {
            newCart.push(cartItem);
        }
    });

    cart = newCart;
    // cart = cart.filter(product => product.productId !== productId); the same thing 
    saveToCart();
}


export function updateCheckoutQuantity() {
    const totalQuantity = cart.reduce((sum, item) => sum + (item.quantity || 0), 0);
    return totalQuantity;

}





