angular.module("app")
	.controller("AddRecipeControl", function ($location, $timeout, AddRecipeFactory, AuthFactory) {
		const addCtrl = this;
		let currentUser = AuthFactory.currentUser();

		addCtrl.grainBill = [];
		addCtrl.hopsBill = [];

		AddRecipeFactory.styles().then(res => addCtrl.stylesArray = res);
		AddRecipeFactory.fermentables(currentUser.auth).then(res => addCtrl.fermentablesArray = res.data.map((ferm) => ferm.name));
		AddRecipeFactory.hops(currentUser.auth).then(res => addCtrl.hopsArray = res.data.map((hop) => hop.name));
		AddRecipeFactory.yeast().then(res => addCtrl.yeastArray = res);

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

			let recipe = {
				name: addCtrl.name,
				description: addCtrl.description,
				style: addCtrl.style,
				targetOG: parseFloat(addCtrl.targetOG),
				batchSize: parseFloat(addCtrl.batchSize),
				mashTemp: parseFloat(addCtrl.mashTemp),
				mashEff: parseInt(addCtrl.mashEff),
				grainBill: addCtrl.grainBill,
				hops: addCtrl.hopsBill,
				yeast: {
					info: addCtrl.yeast,
					name: addCtrl.yeast.name,
					starter: addCtrl.yeastStarter
				}
			};
			console.log("recipe: ", recipe);
			AddRecipeFactory.addNewRecipe(recipe)
				.then($location.path.bind($location, `/profile/${currentUser.userId}`))
				.then($timeout);
		}

		addCtrl.cancel = function () {
			$location.path.bind($location, `/profile/${currentUser.userId}`);
			$timeout();
		}
	})