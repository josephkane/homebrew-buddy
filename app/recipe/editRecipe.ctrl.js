angular.module("app")
	.controller("EditRecipeControl", function (
			AddRecipeFactory, EditRecipeFactory, $routeParams, AuthFactory, $location, $timeout
		) {
		const editCtrl = this;
		const FB_URL = "https://homebrew-buddy-53153.firebaseio.com";
		let currentUser = AuthFactory.currentUser();

		firebase.database().ref(`/users/${currentUser.userId}/recipes/${$routeParams.id}`).on("value", (snap) => {
			editCtrl.recipe = snap.val();
		})

		AddRecipeFactory.styles().then(res => editCtrl.stylesArray = res);
		AddRecipeFactory.fermentables(currentUser.auth).then(res => editCtrl.fermentablesArray = res);
		AddRecipeFactory.hops(currentUser.auth).then(res => editCtrl.hopsArray = res);
		AddRecipeFactory.yeast().then(res => editCtrl.yeastArray = res);

		editCtrl.updateRecipe = function () {
			let recipe = {
				name: editCtrl.recipe.name,
				description: editCtrl.recipe.description,
				style: editCtrl.recipe.style,
				targetOG: editCtrl.recipe.targetOG,
				batchSize: editCtrl.recipe.batchSize,
				mashTemp: editCtrl.recipe.mashTemp,
				mashEff: editCtrl.recipe.mashEff,
				grainBill: [
					{
						info: editCtrl.recipe.fermentable,
						percentage: editCtrl.recipe.fermPercent,
						name: editCtrl.recipe.fermentable.name
					}
				],
				hops: [
					{
						info: editCtrl.recipe.hops,
						aa: editCtrl.recipe.aa,
						boil: editCtrl.recipe.boil,
						name: editCtrl.recipe.hops.name
					}
				],
				yeast: {
					info: editCtrl.recipe.yeast,
					name: editCtrl.recipe.yeast.name,
					starter: editCtrl.recipe.yeastStarter
				}
			};
			console.log("recipe: ", recipe);
			EditRecipeFactory.updateRecipe(currentUser, $routeParams.id, recipe)
				.then($location.path.bind($location, `/profile/${currentUser.userId}`))
				.then($timeout);
		}
	})