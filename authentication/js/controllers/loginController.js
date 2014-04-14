function loginController($scope, $http, $routeParams, $location) {
	
	console.log("loginController works");

// this is derived from
// http://stackoverflow.com/questions/15167981/how-do-i-use-firebase-simple-login-with-email-password/15167983#15167983


var ref = new Firebase("https://angularfire-auth.firebaseio.com");
var user_api = new Firebase("https://angularfire-auth.firebaseio.com/Users");
// then go to your firebase console, click the auth tab, scroll down to 
// global user (is this a good thing?)
myUser=-1;
console.log("TEST 1");

console.log("TEST 1");
 $("#opener-register").click(function () {
 $("#dialog-register").dialog("open");
  });
$(function () {
    $("#dialog-register").dialog({
        autoOpen: false,
        buttons: {
            "ok": function () {
            	var full_name = $("#name_user").val();
                var email = $("#register-email").val();
                var password = $("#register-password").val();
                authClient.createUser(email, password, function (error, user) {
                    if (!error) {
                        console.log('logging new registered user');
                        doLogin(email, password);
            			scope.$apply(function() { $location.path("/loggedin"); });
                    } else {
                        alert(error);
                    }
                });

                $(this).dialog("close");
            },
            Cancel: function () {
                $(this).dialog("close");
            }
        }
    });
 console.log("TEST 2");

    $("#dialog-login").dialog({
        autoOpen: false,
        buttons: {
            "ok": function () {

                console.log('trying to login: ' + $("#login-email").val());

                var email = $("#login-email").val();
                var password = $("#login-password").val();

                doLogin(email, password);

                $(this).dialog("close");
            },
            Cancel: function () {
                $(this).dialog("close");
            }
        }
    });

    $("#opener-register").click(function () {
        $("#dialog-register").dialog("open");
    });

    $("#opener-login").click(function () {
        $("#dialog-login").dialog("open");
    });

    $("#opener-logout").click(function () {
        authClient.logout();
    });
});

function doLogin(email, password) {
    authClient.login('password', {
        email: email,
        password: password
    });
};

var authClient = new FirebaseSimpleLogin(ref, function (error, user) {
    if (error) {
        alert(error);
        return;
    }
    if (user) {
        // User is already logged in.
        console.log('User ID: ' + user.id + ', Provider: ' + user.provider);
        myUser = user;
        // doLogin(user);
        console.log('logged in')
        $("#data").attr('disabled', false);
        $("#opener-logout").attr('disabled', false);
        $("#opener-login").attr('disabled', true);
    } else {
        // User is logged out.
        console.log('logged out');
        $("#data").attr('disabled', true);
        $("#opener-logout").attr('disabled', true);
        $("#opener-login").attr('disabled', false);
        // ("#dialog-form").dialog("open");
    }
});



$('#data').keypress(function (e) {
    if (e.keyCode == 13) {
        var data = $('#data').val();
        console.log(myUser.id);
        var myRef = new Firebase("https://angularfire-auth.firebaseio.com/users" + myUser.id);
        myRef.push({
            data: data
        });
        $('#data').val('');
    }
});



}






	// var ref = new Firebase("https://angularfire-auth.firebaseio.com/Users");
	// var authClient = new FirebaseSimpleLogin(ref, function(error, user) {
	//   if (error) {
	//     alert(error);
	//     return;
	//   }
	//   if (user) {
	//     // User is already logged in.
	//     doLogin(user);
	//   } else {
	//     // User is logged out.
	//     showLoginBox();
	//   }
	// });

	// $scope.newUser = function showLoginBox() {
	// 	$('#signupbox').show();
	// 	// Do whatever DOM operations you need to show the login/registration box.
	// 	$("#registerButton").on("click", function() {
	// 	var email = $("#email").val();
	// 	var password = $("#password").val();
	// 	console.log(email, password);
	// 		authClient.createUser(email, password, function(error,  user) {
	// 		  if (!error) {
	// 		    doLogin(user);
	// 		  } else {
	// 		    alert(error);
	// 		  }
	// 		});
	// 	});
	// }

	// function showLoginBox() {

	// 	// Do whatever DOM operations you need to show the login/registration box.
	// 	$("#loginButton").on("click", function() {
	// 		authClient.login("password", {
	// 		email: $("#email").val(),
	// 		password: $("#password").val(),
	// 		rememberMe: $("#rememberCheckbox").val()
	// 		});
	// 	});
	// }