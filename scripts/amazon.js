


let productsHtml = '';

products.forEach((product) => {
    productsHtml += `
        <div class="product-container">
            <div class="product-image-container">
            <img class="product-image" src="${product.image}">
            </div>

            <div class="product-name limit-text-to-2-lines">
           ${product.name}
            </div>

            <div class="product-rating-container">
            <img class="product-rating-stars" src="images/ratings/rating-${product.rating.stars * 10}.png">
            <div class="product-rating-count link-primary">
              ${product.rating.count}
            </div>
            </div>

            <div class="product-price">
            $${(product.priceCents / 100).toFixed(2)}
            </div>

            <div class="product-quantity-container">
            <select class="js-quantity-selector" data-select-id =${product}>
                <option selected value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
                
            </select>
            </div>

            <div class="product-spacer"></div>

            <div class="added-to-cart">
            <img src="images/icons/checkmark.png">
            Added
            </div>

            <button class="add-to-cart-button button-primary js-add-to-cart"
             data-product-id=" ${product.id}">
           
            Add to Cart
            </button>
        </div>
    `;
});

const gridElement = document.querySelector('.js-products-grid');
gridElement.innerHTML = productsHtml;



const selectElement = document.querySelector('.js-quantity-selector');

let timeoutId;
let cartQuantity = 0;

document.querySelectorAll('.js-add-to-cart').forEach((button) => {

    button.addEventListener('click', () => {

        const productContainer = button.closest('.product-container');
        const quantitySelect = productContainer.querySelector('.js-quantity-selector');
        const addedToCartMessage = productContainer.querySelector('.added-to-cart');
        const selectedQuantity = parseInt(quantitySelect.value, 10);



        if (addedToCartMessage.timeoutId) {
            clearTimeout(addedToCartMessage.timeoutId);
        }
        addedToCartMessage.style.opacity = 1;
        addedToCartMessage.timeoutId = setTimeout(() => {
            addedToCartMessage.style.opacity = 0;
        }, 1500);



        const { productId } = button.dataset;
        const matchingItem = cart.find(item => item.productId === productId);

        if (matchingItem) {
            matchingItem.quantity += selectedQuantity
        } else {

            cart.push({
                productId: productId,
                quantity: selectedQuantity,
            });
        }
        cartQuantity += selectedQuantity;

        document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;


    });
});

