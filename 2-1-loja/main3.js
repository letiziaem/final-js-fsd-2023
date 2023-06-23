// Obter o produto e preencher a página com seus elementos:

const getProduct = async () => {
    const request = await fetch("https://fakestoreapi.com/products/15");
    const product = await request.json();

    const newProduct = document.getElementById("new_product");
    newProduct.innerHTML = 
    `<div class="product__images col-lg-8">
            <div class="product__images__thumbnail">
                <img src="${product.image}" alt="">
            </div>
            <div class="product__images__others">
                <img src="" alt="">
                <img src="" alt="">
                <img src="" alt="">
                <img src="" alt="">
                <img src="" alt="">
            </div>
        </div>
        <div class="product__description col-lg-4">
            <div class="product__description__title">
                <p class="mediumtext">${product.title}</p>
                <p class="body_2">${product.price}€ + Free Shipping</p>
            </div>
            <div class="product__description__color">
                <p class="text">${product.description}</p>
            </div>
            <div class="product__description__upgrade">
                <p class="text bold">Category:</p>
                <p class="product__description__upgrade__text text">${product.category}</p>
            </div>
            <div class="product__description__btn">
                <button id="button_cart" class="button text">ADD TO CART</button>
            </div>
        </div>`;

    return product;
};

const product = getProduct();


// Botão add to cart envia infos do produto:

setInterval(() => {
    const cartButton = document.getElementById("button_cart");
    cartButton.addEventListener("click", function(event) {
    event.preventDefault();

    const userIdNumber = Math.floor(Math.random() * 20) + 1;
    
    const todayDate = new Date();

    const productIdNumber = Math.floor(Math.random() * 10) + 1;

    const quantityNumber = Math.floor(Math.random() * 5) + 1;

    const cartInfo = {
        userId: userIdNumber,
        date: todayDate,
        products: [{
            productId: productIdNumber,
            quantity: quantityNumber
        }]
    };

    console.log(cartInfo);

    fetch("https://fakestoreapi.com/carts/7", {
        method: 'UPDATE',
        body: JSON.stringify(cartInfo) 
    })
    .then((response) => response.json());
    });
}, 1500)
    

// Listar 3 produtos relacionados:

const getRecommendedProducts = async () => {
    const request = await fetch('https://fakestoreapi.com/products/');
    const recommendedProducts = await request.json();

    const newRecommendedProduct = document.getElementById("recommended_products");
    newRecommendedProduct.innerHTML = "";
    
    for (let i = 15; i < 18; i++) {
        newRecommendedProduct.innerHTML += 
        `<div class="col-lg-4">
            <div class="seating__thumbnail">
                <a href="nomadsofa.html?produtoId=${recommendedProducts[i].id}">
                    <img class="seating__thumbnail__img" src="${recommendedProducts[i].image}" alt="">
                </a>
                <p class="seating__thumbnail__text text bold">${recommendedProducts[i].title}</p>
                <p class="seating__thumbnail__text label">${recommendedProducts[i].price}€</p>
            </div>
        </div>`;
    };

    return newRecommendedProduct;
};

getRecommendedProducts();