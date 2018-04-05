myApp.controller('intentCtrl', function($scope, Intent, $routeParams){
    $scope.idAgent = $routeParams.id;
    Intent.get({id: $routeParams.id}, function(data) {
        if(data.error){

        } else {
            if(data.result == "Empty"){

            } else {
                $scope.intentList = data.result.List;
            }
        }
    });
})