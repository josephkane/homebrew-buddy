angular.module("app")
	.controller("ViewRecipeControl", function (ViewRecipeFactory, $routeParams, $location, AuthFactory) {
		const viewCtrl = this;
		let currentUser = AuthFactory.currentUser();

		firebase.database().ref(`users/${currentUser.userId}/recipes/${$routeParams.id}`).on("value", (snap) => {
			viewCtrl.recipe = snap.val();
			console.log("recipe: ", snap.val());
		})

		viewCtrl.backToProfile = function () {
			$location.path(`/profile/${currentUser.userId}`);
		}
	})