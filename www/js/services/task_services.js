var taskServices = angular.module('taskServices', ['ngResource']);

taskServices.factory('Task', ['$resource',
    function($resource){
        var url = 'https://todo-sample-ionic.herokuapp.com/api';
        return $resource(url + '/lists/:task_list_id/tasks/:id/:options',
            {task_list_id: '@task_list_id', id: '@id'},
            {
                complete: {method: 'PUT'},
                set_priority: {method: 'PUT'}
            }
        )
    }
]);