angular.module("app")
	.config(($routeProvider) => {
		$routeProvider
			.when("/recipe", {
				controller: "ViewRecipeControl",
				controllerAs: "viewCtrl",
				templateUrl: "recipe/recipe.html"
			})
			.when("/addRecipe", {
				controller: "AddRecipeControl",
				controllerAs: "addCtrl",
				templateUrl: "recipe/addRecipe.html"
			})
	})