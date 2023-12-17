let spinnerElement = document.getElementById("spinner");
let displayResponseContainer = document.getElementById("resultProducts");
let inputElement = document.getElementById("searchInput");
let searchInput = "";
let productList = []

function createProductCard(item) {
    const {
        productImage,
        productBadge,
        productTitle,
        productVariants
    } = item;
    let cardContainer = document.createElement("div");
    cardContainer.classList.add("card-container-element");

    let imageContainer = document.createElement("div");

    let button = document.createElement("button");
    button.textContent = productBadge;
    button.classList.add("new-button");
    productBadge !== undefined && imageContainer.appendChild(button);

    let imageElement = document.createElement("img");
    imageElement.src = productImage;
    imageElement.alt = "product-img";
    imageElement.classList.add("product-img");
    imageContainer.appendChild(imageElement);

    cardContainer.appendChild(imageContainer);

    let detailsContainer = document.createElement("div");
    detailsContainer.classList.add("details-container");

    let title = document.createElement("p");
    title.textContent = productTitle;
    title.classList.add("title");
    detailsContainer.appendChild(title);

    let sizeContainer = document.createElement("ul");
    sizeContainer.classList.add("size-container");

    let varient1 = document.createElement("li");
    varient1.textContent = productVariants[0].v1;
    sizeContainer.appendChild(varient1);

    let varient2 = document.createElement("li");
    varient2.textContent = productVariants[1].v2;
    sizeContainer.appendChild(varient2);

    let varient3 = document.createElement("li");
    varient3.textContent = productVariants[2].v3;
    sizeContainer.appendChild(varient3);
    detailsContainer.appendChild(sizeContainer);

    cardContainer.appendChild(detailsContainer);
    displayResponseContainer.appendChild(cardContainer);

}

function highlightedCardAppend(item) {
    const {
        productImage,
        productBadge,
        productTitle,
        productVariants
    } = item;
    let cardContainer = document.createElement("div");
    cardContainer.classList.add("card-container-element");

    let imageContainer = document.createElement("div");

    let button = document.createElement("button");
    button.textContent = productBadge;
    button.classList.add("new-button");
    productBadge !== undefined && imageContainer.appendChild(button);

    let imageElement = document.createElement("img");
    imageElement.src = productImage;
    imageElement.classList.add("product-img");
    imageContainer.appendChild(imageElement);

    cardContainer.appendChild(imageContainer);

    let detailsContainer = document.createElement("div");
    detailsContainer.classList.add("details-container");

    let title = document.createElement("p");
    title.textContent = productTitle;
    title.classList.add("title");
    detailsContainer.appendChild(title);

    let sizeContainer = document.createElement("ul");
    sizeContainer.classList.add("size-container");

    let varient1 = document.createElement("li");
    varient1.textContent = productVariants[0].v1;
    varient1.classList.toggle("highlight-size");
    sizeContainer.appendChild(varient1);

    let varient2 = document.createElement("li");
    varient2.textContent = productVariants[1].v2;
    varient2.classList.toggle("highlight-size");
    sizeContainer.appendChild(varient2);

    let varient3 = document.createElement("li");
    varient3.textContent = productVariants[2].v3;
    varient3.classList.toggle("highlight-size");
    sizeContainer.appendChild(varient3);
    detailsContainer.appendChild(sizeContainer);

    cardContainer.appendChild(detailsContainer);
    displayResponseContainer.appendChild(cardContainer);

}

function getResponseResults() {
    for (let item of productList) {
        let color = item.productVariants[0].v1;
        if (color.includes(searchInput)) {
            highlightedCardAppend(item);
        }
        createProductCard(item);
    }
}

const responseDetails = async () => {
    spinnerElement.classList.toggle("d-none");
    const url = "https://products-api-2ttf.onrender.com/api/products";
    const options = {
        method: "GET"
    };
    const response = await fetch(url, options);
    spinnerElement.classList.toggle("d-none");
    const dataObj = await response.json();
    const updateData = dataObj.data.map(eachItem => ({
        productImage: eachItem.product_image,
        productBadge: eachItem.product_badge,
        productTitle: eachItem.product_title,
        productVariants: eachItem.product_variants
    }));
    productList = updateData;
    getResponseResults();
}

responseDetails();

function getSearchResults(event) {
    if (event.key === "Enter") {
        searchInput = event.target.value;
        responseDetails();
        searchInput = "";
    }
    console.log(searchInput);

}

inputElement.addEventListener("keydown", getSearchResults);