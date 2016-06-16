angular.module("app")
	.config(($routeProvider) => {
		$routeProvider
			.when("/viewRecipe/:id", {
				controller: "ViewRecipeControl",
				controllerAs: "viewCtrl",
				templateUrl: "recipe/viewRecipe.html"
			})

	})