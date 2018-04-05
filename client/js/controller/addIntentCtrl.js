myApp.controller('addIntentCtrl', function ($scope, $window, Intent, $routeParams) {
    $scope.addIntent = function () {
        Intent.save({intent : $scope.newIntent, agentId: $routeParams}).$promise.then(function (resp) {
            $scope.newIntent.name = "";
            $window.location.href = '/dashboard/#!/Agent/'+ $routeParams.id;
        });
    }
})