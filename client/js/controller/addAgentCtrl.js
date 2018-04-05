myApp.controller('addAgentCtrl', function ($scope, $window, Agent) {
    $scope.addAgent = function () {
        Agent.save($scope.newAgent).$promise.then(function (resp) {
            $scope.newAgent.name = "";
            $window.location.href = '/dashboard/#!/Agent'
        });
    }
})