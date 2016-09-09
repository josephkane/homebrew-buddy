angular.module("app")
	.config(($routeProvider) => {
		$routeProvider
			.when("/profile/:id", {
				controller: "ProfileControl",
				controllerAs: "profileCtrl",
				templateUrl: "profile.html"
			})
	})
