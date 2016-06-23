angular.module("app")
	.controller("TapViewControl", function ($timeout, AuthFactory, $routeParams, TaproomFactory) {
		const tapViewCtrl = this;
		let currentUser = AuthFactory.currentUser();

		firebase.database().ref(`taproom/${$routeParams.id}`).on("value", (snap) => {
			tapViewCtrl.recipe = snap.val();
			$timeout();
		})

		tapViewCtrl.comment = function (comment) {
			TaproomFactory.addUserComment(comment, $routeParams.id)
		}
	})