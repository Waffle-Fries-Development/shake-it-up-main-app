app.factory('Account', ['$resource', function($resource)
{
    return $resource('/admin/accounts/:userId', {userId: "@id"},
        {
            create: {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                isArray: false
            },
            update: {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                isArray: false
            }
        });

}]);
