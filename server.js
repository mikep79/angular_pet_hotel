var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var port = 5555;
var app = express();
var index = require('./routes/index');
var pets = require('./routes/pets');
var owners = require('./routes/owners');

app.listen(port, function() {
    console.log('listening on port: ', port);
});

app.use(bodyParser.json());
app.use(express.static('public'));
app.use('/', index);
app.use('/pets', pets);
app.use('/owners', owners);

