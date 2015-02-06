var express = require('express'),
    wines = require('./routes/wines');
 
var app = express();

var server_port = process.env.OPENSHIFT_NODEJS_PORT || 3000
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || 'localhost'
 
app.get('/wines', wines.findAll);
app.get('/wines/:id', wines.findById);
app.post('/wines', wines.addWine)
app.put('/wines/:id', wines.updateWine) 
app.delete('/wines/:id', wines.deleteWine)
 
app.listen(server_port, server_ip_address, function() {
 console.log( "Listening on " + server_ip_address + ", server_port " + server_port)});
