var mongo = require('mongodb')

var MongoClient = mongo.MongoClient, 
		BSON = mongo.BSONPure

var mongodb_connection_string = 'mongodb://127.0.0.1:27017/' 

if(process.env.OPENSHIFT_MONGODB_DB_URL){
  mongodb_connection_string = process.env.OPENSHIFT_MONGODB_DB_URL
}

// var winedb = new Db('winedb', server, {journal: true});

var winedb

MongoClient.connect(mongodb_connection_string, {db: {name: 'winedb', journal: true}}, function(err, db){
	if(err) {
		console.log(err)
	} else {
		winedb = db
		db.open(function(err, client) {
	    if(!err) {
        console.log("Connected to 'winedb' database");
        winedb.collection('wines', {strict:true}, function(err, collection) {
          if (err) {
            console.log("The 'wines' collection doesn't exist. Creating it with sample data...");
            populateDB();
          }
      	});
	    } else {
	    	console.log(err)
	    }
    })
	}
})


exports.findAll = function(req, res) {
  winedb.collection('wines', function(err, collection){
  	collection.find().toArray(function(err, items){
  		res.send(items)
  	})
  })
};
 
exports.findById = function(req, res) {
  winedb.collection('wines', function(err, collection) {
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
 
    winedb.collection('wines', function(err, collection) {
        collection.insert(wines, {safe:true}, function(err, result) {});
    });
 
};