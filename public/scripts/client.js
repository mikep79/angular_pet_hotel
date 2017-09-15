$(document).ready(onReady);

function onReady(){
    getPet();
    $('#addButton').on('click', addPet);
}

function getPet (){
    
    $.ajax({
        method: 'GET',
        url: '/pets',
        success: function(response){
            console.log('ajax get pet',response);
            for(var i = 0; i < response.length; i++){
                var pet = response[i];
                var $row = $('<tr></tr>');

                $row.append('<td>' + pet.name + '</td>');
                $row.append('<td>' + pet.breed + '</td>');
                $row.append('<td>' + pet.color + '</td>');
                $row.append('<td>' + pet.checked + '</td>');

                $('#allPets').append($row);
            };
        }
    });
};

function addPet(){
    var objectToSend ={
        name: $('#nameIn').val(),
        breed: $('#breedIn').val(),
        color: $('#colorIn').val(),
        checked: $('#checkedIn').val()
    }

    $.ajax({
        method: 'POST',
        url: '/pets',
        data: objectToSend,
        success: function(response){
            console.log('ajax post pet', response);
            getPet();
        }
    })
}