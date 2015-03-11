app.controller('AccountCtrl', ['$rootScope', '$scope', '$filter', '$route', '$routeParams', '$location', '$http', 'Account', function($rootScope, $scope, $filter, $route, $routeParams, $location, $http, Account)
{
    $scope.$route = $route;
    $scope.$location = $location;
    $scope.$routeParams = $routeParams;

    // set sidebar closed and body solid layout mode
    //$rootScope.settings.layout.pageSidebarClosed = false;

    $scope.accounts = new Account.query();

    $scope.reset_error_messages = function()
    {
        $scope.errors = [];
        $scope.messages = [];
    };

    $scope.edit_form = function(index)
    {
        $scope.account = $scope.accounts[index];
        $scope.is_new = false;
    };

    $scope.new_form = function()
    {
        $scope.account = new Account();
        $scope.is_new = true;
    };

    $scope.save = function(authenticity_token)
    {
        $http.defaults.headers.common['X-CSRF-Token'] = authenticity_token;

        if($scope.is_new)
        {
            $scope.account.$create(function(response)
            {
                if(response.error)
                {

                }
                else
                {
                    $scope.accounts.push(response);
                    $('#account_form').modal('hide');
                }
            });
        }
        else
        {
            $scope.account.$update(function(response)
            {
                if(response.error)
                {

                }
                else
                {
                    var index = $scope.accounts.indexOf($scope.account);
                    $scope.accounts[index] = response;
                    $('#account_form').modal('hide');
                }
            });
        }

    };

    $scope.remove = function(index, authenticity_token)
    {
        $http.defaults.headers.common['X-CSRF-Token'] = authenticity_token;

        var account = $scope.accounts[index];

        account.$delete(function(response)
        {
            if(response.error)
            {

            }
            else
            {
                $scope.accounts = $filter('filter')($scope.accounts, {id: '!' + account.id});
            }
        });
    };

}]);
