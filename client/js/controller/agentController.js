myApp.controller('agentCtrl', function($scope, $route, NLU){
    $scope.available_models = [];
    $scope.chatText = '';
    $scope.chatModel = '';

    NLU.status().then(function(models){
        $scope.available_models = models
    }, function(msg){
        console.log(msg)
    })

    $scope.executeChatRequest = function(){
        if(($scope.chatText != '')&&($scope.chatModel != '')){
            NLU.parse($scope.chatText, $scope.chatModel).then(function(data){
                $scope.chatText = '';
                $scope.exportdata = data.data;
            }, function(msg){
                console.log(msg)
            })
        }
    }

})