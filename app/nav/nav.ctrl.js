angular.module("app")
	.controller("NavControl", function ($location, AuthFactory, $timeout, NavFactory) {
		navCtrl = this;

		navCtrl.logout = function () {
			firebase.auth().signOut()
				.then($location.path.bind($location, "/"))
				.then($timeout)
		}

		navCtrl.backToProfile = function () {
			let currentUser = firebase.auth().currentUser;
			$location.path(`/profile/${currentUser.uid}`);
		}
	})