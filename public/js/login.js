
function loginMe() {
    var loginUser = new XMLHttpRequest();
    loginUser.open("POST", login_url , true); 
    loginUser.setRequestHeader("Content-Type", "application/json");

    loginUser.onload= function() {
        var token = JSON.parse(loginUser.responseText);
       
        if(token.result2 != "invalid")
        {
            if(token.output != "user not found")
            {
                // $('#goodModal').modal('show');
                $('#profilePic').show();
                
                document.getElementById("registerMenu").style.display="none";
                document.getElementById("loginMenu").style.display="none";
                
                alert("Login Success")
                alert("Welcome Back "+ username)
                sessionStorage.setItem("token", token.result);
                $('#LoginModal').modal('hide');
                setTimeout(function(){location.reload()}, 2000);
            }
            else
            {
                alert("User Does Not Exsit")
                $('#LoginModal').modal('hide');
            }
          
        }
        else
        {
            alert("Incorrect Password")
        }
    }

    var username = document.getElementById("usernameLogin").value;
    var password = document.getElementById("passwordLogin").value;
    var payload = {username:username, password:password}
    loginUser.send(JSON.stringify(payload));
}

function logoutMe(){
    $('#goodModal').modal('show');
    $('#profilePic').hide();
    $('#registerMenu').show();
    $('#loginMenu').show();
    alert("Log Out")
    sessionStorage.removeItem("token") 
}

function deleteUser(){
    var response = confirm("Are you sure you want to delete your account?")
    // var getUser  = document.getElementById('p-username').value;
    if(response == true)
    {
        sessionStorage.removeItem("token") 
        var delete_user = new XMLHttpRequest();
        delete_user.open("DELETE", deleteUser_url, true);
        delete_user.setRequestHeader("Content-Type", "application/json");
        delete_user.onload = function(){
           

            $('#goodModal').modal('show');
            $('#profilePic').hide();
            $('#registerMenu').show();
            $('#loginMenu').show();
            sessionStorage.removeItem("token") 
            alert("Account Remove")
        };
    }
    var payload = {token: token};
    delete_user.send(JSON.stringify(payload));
}


function disableBot()
{

        var username  = document.getElementById('p-username').innerHTML;   
        var user_settings = new XMLHttpRequest();
        user_settings.open("POST", set_url, true);
        user_settings.setRequestHeader("Content-Type", "application/json");
        user_settings.onload = function(){
           alert("Chatbot Disable")
        };
    
    var payload = {username: username, check:0};

    user_settings.send(JSON.stringify(payload));
}
function enableBot()
{
    var username  = document.getElementById('p-username').innerHTML;
 
        var user_settings = new XMLHttpRequest();
        user_settings.open("POST", set_url, true);
        user_settings.setRequestHeader("Content-Type", "application/json");
        user_settings.onload = function(){
           alert("Chatbot Enable")
        };
      
    var payload = {username: username, check:1};

    user_settings.send(JSON.stringify(payload));
}




    
   


