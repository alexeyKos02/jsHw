import {appRecipe} from "./app.js";
import {deepEqual, renderMainPage} from "./commonFunctions.js";

export function addProductPage(product) {
    let mark = 0
    let m = [1, 2, 3, 4, 5]
    const mainPage = document.getElementById("mainPage")
    renderProductPage()

    function addDeleteRecipeButton() {
        const btn = document.getElementById("delete-btn-product-page")
        let newRecipes
        btn.addEventListener('click', () => {
            let recipes = JSON.parse(localStorage.getItem("recipes"))
            newRecipes = recipes.filter(recipe => !deepEqual(recipe, product))
            localStorage.setItem("recipes", JSON.stringify(newRecipes))
            renderMainPage()
        })
    }
    function addCloseButtonFunc() {
        const closeBtn = document.getElementById("goBackButton")
        closeBtn.addEventListener('click', () => {
            const ratingPlace = document.getElementById("ratingPlace")
            let children = ratingPlace.childNodes;
            for (let star2 of children) {
                if (star2.innerHTML === "&#9733;") {
                    mark += 1
                }
            }
            renderMainPage()
            if (mark) {
                changeMark(product, mark)
            }
        })
    }

    function addStarsFunc() {
        const ratingPlace = document.getElementById("ratingPlace")
        let children = ratingPlace.childNodes;
        let i = 1
        for (let star of children) {
            let number = i
            star.addEventListener('click', () => {
                const ratingPlace = document.getElementById("ratingPlace")
                let children = ratingPlace.childNodes;
                let second = 1
                for (let star2 of children) {
                    if (second <= number) {
                        star2.innerHTML = "&#9733;"
                    } else {
                        star2.innerHTML = "&#9734;"
                    }
                    second++
                }
            })
            i++
        }
    }

    function renderProductPage() {
        mainPage.innerHTML = ""
        mainPage.innerHTML = ` <div class="product">
  <button id="goBackButton">&#8592;</button>
    <h1>${product.name}</h1>
    <p>${product.recipeDescription}</p>
    <p>${product.recipeIngredients}</p>
    <div class="rating" id="ratingPlace">
    </div>
    <button class="delete-btn" id="delete-btn-product-page">Удалить рецепт</button>
  </div>`
        const ratingPlace = document.getElementById("ratingPlace")
        for (let indx of m) {
            if (indx <= product.mark) {
                ratingPlace.innerHTML += ` <span class="star">&#9733;</span>`
            } else {
                ratingPlace.innerHTML += ` <span class="star">&#9734;</span>`
            }
        }
        addStarsFunc()
        addDeleteRecipeButton()
        addCloseButtonFunc()
    }
}

function changeMark(product, mark) {
    let recipes = JSON.parse(localStorage.getItem("recipes"))
    for (let i = 0; i < recipes.length; i++) {
        if (deepEqual(product, recipes[i])) {
            let ans = (product.mark * product.countMarks + mark) / (product.countMarks + 1)
            recipes[i].mark = ans;
            recipes[i].countMarks = recipes[i].countMarks + 1
        }
    }
    localStorage.setItem("recipes", JSON.stringify(recipes))
}
