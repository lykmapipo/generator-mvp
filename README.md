# generator-mvp [![Build Status](https://secure.travis-ci.org/lykmapipo/generator-mvp.png?branch=master)](https://travis-ci.org/lykmapipo/generator-mvp)

Set of generators to kick start nodejs application with [mongoose](https://github.com/Automattic/mongoose), [expressjs](https://github.com/strongloop/express/) and others. Based on [yeoman](https://github.com/yeoman/yeoman) and highly inspired by [rails](https://github.com/rails/rails) and other famous generators.


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
* [mvp:api](#api)
* [mvp:model](#model)
* [mvp:scaffold](#scaffold)

And more to come based on what we daily need in our `expressjs` an `mongoose` development workflows.

### App
Sets up a new  `expressjs` and `mongoose` app, generating all the boilerplate you need to get started. The app generator also optionally installs `bootstrap`,`jquery` and `font-awesome` as front-end dependencies unless prevented using `--skip-frontend` options.

Example of generating an application including frontend: 
```bash
yo mvp
```

If you only want to develop API first application you may opt to disable frontend by:
```bash
yo mvp --skip-frontend
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

## License

The MIT License (MIT)

Copyright (c) 2015 lykmapipo & Contributors

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE. 
