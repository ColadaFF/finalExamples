// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var finalExamples = angular.module('finalExamples', ['ionic', 'ngCordova']);

finalExamples.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
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

finalExamples.config(['$ionicConfigProvider', function($ionicConfigProvider) {
  $ionicConfigProvider.tabs.position('bottom');
}]);

finalExamples.controller('contactController', function($scope, $cordovaContacts, $ionicModal, $ionicPopup) {
  $scope.entity = 'Cont�cto';
  $scope.model = {};

  $ionicModal.fromTemplateUrl('templates/modals/addContact.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });
  $scope.openModal = function() {
    $scope.modal.show();
  };
  $scope.closeModal = function() {
    $scope.modal.hide();
  };

  $scope.getContactList = function() {
    $cordovaContacts.find({
      filter: ''
    }).then(function(result) {
      console.log(result);
      console.log(JSON.stringify(result));
      $scope.contacts = result;
    }, function(error) {
      console.log("ERROR: " + error);
    });
  };

  $scope.createContact = function() {
    var contactModel = {
      displayName: $scope.model.name,
      phoneNumbers: [{
        type: 'mobile',
        value: $scope.model.tel,
        pref: true
      }]
    };
    console.log(JSON.stringify(contactModel));
    $cordovaContacts.save(contactModel).then(function(result) {
      var alertPopup = $ionicPopup.alert({
        title: 'Genial!',
        template: 'Has creado un nuevo cont\xe1cto '
      });
      alertPopup.then(function(res) {
        console.log("closed", res);
      });
      $scope.closeModal();
      console.log(JSON.stringify(result));
    }, function(error) {
      var alertPopup = $ionicPopup.alert({
        title: 'Error!',
        template: error
      });
      alertPopup.then(function(res) {
        console.log('Closed!', res);
      });
      console.log(error);
    });
  };

  $scope.removeContact = function(contact) {
    $scope.currentContact = contact;
    $ionicModal.fromTemplateUrl('templates/modals/removeContact.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(removeModal) {
      $scope.removeModal = removeModal;
    });
    $scope.removeModal.show();
  };

  $scope.closeRemoveModal = function() {
    $scope.removeModal.hide();
  };
  $scope.$on('$destroy', function() {
    $scope.modal.remove();
    $scope.removeModal.remove();
  });

  $scope.removeCurrentContact = function(currentContact) {
    $cordovaContacts.remove({
      "id": currentContact.id
    }).then(function(result) {
      var alertPopup = $ionicPopup.alert({
        title: 'Genial!',
        template: 'Has eliminado el cont\xe1cto '
      });
      $scope.getContactList();
      $scope.closeRemoveModal();
      alertPopup.then(function(res) {
        console.log("closed", res);
      });
    }, function(error) {
      var alertPopup = $ionicPopup.alert({
        title: 'Error!',
        template: JSON.stringify(currentContact.id, error)
      });
      alertPopup.then(function(res) {
        console.log('Closed!', res);
      });
    });
  };
});

finalExamples.controller("cameraController", function($scope, $cordovaCamera, $ionicPopup) {
  $scope.takePicture = function() {
    var options = {
      quality: 75,
      destinationType: Camera.DestinationType.DATA_URL,
      sourceType: Camera.PictureSourceType.CAMERA,
      allowEdit: true,
      encodingType: Camera.EncodingType.JPEG,
      targetWidth: 300,
      targetHeight: 300,
      popoverOptions: CameraPopoverOptions,
      saveToPhotoAlbum: false
    };

    $cordovaCamera.getPicture(options).then(function(imageData) {
      $scope.imgURI = "data:image/jpeg;base64," + imageData;
    }, function(err) {
      // An error occured. Show a message to the user
    });
  };

  $scope.pictureURL = function() {
    var options = {
      destinationType: Camera.DestinationType.FILE_URI,
      sourceType: Camera.PictureSourceType.CAMERA,
    };

    $cordovaCamera.getPicture(options).then(function(imageURI) {
      var alertPopup = $ionicPopup.alert({
        title: 'Exito!!',
        template: imageURI
      });
    }, function(err) {
      var alertPopup = $ionicPopup.alert({
        title: 'Error!',
        template: JSON.stringify(err)
      });
    });
  };
});
