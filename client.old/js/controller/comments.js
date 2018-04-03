app.controller('commentsCtrl', function ($scope, $rootScope, $routeParams, PostFactory) {

    $rootScope.loading = true;
    $scope.newComment = {};

    var post = PostFactory.getPost($routeParams.id).then(function (post) {
        $scope.comments = post.comments;
        $scope.title = post.name;
        $rootScope.loading = false;
    }, function (msg) {
        alert(msg);
        $rootScope.loading = false;
    })

    $scope.addCommment = function(){
        $scope.comments.push($scope.newComment)
        $scope.newComment = {}
    }

})