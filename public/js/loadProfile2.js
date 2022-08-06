var username, first_name, last_name, password, gender, address, email, mobile_number, profile_picture, token;
token = sessionStorage.getItem("token");

function loadPic(){
  var getProfile = new XMLHttpRequest();
        getProfile.open("POST", getUser_url , true);
        getProfile.setRequestHeader("Content-Type", "application/json");
        getProfile.onload= function() {
                    var profile = JSON.parse(getProfile.responseText);
                    profile_picture = profile[0].profile_picture
                    check = profile[0].settings
                

                    if(check == 1)
                    {
                        $('#chatbot').show();
                    }
                    else
                    {
                        $('#chatbot').hide();
                    }    
                    document.getElementById('profilePic').src=profile_picture;
    }

    var payload = {token: token};
    getProfile.send(JSON.stringify(payload));

}



    
   


