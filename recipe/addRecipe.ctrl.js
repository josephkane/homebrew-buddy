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
						info: addCtrl.fermentableOne,
						percentage: addCtrl.fermPercentOne,
						name: addCtrl.fermentableOne.name
					},
					{
						info: addCtrl.fermentableTwo,
						percentage: addCtrl.fermPercentTwo,
						name: addCtrl.fermentableTwo.name
					},
					{
						info: addCtrl.fermentableThree,
						percentage: addCtrl.fermPercentThree,
						name: addCtrl.fermentableThree.name,
					},
					{
						info: addCtrl.fermentableFour,
						percentage: addCtrl.fermPercentFour,
						name: addCtrl.fermentableFour.name
					},
					{
						info: addCtrl.fermentableFive,
						percentage: addCtrl.fermPercentFive,
						name: addCtrl.fermentableFive.name
					}
				],
				hops: [
					{
						info: addCtrl.hopsOne,
						aa: addCtrl.aaOne,
						oz: addCtrl.ozOne,
						boil: addCtrl.boilOne,
						name: addCtrl.hopsOne.name
					},
					{
						info: addCtrl.hopsTwo,
						aa: addCtrl.aaTwo,
						oz: addCtrl.ozTwo,
						boil: addCtrl.boilTwo,
						name: addCtrl.hopsTwo.name
					},
					{
						info: addCtrl.hopsThree,
						aa: addCtrl.aaThree,
						oz: addCtrl.ozThree,
						boil: addCtrl.boilThree,
						name: addCtrl.hopsThree.name
					},
					{
						info: addCtrl.hopsFour,
						aa: addCtrl.aaFour,
						oz: addCtrl.ozFour,
						boil: addCtrl.boilFour,
						name: addCtrl.hopsFour.name
					},
					{
						info: addCtrl.hopsFive,
						aa: addCtrl.aaFive,
						oz: addCtrl.ozFive,
						boil: addCtrl.boilFive,
						name: addCtrl.hopsFive.name
					},
					{
						info: addCtrl.hopsSix,
						aa: addCtrl.aaSix,
						oz: addCtrl.ozSix,
						boil: addCtrl.boi,lSix,
						name: addCtrl.hopsSix.name
					},
					{
						info: addCtrl.hopsSeven,
						aa: addCtrl.aaSeven,
						oz: addCtrl.ozSeven,
						boil: addCtrl.boilSeven,
						name: addCtrl.hopsSeven.name
					},
					{
						info: addCtrl.hopsEight,
						aa: addCtrl.aaEight,
						oz: addCtrl.ozEight,
						boil: addCtrl.boilEight,
						name: addCtrl.hopsEight.name
					},
					{
						info: addCtrl.hopsNine,
						aa: addCtrl.aaNine,
						oz: addCtrl.ozNine,
						boil: addCtrl.boilNine,
						name: addCtrl.hopsNine.name
					},
					{
						info: addCtrl.hopsTen,
						aa: addCtrl.aaTen,
						oz: addCtrl.ozTen,
						boil: addCtrl.boilTen,
						name: addCtrl.hopsTen.name
					}
				],
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