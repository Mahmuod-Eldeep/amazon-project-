function Cart(localStorageKey) {
 
const cart = {
    cartItems: undefined,

    loadFromStorage: function () {
        this.cartItems = JSON.parse(localStorage.getItem(localStorageKey));

        if (!this.cartItems) {
            this.cartItems = [{
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
    },

    saveToCart() {
        localStorage.setItem(localStorageKey, JSON.stringify(this.cartItems));
    },


    addToCart(productId, selectedQuantity) {

        const matchingItem = this.cartItems.find(cartItem => cartItem.productId === productId);

        if (matchingItem) {
            matchingItem.quantity += selectedQuantity
        } else {

            this.cartItems.push({
                productId: productId,
                quantity: selectedQuantity,
                deliveryOptionsId: '1'
            });
        }
        this.saveToCart();
    },


    removeFromCart(productId) {
        const newCart = [];
        this.cartItems.forEach((cartItem) => {

            if (cartItem.productId !== productId) {
                newCart.push(cartItem);
            }
        });

        this.cartItems = newCart;
        // cart = cart.filter(product => product.productId !== productId); the same thing 
        this.saveToCart();
    },




    updateDeliveryOpyion(productId, deliveryOptionId) {
        const matchingItem = this.cartItems.find(cartItem => cartItem.productId === productId);

        matchingItem.deliveryOptionsId = deliveryOptionId;
        saveToCart();
        // let matchingItem;
        // cart.forEach((cartItem) => {
        //     if (productId === cartItem.productId) {
        //         matchingItem = cartItem;
        //     }
        // });
        // matchingItem.deliveryOptionsId = deliveryOptionId
        this.saveToCart();
    },

    updateQuantity(productId, selectedQuantity) {

        const matchingItem = this.cartItems.find(cartItem => cartItem.productId === productId);
    
        matchingItem.quantity = selectedQuantity
    
        this.csaveToCart();
    
    },
    

     showAddMessage(addedToCartMessage) {
        if (addedToCartMessage.timeoutId) {
            clearTimeout(addedToCartMessage.timeoutId);
        }
        addedToCartMessage.style.opacity = 1;
        addedToCartMessage.timeoutId = setTimeout(() => {
            addedToCartMessage.style.opacity = 0;
        }, 1500);
    
    },

     updateCheckoutQuantity() {
        const totalQuantity = this.cartItems.reduce((sum, item) => sum + (item.quantity || 0), 0);
        return totalQuantity;
    }

};
return cart;
}

const cart = Cart('cart-opp');
const businessCart = Cart('business-cart-oop');



cart.loadFromStorage();
businessCart.loadFromStorage();


console.log(cart);
console.log(businessCart);




