angular.module("app")
	.factory("NavFactory", () => {
		let userEmail;

		firebase.auth().onAuthStateChanged((user) => {
			if (user) {
				userEmail = user.email;
			}
		})

		return {
			currentUser () {
				return userEmail;
			},
		};
	})