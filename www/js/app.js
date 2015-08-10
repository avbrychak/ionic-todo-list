// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var todoApp = angular.module('todoApp', [
    'ionic',
    'listController',
    'listsTasksController',
    'listServices',
    'taskServices'
])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
});

todoApp.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('lists', {
      url: '/lists',
      templateUrl: 'templates/lists.html',
      controller: 'ListsController'
    })
    .state('tasks', {
      url: "/lists/:task_list_id/tasks",
      templateUrl: "templates/tasks.html",
      controller: "ListTasksController"
    });              
  $urlRouterProvider.otherwise('/lists');
});


