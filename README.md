# generator-mvp [![Build Status](https://secure.travis-ci.org/lykmapipo/generator-mvp.png?branch=master)](https://travis-ci.org/lykmapipo/generator-mvp)

Set of generators to kick start nodejs application with [mongoose](https://github.com/Automattic/mongoose), [expressjs](https://github.com/strongloop/express/) and others. Based on [yeoman](https://github.com/yeoman/yeoman) and highly inspired by [rails](https://github.com/rails/rails) and other famous generators.

*Note: This generator make use of existing `nodejs pakages`, unless the functionality required is not yet implemented.*

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
* [mvp:controller](#controller)
* [mvp:model](#model)
* [mvp:api](#api)
* [mvp:scaffold](#scaffold)

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
- [ ] Adding winston logger
- [ ] Make use of initializer to factor out initialization logics from configs
- [ ] Adding server metrics
- [ ] Add nice theme on scaffolds
- [ ] Separate front and api
- [ ] Add front end  grunt tasks
- [ ] Splitting grunt file
- [ ] Adding securities middleware and https
- [ ] Adding proper http status on responses
- [ ] Clean api response content negotiation boilerplates
- [ ] Use current dirname as application name
- [ ] Prevent bower from installation if frontend skipped
- [ ] Skip template engine installation if frontend skipped
- [ ] Remove mongoose from site controller
- [ ] Add model fields jsdocs
- [ ] Fix model seed, when object id is used remove trailing comma
- [ ] Add middleware generator and loading
- [ ] Add generator watermarks of generated files
- [ ] Handle errors
- [ ] Package installations of frontend resources and packages if `--skip-frontend` provided
- [x] Make use of `findByIdAndUpdate` with ```javascript {upsert:true, new:true}``` in resource update
- [x] Make API to be `JSON first` and allow developer to customize for other content type


## License

The MIT License (MIT)

Copyright (c) 2015 lykmapipo & Contributors

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE. 
