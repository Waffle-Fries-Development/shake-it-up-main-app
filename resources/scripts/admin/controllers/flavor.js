
app.controller('FlavorCtrl', ['$rootScope', '$scope', '$filter', '$route', '$routeParams', '$location', '$http', 'Flavor', function($rootScope, $scope, $filter, $route, $routeParams, $location, $http, Flavor)
{
    $scope.$route = $route;
    $scope.$location = $location;
    $scope.$routeParams = $routeParams;

    $scope.flavors = new Flavor.query();

    $scope.reset_error_messages = function()
    {
        $scope.errors = [];
        $scope.messages = [];
    };

    $scope.edit_form = function(index)
    {
        $scope.flavor = $scope.flavors[index];
        $scope.is_new = false;
    };

    $scope.new_form = function()
    {
        $scope.flavor = new Flavor();
        $scope.is_new = true;
    };

    $scope.save = function(authenticity_token)
    {
        $http.defaults.headers.common['X-CSRF-Token'] = authenticity_token;

        if($scope.is_new)
        {
            $scope.flavor.$create(function(response)
            {
                if(response.error)
                {

                }
                else
                {
                    $scope.flavors.push(response);
                    $('#flavor_form').modal('hide');
                }
            });
        }
        else
        {
            $scope.flavor.$update(function(response)
            {
                if(response.error)
                {

                }
                else
                {
                    var index = $scope.flavors.indexOf(response);
                    $scope.flavors[index] = response;
                    $('#flavor_form').modal('hide');
                }
            });
        }

    };


    $scope.remove = function(index, authenticity_token)
    {
        $http.defaults.headers.common['X-CSRF-Token'] = authenticity_token;

        var flavor = $scope.flavors[index];

        flavor.$delete(function(response)
        {
            if(response.error)
            {

            }
            else
            {
                $scope.flavors = $filter('filter')($scope.flavors, {id: '!' + flavor.id});
            }
        });
    };


}]);