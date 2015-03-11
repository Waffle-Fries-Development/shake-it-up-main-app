
app.controller('SplashCtrl', ['$rootScope', '$scope', '$route', '$routeParams', '$location', function($rootScope, $scope, $route, $routeParams, $location)
{
    $scope.$route = $route;
    $scope.$location = $location;
    $scope.$routeParams = $routeParams;


}]);