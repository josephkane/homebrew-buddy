angular.module("app")
	.factory("RecipeFactory", ($http, AuthFactory) => {
		const FB_URL = "https://homebrew-buddy-53153.firebaseio.com";
		let styles;
		let fermentables;
		let hops;
		let yeast;
		let srm;

		function calculateRecipe (recipe) {
			let currentUser = AuthFactory.currentUser();
			let srmHex;
			let totalIBU = 0;
			let totalSRM = 0;
			let approxABV = 0;
			let totalGravityUnits = parseInt(((recipe.targetOG - 1) * 1000) * recipe.batchSize);

			approxABV = (76.08 * (recipe.targetOG - recipe.targetFG) / (1.775 - recipe.targetOG)) * (recipe.targetFG / 0.794);
			recipe.approxABV = Math.round((approxABV + 0.00001) * 100) / 100;

			for (let ferm in recipe.grainBill) {
				for (let grain in fermentables.data) {
					if (recipe.grainBill[ferm].name === fermentables.data[grain].name) {
						recipe.grainBill[ferm].potential = fermentables.data[grain].potential;
						recipe.grainBill[ferm].srm = fermentables.data[grain].srmId;
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

			for (let key in recipe.grainBill) {
				let mcu = (recipe.grainBill[key].grainInLbs * recipe.grainBill[key].srm) / recipe.batchSize;
				let contributedSRM = 1.4922 * (Math.pow(mcu, 0.6859))
				recipe.grainBill[key].contributedSRM = contributedSRM;
				totalSRM += contributedSRM
			}
			recipe.totalSRM = Math.round(totalSRM);

			for (let key in srm.data) {
				if (recipe.totalSRM > 40) {
					recipe.srmHex = "#36080A"
				} else if (srm.data[key].srm === recipe.totalSRM) {
					recipe.srmHex = srm.data[key].color;
				}
			}

			console.log("recipe: ", recipe);

			return recipe;
		}

		return {
			styles () {
				return $http
					.get("http://api.brewerydb.com/v2/styles/?key=47e0d3ca6616a3f10fa45c87f1787825")
						.then(res => {
							styles = res.data;
							return styles;
					});
			},
			getStyles () {
				return styles;
			},
			fermentables () {
				let currentUser = AuthFactory.currentUser();
				return $http
					.get(`${FB_URL}/ferm.json?auth=${currentUser.auth}`)
						.then(res => {
							fermentables = res.data;
							return fermentables;
					})
			},
			getFermentables () {
				return fermentables;
			},
			hops () {
				let currentUser = AuthFactory.currentUser()
				return $http
					.get(`${FB_URL}/hops.json?auth=${currentUser.auth}`)
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
							yeast = res.data;
							return yeast;
					})
			},
			getYeast () {
				return yeast;
			},
			srm () {
				let currentUser = AuthFactory.currentUser();
				return $http
					.get(`${FB_URL}/srm.json?auth=${currentUser.auth}`)
						.then(res => {
							srm = res.data;
							return srm;
					})
			},
			getSRM () {
				return srm;
			},
			addNewRecipe (recipe) {
				const calculatedRecipe = calculateRecipe(recipe);
				let currentUser = AuthFactory.currentUser();
				return $http
					.post(`${FB_URL}/users/${currentUser.userId}/recipes.json?auth=${currentUser.auth}`, calculatedRecipe);
			},
			updateRecipe (recipeId, recipe) {
				const calculatedRecipe = calculateRecipe(recipe);
				let currentUser = AuthFactory.currentUser();
				return $http
					.put(`${FB_URL}/users/${currentUser.userId}/recipes/${recipeId}.json?auth=${currentUser.auth}`, calculatedRecipe)
			}
		}
	})