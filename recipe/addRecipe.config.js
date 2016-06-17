angular.module("app")
	.config(($routeProvider) => {
		$routeProvider
			.when("/addRecipe", {
				controller: "AddRecipeControl",
				controllerAs: "addCtrl",
				templateUrl: "recipe/addRecipe.html"
			})
	})