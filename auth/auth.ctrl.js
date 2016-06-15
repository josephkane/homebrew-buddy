angular.module("app")
	.controller("AuthControl", function (AuthFactory) {
		const authCtrl = this;

		authCtrl.login = (email, password) => {
			AuthFactory.login(email, password);
		}

		authCtrl.register = (email, password) => {
			AuthFactory.register(email, password);
		}
	})