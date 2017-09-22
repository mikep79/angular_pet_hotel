var router = require('express').Router();
var pool = require('../modules/pool');

router.get('/', function (req, res) {
    console.log('in the pets get');
    pool.connect(function (conErr, client, done){
        if (conErr){
            console.log(conErr);
            res.sendStatus(500);
        } else {
            var queryString = 'SELECT * FROM owners JOIN owners_pets ON owners.id = owners_pets.owner_id JOIN pets ON pets.id = owners_pets.pet_id;';
            client.query(queryString, function (queryErr, resultObj){
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
    console.log('in the pets post', req.body);
    var newPet= req.body;
    pool.connect(function (conErr, client, done){
        if (conErr){
            console.log(conErr);
            res.sendStatus(500);
        } else {
            console.log('no connection error');
            var queryString = 'INSERT INTO pets (name, breed, color, checked) VALUES ($1,$2,$3,$4) RETURNING id';
            client.query(queryString, [newPet.name, newPet.breed, newPet.color, newPet.checked], function(queryErr, resultObj) {
                console.log('Pets.js resultObj: ', resultObj);
                if (queryErr) {
                    res.sendStatus(500)
                 } else {
                    var queryString2 = 'INSERT INTO owners_pets (owner_id, pet_id) VALUES ($1, $2)'; 
                    client.query(queryString2, [newPet.owner_id, resultObj.rows[0].id], function(queryErr, resultObj){
                        done();
                        if (queryErr){
                            res.sendStatus(500);
                        } else {
                            res.sendStatus(202);
                        }
                    });
                 }
            });
        }
    });
});

router.delete('/:id', function(req,res){
    var petId= req.params.id;
    console.log('petId in delete pet route: ', petId);
    pool.connect(function (conErr, client, done){
        if (conErr){
            console.log(conErr);
            res.sendStatus(500);
        } else {
            client.query('DELETE FROM pets WHERE id = $1;', [petId], function(queryErr, result){
                done();
                if(queryErr){
                    console.log('you broke it at the queryError');
                    res.sendStatus(500);
                } else {
                    res.sendStatus(202);
                }
            }) ;
        }
    }
)}
);

router.put('/:id', function (req, res) {
    console.log('in the pets post', req.body);
    var newPet= req.body;
    var petId = req.params.id;
    pool.connect(function (conErr, client, done){
        if (conErr){
            console.log(conErr);
            res.sendStatus(500);
        } else {
            console.log('no connection error');
            var queryString = 'UPDATE pets SET name = $1, breed = $2, color = $3, checked = $4 WHERE id = $5;';
            client.query(queryString, [newPet.name, newPet.breed, newPet.color, newPet.checked, petId], function(queryErr, resultObj) {
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

module.exports = router;