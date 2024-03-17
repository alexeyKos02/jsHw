import {appRecipe} from "./app.js";

export function renderMainPage() {
    const mainPage = document.getElementById("mainPage")
    mainPage.innerHTML = `<h1>Приложение для рецептов</h1>
    <div class="buttonPlace">
        <button id="searchRecipeBtn">Поиск рецепта</button>
        <button id="addRecipeBtn">Добавить рецепт</button>
        <button id="menuPlanningBtn">Формирование меню</button>
    </div>

    <div id="searchRecipeForm" class="hidden">
        <h1>Форма поиска меню</h1>

        <form id="searchMenuForm">
            <label for="searchMenuInput">Введите блюдо для поиска:</label>
            <input type="text" id="searchMenuInput" placeholder="Например: салат, паста...">
        </form>
        <label for="menuList">Результаты поиска:</label>
        <div id="menuList">
        </div>
    </div>

    <div id="addRecipeForm" class="hidden">
        <h1>Форма добавления рецепта</h1>

        <form id="addRecipeFormChildren">
            <label for="recipeName">Название рецепта:</label>
            <input type="text" id="recipeName" required>

            <label for="recipeIngredients">Ингредиенты:</label>
            <textarea id="recipeIngredients" rows="4" required></textarea>

            <label for="recipeDescription">Описание:</label>
            <textarea id="recipeDescription" rows="6" required></textarea>

            <button type="submit">Добавить рецепт</button>
        </form>
    </div>

    <div id="menuPlanningForm" class="hidden">
        <h1>Планирование меню</h1>

        <form id="searchRecipeFormMenu">
            <label for="searchRecipeInput">Найти рецепт:</label>
            <input type="text" id="searchRecipeInput" placeholder="Введите блюдо">
            <button id="searchRecipeBtnMenu">Найти</button>

            <div id="recipeList"></div>
        </form>

        <div id="selectedRecipes">
            <h2>Выбранные рецепты:</h2>
            <ul id="selectedRecipesList"></ul>
            <button id="generateListBtn" disabled>Сформировать список покупок</button>
        </div>

    </div>`
    appRecipe()
}

export function addAlert() {
    const mainPage = document.getElementById("mainPage")
    mainPage.innerHTML += `<div id="notification" class="hide">Это уведомление!</div>`
}
export function deepEqual(obj1, obj2) {
    if (obj1 === obj2) {
        return true;
    }

    if (obj1 == null || typeof obj1 != "object" ||
        obj2 == null || typeof obj2 != "object") {
        return false;
    }

    let keys1 = Object.keys(obj1), keys2 = Object.keys(obj2);

    if (keys1.length !== keys2.length) {
        return false;
    }

    for (let key of keys1) {
        if (!keys2.includes(key) || !deepEqual(obj1[key], obj2[key])) {
            return false;
        }
    }

    return true;
}