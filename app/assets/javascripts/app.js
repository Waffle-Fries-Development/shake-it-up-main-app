
var app = angular.module("ShakeItUp", ["ngRoute", "ngResource", "ngSanitize"]);

app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider)
    {
        $routeProvider
            .when('/select_a_flavor',
            {
                templateUrl: '/views/splash.html',
                controller: 'SplashCtrl'
            })
            .when('/recipe/:id/:action',
            {
                templateUrl: '/views/recipe_details.html',
                controller: 'RecipeCtrl'
            })
            .when('/recipes/:flavor?',
            {
                templateUrl: '/views/recipes.html',
                controller: 'RecipeListCtrl'
            })
            .otherwise('/select_a_flavor');

        // configure html5 to get links working on jsfiddle
        //$locationProvider.html5Mode(true);

    }]);
