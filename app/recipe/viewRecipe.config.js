angular.module("app")
	.config(($routeProvider) => {
		$routeProvider
			.when("/viewRecipe", {
				controller: "ViewRecipeControl",
				controllerAs: "viewCtrl",
				templateUrl: "recipe/viewRecipe.html"
			})

	})