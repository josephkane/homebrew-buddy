angular.module("app")
	.controller("ProfileControl", function (AuthFactory, ProfileFactory, $timeout, $location) {
		const profileCtrl = this;
		let currentUser = AuthFactory.currentUser();

		firebase.database().ref(`/users/${currentUser.userId}/recipes`).on("value", (snap) => {
			profileCtrl.recipes = snap.val();
			$timeout();
		})

		profileCtrl.newRecipe = function () {
			ProfileFactory.newRecipe(currentUser)
		}

		profileCtrl.deleteRecipe = function (id) {
			return firebase.database().ref(`/users/${currentUser.userId}/recipes/${id}`)
				.set(null);
		}

		profileCtrl.logout = function () {
			firebase.auth().signOut()
				.then($location.path.bind($location, "/"))
				.then($timeout)
		}
	})