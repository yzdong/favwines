var mongo = require('mongodb')

var Server = mongo.Server, 
		Db = mongo.Db,
		BSON = mongo.BSONPure

var server = new Server('localhost', 27)


exports.findAll = function(req, res) {
  res.send([{name:'wine1'}, {name:'wine2'}, {name:'wine3'}]);
};
 
exports.findById = function(req, res) {
  res.send({id:req.params.id, name: "The Name", description: "description"});
};

exports.addWine = function(req, res) {
	res.send(200)
}

exports.updateWine = function(req, res) {
	res.send(200)
}

exports.deleteWine = function(req, res) {
	res.send(200)
}