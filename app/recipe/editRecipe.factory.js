angular.module("app")
	.factory("EditRecipeFactory", ($http) => {
		const FB_URL = "https://homebrew-buddy-53153.firebaseio.com";

		return {
			updateRecipe (user, recipeId, recipe) {
				return $http
					.put(`${FB_URL}/users/${user.userId}/recipes/${recipeId}.json?auth=${user.auth}`, recipe)
			}
		}
	})