var app = angular.module('myApp', ['ngRoute']);
app.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'partials/home.html',
            controller: 'postsCtrl'
        })
        .when('/comments/:id', {
            templateUrl: 'partials/comments.html',
            controller: 'commentsCtrl'
        })
        .otherwise({ redirectTo: '/' })
})