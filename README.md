# transform-parse

[![Build Status](https://travis-ci.org/tanem/transform-parse.png?branch=master)](https://travis-ci.org/tanem/transform-parse)
[![Coverage Status](https://coveralls.io/repos/tanem/transform-parse/badge.png)](https://coveralls.io/r/tanem/transform-parse)
[![NPM version](https://badge.fury.io/js/transform-parse.svg)](http://badge.fury.io/js/transform-parse)

A transform stream that parses an incoming stream as JSON.

## Installation

```sh
$ npm install transform-parse --save
```

## Example

```js
var stream = require('stream');
var parse = require('transform-parse');
var source = stream.PassThrough();
var dest = stream.PassThrough({ objectMode: true });

source.pipe(parse()).pipe(dest);
source.end(new Buffer('{ "foo": "bar" }'));

dest.on('data', function(obj){
  // => { foo: 'bar' }
  console.log(obj);
});
```

## API

### var parse = transformParse()

Initialise a new `TransformParse`.

## Testing

```sh
$ make test
```

To generate a coverage report:

```sh
$ make test-cov
```

## Credits

 * [urlgrey](https://github.com/cainus/urlgrey) for the Makefile inspiration.