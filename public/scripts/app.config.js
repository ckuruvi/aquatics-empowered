// routing
angular
  .module("aquaticsApp")
  .config(function($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);

    $routeProvider
      .when("/newUser", {
        templateUrl: "views/register.html",
        controller: "RegisterController as register"
      })
      .when("/admin", {
        templateUrl: "views/admin.html",
        controller: "AdminController as admin"
      })
      .when("/login", {
        templateUrl: "views/login.html",
        controller: "LoginController as login"
    })
      .when("/facilitydetails", {
        templateUrl: "views/facilitydetails.html",
        controller: "FacilityDetailsController as facilitydetails"
      })
      .when("/profile", {
        templateUrl: "views/profileView.html",
        controller: "userProfileController as user"
      })
      .otherwise( {
        templateUrl: "views/home.html",
        controller: "HomeController as home",
        //authRequired: true
      })
  })
  .run(function($rootScope, $location, $route, AuthService) {
    $rootScope.$on("$routeChangeStart", function(event, next, current) {
      AuthService.checkLoginStatus().then(function(loggedIn) {
        if (next.authRequired && !loggedIn) {
          $location.path("/login");
          $route.reload();
        }
      });
    });
  });
