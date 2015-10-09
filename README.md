# generator-mvp [![Build Status](https://secure.travis-ci.org/lykmapipo/generator-mvp.png?branch=master)](https://travis-ci.org/lykmapipo/generator-mvp)

Set of generators to kick start nodejs application with [mongoose](https://github.com/Automattic/mongoose), [expressjs](https://github.com/strongloop/express/) and others. Based on [yeoman](https://github.com/yeoman/yeoman) and highly inspired by [rails](https://github.com/rails/rails) and other famous generators.

*Note: This generator make use of existing `nodejs pakages`, unless the functionality required is not yet implemented.*

*Warning:! There are major changes to v1.0.0 before using it please backup/commit your application*

## Usage

- Install `yo`, `grunt-cli`, `bower`, and `generator-mvp`

```bash
$ npm install -g grunt-cli bower yo generator-mvp
```

- Make a new directory, and `cd` into it:

```bash
$ mkdir mvp && cd $_
```

- Run `yo mvp` to generate application skeleton

```bash
$ yo mvp
```

- Run `grunt test` for testing and for preview

## Generators

Available generators:

* [mvp](#app) (aka [mvp:app](#app))
* [mvp:api](#api)
* [mvp:scaffold](#scaffold)
* [mvp:model](#model)
* [mvp:controller](#controller)
* [mvp:middleware](#middleware)
* [mvp:middleware](#library)


And more to come based on what we daily need in our `expressjs` an `mongoose` development workflows.

### App
Sets up a new  `expressjs` and `mongoose` app, generating all the boilerplate you need to get started. The app generator also optionally installs `bootstrap`,`jquery` and `font-awesome` as front-end dependencies unless prevented using `--skip-frontend` options.

Example of generating an application including frontend: 
```bash
$ yo mvp
```

If you only want to develop API first application you may opt to disable frontend by:
```bash
$ yo mvp --skip-frontend
```

### Api
Set up new mongoose `model`, `controller`, `router` and their `spec/test` boilerplates. To generate a new api invoke `yo mvp:api` followed with model definition

Example of generating simple api
```bash
$ yo mvp:api User name:String dob:Date
```

### Scaffold
Set up new mongoose `model`, `controller`, `router`, their `spec/test` boilerplates and bootstrap `crud views`.

Example of scaffolding a simple model
```bash
$ yo mvp:scaffold User name:String dob:Date
```

### Controller
Set up new `controller`, its `actions` and an `express router`. To generate a new controller invoke `yo mvp:controller` giving its name and actions separated by space.

Example of generating controller including frontend
```bash
$ yo mvp:controller index create edit
``` 

Example of generating controller without frontend
```bash
$ yo mvp:controller index create edit --skip-frontend
``` 

### Middleware
Set up new express `middleware` with it `spec`. To generate a new express middleware invoke `yo mvp:middleware` and giving its name.

Example of generating middleware
```bash
$ yo mvp:middleware guard
```

### Library
Set up new nodejs `module` with it `spec`. To generate a new nodjs module invoke `yo mvp:lib` and giving its name.

Example of generating library
```bash
$ yo mvp:lib scanner
``` 

### Model
Set up new mongoose `Schema` with its `spec/test` boilerplate and register it to mongoose. To generate new model invoke `yo mvp:model` with model name and its attributes separated by space.

Example of generating simple model
```bash
$ yo mvp:model User name:String dob:Date
```

Example of generating model including `refs` to other model
```bash
$ yo mvp:model Post content:String author:ObjectId:User 
```
Most of mongoose type are supported.

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

## TODO
- [ ] Adding server metrics
- [ ] Add nice theme on scaffolds
- [ ] Separate front and api
- [ ] Add front end  grunt tasks
- [ ] Adding https
- [ ] Add model fields jsdocs
- [ ] Fix model seed, when object id is used remove trailing comma
- [ ] Add middleware generator and loading
- [ ] Provide a mean to upgrade previous code base
- [ ] Add a mean to run generated codes during testing
- [ ] Add a means to delete/revert generated codes

## License

The MIT License (MIT)

Copyright (c) 2015 lykmapipo & Contributors

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE. 
