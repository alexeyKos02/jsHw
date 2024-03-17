import {addMenuPage} from "./addMenuPage.js";
import {deepEqual} from "./commonFunctions.js";

export function addMenuFunc() {
    const searchRecipeInput = document.getElementById('searchRecipeInput');
    const searchRecipeBtn = document.getElementById('searchRecipeBtnMenu');
    const recipeList = document.getElementById('recipeList');
    const selectedRecipesList = document.getElementById('selectedRecipesList');
    const generateListBtn = document.getElementById('generateListBtn');
    let selectedRecipes = new Map();
    firstRender()
    searchRecipeBtn.addEventListener('click', function (e) {
        e.preventDefault()
        let recipeName = searchRecipeInput.value;
        let recipes = JSON.parse(localStorage.getItem("recipes"))
        viewRecipes(recipeName, recipes)
    });
    generateListBtn.addEventListener('click', function () {
        let recipesAns = []
        for (let arrayByName of selectedRecipes.values()) {
            recipesAns = [...recipesAns, ...arrayByName]
        }
        addMenuPage(recipesAns)
        console.log(recipesAns)
        alert('Меню сформировано!');
    });

    function addRecipeInMenuSearch(recipe) {
        let newRecipeItem = document.createElement('div');
        newRecipeItem.textContent = recipe.name;
        newRecipeItem.addEventListener('click', function () {
            let sumCount = 0
            for (let name of selectedRecipes.values()) {
                sumCount += name.length
            }
            if (sumCount < 5) {
                if (selectedRecipes.has(recipe.name)) {
                    let ar = selectedRecipes.get(recipe.name)
                    ar.push(recipe)
                    selectedRecipes.set(recipe.name, ar)
                } else {
                    selectedRecipes.set(recipe.name, [recipe])
                }
                let recipeInMenu = document.createElement("div")
                recipeInMenu.classList.add("addedMenuObj")
                let selectedRecipeItem = document.createElement('li');
                selectedRecipeItem.textContent = recipe.name;
                let deleteButton = document.createElement('button')
                deleteButton.textContent = ' ✖️'
                deleteButton.addEventListener('click', (e) => {
                    let ans = []
                    const array = selectedRecipes.get(recipe.name)
                    let found = false
                    for (let i = 0; i < array.length; i++) {
                        if (deepEqual(recipe, array[i])) {
                            if (found) {
                                ans.push(array[i])
                            } else {
                                found = true
                            }
                        } else {
                            ans.push(array[i])
                        }
                    }
                    selectedRecipes.set(recipe.name, ans)
                    sumCount = 0
                    for (let count of selectedRecipes.values()) {
                        sumCount += count.length
                    }
                    generateListBtn.disabled = sumCount < 5;
                    e.target.parentNode.remove()
                })
                recipeInMenu.appendChild(selectedRecipeItem)
                recipeInMenu.appendChild(deleteButton);
                selectedRecipesList.appendChild(recipeInMenu)
            }
            sumCount = 0
            for (let count of selectedRecipes.values()) {
                sumCount += count.length
            }
            generateListBtn.disabled = sumCount < 5;
        });
        recipeList.appendChild(newRecipeItem);
    }

    function viewRecipes(searchValue, recipes) {
        const menuList = document.getElementById('recipeList');
        menuList.innerHTML = ""
        if (!searchValue) {
            for (let recipe of recipes) {
                addRecipeInMenuSearch(recipe)
            }
        } else {
            let sortRecipesArray = sortRecipes(searchValue, recipes)
            for (let recipe of sortRecipesArray) {
                addRecipeInMenuSearch(recipe)
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
        const targetNode = document.getElementById('menuPlanningForm');
        observer.observe(targetNode, config);
    }

}

function sortRecipes(searchValue, recipes) {
    return recipes.filter(recipe => recipe.name.toLowerCase().includes(searchValue.toLowerCase()))
}