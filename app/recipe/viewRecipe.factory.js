angular.module("app")
	.factory("ViewRecipeFactory", () => {

		return {
			viewRecipe (id, recipe) {
				console.log("id: ", id);
				console.log("recipe: ", recipe);
				let recipeId = id;
				let recipeObj = recipe
				return {
					id: recipeId,
					recipe: recipeObj
				}
			}
		}
	})