var myApp = angular.module('myApp', []);

myApp.controller('PetController', function($http){
    console.log('NG');
    var vm = this;
    vm.getPets = function(){
        $http({
            method: 'GET',
            url: '/pets',
        }).then(function(res){
            console.log('server response:', res.data);
        });
    }
    vm.getPets();
});