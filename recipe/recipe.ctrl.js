angular.module("app")
	.controller("ViewRecipeControl", function () {

	})
	.controller("AddRecipeControl", function ($location, $timeout, RecipeFactory) {
		addCtrl = this;

		RecipeFactory.styles().then(res => addCtrl.styles = res);
		RecipeFactory.fermentables().then(res => addCtrl.fermentables = res);

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
				]
			};
			console.log("recipe: ", recipe);
		}

		addCtrl.cancel = function () {
			$location.path.bind($location, "#/profile");
			$timeout();
		}
	})