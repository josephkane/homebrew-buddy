angular.module("app")
	.controller("ViewRecipeControl", function () {

	})
	.controller("AddRecipeControl", function ($location, $timeout, RecipeFactory) {
		addCtrl = this;

		RecipeFactory.styles().then(res => addCtrl.styles = res);

		addCtrl.addNew = function () {
			let recipe = {
				name: addCtrl.name,
				description: addCtrl.description,
				style: addCtrl.style,
				targetOG: addCtrl.targetOG,
				batchSize: addCtrl.batchSize,
				mashTemp: addCtrl.mashTemp,
				mashEff: addCtrl.mashEff
			};
			console.log("recipe: ", recipe);
		}

		addCtrl.cancel = function () {
			$location.path.bind($location, "#/profile");
			$timeout();
		}
	})