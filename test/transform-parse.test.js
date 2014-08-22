var expect = require('expect.js');
var sinon = require('sinon');
var stream = require('stream');
var transformParse = require('../lib/transform-parse');

describe('Transform parse', function(){

  var parse;

  beforeEach(function(){
    parse = transformParse();
  });

  it('should log an error if an error occurs when parsing', function(done){
    var consoleErrorStub = sinon.stub(console, 'error');
    var source = stream.PassThrough();
    source.pipe(parse);
    parse.on('data', function(){});
    parse.on('end', function(){
      expect(consoleErrorStub.args[0]).to.eql(['error parsing: %s', 'foo']);
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