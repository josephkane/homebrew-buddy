angular.module("app")
	.controller("ProfileControl", function (
		AuthFactory, ProfileFactory, $timeout, $location, ViewRecipeFactory, $routeParams
		) {
		const profileCtrl = this;
		firebase.database().ref(`/users/${$routeParams.id}/recipes`).on("value", (snap) => {
			profileCtrl.recipes = snap.val();
			$timeout();
		})

		profileCtrl.newRecipe = function () {
			$location.path("/addRecipe")
		}

		profileCtrl.viewRecipe = function (id, recipe) {
			console.log("id: ", id);
			console.log("recipe: ", recipe);
		}

		profileCtrl.deleteRecipe = function (id) {
			return firebase.database().ref(`/users/${$routeParams.id}/recipes/${id}`)
				.set(null);
		}

		profileCtrl.logout = function () {
			firebase.auth().signOut()
				.then($location.path.bind($location, "/"))
				.then($timeout)
		}
	})