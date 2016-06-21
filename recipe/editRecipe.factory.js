angular.module("app")
	.factory("EditRecipeFactory", ($http, AuthFactory, AddRecipeFactory) => {
		const FB_URL = "https://homebrew-buddy-53153.firebaseio.com";
		let fermentables = AddRecipeFactory.getFermentables();
		let hops = AddRecipeFactory.getHops()

		return {
			updateRecipe (recipeId, recipe) {
				let currentUser = AuthFactory.currentUser();
				let fermentables = AddRecipeFactory.getFermentables();
				let hops = AddRecipeFactory.getHops();
				let yeast = AddRecipeFactory.getYeast();
				let totalIBU = 0;
				let totalGravityUnits = parseInt(((recipe.targetOG - 1) * 1000) * recipe.batchSize);


				for (let ferm in recipe.grainBill) {
					for (let grain in fermentables.data) {
						if (recipe.grainBill[ferm].name === fermentables.data[grain].name) {
							recipe.grainBill[ferm].potential = fermentables.data[grain].potential;
							recipe.grainBill[ferm].srm = fermentables.data[grain].srm;
						}
					}
				};

				for (let y in yeast.data) {
					if (recipe.yeast.name === yeast.data[y].name) {
						recipe.yeast.productId = yeast.data[y].productId;
						recipe.yeast.supplier = yeast.data[y].supplier;
					}
				};

				if (recipe.targetOG <= 1.050) {
					correctionFactor = 1;
				} else {
					correctionFactor = (1 + ((recipe.targetOG - 1.050) / 0.2))
				};

				for (let key in recipe.hops) {
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

				for (let key in recipe.hops) {
					let contributedIBU;
					if (recipe.hops[key].utilization == 0) {
						contributedIBU = 0;
						totalIBU += contributedIBU;
						recipe.hops[key].contributedIBU = contributedIBU;
					} else {
					contributedIBU = ((parseFloat(recipe.hops[key].oz)
						* (recipe.hops[key].utilization)
						* (parseFloat(recipe.hops[key].aa) / 100)
						* (7489)) / (recipe.batchSize * correctionFactor));
						recipe.hops[key].contributedIBU = Math.round(contributedIBU);
						totalIBU += contributedIBU;
					}}
				recipe.totalIBU = Math.round(totalIBU);

				for (let key in recipe.grainBill) {
					let gravityNeeded = ((recipe.grainBill[key].percent / 100) * totalGravityUnits);
					grainInLbs = (gravityNeeded / ((recipe.grainBill[key].potential - 1) * 1000) / (recipe.mashEff / 100));
					recipe.grainBill[key].grainInLbs = Math.round((grainInLbs + 0.00001) * 100) / 100;
				}

				console.log("recipe: ", recipe);

				return $http
					.put(`${FB_URL}/users/${currentUser.userId}/recipes/${recipeId}.json?auth=${currentUser.auth}`, recipe)
			}
		}
	})