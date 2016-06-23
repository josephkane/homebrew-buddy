angular.module("app")
	.factory("ViewRecipeFactory", ($http, AuthFactory) => {
		const FB_URL = "https://homebrew-buddy-53153.firebaseio.com";

		return {
			tapRecipe (recipe) {
				let currentUser = AuthFactory.currentUser();
				return $http
					.post(`${FB_URL}/taproom.json?auth=${currentUser.auth}`, recipe);
			}
		}
	})