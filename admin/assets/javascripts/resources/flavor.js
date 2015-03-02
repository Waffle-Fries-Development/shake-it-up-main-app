
app.factory('Flavor', ['$resource', function($resource)
{
    return $resource('/admin/flavors/:id', {id: "@id"},
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