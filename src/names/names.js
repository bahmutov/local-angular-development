(function (angular) {
  var m = angular.module('names', ['local-angular-development.templates']);

  function directive() {
    return {
      restrict: 'E',
      templateUrl: 'names/names.tpl.html',
      scope: {},
      controller: ['$scope', '$http', controller]
    };
  }

  m.directive('names', directive);

  function controller($scope, $http) {
    $scope.names = ['one', 'two'];
  }
}(angular));
