
app.factory('Recipe', ['$resource', function($resource)
{
    return $resource('/admin/recipes/:id/:action', {id: "@id", action: "@action"},
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
            },
            preview: {
                method: 'POST',
                isArray: false,
                transformResponse: function(response) { return response; }
            }
        });

}]);