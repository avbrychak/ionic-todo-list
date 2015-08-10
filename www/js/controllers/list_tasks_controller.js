var listsTasksController = angular.module('listsTasksController', []);

listsTasksController.controller('ListTasksController', [
    '$scope',
    '$stateParams',
    '$ionicModal',
    'Task',
    function($scope, $stateParams, $ionicModal, Task){
        $scope.task = {name: '', completed: false};

        $scope.tasks = Task.query({task_list_id: $stateParams.task_list_id});

        $scope.data = {
            showReorder: false
        };

        $ionicModal.fromTemplateUrl('templates/new_list.html', {
            scope: $scope
        }).then(function(modal) {
            $scope.modal = modal;
        });

        $scope.moveTask = function(taskItem, fromIndex, toIndex) {
            var target_item = $scope.tasks[toIndex]
            Task.set_priority({task_list_id: $stateParams.task_list_id, id: target_item.id, options: 'set_priority'}, {target_priority: fromIndex})
            $scope.tasks.splice(fromIndex, 1);
            $scope.tasks.splice(toIndex, 0, taskItem);
            Task.set_priority({task_list_id: $stateParams.task_list_id, id: taskItem.id, options: 'set_priority'}, {target_priority: toIndex})
        };

        $scope.addTask = function(){
            var taskItem = Task.save({task_list_id: $stateParams.task_list_id}, {name: $scope.task.name, target_priority: 0});
            $scope.tasks.unshift(taskItem);
            $scope.task.name = '';
        };
        $scope.destroyTask = function(taskItem){
            Task.delete({task_list_id: $stateParams.task_list_id},{id: taskItem.id});
            $scope.tasks.splice($scope.tasks.indexOf(taskItem), 1);
        };
        $scope.completeTask = function(taskItem){
            Task.complete({task_list_id: $stateParams.task_list_id, id: taskItem.id, options: 'complete'}, {completed: taskItem.completed})
        }
    }
]);