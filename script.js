
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

                <button class="btn btn-primary bg-[#4ade80]">
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


loadCategories();
loadTrees();
