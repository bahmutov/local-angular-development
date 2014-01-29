angular.module('local-angular-development.templates', ['names/names.tpl.html']);

angular.module("names/names.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("names/names.tpl.html",
    "<div>\n" +
    "  <ul>\n" +
    "    <li ng-repeat=\"name in names\">{{name}}</li>\n" +
    "  </ul>\n" +
    "</div>\n" +
    "");
}]);

angular.module('local-angular-development', ['names']);

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
    $scope.names = [];
    $http.get('/api/names')
      .then(function (result) {
        $scope.names = result.data.names;
      });
  }
}(angular));
