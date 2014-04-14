function newuserController($scope, $http, $routeParams, $location) {

	console.log("new user controller works");
	// Declare Variables
	var chatRef = new Firebase("https://angularfire-auth.firebaseio.com/Users");
	// Login Function
	var authClient = new FirebaseAuthClient(ref, function(error, user) {
	  if (error) {
	    alert(error);
	    return;
	  }
	  if (user) {
	    // User is already logged in.
	    doLogin(user);
	  } else {
	    // User is logged out.
	    showLoginBox();
	  }
	});

};