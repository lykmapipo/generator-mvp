# generator-mvp [![Build Status](https://secure.travis-ci.org/lykmapipo/generator-mvp.png?branch=master)](https://travis-ci.org/lykmapipo/generator-mvp)

Set of generators to kick start nodejs API based application with [pm2](https://github.com/Unitech/pm2), [mongoose](https://github.com/Automattic/mongoose), [expressjs](https://github.com/strongloop/express/), [angular](https://github.com/angular/angular.js) and others. Based on [yeoman](https://github.com/yeoman/yeoman) and highly inspired by [rails](https://github.com/rails/rails) and other famous generators.

*Warning!: `yo mvp:angular` sub-generator have to be used with [generator-angular](https://github.com/yeoman/generator-angular) not otherwise and it works only with [ui-router](https://github.com/angular-ui/ui-router)*

*Warning!: There are major changes to v1.0.0+, before using it please backup or commit your application changes*

## Usage

- Install `yo`, `grunt-cli`, and `generator-mvp`

```bash
$ npm install -g grunt-cli yo generator-mvp
```

- Make a new directory, and `cd` into it:

```bash
$ mkdir mvp && cd $_
```

- Run `yo mvp` to generate application skeleton

```bash
$ yo mvp
```

- Run `grunt dev` to launch your application and watch for codes changes 


## Workflow Tasks
`generator-mvp` provide a set of `grunt tasks` for use during development and testing.

### `grunt dev`
To run in development mode use
```sh
$ grunt dev
``` 

### `grunt test`
To run in test mode use
```sh
$ grunt test
```

### `grunt prod`
To run in production mode use
```sh
$ grunt prod
```

### `grunt spec`
To run all tests or specifications use
```sh
$ grunt spec
```
For targeted spec or test runner see project `Gruntfile`


## Generators

Available generators:

* [mvp](#app) (aka [mvp:app](#app))
* [mvp:api](#api)
* [mvp:model](#model)
* [mvp:controller](#controller)
* [mvp:middleware](#middleware)
* [mvp:lib](#library)
* [mvp:angular](#angular)

And more to come based on what we daily need in our `expressjs` an `mongoose` development workflows.

### App
Sets up a new  `expressjs` and `mongoose` app, generating all the boilerplate you need to get started.

Example of generating an application: 
```bash
$ yo mvp
```

### Api
Set up new mongoose `model`, `controller`, `router` and their `spec/test` boilerplates. To generate a new api invoke `yo mvp:api` followed with model definition

Example of generating simple api
```bash
$ yo mvp:api user name:String dob:Date
```

Example of generating api with multi name
```bash
$ yo mvp:api item_category name:String dob:Date
```


### Model
Set up new mongoose `Schema` with its `spec/test` boilerplate and register it to mongoose. To generate new model invoke `yo mvp:model` with model name and its attributes separated by space.

*Note!: Only mongoose schema types are supported as attributes*

Example of generating simple model
```bash
$ yo mvp:model user name:String dob:Date
```

Example of generating model with multi name
```bash
$ yo mvp:model item_category name:String dob:Date
```

Example of generating model including `refs` to other model
```bash
$ yo mvp:model post content:String author:ObjectId:User 
```

### Controller
Set up new `controller`, its `actions` and an `express router`. To generate a new controller invoke `yo mvp:controller` giving its name and actions separated by space.

Example of generating controller including frontend
```bash
$ yo mvp:controller index create edit
```

### Middleware
Set up new express `middleware` with it `test/spec` boilerplate. To generate a new express middleware invoke `yo mvp:middleware` and giving its name.

Example of generating middleware
```bash
$ yo mvp:middleware guard
```

### Library
Set up new `nodejs module` with it `test/spec` boilerplate. To generate a new nodejs module invoke `yo mvp:lib` and giving its name.

Example of generating library
```bash
$ yo mvp:lib scanner
``` 

### Angular
Set up `angular frontend` for the provided model definition. 

It will generate the following: 

- model `angular factory`
- `angular controllers` required to manage model
- `ui-router` states configuration to manage model
- html `crud views` to manage model

To use `yo mvp:angular` sub-generator make sure:

- You have generate your front-end application using [generator-angular](https://github.com/yeoman/generator-angular)
```sh
$ yo angular
```

- Install all required dependencies to your application:
```sh
$ bower install --save angular-ui-router angular-resource angular-bootstrap
```

- Add all required dependencies to your application
```js
angular
    .module('<moduleName>', [
        ...
        'ui.router',
        'ngResource',
        'ui.bootstrap'
        ...
    ])
```

- Add `apiEndpoint` angular constant into your application main module that will point to the `root url` of your api.
```js
...
    .constant('apiEndpoint', '/')
...
```

Then, you can continue using it as bellow:
```bash
$ yo mvp:angular User name:String dob:Date
``` 

## Contributing
Fork this repo and push in your ideas. Do not forget to add a bit of test(s) of what value you adding.


## Testing
- Clone this repository

- Install dependencies
```bash
$ npm install
```

- Then run test
```bash
$ npm test
```

## References
- [PM2 microservices applications](https://keymetrics.io/2015/05/06/microservices-architecture-applications-via-pm2/)

## License

The MIT License (MIT)

Copyright (c) 2015 lykmapipo & Contributors

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE. 
