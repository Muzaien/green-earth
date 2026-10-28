console.log("hello");

const categoriesContainer = document.getElementById("categoriesContainer");
const treesContainer = document.getElementById("treesContainer")


async function loadCategories() {
    const res = await fetch("https://openapi.programming-hero.com/api/categories",);
    const data = await res.json();
    console.log(data);
    console.log(categoriesContainer);
    data.categories.forEach((category) => {
        console.log(category);
        const btn = document.createElement("button");
        btn.className = "btn btn-outline w-full";
        btn.textContent = category.category_name;
        categoriesContainer.appendChild(btn);

    });


}

async function loadTrees() {
    const res = await fetch("https://openapi.programming-hero.com/api/plants");

    const data = await res.json();
    console.log(data);
    displayTrees(data.plants);


}


function displayTrees(trees) {
    console.log(trees);
    trees.forEach(tree => {
        console.log(tree);
        const card = document.createElement("div")
        card.className = "card bg-white shadow-sm";
        card.innerHTML = ` <figure>
                <img src= "${tree.image}"
                    alt="${tree.name}"
                    title ="${tree.name}"
                    class = "h-48 w-full object-cover"
                    />}
            </figure>
            <div class="card-body">
                <h2 class="card-title">${tree.name}</h2>
                <p class="line-clamp-2">A fast-growing tropical tree that produces delicious, juicy mangoes
                    during summer. Its dense green</p>
                <div class="flex justify-between">

                    <div class="badge badge-success badge-outline ">${tree.category}</div>
                    <h2 class="font-bold text-xl text-[#5fd38a]">${tree.price}</h2>

                </div>
                <button class="btn btn-primary bg-[#4ade80]">Cart</button>
            </div>`
            treesContainer.appendChild(card);
        
    });

}

loadCategories();
loadTrees();



