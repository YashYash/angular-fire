var loginApp = angular.module('loginApp', ['ngRoute', 'firebase']);

loginApp.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.
        when('/', { templateUrl: 'views/login.html', controller: 'loginController' }).
        when('/new', { templateUrl: 'views/newuser.html', controller: 'newuserController' }).
        when('/loggedin', { templateUrl: 'views/loggedin.html', controller: 'loggedinController' });
}]);