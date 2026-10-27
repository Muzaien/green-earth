console.log("hello");

const categoriesContainer = document.getElementById("categoriesContainer");


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
    // categoriesContainer.innerHTML= "button gula asbe"

}

loadCategories();
