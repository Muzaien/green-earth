
const categoriesContainer = document.getElementById("categoriesContainer");
const treesContainer = document.getElementById("treesContainer");
const loadingSpinner = document.getElementById("loadingSpinner");
const allTreesbtn = document.getElementById("allTreesbtn");

const treeDetailsModal = document.getElementById("tree-details-modal");
const modalImage = document.getElementById("modalImage");
const modalCategory = document.getElementById("modalCategory");
const modalDescription = document.getElementById("modalDescription");
const modalPrice = document.getElementById("modalPrice");
const modalTitle = document.getElementById("modalTitle");

let cart = [];

const cartContainer = document.getElementById("cartContainer");
const totalPrice = document.getElementById("totalPrice");


function showLoading() {
    loadingSpinner.classList.remove("hidden");
    treesContainer.innerHTML = "";
}

function hideLoading() {
    loadingSpinner.classList.add("hidden");
}


async function loadCategories() {
    const res = await fetch(
        "https://openapi.programming-hero.com/api/categories"
    );

    const data = await res.json();

    data.categories.forEach((category) => {
        const btn = document.createElement("button");

        btn.className = "btn btn-outline w-full";
        btn.textContent = category.category_name;

        btn.onclick = () => selectCategory(category.id, btn);

        categoriesContainer.appendChild(btn);
    });
}


function updateActiveButton(activeBtn) {
    const allButtons = document.querySelectorAll(
        "#categoriesContainer button, #allTreesbtn"
    );

    allButtons.forEach((button) => {
        button.classList.remove("btn-primary");
        button.classList.add("btn-outline");
    });

    activeBtn.classList.add("btn-primary");
    activeBtn.classList.remove("btn-outline");
}


async function selectCategory(categoryId, btn) {
    showLoading();
    updateActiveButton(btn);

    const res = await fetch(
        `https://openapi.programming-hero.com/api/category/${categoryId}`
    );

    const data = await res.json();

    displayTrees(data.plants);

    hideLoading();
}


allTreesbtn.addEventListener("click", () => {
    updateActiveButton(allTreesbtn);
    loadTrees();
});


async function loadTrees() {
    showLoading();

    const res = await fetch(
        "https://openapi.programming-hero.com/api/plants"
    );

    const data = await res.json();

    displayTrees(data.plants);

    hideLoading();
}


function displayTrees(trees) {
    treesContainer.innerHTML = "";

    trees.forEach((tree) => {
        const card = document.createElement("div");

        card.className = "card bg-white shadow-sm";

        card.innerHTML = `
            <figure>
                <img
                    src="${tree.image}"
                    alt="${tree.name}"
                    title="${tree.name}"
                    class="h-48 w-full object-cover hover: cursor-pointer"
                    onclick="openTreeModal(${tree.id})"
                />
            </figure>

            <div class="card-body">
                <h2
                    class="card-title cursor-pointer hover:text-[#4ade80]"
                    onclick="openTreeModal(${tree.id})"
                >
                    ${tree.name}
                </h2>

                <p class="line-clamp-2">
                    ${tree.description}
                </p>

                <div class="flex justify-between items-center">
                    <div class="badge badge-success badge-outline">
                        ${tree.category}
                    </div>

                    <h2 class="font-bold text-xl text-[#5fd38a]">
                        ${tree.price}
                    </h2>
                </div>

               <button
                 class="btn btn-primary bg-[#4ade80]"
                 onclick="addToCart(${tree.id}, '${tree.name}', ${tree.price})">
                 Cart
               </button>
            </div>
        `;

        treesContainer.appendChild(card);
    });
}


// Tree details modal
async function openTreeModal(treeId) {

    console.log(treeId, "treeId");

    const res = await fetch(
        `https://openapi.programming-hero.com/api/plant/${treeId}`
    );

    const data = await res.json();

    const plantDetails = data.plants;

    console.log(plantDetails, "plant details");



    modalTitle.textContent = plantDetails.name;
    modalImage.src = plantDetails.image;
    modalImage.alt = plantDetails.name;
    modalCategory.textContent = plantDetails.category;
    modalDescription.textContent = plantDetails.description;
    modalPrice.textContent = plantDetails.price;
    treeDetailsModal.showModal();
}



function addToCart(id, name, price) {
    const existingItem = cart.find(item => item.id === id);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id,
            name,
            price,
            quantity: 1
        });
    }

    updateCart();
}

function updateCart() {
    cartContainer.innerHTML = "";

    let total = 0;

    cart.forEach(item => {
        total += item.price * item.quantity;

        const cartItem = document.createElement("div");

        cartItem.className = "card card-body bg-slate-100 font-semibold";

        cartItem.innerHTML = `
            <div class="flex justify-between items-center">
                <div>
                    <h2>${item.name}</h2>
                    <p>$${item.price} x ${item.quantity}</p>
                </div>

                <button
                    class="btn btn-ghost"
                    onclick="removeFromCart(${item.id})"
                >
                    X
                </button>

                <p class="text-right font-semibold text-xl">
                    $${item.price * item.quantity}
                </p>
            </div>
        `;

        cartContainer.appendChild(cartItem);
    });

    totalPrice.innerText = `$${total}`;
}

function removeFromCart(treeId) {
    cart = cart.filter(item => item.id !== treeId);

    updateCart();
}

loadCategories();
loadTrees();
