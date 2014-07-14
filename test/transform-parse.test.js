var expect = require('expect.js');
var stream = require('stream');
var TransformParse = require('../lib/transform-parse');

describe('Transform parse', function(){

  var parse;

  beforeEach(function(){
    parse = TransformParse();
  });

  it('should emit an error if an error occurs when parsing', function(done){
    var source = stream.PassThrough();
    source.pipe(parse);
    parse.on('error', function(err){
      expect(err).not.to.be(undefined);
      done();
    });
    source.end(new Buffer('foo'));
  });

  it('should push an object upon successful parsing', function(done){
    var source = stream.PassThrough();
    source.pipe(parse);
    parse.on('data', function(chunk){
      expect(chunk).to.eql({ foo: 'bar' });
      done();
    });
    source.end(new Buffer('{ "foo": "bar" }'));
  });

});