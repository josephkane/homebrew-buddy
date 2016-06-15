angular.module("app")
	.controller("ProfileControl", function (AuthFactory, ProfileFactory, $timeout) {
		const profileCtrl = this;

		firebase.database().ref("/recipe").on("value", (snap) => {
			console.log("snap: ", snap.val());
			profileCtrl.recipes = snap.val();
			$timeout();
		})

		profileCtrl.newRecipe = function () {
			ProfileFactory.newRecipe(AuthFactory.currentUser())
		}
	})