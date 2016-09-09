angular.module("app")
	.config(($routeProvider) => {
		$routeProvider
			.when("/taproom", {
				controller: "TaproomControl",
				controllerAs: "tapCtrl",
				templateUrl: "taproom.html"
			})
			.when("/taproom/viewRecipe/:id", {
				controller: "TapViewControl",
				controllerAs: "tapViewCtrl",
				templateUrl: "tapView.html"
			})
	})
