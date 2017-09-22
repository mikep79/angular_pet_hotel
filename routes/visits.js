var router = require('express').Router();
var pool = require('../modules/pool');

router.post('/', function (req, res) {
    console.log('in the visits post', req.body);
    var newVisit= req.body;
    pool.connect(function (conErr, client, done){
        if (conErr){
            console.log(conErr);
            res.sendStatus(500);
        } else {
            console.log('no connection error');
            client.query('INSERT INTO visits (pet_id) VALUES ($1)', [newVisit.pet_id], function(queryErr, resultObj) {
                done();
                if (queryErr) {
                    res.sendStatus(500)
                 } else {
                    res.sendStatus(201)
                 }
            });
        }
    })
});

router.get('/', function(req, res){
    pool.connect(function(conErr, client, done){
        if (conErr){
            console.log('Visits.js conErr: ', conErr);
            res.sendStatus(500);
        } else {
            var queryString = 'SELECT visits.id, visits.check_in, visits.check_out, visits.pet_id, pets.name FROM visits JOIN pets ON visits.pet_id = pets.id  WHERE visits.check_out IS NULL;';
            client.query(queryString, function(queryErr, resultObj){
                done();
                if (queryErr){
                    res.sendStatus(500);
                } else {
                    res.send(resultObj.rows);
                }
            });
        }
    });
});

router.put('/:id', function (req, res) {
    console.log('in the visits PUT: ', req.body);
    var newCheckout = req.body;
    var visitId = req.params.id;
    pool.connect(function (conErr, client, done){
        if (conErr){
            console.log(conErr);
            res.sendStatus(500);
        } else {
            console.log('no connection error');
            var queryString = 'UPDATE visits SET check_in = $1, check_out = NOW(), pet_id = $2 WHERE id = $3;';
            client.query(queryString, [newCheckout.check_in, newCheckout.pet_id, visitId], function(queryErr, resultObj) {
                done();
                if (queryErr) {
                    res.sendStatus(500)
                 } else {
                    res.sendStatus(201)
                 }
            });
        }
    })
});

router.get('/pet/:id', function(req, res){
    var petId = req.params.id;

    pool.connect(function(conErr, client, done){
        if (conErr){
            console.log('Visits.js conErr: ', conErr);
            res.sendStatus(500);
        } else {
            var queryString = 'SELECT visits.id, visits.check_in, visits.check_out, visits.pet_id, pets.name FROM visits JOIN pets ON visits.pet_id = pets.id  WHERE visits.pet_id = $1;';
            client.query(queryString, [petId], function(queryErr, resultObj){
                done();
                if (queryErr){
                    res.sendStatus(500);
                } else {
                    res.send(resultObj.rows);
                }
            });
        }
    });
});

module.exports = router;