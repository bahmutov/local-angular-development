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
via `templateUrl` parameter, for example see [src/names/names.js] and [src/names/names.tpl.html].
Usually this would mean separate Ajax call. In this example all HTML templates are
compiled into JavaScript using grunt

### author

Follow Gleb Bahmutov [@twitter](https://twitter.com/bahmutov),
see his projects at [glebbahmutov.com](http://glebbahmutov.com/)
