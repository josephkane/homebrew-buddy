angular.module("app")
	.config(($routeProvider) => {
		$routeProvider
			.when("/profile", {
				controller: "ProfileControl",
				controllerAs: "profileCtrl",
				templateUrl: "profile/profile.html"
			})
	})