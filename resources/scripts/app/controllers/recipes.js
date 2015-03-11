
app.factory('Recipe', ['$resource', function($resource)
{
    return $resource('/recipes/:action/:flavor/:id');

}]);

app.controller('RecipeListCtrl', ['$rootScope', '$scope', '$route', '$routeParams', '$location', 'Recipe', function($rootScope, $scope, $route, $routeParams, $location, Recipe)
{
    $scope.$route = $route;
    $scope.$location = $location;
    $scope.$routeParams = $routeParams;

    $scope.recipes = new Recipe.query($routeParams);


    $scope.updateRouteParams = function(selectedFlavor)
    {
        $location.path('/recipes/' + selectedFlavor);
    };


}]);

app.controller('RecipeCtrl', ['$rootScope', '$scope', '$route', '$routeParams', '$location', 'Recipe', function($rootScope, $scope, $route, $routeParams, $location, Recipe)
{
    $scope.$route = $route;
    $scope.$location = $location;
    $scope.$routeParams = $routeParams;

    $scope.recipe = new Recipe.get($routeParams);

}]);