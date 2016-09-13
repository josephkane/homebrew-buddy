angular.module("app")
	.factory("AuthFactory", ($location, $timeout, $http, NavFactory) => {
		const FB_URL = "https://homebrew-buddy-53153.firebaseio.com"
		let userId;
		let userEmail;
		let token;

		firebase.auth().onAuthStateChanged((user) => {
			console.log("auth state");
			if (user) {
				userId = user.uid;
				userEmail = user.email;
				user.getToken()
					.then(t => token = t)
					.then($location.path.bind($location, `/profile/${userId}`))
					.then($timeout)
			}
		})

		return {

			login (email, password) {
				firebase.auth().signInWithEmailAndPassword(email, password)
					.catch((error) => (alert(error.message)));
			},

			register (email, password) {
				firebase.auth().createUserWithEmailAndPassword(email, password)
					.then(data => {
						userId = data.uid;
						email = data.email;
						data.getToken()
							.then((t) => {
								$http.post(`${FB_URL}/users/${userId}.json?auth=${t}`, {
									userId: userId,
									email: email
								});
							})
					})

					.catch((error) => (console.log(error)));
			},

			currentUser () {
				return {
					userId: userId,
					email: userEmail,
					auth: token
				}
			}
		}
	})
