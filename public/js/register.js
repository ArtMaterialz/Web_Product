
function registerMe() {
    var registerUser = new XMLHttpRequest();
    registerUser.open("POST", register_url , true);
    registerUser.setRequestHeader("Content-Type", "application/json");
    registerUser.onload= function() {

        var taken = JSON.parse(registerUser.responseText);
      
        if(taken.result == "taken"){
            alert("User Exist")
        }
        else{
            alert("Register Success")
            $('#RegisterModal').modal('hide');
        }
    }

    var firstname = document.getElementById("firstname").value;
    var lastname = document.getElementById("lastname").value;
    var email = document.getElementById("email").value;
    var address = document.getElementById("Address").value;
    var phone = document.getElementById("Phone").value;
    var username = document.getElementById("username").value;
    var password = document.getElementById("Password").value;
    var profile_picture = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiIgZmlsbD0iY3VycmVudENvbG9yIiBjbGFzcz0iYmkgYmktcGVyc29uLWNpcmNsZSIgdmlld0JveD0iMCAwIDE2IDE2Ij4KICA8cGF0aCBkPSJNMTEgNmEzIDMgMCAxIDEtNiAwIDMgMyAwIDAgMSA2IDB6Ii8+CiAgPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBkPSJNMCA4YTggOCAwIDEgMSAxNiAwQTggOCAwIDAgMSAwIDh6bTgtN2E3IDcgMCAwIDAtNS40NjggMTEuMzdDMy4yNDIgMTEuMjI2IDQuODA1IDEwIDggMTBzNC43NTcgMS4yMjUgNS40NjggMi4zN0E3IDcgMCAwIDAgOCAxeiIvPgo8L3N2Zz4=";
    var ele = document.getElementsByName('gender');
    for(i = 0; i <ele.length; i++)
    {
        if(ele[i].checked)
        {
            var take = ele[i].value;
            var gender = parseInt(take);
        }
    }
    
    var payload = {username:username, password:password, first_name:firstname, last_name:lastname, gender:gender, address:address, email:email, mobile_number:phone, profile_picture:profile_picture}

    registerUser.send(JSON.stringify(payload));
}