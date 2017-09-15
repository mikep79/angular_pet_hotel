var router = require('express').Router();

var petArray =[];

router.get('/', function (req, res) {
    console.log('in the pets get');
    res.send(petArray);
});

router.post('/', function (req, res) {
    console.log('in the pets post');
    var newPet= req.body;
    petArray.push(newPet);
    res.sendStatus(201);
});

module.exports = router;