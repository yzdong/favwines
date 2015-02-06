var MongoClient = require('mongodb')

var Server = mongo.Server, 
		Db = mongo.Db,
		BSON = mongo.BSONPure

var server = new Server('localhost', 27017, {auto_reconnect: true});
db = new Db('winedb', server);

db.open(function(err, db) {
    if(!err) {
        console.log("Connected to 'winedb' database");
        db.collection('wines', {strict:true}, function(err, collection) {
            if (err) {
                console.log("The 'wines' collection doesn't exist. Creating it with sample data...");
                populateDB();
            }
        });
    }
});

exports.findAll = function(req, res) {
  db.collection('wines', function(err, collection){
  	collection.find().toArray(function(err, items){
  		res.send(items)
  	})
  })
};
 
exports.findById = function(req, res) {
  db.collection('wines', function(err, collection) {
  	collection.findOne({'_id': new BSON.ObjectID(req.params.id)}, function(err, item) {
  		res.send(item)
  	})
  })
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


var populateDB = function() {
 
    var wines = [
    {
        name: "Black Kite Kite's Rest",
        year: "2011",
        grapes: "Pinot Noir",
        country: "USA",
        region: "Anderson Valley",
        description: "We like it",
    }];
 
    db.collection('wines', function(err, collection) {
        collection.insert(wines, {safe:true}, function(err, result) {});
    });
 
};