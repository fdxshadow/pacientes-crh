// Invocar modo JavaScript 'strict'
'use strict';

// Crear el controller 'articles'
angular.module('secretaria').controller('ExampleController', ['$scope', 'Authentication',
  function($scope, Authentication) {
    $scope.authentication = Authentication;
  }
]);