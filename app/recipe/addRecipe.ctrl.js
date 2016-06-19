angular.module("app")
	.controller("AddRecipeControl", function ($location, $timeout, AddRecipeFactory, AuthFactory) {
		const addCtrl = this;
		let currentUser = AuthFactory.currentUser();

		addCtrl.grainBill = {};
		addCtrl.grainCounter = [];
		addCtrl.hopsBill = {};
		addCtrl.hopsCounter = [];

		AddRecipeFactory.styles().then(res => addCtrl.stylesArray = res);
		AddRecipeFactory.fermentables(currentUser.auth).then(res => addCtrl.fermentablesArray = res);
		AddRecipeFactory.hops(currentUser.auth).then(res => addCtrl.hopsArray = res);
		AddRecipeFactory.yeast().then(res => addCtrl.yeastArray = res);

		addCtrl.backToProfile = function () {
			$location.path(`/profile/${currentUser.userId}`);
		}

		addCtrl.addFermentable = function () {
			addCtrl.grainCounter.push({})
		}

		addCtrl.addHops = function () {
			addCtrl.hopsCounter.push({})
		}

		addCtrl.addNew = function () {
			addCtrl.grainBill = addCtrl.fermentable;
			addCtrl.hopsBill = addCtrl.hops;

			let recipe = {
				name: addCtrl.name,
				description: addCtrl.description,
				style: addCtrl.style,
				targetOG: parseFloat(addCtrl.targetOG),
				batchSize: parseFloat(addCtrl.batchSize),
				mashTemp: parseFloat(addCtrl.mashTemp),
				mashEff: parseInt(addCtrl.mashEff) / 100,
				grainBill: addCtrl.grainBill,
				hops: addCtrl.hopsBill,
				yeast: {
					info: addCtrl.yeast,
					name: addCtrl.yeast.name,
					starter: addCtrl.yeastStarter
				}
			};
			console.log("recipe: ", recipe);
			AddRecipeFactory.addNewRecipe(currentUser.auth, currentUser.userId, recipe)
				.then($location.path.bind($location, `/profile/${currentUser.userId}`))
				.then($timeout);
		}

		addCtrl.cancel = function () {
			$location.path.bind($location, `/profile/${currentUser.userId}`);
			$timeout();
		}
	})