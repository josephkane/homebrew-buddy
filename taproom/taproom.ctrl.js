angular.module("app")
	.controller("TaproomControl", function ($timeout, $location) {
		const tapCtrl = this;

		firebase.database().ref("/taproom").on("value", (snap) => {
			tapCtrl.recipes = snap.val();
			$timeout();
		})

		tapCtrl.viewRecipe = function (id) {
			$location.path(`taproom/viewRecipe/${id}`);
			$timeout();
		}

	})