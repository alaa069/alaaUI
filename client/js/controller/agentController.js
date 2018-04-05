myApp.controller('agentCtrl', function($scope, Agent){
    Agent.get(function(data) {
        if(data.error){

        } else {
            if(data.result == "Empty"){

            } else {
                $scope.agentList = data.result.List;
            }
        }
    });
})