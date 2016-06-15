angular.module("app")
	.factory("ProfileFactory", (AuthFactory, $http) => {
		const FB_URL = "https://homebrew-buddy-53153.firebaseio.com"

		return {
			getRecipes (userInfo) {
				console.log("get");
				return $http
					.get(`${FB_URL}/recipe.json?auth=${userInfo.auth}`)
						.then(res => res.data)
						.then(data => recipes = data)
			},

			newRecipe (userInfo) {
				console.log("post");
				return $http
					.post(`${FB_URL}/recipe.json?auth=${userInfo.auth}`, {
						name: "New Recipe 1",
						user: userInfo.user
					})
			}
		}
	})