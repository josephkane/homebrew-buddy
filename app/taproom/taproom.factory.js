angular.module("app")
	.factory("TaproomFactory", ($http, AuthFactory) => {
		const FB_URL = "https://homebrew-buddy-53153.firebaseio.com";

		return {
			addUserComment (comment, id) {
				let currentUser = AuthFactory.currentUser();
				let userComment = {
					comment: comment,
					user: currentUser.email,
					date: Date()
				}
				return $http
					.post(`${FB_URL}/taproom/${id}/commComments.json?auth=${currentUser.auth}`, userComment)
			}
		};
	})