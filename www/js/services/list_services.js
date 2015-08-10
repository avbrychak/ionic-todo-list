var listServices = angular.module('listServices', ['ngResource']);

listServices.factory('List', ['$resource',
    function($resource){
        var url = 'https://todo-sample-ionic.herokuapp.com/api';
        return $resource(url + '/lists/:id', {id: '@id', tasks: '@tasks'})
    }
]);