export let cart = JSON.parse(localStorage.getItem('cart'));


if (!cart) {
    cart = [{
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 2,
    }]
}


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
export function updateQuantity(productId, selectedQuantity) {

    const matchingItem = cart.find(cartItem => cartItem.productId === productId);

    matchingItem.quantity = selectedQuantity

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





