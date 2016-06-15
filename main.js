angular.module("app", ["ngRoute", "angular.filter", "ui.bootstrap"])

			firebase.initializeApp({
	    	apiKey: "AIzaSyCR5ir0IC-4lGmOUc4B191v6xGFU-yMNlU",
	    	authDomain: "homebrew-buddy-53153.firebaseapp.com",
	    	databaseURL: "https://homebrew-buddy-53153.firebaseio.com",
	    	storageBucket: ""
	  	});

firebase.auth().signOut();
