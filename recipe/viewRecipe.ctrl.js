angular.module("app")
	.controller("ViewRecipeControl", function (ViewRecipeFactory, $routeParams, AuthFactory) {
		const viewCtrl = this;
		let currentUser = AuthFactory.currentUser();

		firebase.database().ref(`users/${currentUser.userId}/recipes/${$routeParams.id}`).on("value", (snap) => {
			viewCtrl.recipe = snap.val();
			console.log("recipe: ", snap.val());
		})
	})