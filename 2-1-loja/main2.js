// Listar produtos em grelha com links para a página dos produtos:

const getProducts = async () => {
    const request = await fetch("https://fakestoreapi.com/products/category/jewelery");
    const products = await request.json();

    const newProducts = document.getElementById("new_products");
    newProducts.innerHTML = "";

    products.forEach((product) => {
        newProducts.innerHTML += 
        `<div class="col-lg-6">
            <div class="seating__thumbnail">
                <a href="nomadsofa.html?produtoId=${product.id}">
                    <img class="seating__thumbnail__img" src="${product.image}" alt="">
                </a>
                <p class="seating__thumbnail__text text bold">${product.title}</p>
                <p class="seating__thumbnail__text label">${product.price}€</p>
            </div>
        </div>`
    });


    return products;
};

const products = getProducts();


// Adicionar campo de pesquisa:

const selectSection = document.getElementsByClassName("seating");

const newForm = document.createElement("form");


const newLabel = document.createElement("label");

const newLabelContent = document.createTextNode("Pesquisa: ")

const newInput = document.createElement("input");

const inputType = document.createAttribute("type");
inputType.value = "text";

newInput.setAttribute("id", "search_field");

newForm.append(newLabel);
newLabel.append(newLabelContent);
newForm.append(newInput);
newInput.setAttributeNode(inputType);
newForm.setAttribute("id", "search_form");

selectSection[0].insertAdjacentHTML('beforebegin', newForm.outerHTML);


// Pesquisar:

const searchField = document.getElementById("search_field");

 searchField.addEventListener("keyup", function (event) {
        const searchInput = event.target.value.toLowerCase();
        const results = [];
        
        const searchProducts = () => { 
            products.then((productsResults) => {
                for (let i = 0; i < productsResults.length; i++) {
                    let product = productsResults[i];       
                    if (product.title.toLowerCase().includes(searchInput)) {
                        results.push(product);
                    };
                };

                displayResults(results);
            }); 
        };

        searchProducts();
        
        const displayResults = (results) => {
            const resultProduct = document.getElementById("new_products");
            resultProduct.innerHTML = "";
        
            if (results.length > 0) {
                for (let i = 0; i < results.length; i++) {
                    let result = results[i];

                    let newProductItems = document.getElementById("new_products");
                    newProductItems.innerHTML += 
                    `<div class="col-lg-6">
                        <div class="seating__thumbnail">
                            <a href="nomadsofa.html?produtoId=${result.id}">
                                <img class="seating__thumbnail__img" src="${result.image}" alt="">
                            </a>
                            <p class="seating__thumbnail__text text bold">${result.title}</p>
                            <p class="seating__thumbnail__text label">${result.price}€</p>
                        </div>
                    </div>`
                };
            } else {
                let noResults = document.createElement("p");
                noResults.innerHTML = "No results found.";
                resultProduct.appendChild(noResults);
            };
        };
    });
