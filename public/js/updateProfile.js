//Encoding Image
function encode(){
    var selectedfile = document.getElementById("p-file").files;
    if(selectedfile.length > 0)
    {
        var imageFile = selectedfile[0];
        var fileReader = new FileReader();
        fileReader.onload = function(fileLoadedEvent) {
            profile_picture = fileLoadedEvent.target.result;
            var newImage = document.getElementById('target');
            newImage.src = profile_picture;
            var srcData = fileLoadedEvent.target.result;
        }
        fileReader.readAsDataURL(imageFile);
    }
}

//Update User Profile
function update() {
    var updateUser = new XMLHttpRequest();
    updateUser.open("PUT", update_url , true);
    updateUser.setRequestHeader("Content-Type", "application/json");
    updateUser.onload= function() {

            alert('Update Success');
            location.reload()
 
    }
    var first_name = document.getElementById("p-firstname").value;
    var last_name = document.getElementById("p-lastname").value;
    var email = document.getElementById("p-email").value;
    var address = document.getElementById("p-address").value;
    var mobile_number = document.getElementById("p-phone").value;
    var username = document.getElementById("p-username").innerHTML;

    var ele = document.getElementsByName('gender2');
    for(i = 0; i <ele.length; i++)
    {
        if(ele[i].checked)
        {
            var take = ele[i].value;
            var gender = parseInt(take);
        }
    }
    var payload = { first_name : first_name, last_name : last_name, gender:gender, address:address, email:email, mobile_number:mobile_number, profile_picture:profile_picture, username:username}
    updateUser.send(JSON.stringify(payload));

}