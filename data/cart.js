export let cart = JSON.parse(localStorage.getItem('cart'));


if (!cart) {
    cart = [{
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 2,
        deliveryOptionsId: '1'
    },
    {
        productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
        quantity: 2,
        deliveryOptionsId: '2'
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
            deliveryOptionsId: '1'
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





export function updateDeliveryOpyion(productId, deliveryOptionId) {
    const matchingItem = cart.find(cartItem => cartItem.productId === productId);

    matchingItem.deliveryOptionsId = deliveryOptionId;
    saveToCart();
    // let matchingItem;
    // cart.forEach((cartItem) => {
    //     if (productId === cartItem.productId) {
    //         matchingItem = cartItem;
    //     }
    // });
    // matchingItem.deliveryOptionsId = deliveryOptionId
    // saveToCart();
}