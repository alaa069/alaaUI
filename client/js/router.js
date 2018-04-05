myApp.config(function($routeProvider){
    $routeProvider
        .when('/Dashboard',{
            templateUrl: 'template/Dashboard.html',
            activetab: 'dashboard'
        })
        .when('/Agent',{
            templateUrl: 'template/Agent.html',
            controller: 'agentCtrl',
            activetab: 'agent'
        })
        .when('/addAgent',{
            templateUrl: 'template/addAgent.html',
            controller: 'addAgentCtrl',
            activetab: 'agent'
        })
        .when('/Agent/:id',{
            templateUrl: 'template/Intents.html',
            controller: 'intentCtrl',
            activetab: 'agent'
        })
        .when('/Agent/:id/addIntent',{
            templateUrl: 'template/addIntent.html',
            controller: 'addIntentCtrl',
            activetab: 'agent'
        })
        .when('/Entities',{
            templateUrl: 'template/Entities.html',
            activetab: 'entities'
        })
        .when('/Training',{
            templateUrl: 'template/Training.html',
            activetab: 'training'
        })
        .when('/Settings',{
            templateUrl: 'template/Settings.html',
            activetab: 'settings'
        })
        .when('/Fulfillment',{
            templateUrl: 'template/Fulfillment.html',
            activetab: 'fulfillment'
        })
        .when('/Logs',{
            templateUrl: 'template/Logs.html',
            activetab: 'logs'
        })
        .when('/Configuration',{
            templateUrl: 'template/Configuration.html',
            activetab: 'configuration'
        })
        .when('/Logout',{
            templateUrl: 'template/Logout.html',
            activetab: 'logout'
        })
        .otherwise({redirectTo: '/Dashboard'})
})