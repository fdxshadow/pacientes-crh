angular.module('secretaria').controller('ExampleController', ['$scope',
  function($scope) {
    $scope.name = 'Usuario';
  }
]);

angular.module('secretaria').controller('ExampleController', ['$scope', 'Authentication',
  function($scope, Authentication) {
    $scope.name = Authentication.user ? Authentication.user.fullName : 'Usuario';
  }
]);