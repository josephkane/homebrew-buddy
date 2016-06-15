angular.module("app")
	.factory("ProfileFactory", (AuthFactory, $http) => {
		const FB_URL = "https://homebrew-buddy-53153.firebaseio.com"

		return {
			newRecipe (userInfo) {
				return $http
					.post(`${FB_URL}/users/${userInfo.userId}/recipes.json?auth=${userInfo.auth}`, {
						name: "New Recipe 2",
						description: "Glorious Gose!",
					})
			}
		}
	})