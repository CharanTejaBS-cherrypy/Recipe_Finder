function showCustomAlert(message) {
    const alertBox = document.createElement('div');
    alertBox.classList.add('alert');
    alertBox.textContent = message;
    document.body.appendChild(alertBox);
    alertBox.style.display = 'block';

    // Remove the alert after 3 seconds
    setTimeout(() => {
        alertBox.style.display = 'none';
        alertBox.remove();
    }, 3000);
}

document.getElementById('search-btn').addEventListener('click', async () => {
    const ingredients = document.getElementById('ingredients').value;
    const recipesDiv = document.getElementById('recipes');
    recipesDiv.innerHTML = ''; // Clear previous results

    if (!ingredients) {
        showCustomAlert('Please enter at least one ingredient.');
        return;
    }

    const apiKey = 'b8c907403bf94ad4be04c7f8a4f02637'; // Replace with your actual API key
    const response = await fetch(`https://api.spoonacular.com/recipes/findByIngredients?ingredients=${encodeURIComponent(ingredients)}&number=5&apiKey=${apiKey}`);

    if (response.ok) {
        const recipes = await response.json();
        if (recipes.length === 0) {
            recipesDiv.innerHTML = '<p class="p">No recipes found.</p>';
            return;
        }

        recipes.forEach(recipe => {
            const recipeDiv = document.createElement('div');
            recipeDiv.className = 'recipe';
            recipeDiv.innerHTML = `
                <h3>${recipe.title}</h3>
                <img src="${recipe.image}" alt="${recipe.title}">
                <p>Used Ingredients: ${recipe.usedIngredientCount} / ${recipe.missedIngredientCount + recipe.usedIngredientCount}</p>
                <a href="https://spoonacular.com/recipes/${recipe.title.replace(/\s+/g, '-').toLowerCase()}-${recipe.id}" target="_blank" class="btn">View Recipe</a>
            `;
            recipesDiv.appendChild(recipeDiv);
        });
    } else {
        showCustomAlert('Error fetching recipes. Please try again later.');
    }
});
