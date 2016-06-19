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
				console.log("addNewRecipe");
				console.log("key: ", key);
				console.log("user: ", user);
				console.log("recipe: ", recipe);
				let totalIBU = 0;

				if (recipe.targetOG <= 1.050) {
					console.log("cf = 1");
					correctionFactor = 1;
				} else {
					correctionFactor = (1 + ((recipe.targetOG - 1.050) / 0.2))
					console.log("cf: ", correctionFactor);
				};

				for (var key in recipe.hops) {
					switch (parseInt(recipe.hops[key].boil)) {
						case 60:
							recipe.hops[key].utilization = 0.2697;
							break;
						case 55:
							recipe.hops[key].utilization = 0.2637;
							break;
						case 50:
							recipe.hops[key].utilization = 0.2565;
							break;
						case 45:
							recipe.hops[key].utilization = 0.2476;
							break;
						case 40:
							recipe.hops[key].utilization = 0.2367;
							break;
						case 35:
							recipe.hops[key].utilization = 0.2235;
							break;
						case 30:
							recipe.hops[key].utilization = 0.2073;
							break;
						case 25:
							recipe.hops[key].utilization = 0.1875;
							break;
						case 20:
							recipe.hops[key].utilization = 0.1633;
							break;
						case 15:
							recipe.hops[key].utilization = 0.1338;
							break;
						case 10:
							recipe.hops[key].utilization = 0.0978;
							break;
						case 5:
							recipe.hops[key].utilization = 0.0538;
							break;
						case 0:
							recipe.hops[key].utilization = 0;
							break;
					}
				};

				for (var key in recipe.hops) {
					let contributedIBU;
					if (recipe.hops[key].utilization == 0) {
						contributedIBU = 0;
						totalIBU += contributedIBU;
					} else {
					contributedIBU = ((parseFloat(recipe.hops[key].oz)
						* (recipe.hops[key].utilization)
						* (parseFloat(recipe.hops[key].aa) / 100)
						* (7489)) / (recipe.batchSize * correctionFactor));
						totalIBU += contributedIBU;
					}}
					recipe.totalIBU = totalIBU;

				console.log("recipe: ", recipe);

				return $http
					.post(`${FB_URL}/users/${user}/recipes.json?auth=${key}`, recipe)
			}
		}
	})