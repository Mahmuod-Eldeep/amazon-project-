export let cart = [{
    productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
    quantity: 2,
},
{
    productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
    quantity: 1,
}
];





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

export function removeFromCart(productId) {
    const newCart = [];
    cart.forEach((cartItem) => {
        if (cartItem.productId !== productId) {
            newCart.push(cartItem);
        }
    });

    cart = newCart;
    // cart = cart.filter(product => product.productId !== productId); the same thing 
    console.log(cart);

}



