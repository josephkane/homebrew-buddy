angular.module("app")
	.config(($routeProvider) => {
		$routeProvider
			.when("/editRecipe/:id", {
				controller: "EditRecipeControl",
				controllerAs: "editCtrl",
				templateUrl: "recipe/editRecipe.html"
			})
	})