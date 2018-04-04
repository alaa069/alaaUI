myApp.factory('NLU', function($http, $q) {
    var factory = {
        version : function() {
            var deferred = $q.defer();
            var versionNLU;
            $http.get('/api/v2/nlu/version').then(function(data, status){
                versionNLU = getAvailableModels(data.data.available_models)
                deferred.resolve(versionNLU)
            }, function(data, status){
                deferred.reject('NLU server cannot answer')
            })
            return deferred.promise;
        },
        status : function() {
            var deferred = $q.defer();
            var statusNLU;
            $http.get('/api/v2/nlu/status').then(function(data, status){
                statusNLU = getAvailableModels(data.data.available_models)
                deferred.resolve(statusNLU)
            }, function(data, status){
                deferred.reject('NLU server cannot answer')
            })
            return deferred.promise;
        },
        config : function() {
            var deferred = $q.defer();
            var configNLU;
            $http.get('/api/v2/nlu/config').then(function(data, status){
                configNLU = getAvailableModels(data.data.available_models)
                deferred.resolve(configNLU)
            }, function(data, status){
                deferred.reject('NLU server cannot answer')
            })
            return deferred.promise;
        },
        parse : function(q, model) {
            return $http.get('/api/v2/nlu/parse?q=' + q + '&model=' + model);
        }
    }
    return factory;
});