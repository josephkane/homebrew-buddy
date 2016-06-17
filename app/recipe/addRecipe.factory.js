angular.module("app")
	.factory("AddRecipeFactory", ($http) => {
		const FB_URL = "https://homebrew-buddy-53153.firebaseio.com";
		let styles;
		let fermentables;
		let hops;
		let yeast;

		return {
			styles () {
				return $http
					.get("http://api.brewerydb.com/v2/styles/?key=47e0d3ca6616a3f10fa45c87f1787825")
						.then(res => {
							styles = res.data.data;
							return styles;
					});
			},
			getStyles () {
				return styles;
			},
			fermentables (key) {
				return $http
					.get(`${FB_URL}/ferm.json?auth=${key}`)
						.then(res => {
							fermentables = res.data;
							return fermentables;
					})
			},
			getFermentables () {
				return fermentables;
			},
			hops (key) {
				return $http
					.get(`${FB_URL}/hops.json?auth=${key}`)
						.then(res => {
							hops = res.data;
							return hops;
					})
			},
			getHops () {
				return hops;
			},
			yeast () {
				return $http
					.get("http://api.brewerydb.com/v2/yeasts/?key=47e0d3ca6616a3f10fa45c87f1787825")
						.then(res => {
							yeast = res.data.data;
							return yeast;
					})
			},
			getYeast () {
				return yeast;
			},
			addNewRecipe (key, user, recipe) {
				console.log("post");
				return $http
					.post(`${FB_URL}/users/${user}/recipes.json?auth=${key}`, recipe)
			}
		}
	})