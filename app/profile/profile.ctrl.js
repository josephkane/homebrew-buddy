angular.module("app")
	.controller("ProfileControl", function (AuthFactory, ProfileFactory, $timeout) {
		const profileCtrl = this;

		firebase.database().ref("/recipe").on("value", (snap) => {
			profileCtrl.recipes = snap.val();
			$timeout();
		})

		profileCtrl.newRecipe = function () {
			ProfileFactory.newRecipe(AuthFactory.currentUser())
		}

		profileCtrl.deleteRecipe = function (id) {
			return firebase.database().ref(`/recipe/${id}`)
				.set(null);
		}
	})