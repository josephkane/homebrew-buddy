angular.module("app")
	.factory("RecipeFactory", ($http) => {
		let styles;
		let fermentables;

		return {
			styles () {
				return $http
				.get("http://api.brewerydb.com/v2/styles/?key=47e0d3ca6616a3f10fa45c87f1787825")
					.then(res => {
					styles = res.data.data;
						return styles;
				});
			},
			getStyles () {
				return styles;
			},
			fermentables () {
				return $http
				.get("http://api.brewerydb.com/v2/fermentables/?key=47e0d3ca6616a3f10fa45c87f1787825")
					.then(res => {
					fermentables = res.data.data;
						return fermentables;
					})
			}
		}}
	)