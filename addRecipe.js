export function addFunctionalitySearch() {
    document.getElementById('addRecipeForm').addEventListener('submit', function (event) {
        event.preventDefault();

        const recipeName = document.getElementById('recipeName').value;
        const recipeIngredients = document.getElementById('recipeIngredients').value;
        const recipeDescription = document.getElementById('recipeDescription').value;
        let ingredientsArray = recipeIngredients.split(/,/);
        const regex = /\S[^:]+:\s\d+\s(грамм|шт)/g;
        const matches = []
        for (let i of ingredientsArray){
            const obj = i.match(regex)
            if (obj){
                matches.push(obj[0])
            }
        }
        if (!matches || ingredientsArray.length !== matches.length) {
            const notification = document.getElementById('notification');
            notification.textContent = "данные неправильного формата"
            notification.style.backgroundColor = "red"
            notification.classList.toggle('show');

            // автоматическое скрытие уведомления через 3 секунды
            setTimeout(() => {
                notification.classList.remove('show');
            }, 3000);
            return
        }
        let ingredients = []
        for (let ingredient of matches) {
            let str = ingredient.split(":")
            let count = Number(str[1].split(" ")[1])
            let measure = str[1].split(" ")[2]
            ingredients.push({name: str[0], count: count, measure: measure})
        }
        let recipes = JSON.parse(localStorage.getItem('recipes')) || []
        console.log(recipes)
        recipes.push({
            name: recipeName,
            recipeDescription: recipeDescription,
            recipeIngredients: ingredients,
            mark: 0,
            countMarks: 0
        })

        localStorage.setItem('recipes', JSON.stringify(recipes));
        const notification = document.getElementById('notification');
        notification.textContent = "Рецепт сохранен"
        notification.style.backgroundColor = "green"
        notification.classList.toggle('show');

        // автоматическое скрытие уведомления через 3 секунды
        setTimeout(() => {
            notification.classList.remove('show');
        }, 3000);
    });
}