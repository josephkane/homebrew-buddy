angular.module("app")
	.config(($routeProvider) => {
		$routeProvider
			.when("/", {
				controller: "AuthControl",
				controllerAs: "authCtrl",
				templateUrl: "auth/auth.html"
			})
	})
