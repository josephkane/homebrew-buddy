angular.module("app")
	.controller("AddRecipeControl", function ($location, $timeout, RecipeFactory, AuthFactory) {
		const addCtrl = this;
		let currentUser = AuthFactory.currentUser();

		addCtrl.grainBill = [];
		addCtrl.hopsBill = [];

		RecipeFactory.styles().then(res => addCtrl.stylesArray = res.data.map((style) => style.shortName));
		RecipeFactory.fermentables(currentUser.auth).then(res => addCtrl.fermentablesArray = res.data.map((ferm) => ferm.name));
		RecipeFactory.hops(currentUser.auth).then(res => addCtrl.hopsArray = res.data.map((hop) => hop.name));
		RecipeFactory.yeast().then(res => addCtrl.yeastArray = res.data.map((yeast) => yeast.name));
		RecipeFactory.srm().then(res => addCtrl.srmArray = res.data);

		addCtrl.backToProfile = function () {
			$location.path(`/profile/${currentUser.userId}`);
		}

		addCtrl.addFermentable = function () {
			addCtrl.grainBill.push({});
		}

		addCtrl.addHops = function () {
			addCtrl.hopsBill.push({});
		}

		addCtrl.deleteFerm = function (obj) {
			let deleteIndex = addCtrl.grainBill.indexOf(obj);
			addCtrl.grainBill.splice(deleteIndex, 1);
		}

		addCtrl.deleteHop = function (obj) {
			let deleteIndex = addCtrl.hopsBill.indexOf(obj);
			addCtrl.hopsBill.splice(deleteIndex, 1);
		}

		addCtrl.addNew = function () {
			let calculatedRecipe;
			let recipe = {
				name: addCtrl.name,
				description: addCtrl.description,
				style: addCtrl.style,
				targetOG: parseFloat(addCtrl.targetOG),
				targetFG: parseFloat(addCtrl.targetFG),
				batchSize: parseFloat(addCtrl.batchSize),
				mashTemp: parseFloat(addCtrl.mashTemp),
				mashEff: parseInt(addCtrl.mashEff),
				grainBill: addCtrl.grainBill,
				hops: addCtrl.hopsBill,
				yeast: {
					name: addCtrl.yeast,
					starter: addCtrl.yeastStarter
				}
			};
			console.log("recipe: ", recipe);
			calculatedRecipe = RecipeFactory.calculateRecipe(recipe);

			RecipeFactory.addNewRecipe(calculatedRecipe)
				.then($location.path.bind($location, `/profile/${currentUser.userId}`))
				.then($timeout);
		}

		addCtrl.cancel = function () {
			$location.path.bind($location, `/profile/${currentUser.userId}`);
			$timeout();
		}
	})