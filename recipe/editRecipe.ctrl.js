angular.module("app")
	.controller("EditRecipeControl", function (
			AddRecipeFactory, EditRecipeFactory, $routeParams, AuthFactory, $location, $timeout
		) {
		const editCtrl = this;
		const FB_URL = "https://homebrew-buddy-53153.firebaseio.com";
		let currentUser = AuthFactory.currentUser();

		firebase.database().ref(`/users/${currentUser.userId}/recipes/${$routeParams.id}`).on("value", (snap) => {
			console.log("Recipe", snap.val());
			editCtrl.recipe = snap.val();
		})

		AddRecipeFactory.styles().then(res => editCtrl.stylesArray = res.data.map((style) => style.shortName));
		AddRecipeFactory.fermentables(currentUser.auth).then(res => editCtrl.fermentablesArray = res.data.map((ferm) => ferm.name));
		AddRecipeFactory.hops(currentUser.auth).then(res => editCtrl.hopsArray = res.data.map((hop) => hop.name));
		AddRecipeFactory.yeast().then(res => editCtrl.yeastArray = res.data.map((yeast) => yeast.name));
		AddRecipeFactory.srm().then(res => editCtrl.srmArray = res.data);

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
			let recipe = {
				name: editCtrl.recipe.name,
				description: editCtrl.recipe.description,
				style: editCtrl.recipe.style,
				targetOG: editCtrl.recipe.targetOG,
				batchSize: editCtrl.recipe.batchSize,
				mashTemp: editCtrl.recipe.mashTemp,
				mashEff: editCtrl.recipe.mashEff,
				grainBill: editCtrl.recipe.grainBill,
				hops: editCtrl.recipe.hops,
				yeast: {
					name: editCtrl.recipe.yeast.name,
					starter: editCtrl.recipe.yeast.starter
				}
			};
			console.log("recipe: ", recipe);
			EditRecipeFactory.updateRecipe($routeParams.id, recipe)
				.then($location.path.bind($location, `/profile/${currentUser.userId}`))
				.then($timeout);
		}

		editCtrl.cancel = function () {
			$location.path(`/profile/${currentUser.userId}`)
		}
	})