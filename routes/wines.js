var mongo = require('mongodb')

var MongoClient = mongo.MongoClient, 
		BSON = mongo.BSON,
		ObjectID = mongo.ObjectID

var mongodb_connection_string = 'mongodb://127.0.0.1:27017/' 

if(process.env.OPENSHIFT_MONGODB_DB_URL){
  mongodb_connection_string = process.env.OPENSHIFT_MONGODB_DB_URL
}

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
  	if (err) {
  		console.log(err)
  	} else {	
	  	collection.findOne({'_id': new ObjectID(req.params.id)}, function(err, item) {
	  		res.send(item)
	  	})
	  }
  })
};

exports.addWine = function(req, res) {
	var wine = req.body
	console.log('Adding wine: ', wine)
	winedb.collection('wines', function(err, collection) {
		collection.insert(wine, {safe: true}, function(err, result){
			if(err){
				res.send({'error': 'An error has occured'})
			} else {
				console.log('Success: ', result['result']['n'])
				res.send(result[0])
			}
		})
	})
}

exports.updateWine = function(req, res) {
	var id = req.params.id
	var wine = req.body
	console.log('Updating wine: ', id)
	console.log(JSON.stringify(wine))
	winedb.collection('wines', function(err, collection){
		if (err) {
			console.log(err)
		} else {
			collection.update({'_id': new ObjectID(id)}, wine, {safe:true}, function(err, result){
				if (err) {
          console.log('Error updating wine: ' + err);
          res.send({'error':'An error has occurred'});
        } else {
          console.log('' + result['result']['nModified'] + ' document(s) updated');
          res.send(wine);
        }
			})
		}
	})
}

exports.deleteWine = function(req, res) {
	var id = req.params.id
	console.log('Deleting wine: ', id)
	winedb.collection('wines', function(err, collection){
		if (err) {
			console.log(err)
		} else {
			collection.remove({'_id': new ObjectID(id)}, {safe:true}, function(err, result){
				if (err) {
          res.send({'error':'An error has occurred - ' + err});
        } else {
         	console.log('' + result["result"]["n"] + ' document(s) deleted');
          res.send(req.body);
        }
			})
		}
	})
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