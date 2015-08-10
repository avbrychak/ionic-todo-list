var listController = angular.module('listController', []);

listController.controller('ListsController', [
    '$scope',
    '$ionicModal',
    '$stateParams',
    'List',
    function($scope, $ionicModal, $stateParams, List){
        $scope.list = {name: ''};

        $scope.lists = List.query();

        $ionicModal.fromTemplateUrl('templates/new_list.html', {
            scope: $scope
        }).then(function(modal) {
            $scope.modal = modal;
        });

        $scope.destroyList = function(listItem){
            List.delete({id: listItem.id});
            $scope.lists.splice($scope.lists.indexOf(listItem), 1);
        };
        $scope.addList = function(){
            var listItem = List.save($scope.list);
            $scope.lists.unshift(listItem);
            $scope.list = {name: ''};
        };
    }
]);