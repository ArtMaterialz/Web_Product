
function loadProfile(){

    var getProfile = new XMLHttpRequest();
    getProfile.open("POST", getUser_url , true);
    getProfile.setRequestHeader("Content-Type", "application/json");
    getProfile.onload= function() {
            var profile = JSON.parse(getProfile.responseText);
            username = profile[0].username;
            first_name = profile[0].first_name;
            last_name = profile[0].last_name;
            password = profile[0].password;
            gender = profile[0].gender;
            address = profile[0].address;
            email = profile[0].email; 
            mobile_number = profile[0].mobile_number;
            profile_picture = profile[0].profile_picture;  

            document.getElementById('p-username').innerHTML=username;
           
            document.getElementById('p-firstname').value=first_name;
            document.getElementById('p-lastname').value=last_name;
            document.getElementById('p-address').value=address;
            document.getElementById('p-email').value=email;

            document.getElementById('p-phone').value=mobile_number;
            
            if(gender == 1)
            {
                document.getElementById("Male2").checked = true;
            }
            else if (gender == 2)
            {
                document.getElementById("Female2").checked = true;
            }
            else
            {
                document.getElementById("Others2").checked = true;
            }
                document.getElementById('target').src=profile_picture;
                document.getElementById('profilePic').src=profile_picture;    
        }
    var payload = {token: token};
    getProfile.send(JSON.stringify(payload));

}
   



    
   


