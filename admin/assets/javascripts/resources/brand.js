
app.factory('Brand', ['$resource', function($resource)
{
    return $resource('/admin/brands/:id', {id: "@id"},
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