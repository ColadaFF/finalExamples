// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var finalExamples = angular.module('finalExamples', ['ionic', 'ngCordova']);

finalExamples.run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            StatusBar.styleDefault();
        }
    });
});

finalExamples.config(['$ionicConfigProvider', function ($ionicConfigProvider) {
    $ionicConfigProvider.tabs.position('bottom');
}]);

finalExamples.controller('contactController', function ($scope, $cordovaContacts, $ionicModal, $ionicPopup) {
    $scope.entity = 'Contácto';
    $scope.model = {};

    $ionicModal.fromTemplateUrl('templates/modals/addContact.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function (modal) {
        $scope.modal = modal;
    });
    $scope.openModal = function () {
        $scope.modal.show();
    };
    $scope.closeModal = function () {
        $scope.modal.hide();
    };

    $scope.getContactList = function () {
        $cordovaContacts.find({filter: ''}).then(function (result) {
            console.log(result);
            console.log(JSON.stringify(result));
            $scope.contacts = result;
        }, function (error) {
            console.log("ERROR: " + error);
        });
    };

    $scope.createContact = function () {
        var contactModel = {
            displayName: $scope.model.name,
            phoneNumbers: [
                {
                    type: 'mobile',
                    value: $scope.model.tel,
                    pref: true
                }
            ]
        };
        console.log(JSON.stringify(contactModel));
        $cordovaContacts.save(contactModel).then(function (result) {
            var alertPopup = $ionicPopup.alert({
                title: 'Genial!',
                template: 'Has creado un nuevo cont\xe1cto '
            });
            alertPopup.then(function (res) {
                console.log("closed", res);
            });
            $scope.closeModal();
            console.log(JSON.stringify(result));
        }, function (error) {
            var alertPopup = $ionicPopup.alert({
                title: 'Error!',
                template: error
            });
            alertPopup.then(function (res) {
                console.log('Closed!', res);
            });
            console.log(error);
        });
    };

    $scope.removeContact = function () {
    };
});