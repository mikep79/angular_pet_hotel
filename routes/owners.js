var router = require('express').Router();
var pool = require('../modules/pool');

router.get('/', function (req, res) {
    console.log('in the owners get');
    pool.connect(function (conErr, client, done){
        if (conErr){
            console.log(conErr);
            res.sendStatus(500);
        } else {
            client.query('SELECT * FROM owners;', function (queryErr, resultObj){
                done();
                if (queryErr){
                    console.log(queryErr);
                    res.sendStatus(500);
                } else {
                    console.log(resultObj.rows);
                    res.send(resultObj.rows);
                }
            });
        }
    })
});

router.post('/', function (req, res) {
    console.log('in the owners post', req.body);
    var newOwner= req.body;

    pool.connect(function (conErr, client, done){
        if (conErr){
            console.log(conErr);
            res.sendStatus(500);
        } else {
            console.log('no connection error');
            client.query('INSERT INTO owners (first_name, last_name) VALUES ($1,$2)', [newOwner.first, newOwner.last], function(queryErr, resultObj) {
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

router.delete('/:id', function(req,res){
    var ownerId= req.params.id;

    pool.connect(function (conErr, client, done){
        if (conErr){
            console.log(conErr);
            res.sendStatus(500);
        } else {
            client.query('DELETE FROM owners WHERE id = $1;', [ownerId], function(queryErr, result){
                done();
                if(queryErr){
                    res.sendStatus(500);
                } else {
                    res.sendStatus(202);
                }
            }) ;
        }
    }
)}
);

module.exports = router;