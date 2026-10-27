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


function displayTrees( trees){
    console.log(trees);
    trees.forEach(tree) => {
        console.log(tree);
    });

}

loadCategories();
loadTrees();



