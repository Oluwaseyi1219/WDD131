// Recipe data for the Recipe Book application
export const recipes = [
    {
        id: 1,
        title: "Pasta Carbonara",
        description: "A classic Italian pasta dish made with eggs, cheese, pancetta, and black pepper. This creamy and flavorful dish is perfect for a quick weeknight dinner.",
        cookTime: "30 minutes",
        difficulty: "Easy",
        rating: 4,
        image: "images/pasta-carbonara.jpg",
        tags: ["Italian", "Pasta", "Quick"],
        ingredients: [
            "400g spaghetti",
            "200g pancetta or guanciale",
            "4 large eggs",
            "100g Pecorino Romano cheese",
            "100g Parmigiano-Reggiano cheese",
            "Black pepper",
            "Salt"
        ],
        instructions: [
            "Bring a large pot of salted water to boil and cook spaghetti according to package directions.",
            "Meanwhile, cut pancetta into small cubes and cook in a large skillet until crispy.",
            "In a bowl, whisk together eggs, grated cheeses, and black pepper.",
            "Drain pasta, reserving 1 cup of pasta water.",
            "Add hot pasta to the skillet with pancetta, remove from heat.",
            "Quickly stir in egg mixture, adding pasta water as needed for creaminess.",
            "Serve immediately with extra cheese and black pepper."
        ]
    },
    {
        id: 2,
        title: "Chicken Tikka Masala",
        description: "A British-Indian fusion dish featuring tender chicken in a rich, creamy tomato-based sauce with aromatic spices.",
        cookTime: "45 minutes",
        difficulty: "Medium",
        rating: 5,
        image: "images/chicken-tikka-masala.jpg",
        tags: ["Indian", "Chicken", "Spicy"],
        ingredients: [
            "1kg chicken breast, cubed",
            "2 cups yogurt",
            "2 tbsp tikka masala paste",
            "1 onion, diced",
            "3 cloves garlic, minced",
            "1 inch ginger, grated",
            "400ml coconut milk",
            "400g canned tomatoes",
            "Fresh cilantro"
        ],
        instructions: [
            "Marinate chicken in yogurt and tikka masala paste for 30 minutes.",
            "Cook chicken in a hot pan until browned, set aside.",
            "Sauté onion, garlic, and ginger until softened.",
            "Add tomatoes and coconut milk, simmer for 10 minutes.",
            "Return chicken to pan, simmer until cooked through.",
            "Garnish with fresh cilantro and serve with rice."
        ]
    },
    {
        id: 3,
        title: "Chocolate Chip Cookies",
        description: "Classic homemade chocolate chip cookies with crispy edges and chewy centers. Perfect for any occasion!",
        cookTime: "25 minutes",
        difficulty: "Easy",
        rating: 5,
        image: "images/chocolate-chip-cookies.jpg",
        tags: ["Dessert", "Baking", "Sweet"],
        ingredients: [
            "2 1/4 cups all-purpose flour",
            "1 tsp baking soda",
            "1 tsp salt",
            "1 cup unsalted butter, softened",
            "3/4 cup granulated sugar",
            "3/4 cup brown sugar",
            "2 large eggs",
            "2 tsp vanilla extract",
            "2 cups chocolate chips"
        ],
        instructions: [
            "Preheat oven to 375°F (190°C).",
            "Mix flour, baking soda, and salt in a bowl.",
            "Cream butter and sugars until light and fluffy.",
            "Beat in eggs and vanilla.",
            "Gradually mix in flour mixture.",
            "Stir in chocolate chips.",
            "Drop rounded tablespoons onto baking sheets.",
            "Bake for 9-11 minutes until golden brown."
        ]
    },
    {
        id: 4,
        title: "Caesar Salad",
        description: "A fresh and crisp Caesar salad with homemade dressing, croutons, and Parmesan cheese. A perfect light meal or side dish.",
        cookTime: "15 minutes",
        difficulty: "Easy",
        rating: 4,
        image: "images/caesar-salad.jpg",
        tags: ["Salad", "Vegetarian", "Healthy"],
        ingredients: [
            "2 heads romaine lettuce",
            "1/2 cup Parmesan cheese",
            "1 cup croutons",
            "2 anchovy fillets",
            "2 cloves garlic",
            "1 egg yolk",
            "1 tbsp Dijon mustard",
            "2 tbsp lemon juice",
            "1/4 cup olive oil"
        ],
        instructions: [
            "Wash and chop romaine lettuce.",
            "Make dressing by whisking together anchovy, garlic, egg yolk, mustard, and lemon juice.",
            "Slowly drizzle in olive oil while whisking.",
            "Toss lettuce with dressing.",
            "Top with croutons and Parmesan cheese.",
            "Serve immediately."
        ]
    },
    {
        id: 5,
        title: "Beef Stir Fry",
        description: "A quick and flavorful beef stir fry with colorful vegetables and a savory sauce. Perfect for busy weeknights.",
        cookTime: "20 minutes",
        difficulty: "Easy",
        rating: 4,
        image: "images/beef-stir-fry.jpg",
        tags: ["Asian", "Beef", "Quick"],
        ingredients: [
            "500g beef sirloin, sliced",
            "2 cups mixed vegetables",
            "3 tbsp soy sauce",
            "2 tbsp oyster sauce",
            "1 tbsp cornstarch",
            "2 cloves garlic, minced",
            "1 inch ginger, grated",
            "2 tbsp vegetable oil"
        ],
        instructions: [
            "Slice beef thinly against the grain.",
            "Mix soy sauce, oyster sauce, and cornstarch in a bowl.",
            "Heat oil in a wok or large pan over high heat.",
            "Stir-fry beef until browned, remove from pan.",
            "Stir-fry vegetables until crisp-tender.",
            "Return beef to pan, add sauce mixture.",
            "Cook until sauce thickens and coats everything.",
            "Serve hot with rice."
        ]
    }
];

// Helper functions for recipe management
export function getRecipeById(id) {
    return recipes.find(recipe => recipe.id === id);
}

export function searchRecipes(query) {
    const searchTerm = query.toLowerCase();
    return recipes.filter(recipe => 
        recipe.title.toLowerCase().includes(searchTerm) ||
        recipe.description.toLowerCase().includes(searchTerm) ||
        recipe.tags.some(tag => tag.toLowerCase().includes(searchTerm))
    );
}

export function getRecipesByTag(tag) {
    return recipes.filter(recipe => 
        recipe.tags.some(recipeTag => recipeTag.toLowerCase() === tag.toLowerCase())
    );
}

export function getRecipesByDifficulty(difficulty) {
    return recipes.filter(recipe => 
        recipe.difficulty.toLowerCase() === difficulty.toLowerCase()
    );
} 