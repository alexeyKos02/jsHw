import {renderMainPage} from "./commonFunctions.js";

export function addMenuPage(recipes) {
    renderMenuPage(recipes)
}

function renderMenuPage(recipes) {
    const main = document.getElementById("mainPage")
    main.innerHTML = `<div class="product"><button id="goBackButton">&#8592;</button>
<h1>Список рецептов и продуктов</h1>
    <div>
        <h2>Рецепты</h2>
        <ul id="recipes">
<!--            <li id="tomatoSoup">Томатный суп</li>-->
<!--            <li id="chocolateCake">Шоколадный кекс</li>-->
        </ul>
    </div>
    <div>
        <h2>Необходимые продукты:</h2>
        <ul id="ingredients"></ul>
    </div></div>`
    const recipesList = document.getElementById("recipes")
    const productsMenu = new Map()
    for (let recipe of recipes) {
        const recipeElement = document.createElement("li")
        recipeElement.textContent = recipe.name
        recipesList.appendChild(recipeElement)
        for (let elem of recipe.recipeIngredients) {
            if (!productsMenu.has(elem.name)) {
                let count = {gram: 0, number: 0}
                productsMenu.set(elem.name, count)
            }
            let count = productsMenu.get(elem.name)
            if (elem.measure === "грамм") {
                count.gram = count.gram + elem.count
            } else {
                count.number = count.number + elem.count
            }
            productsMenu.set(elem.name, count)
        }
    }
    const ingredientsList = document.getElementById("ingredients")
    for (let ingredient of productsMenu.keys()) {
        const ingredientElem = document.createElement("li")
        if (productsMenu.get(ingredient).number !== 0 && productsMenu.get(ingredient).gram !== 0) {
            ingredientElem.textContent = `${ingredient}: ${productsMenu.get(ingredient).gram} грамм и ${productsMenu.get(ingredient).number} штук`
        } else if (productsMenu.get(ingredient).number !== 0) {
            ingredientElem.textContent = `${ingredient}: ${productsMenu.get(ingredient).number} штук`
        } else {
            ingredientElem.textContent = `${ingredient}: ${productsMenu.get(ingredient).gram} грамм`
        }
        ingredientsList.appendChild(ingredientElem)
    }
    addCloseButtonFunc()
}
function addCloseButtonFunc() {
    const closeBtn = document.getElementById("goBackButton")
    closeBtn.addEventListener('click', () => {
        renderMainPage()
    })
}
function showIngredients(recipe) {
    const recipes = {
        tomatoSoup: ['Томаты - 500г', 'Лук - 1 шт.', 'Чеснок - 2 зубчика', 'Овощной бульон - 500мл', 'Соль, перец - по вкусу'],
        chocolateCake: ['Мука - 200г', 'Шоколад - 100г', 'Сахар - 150г', 'Яйца - 3 шт.', 'Масло сливочное - 100г']
    };
    const ingredientsList = document.getElementById('ingredients');
    ingredientsList.innerHTML = '';  // Очищаем предыдущие продукты

    for (let ingredient of recipes[recipe]) {
        const li = document.createElement('li');
        li.textContent = ingredient;
        ingredientsList.appendChild(li);
    }
}