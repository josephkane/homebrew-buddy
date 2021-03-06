angular.module("app")
	.controller("EditRecipeControl", function (
			RecipeFactory, $routeParams, AuthFactory, $location, $timeout
		) {
		const editCtrl = this;
		const FB_URL = "https://homebrew-buddy-53153.firebaseio.com";
		let currentUser = AuthFactory.currentUser();

		firebase.database().ref(`/users/${currentUser.userId}/recipes/${$routeParams.id}`).on("value", (snap) => {
			editCtrl.recipe = snap.val();
		})

		RecipeFactory.styles().then(res => editCtrl.stylesArray = res.data.map((style) => style.shortName));
		RecipeFactory.fermentables().then(res => editCtrl.fermentablesArray = res.data.map((ferm) => ferm.name));
		RecipeFactory.hops().then(res => editCtrl.hopsArray = res.data.map((hop) => hop.name));
		RecipeFactory.yeast().then(res => editCtrl.yeastArray = res.data.map((yeast) => yeast.name));
		RecipeFactory.srm().then(res => editCtrl.srmArray = res.data);

		editCtrl.addFermentable = function () {
			editCtrl.recipe.grainBill.push({});
		}

		editCtrl.addHops = function () {
			editCtrl.recipe.hops.push({});
		}

		editCtrl.deleteFerm = function (obj) {
			let deleteIndex = editCtrl.recipe.grainBill.indexOf(obj);
			editCtrl.recipe.grainBill.splice(deleteIndex, 1);
		}

		editCtrl.deleteHop = function (obj) {
			let deleteIndex = editCtrl.recipe.hops.indexOf(obj);
			editCtrl.recipe.hops.splice(deleteIndex, 1);
		}

		editCtrl.updateRecipe = function () {
			let currentUser = AuthFactory.currentUser();
			let recipe = {
				uid: currentUser.userId,
				originalBrewer: editCtrl.recipe.originalBrewer,
				name: editCtrl.recipe.name,
				description: editCtrl.recipe.description,
				style: editCtrl.recipe.style,
				targetOG: editCtrl.recipe.targetOG,
				targetFG: editCtrl.recipe.targetFG,
				batchSize: editCtrl.recipe.batchSize,
				mashTemp: editCtrl.recipe.mashTemp,
				mashEff: editCtrl.recipe.mashEff,
				grainBill: editCtrl.recipe.grainBill,
				hops: editCtrl.recipe.hops,
				yeast: {
					name: editCtrl.recipe.yeast.name,
					starter: editCtrl.recipe.yeast.starter
				},
				comments: editCtrl.recipe.comments
			};

			console.log("recipe: ", recipe);

			RecipeFactory.updateRecipe($routeParams.id, recipe)
				.then($location.path.bind($location, `/profile/${currentUser.userId}`))
				.then($timeout);
		}

		editCtrl.cancel = function () {
			let currentUser = AuthFactory.currentUser();
			$location.path(`/profile/${currentUser.userId}`)
		}
	})
