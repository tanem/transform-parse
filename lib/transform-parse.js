var stream = require('stream');

module.exports = function(){
  return new TransformParse();
};

function TransformParse(){
  stream.Transform.call(this, { objectMode: true });
}

TransformParse.prototype = Object.create(stream.Transform.prototype);

TransformParse.prototype._transform = function(chunk, encoding, done){
  var str = chunk.toString();
  try { 
    this.push(JSON.parse(str));
  } catch (err) {
    console.error('error parsing: %s', str);
  }
  done();
};