
app.controller('BrandCtrl', ['$rootScope', '$scope', '$filter', '$route', '$routeParams', '$location', '$http', 'Brand', 'Flavor', function($rootScope, $scope, $filter, $route, $routeParams, $location, $http, Brand, Flavor)
{
    $scope.$route = $route;
    $scope.$location = $location;
    $scope.$routeParams = $routeParams;

    $scope.brands = new Brand.query();
    $scope.flavors = new Flavor.query();

    $scope.reset_error_messages = function()
    {
        $scope.errors = [];
        $scope.messages = [];
    };

    $scope.edit_form = function(index)
    {
        $scope.brand = $scope.brands[index];
        $scope.is_new = false;
    };

    $scope.new_form = function()
    {
        $scope.brand = new Brand();
        $scope.is_new = true;
    };

    $scope.save = function(authenticity_token)
    {
        $http.defaults.headers.common['X-CSRF-Token'] = authenticity_token;

        if($scope.is_new)
        {
            $scope.brand.$create(function(response)
            {
                if(response.error)
                {

                }
                else
                {
                    $scope.brands.push(response);
                    $('#brand_form').modal('hide');
                }
            });
        }
        else
        {
            $scope.brand.$update(function(response)
            {
                if(response.error)
                {

                }
                else
                {
                    var index = $scope.brands.indexOf(response);
                    $scope.brands[index] = response;
                    $('#brand_form').modal('hide');
                }
            });
        }

    };


    $scope.remove = function(index, authenticity_token)
    {
        $http.defaults.headers.common['X-CSRF-Token'] = authenticity_token;

        var brand = $scope.brands[index];

        brand.$delete(function(response)
        {
            if(response.error)
            {

            }
            else
            {
                $scope.brands = $filter('filter')($scope.brands, {id: '!' + brand.id});
            }
        });
    };


}]);