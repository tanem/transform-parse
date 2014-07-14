var stream = require('stream');

module.exports = TransformParse;

function TransformParse(){
  if (!(this instanceof TransformParse)) return new TransformParse();
  stream.Transform.call(this, { objectMode: true });
}

TransformParse.prototype = Object.create(stream.Transform.prototype);

TransformParse.prototype._transform = function(chunk, encoding, done){
  try { 
    this.push(JSON.parse(chunk.toString()));
  } catch (err) {
    this.emit('error', err);
  }
  done();
};
