import {addProductPage} from "./addProductPage.js";

export function addSearchFilter() {
    firstRender()
    console.log(document.getElementById('searchRecipeForm').classList)
    let recipes = JSON.parse(localStorage.getItem("recipes"))
    // viewRecipes("", recipes)
    // Добавьте обработчик события для формы поиска меню
    document.getElementById('searchMenuForm').addEventListener('submit', function (event) {
        event.preventDefault();
        const searchValue = document.getElementById('searchMenuInput').value;
        const menuList = document.getElementById('menuList');
        let recipes = JSON.parse(localStorage.getItem("recipes"))
        viewRecipes(searchValue, recipes)
    });
}

function viewRecipes(searchValue, recipes) {
    const menuList = document.getElementById('menuList');
    menuList.innerHTML = ""
    if (!searchValue) {
        for (let recipe of recipes) {
            const btn = document.createElement("button")
            btn.textContent = recipe.name
            btn.addEventListener('click', (e) => {
                e.preventDefault()
                addProductPage(recipe)
            })
            menuList.appendChild(btn)
        }
    } else {
        let sortRecipesArray = sortRecipes(searchValue, recipes)
        for (let recipe of sortRecipesArray) {
            const btn = document.createElement("button")
            btn.textContent = recipe.name
            btn.addEventListener('click', (e) => {
                e.preventDefault()
                addProductPage(recipe)
            })
            menuList.appendChild(btn)
        }
    }
}

function firstRender() {
    const callback = function (mutationsList, observer) {
        for (let mutation of mutationsList) {
            if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                if (mutation.target.className === "") {
                    let recipes = JSON.parse(localStorage.getItem("recipes"))
                    viewRecipes("", recipes)
                }
            }
        }
    };
    const observer = new MutationObserver(callback);
    const config = {attributes: true};
    const targetNode = document.getElementById('searchRecipeForm');
    observer.observe(targetNode, config);
}

function sortRecipes(searchValue, recipes) {
    return recipes.filter(recipe => recipe.name.toLowerCase().includes(searchValue.toLowerCase()))
}