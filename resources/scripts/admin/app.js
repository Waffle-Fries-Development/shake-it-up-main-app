
var app = angular.module("ShakeItUpAdmin", ["ngRoute", "ngResource", "ui.bootstrap", "ngSanitize"]);

app.factory('Sessions', ['$resource', function($resource)
    {
        return $resource('/admin/sessions/:action');

    }])

    .config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider)
    {
        $routeProvider
            .when('/dashboard',
            {
                templateUrl: '/admin/views/dashboard.html',
                controller: 'DashboardCtrl'
            })
            .when('/accounts',
            {
                templateUrl: '/admin/views/accounts.html',
                controller: 'AccountCtrl'
            })
            .when('/flavors',
            {
                templateUrl: '/admin/views/flavors.html',
                controller: 'FlavorCtrl'
            })
            .when('/brands',
            {
                templateUrl: '/admin/views/brands.html',
                controller: 'BrandCtrl'
            })
            .when('/recipes',
            {
                templateUrl: '/admin/views/recipes.html',
                controller: 'RecipeCtrl'
            })
            .otherwise('/dashboard');

        // configure html5 to get links working on jsfiddle
        //$locationProvider.html5Mode(true);

    }])

    .controller('HeaderCtrl', ['$rootScope', '$scope', '$route', '$routeParams', '$location', function($rootScope, $scope, $route, $routeParams, $location)
    {
        $scope.$route = $route;
        $scope.$location = $location;
        $scope.$routeParams = $routeParams;

    }])

    .controller('SidebarCtrl', ['$rootScope', '$scope', '$route', '$routeParams', '$location', function($rootScope, $scope, $route, $routeParams, $location)
    {
        $scope.$route = $route;
        $scope.$location = $location;
        $scope.$routeParams = $routeParams;

    }])

    .controller('DashboardCtrl', ['$rootScope', '$scope', '$route', '$routeParams', '$location', function($rootScope, $scope, $route, $routeParams, $location)
    {
        $scope.$route = $route;
        $scope.$location = $location;
        $scope.$routeParams = $routeParams;

    }])

    .controller('DeleteConfirmModalInstanceCtrl', ['$rootScope', '$scope', '$route', '$routeParams', '$location', function($scope, $modalInstance, object)
    {
        $scope.object = object;
        $scope.message_text =  (object.hasOwnProperty('name')) ? object.name : object.id;
        $scope.title = 'Delete ' + $scope.message_text;

        $scope.ok = function (authenticity_token)
        {
            $modalInstance.close({data: $scope.object, csrf: authenticity_token});
        };

        $scope.cancel = function ()
        {
            $modalInstance.dismiss('cancel');
        };

    }]);

