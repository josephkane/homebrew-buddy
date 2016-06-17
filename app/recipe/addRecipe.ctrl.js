angular.module("app")
	.controller("AddRecipeControl", function ($location, $timeout, AddRecipeFactory, AuthFactory) {
		addCtrl = this;
		let currentUser = AuthFactory.currentUser();

		AddRecipeFactory.styles().then(res => addCtrl.stylesArray = res);
		AddRecipeFactory.fermentables(currentUser.auth).then(res => addCtrl.fermentablesArray = res);
		AddRecipeFactory.hops(currentUser.auth).then(res => addCtrl.hopsArray = res);
		AddRecipeFactory.yeast().then(res => addCtrl.yeastArray = res);

		addCtrl.backToProfile = function () {
			$location.path(`/profile/${currentUser.userId}`);
		}

		addCtrl.addNew = function () {
			let recipe = {
				name: addCtrl.name,
				description: addCtrl.description,
				style: addCtrl.style,
				targetOG: addCtrl.targetOG,
				batchSize: addCtrl.batchSize,
				mashTemp: addCtrl.mashTemp,
				mashEff: addCtrl.mashEff,
				grainBill: [
					{
						info: addCtrl.fermentable,
						percentage: addCtrl.fermPercent,
						name: addCtrl.fermentable.name
					}
				],
				hops: [
					{
						info: addCtrl.hops,
						aa: addCtrl.aa,
						boil: addCtrl.boil,
						name: addCtrl.hops.name
					}
				],
				yeast: {
					info: addCtrl.yeast,
					name: addCtrl.yeast.name,
					starter: addCtrl.yeastStarter
				}
			};
			AddRecipeFactory.addNewRecipe(currentUser.auth, currentUser.userId, recipe)
				.then($location.path.bind($location, `/profile/${currentUser.userId}`))
				.then($timeout);
		}

		addCtrl.cancel = function () {
			$location.path.bind($location, `/profile/${currentUser.userId}`);
			$timeout();
		}
	})