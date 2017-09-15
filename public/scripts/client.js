$(document).ready(onReady);

function onReady(){
    getPet();
    $('#addButton').on('click', addPet);
    $('#allPets').on('click', ".deleteMe", deletePet)
}

function getPet (){
    
    $.ajax({
        method: 'GET',
        url: '/pets',
        success: function(response){
            console.log('ajax get pet',response);
            $('#allPets').empty();
            for(var i = 0; i < response.length; i++){
                var pet = response[i];
                console.log('line 19 of GET PET', pet)
                var $row = $('<tr></tr>');

                $row.append('<td>' + pet.name + '</td>');
                $row.append('<td>' + pet.breed + '</td>');
                $row.append('<td>' + pet.color + '</td>');
                $row.append('<td>' + pet.checked + '</td>');

                var $deleteButton =$('<td><button class="deleteMe" data-id="' + pet.id + '">Remove</button></td>');
                $row.append($deleteButton);
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
    $('#nameIn').val('');                   // clear input values
    $('#breedIn').val('');
    $('#colorIn').val('');
    $('#checkedIn').val('');

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

function deletePet(){
    var thisId = $(this).data('id');
    console.log('insidedeletePet row 60',thisId);

    $.ajax({
        method: 'DELETE',
        url: '/pets/' + thisId,
        success: function(response){
            console.log('ajax post pet', response);
            getPet();
        }
    })
}