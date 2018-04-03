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

function getAvailableModels(models) {
    var arrModels = [];
    for (var i = 0; i <= models.length - 1; i++) {
        var name = models[i].substring(models[i].lastIndexOf("/") + 1);
        var xdate = parseKawaiiModelFolderDate(models[i]);
        arrModels.push({ name: name, folder: models[i], xdate: xdate, date: xdate.toString("MM/dd/yy h(:mm)TT") });
    }
    arrModels.sort(function (a, b) {
        return a.xdate[0] > b.xdate[0];
    });
    return arrModels;
}

function parseKawaiiModelFolderDate(folder) {
    var p = folder.substring(folder.lastIndexOf("_") + 1)
    var d = p.substring(0, 4) + '-' + p.substring(4, 6) + '-' + p.substring(6, 8) + 'T' + p.substring(9, 11) + ':' + p.substring(11, 13);
    var s = p.substring(4, 6) + '-' + p.substring(6, 8) + '-' + p.substring(0, 4);
    var t = p.substring(9, 11) + ':' + p.substring(11, 13);
    return new XDate(p.substring(0, 4), p.substring(4, 6) - 1, p.substring(6, 8), p.substring(9, 11), p.substring(11, 13))
}