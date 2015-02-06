var express = require('express'),
    wines = require('./routes/wines');
 
var app = express();
 
app.get('/wines', wines.findAll);
app.get('/wines/:id', wines.findById);
app.post('/wines', wines.addWine)
app.put('/wines/:id', wine.updateWine) 
app.delete('/wines/:id', wine.deleteWine)
 
app.listen(3000);
console.log('Listening on port 3000...')