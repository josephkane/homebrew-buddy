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
						info: editCtrl.recipe.grainBill[0].info,
						percentage: editCtrl.recipe.grainBill[0].percentage,
						name: editCtrl.recipe.grainBill[0].info.name
					}
				],
				hops: [
					{
						info: editCtrl.recipe.hops[0].info,
						aa: editCtrl.recipe.hops[0].aa,
						boil: editCtrl.recipe.hops[0].boil,
						name: editCtrl.recipe.hops[0].info.name
					}
				],
				yeast: {
					info: editCtrl.recipe.yeast,
					name: editCtrl.recipe.yeast.name,
					starter: editCtrl.recipe.yeast.starter
				}
			};
			console.log("recipe: ", recipe);
			EditRecipeFactory.updateRecipe(currentUser, $routeParams.id, recipe)
				.then($location.path.bind($location, `/profile/${currentUser.userId}`))
				.then($timeout);
		}
	})