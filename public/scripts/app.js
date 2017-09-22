var myApp = angular.module('myApp', []);

myApp.controller('PetController', function ($http) {

    console.log('NG');
    var vm = this;
    vm.pets = [];
    vm.owners = [];
    vm.hideOwners = true;
    vm.showOwnersButtonText = "Show Owners"
    vm.addOwner = function () {
        $http({
            method: 'POST',
            url: '/owners',
            data: {
                first: vm.first_name,
                last: vm.last_name
            }
        }).then(function (res) {
            console.log('at addOwner success', res);
            vm.first_name = '';
            vm.last_name = '';
            vm.getOwners();
            vm.getPets();
        });
    };

    vm.getOwners = function () {
        $http({
            method: 'GET',
            url: '/owners',
        }).then(function (res) {
            vm.owners = res.data;
        });
    };

    vm.removeOwner = function (ownerId) {
        console.log('owner id:', ownerId);
        $http({
            method: 'DELETE',
            url: '/owners/' + ownerId,
        }).then(function (res) {
            vm.getOwners();
            vm.getPets();
        });
    };

    vm.toggleOwners = function() {
        vm.hideOwners = !vm.hideOwners;
        if (vm.hideOwners) {
            vm.showOwnersButtonText = "Show Owners"
        } else {
            vm.showOwnersButtonText = "Hide Owners"
        }
    }

    vm.toggleText = function (checked) {
        if (checked) {
            return 'Check Out';
        } else {
            return 'Check In';
        }
    };

    vm.getPets = function () {
        $http({
            method: 'GET',
            url: '/pets',
        }).then(function (res) {
            vm.pets = res.data;
        });
    };

    vm.addPet = function () {
        var ownerId = parseInt(vm.selected_owner.split(' ')[0]);
        console.log('ownerId : ', ownerId);
        
        $http({
            method: 'POST',
            url: '/pets',
            data: {
                owner_id: ownerId,
                name: vm.name,
                breed: vm.breed,
                color: vm.color,
                checked: vm.checked
            }
        }).then(function (res) {
            vm.getPets();
            vm.name = '';
            vm.breed = '';
            vm.color = '';
            vm.checked = '';
        });
    };

    vm.removePet = function (petId) {
        console.log('pet id:', petId);
        $http({
            method: 'DELETE',
            url: '/pets/' + petId,
        }).then(function (res) {
            vm.getPets();
        });
    };

    vm.checkPet = function () {
        console.log(vm.selected_pet);
        var idString = parseInt(vm.selected_pet.split(' ')[0]);
        console.log('idString: ', idString);
        $http({
            method: 'POST',
            url: '/visits',
            data: {
                pet_id: idString
            }
        }).then(function (res) {
            vm.getPets();
        });
    };
    
    vm.getOwners();
    vm.getPets();
});