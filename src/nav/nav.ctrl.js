angular.module("app")
	.controller("NavControl", function ($location, AuthFactory, $timeout, NavFactory) {
		navCtrl = this;
		let currentUser;

		firebase.auth().onAuthStateChanged((user) => {
			if (user) {
				navCtrl.currentUser = user.email;
				$timeout();
			} else {
				navCtrl.currentUser = null;
			}
		})

		navCtrl.logout = function () {
			firebase.auth().signOut()
				.then($location.path.bind($location, "/"))
				.then($timeout)
		}

		navCtrl.backToProfile = function () {
			let currentUser = firebase.auth().currentUser;
			$location.path(`/profile/${currentUser.uid}`);
		}

		navCtrl.taproom = function () {
			$location.path("/taproom");
		}
	})