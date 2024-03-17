import {addFunctionalitySearch} from "./addRecipe.js";
import {addSearchFilter} from "./searchRecipe.js";
import {addMenuFunc} from "./createMenu.js";
import {addAlert} from "./commonFunctions.js";

export function appRecipe() {
    addAlert()
    const searchRecipeBtn = document.getElementById('searchRecipeBtn');
    const addRecipeBtn = document.getElementById('addRecipeBtn');
    const menuPlanningBtn = document.getElementById('menuPlanningBtn');

    const searchRecipeForm = document.getElementById('searchRecipeForm');
    const addRecipeForm = document.getElementById('addRecipeForm');
    const menuPlanningForm = document.getElementById('menuPlanningForm');

    searchRecipeBtn.addEventListener('click', function() {
        searchRecipeForm.classList.toggle('hidden');
        addRecipeForm.classList.add('hidden');
        menuPlanningForm.classList.add('hidden');
    });

    addRecipeBtn.addEventListener('click', function() {
        searchRecipeForm.classList.add('hidden');
        addRecipeForm.classList.toggle('hidden');
        menuPlanningForm.classList.add('hidden');
    });

    menuPlanningBtn.addEventListener('click', function() {
        searchRecipeForm.classList.add('hidden');
        addRecipeForm.classList.add('hidden');
        menuPlanningForm.classList.toggle('hidden');
    });
    addFunctionalitySearch()
    addSearchFilter()
    addMenuFunc()
}
appRecipe()