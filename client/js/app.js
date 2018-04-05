var api_endpoint_v2 = '/api'; //kawaii UI API = location of Nodejs server.js script running, edit this if the nodejs web front end is not running on the server instance

var api_train_v2 = '/train'

var api_webhook = '/webhooks'

var myApp = angular.module('myApp', ['ngRoute', 'jsonFormatter', 'ng-route-active', 'ngResource']);