angular.module("app")
	.controller("TapViewControl", function ($timeout, AuthFactory, $routeParams, TaproomFactory, $location) {
		const tapViewCtrl = this;

		firebase.database().ref(`taproom/${$routeParams.id}`).on("value", (snap) => {
			tapViewCtrl.recipe = snap.val();
			$timeout();
		})

		tapViewCtrl.comment = function (comment) {
			TaproomFactory.addUserComment(comment, $routeParams.id)
		}

		tapViewCtrl.forkRecipe = function (recipe) {
			let currentUser = AuthFactory.currentUser();
			TaproomFactory.forkRecipe(recipe)
				.then($location.path(`/profile/${currentUser.userId}`));
				$timeout();
		}
	})