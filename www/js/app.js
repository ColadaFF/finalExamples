// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var finalExamples = angular.module('finalExamples', ['ionic', 'ngCordova']);

finalExamples.run(function($ionicPlatform) {
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

finalExamples.controller('contactController', function($scope, $cordovaContacts, $ionicSideMenuDelegate){

  $scope.toggleLeft = function(){
    $ionicSideMenuDelegate.toggleLeft();
  };

  $scope.getContactList = function() {
    $cordovaContacts.find({filter: ''}).then(function(result) {
      $scope.contacts = result;
    }, function(error) {
      console.log("ERROR: " + error);
    });
  };

  $scope.createContact = function() { };

  $scope.removeContact = function() { };
});