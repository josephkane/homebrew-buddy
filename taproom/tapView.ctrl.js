angular.module("app")
	.controller("TapViewControl", function ($timeout, AuthFactory, $routeParams) {
		const tapViewCtrl = this;
		let currentUser = AuthFactory.currentUser();

		firebase.database().ref(`taproom/${$routeParams.id}`).on("value", (snap) => {
			tapViewCtrl.recipe = snap.val();
			$timeout();
		})
	})