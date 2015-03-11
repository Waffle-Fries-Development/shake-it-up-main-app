
app.controller('RecipeModalInstanceCtrl', ['$scope', '$http', '$modalInstance', 'Recipe', 'is_new', 'brands', 'recipe', function($scope, $http, $modalInstance, Recipe, is_new, brands, recipe)
{
    $scope.brands = brands;
    $scope.recipe = recipe;
    $scope.is_new = is_new;
    $scope.preview_data = null;

    $scope.loadPreview = function (authenticity_token)
    {
        $http.defaults.headers.common['X-CSRF-Token'] = authenticity_token;

        $http.post('/admin/recipes/preview', $scope.recipe.instructions).
            success(function(data, status, headers, config)
            {
                $scope.preview_data = data;
            });
    };

    $scope.ok = function (form, authenticity_token)
    {
        $modalInstance.close({form: form, data: $scope.recipe, csrf: authenticity_token});
    };

    $scope.cancel = function ()
    {
        $modalInstance.dismiss('cancel');
    };
}])

.controller('RecipeCtrl', ['$rootScope', '$scope', '$filter', '$route', '$modal', '$routeParams', '$location', '$http', 'Recipe', 'Brand', function($rootScope, $scope, $filter, $route, $modal, $routeParams, $location, $http, Recipe, Brand)
{
    $scope.$route = $route;
    $scope.$location = $location;
    $scope.$routeParams = $routeParams;

    $scope.recipes = new Recipe.query();
    $scope.brands = new Brand.query();

    $scope.edit_form = function(index)
    {
        $scope.recipe = $scope.recipes[index];

        var modalInstance = $modal.open({
            templateUrl: '/admin/views/recipe_form.html',
            controller: 'RecipeModalInstanceCtrl',
            resolve: {
                is_new: function () { return false; },
                brands: function () { return $scope.brands; },
                recipe: function () { return $scope.recipe; }
            }
        });

        modalInstance.result.then(function (modal)
        {
            if(modal.form.$dirty)
            {
                $scope.recipe = modal.data;
                $http.defaults.headers.common['X-CSRF-Token'] = modal.csrf;

                $scope.recipe.$update(function(response)
                {
                    if(response.error)
                    {

                    }
                    else
                    {
                        var index = $scope.recipes.indexOf(response);
                        $scope.recipes[index] = response;
                    }
                });
            }

        });

    };

    $scope.new_form = function()
    {
        $scope.recipe = new Recipe();

        var modalInstance = $modal.open({
            templateUrl: '/admin/views/recipe_form.html',
            controller: 'RecipeModalInstanceCtrl',
            resolve: {
                is_new: function () { return true; },
                brands: function () { return $scope.brands; },
                recipe: function () { return $scope.recipe; }
            }
        });

        modalInstance.result.then(function (modal)
        {
            if(modal.form.$dirty)
            {
                $scope.recipe = modal.data;
                $http.defaults.headers.common['X-CSRF-Token'] = modal.csrf;

                $scope.recipe.$create(function(response)
                {
                    if(response.error)
                    {

                    }
                    else
                    {
                        $scope.recipes.push(response);
                    }
                });

            }

        });

    };

    $scope.remove = function(index)
    {
        var modalInstance = $modal.open({
            templateUrl: '/admin/views/delete_confirmation.html',
            controller: 'DeleteConfirmModalInstanceCtrl',
            resolve: {
                object: function () { return $scope.recipes[index]; }
            }
        });

        modalInstance.result.then(function (form)
        {
            $scope.recipe = form.data;
            $http.defaults.headers.common['X-CSRF-Token'] = form.csrf;

            $scope.recipe.$delete(function(response)
            {
                if(response.error)
                {

                }
                else
                {
                    $scope.recipes = $filter('filter')($scope.recipes, {id: '!' + $scope.recipe.id});
                }
            });

        });

    };


}]);