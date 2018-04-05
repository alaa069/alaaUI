myApp.factory('Agent', function ($resource) {
    return $resource(api_endpoint_v2 + '/agents');
});

myApp.factory('Intent', function ($resource) {
    return $resource(api_endpoint_v2 + '/intents/:id');
});