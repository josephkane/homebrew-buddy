angular.module("app")
	.factory("AuthFactory", ($location, $timeout, $http) => {
		const FB_URL = "https://homebrew-buddy-53153.firebaseio.com"
		let userId;
		let userEmail;
		let token;

		firebase.auth().onAuthStateChanged((user) => {
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
					.then(data => ($http.put(`${FB_URL}/users/${data.uid}.json?auth=${data.Wc}`, {
						userId: data.uid,
						email: data.email
					})))
					.catch((error) => (alert(error.message)));

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
