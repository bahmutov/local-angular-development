# local-angular-development

You do not need a server to do local Angular development.
Simple static file with local vendor libraries (like angularjs itself),
plus compiled templates, plus mock http E2E backend is enough.

## installation

You can run the example without any tools, but git:


```sh
git clone https://github.com/bahmutov/local-angular-development.git
cd local-angular-development/dist
```

open `index.html` in the browser. Should display simple list of names.

## building example

Requires [nodejs](http://nodejs.org/), [bower](http://bower.io/) and [grunt](http://gruntjs.com/).

```sh
npm install
bower install
grunt
```

This builds the local page and Angular example app inside *dist/* folder.
You can open `dist/index.html` as a local file in the browser and it should work.

## templates

The best angular practice is to have separate template files, linked to directives
via `templateUrl` parameter, for example see [names.js](src/names/names.js)
and [names.tpl.html](src/names/names.tpl.html).
Usually this would mean separate Ajax call. In this example all HTML templates are
compiled into JavaScript using [grunt-html2js](https://github.com/karlgoldstein/grunt-html2js)
plugin

```js
// compile all .tpl.html files into single module
html2js: {
  main: {
    options: {
      base: 'src',
      module: '<%= pkg.name %>.templates'
    },
    src: [ 'src/**/*.tpl.html' ],
    dest: 'tmp/<%= pkg.name %>.templates.js'
  }
}
```

Then concatenate the produced JavaScript file with the rest of the code, it will look
something like this:

```js
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
// names directive depends on the combined template module
var m = angular.module('names', ['local-angular-development.templates']);

function directive() {
  return {
    restrict: 'E',
    templateUrl: 'names/names.tpl.html',
    scope: {},
    controller: ['$scope', '$http', controller]
  };
}
...
```

You can see the entire produced file
[dist/local-angular-development.js](dist/local-angular-development.js)

## Ajax data

Frontend has nothing to show without data coming from backend.

For example [names](src/names/names.js) directive asks for list of names

```js
function controller($scope, $http) {
  $scope.names = [];
  $http.get('/api/names')
    .then(function (result) {
      $scope.names = result.data.names;
    });
}
```

Just running backend to serve data is wasteful. You can easily serve mock data
using [ngMockE2E.$httpBackend](http://docs.angularjs.org/api/ngMockE2E.$httpBackend).
This is different from the [ngMock.$httpBackend](http://docs.angularjs.org/api/ngMock.$httpBackend)!

*ngMockE2E.$httpBackend* is there to just serve data, without validating
number of requests. One can easily put it directly inside the
[index.html](https://github.com/bahmutov/local-angular-development/blob/master/index.html#L19)

```js
angular.module('tester', ['local-angular-development', 'ngMockE2E'])
  .run(function ($httpBackend) {
    $httpBackend.whenGET('/api/names')
    .respond({
      names: ['joe', 'john', 'adam']
    });
  });
```

## Watch and livereload


### author

Follow Gleb Bahmutov [@twitter](https://twitter.com/bahmutov),
see his projects at [glebbahmutov.com](http://glebbahmutov.com/)
