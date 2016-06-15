angular.module("app")
	.controller("ViewRecipeControl", function () {

	})
	.controller("AddRecipeControl", function ($location, $timeout, RecipeFactory) {
		addCtrl = this;

		RecipeFactory.styles().then(res => addCtrl.stylesArray = res);
		RecipeFactory.fermentables().then(res => addCtrl.fermentablesArray = res);
		RecipeFactory.hops().then(res => addCtrl.hopsArray = res);
		RecipeFactory.yeast().then(res => addCtrl.yeastArray = res);

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
			console.log("recipe: ", recipe);
		}

		addCtrl.cancel = function () {
			$location.path.bind($location, "#/profile");
			$timeout();
		}
	})