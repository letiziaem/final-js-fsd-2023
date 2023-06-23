// Colocar um loading de 3 segundos na página:
const loading = document.getElementById("loading_container");

const displayLoading = () => {
    setTimeout(() => {
        loading.remove();
    }, 3000);
};


// Obter as categorias, aplicar no menu e na homepage:

const getCategories = async () => {
    displayLoading();
    const request = await fetch("https://fakestoreapi.com/products/categories");
    const categories = await request.json();

    const newCategories = document.getElementById("new_categories");
    newCategories.innerHTML = "";

    categories.forEach((category) => {
        newCategories.innerHTML += 
        `<div class="categories__col col-lg-6">
            <div class="categories__col__thumbnail">
                <a href="allseating.html">
                    <img src="assets/category-seating.webp" alt="">
                </a>
                <p class="categories__col__thumbnail__text label">${category}</p>
            </div>
        </div>`
    });

    let newMenu = document.getElementsByClassName("nav__menu__items");
    newMenu[0].innerHTML = "";

    categories.forEach((category) => {
        newMenu[0].innerHTML += 
        `<li class="nav__menu__items__list">
            <a class="nav__menu__items__list__name text" href="">${category}</a>
        </li>`
    });

    return categories;
};

getCategories();


// Recolher dados da newsletter:

const formNewsletter = document.getElementById("newsletter");
formNewsletter.addEventListener("submit", function(event) {
    event.preventDefault();

    const newsData = new FormData(event.target);

    const email = newsData.get("email");

    fetch("https://fakeNewsletter.com", {
        method: 'POST',
        body: JSON.stringify(email) 
    })
    .then((response) => response.json());
});


// Ano do copyright dinâmico:

const newCopyright = document.getElementsByClassName("smalltext");

newCopyright[0].innerHTML = 
`<p class="smalltext">2023 © copyright<br>
Terms - Accessibility - Sitemap - Privacy</p>`;