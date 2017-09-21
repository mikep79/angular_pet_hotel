var myApp = angular.module('myApp', []);

myApp.controller('PetController', function($http){
    
    console.log('NG');
    var vm = this;
    vm.pets = [];

    vm.toggleText= function (checked) {
        if (checked) {
            return 'Check Out';
        } else {
            return 'Check In';
        }
    };

    vm.getPets = function(){
        $http({
            method: 'GET',
            url: '/pets',
        }).then(function(res){
            vm.pets = res.data;
        });
    }
    vm.getPets();

    vm.addPet = function(){
        $http({
            method: 'POST',
            url: '/pets',
            data: {
                name: vm.name,
                breed: vm.breed,
                color: vm.color,
                checked: vm.checked
            }
        }).then(function(res) {
            vm.getPets();
        })
    }

    vm.removePet = function(petId){
        console.log('pet id:', petId);
        $http({
            method: 'DELETE',
            url: '/pets/' + petId,
        }).then(function(res) {
            vm.getPets();
        })
    }

    vm.checkPet = function(pet){
        pet.checked = !pet.checked;
        $http({
            method: 'PUT',
            url: '/pets/' + pet.id,
            data: pet
        }).then(function(res){
            vm.getPets();
        })
    }
});