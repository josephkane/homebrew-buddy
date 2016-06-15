angular.module("app")
	.factory("AuthFactory", ($location, $timeout) => {
		let userId;
		let token;

		firebase.auth().onAuthStateChanged((user) => {
			if (user) {
				userId = user.uid;
				user.getToken()
					.then(t => token = t)
					.then($location.path.bind($location, "/profile"))
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
					.catch((error) => (alert(error.message)));
			}
		}
	})