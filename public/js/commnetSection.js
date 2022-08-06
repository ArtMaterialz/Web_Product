

function fetchComments() {
    var request = new XMLHttpRequest();

    request.open('GET', comment_url, true);

    request.onload = function() {
   
    comment_array = JSON.parse(request.responseText);
 
    };

    request.send();
}

function showComments() {

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    var pass = urlParams.get("id")
    

    
        var token = sessionStorage.getItem("token");
        if(token != null)
        {
            userCheck = new XMLHttpRequest();
            userCheck.open("POST", getUser_url , true);
            userCheck.setRequestHeader("Content-Type", "application/json");
            userCheck.onload= function() 
            {
    
                var user = JSON.parse(userCheck.responseText);
                username_c = user[0].username;
                
                var commentCheck = new XMLHttpRequest();
                commentCheck.open("POST", getUserComment , true);
                commentCheck.setRequestHeader("Content-Type", "application/json");
                commentCheck.onload= function() {
                    
                    var answer = JSON.parse(commentCheck.responseText);
                    if(answer.result2 == "invalid")
                    {
                        $('#newComment_id').show();
                        $('#editComment_id').hide();
                       
                        
                    }
                    else
                    {
                        $('#newComment_id').hide();
                        $('#editComment_id').show();
                    }
                
        
            
                    
            }
    
            var payload_c = {id: pass, username: username_c};
       
            commentCheck.send(JSON.stringify(payload_c));
            
            }
            var payload_u = {token: token};
            userCheck.send(JSON.stringify(payload_u));
         
            
            

        }
        else
        {
            $('#editComment_id').hide();
            $('#newComment_id').hide();
        }


        commentProfile = new XMLHttpRequest();
        commentProfile.open("POST", getUser_url , true);
        commentProfile.setRequestHeader("Content-Type", "application/json");
        commentProfile.onload= function() 
            {
    
       
                var profile = JSON.parse(commentProfile.responseText);
              
                username = profile[0].username;
     
    
                document.getElementById('editnickname').value =username;
              
              
                
                
                var getcomment = new XMLHttpRequest();
                getcomment.open("POST", getUserComment , true);
                getcomment.setRequestHeader("Content-Type", "application/json");
                getcomment.onload= function() {
    
       
                var profile2 = JSON.parse(getcomment.responseText);
              
                var comment = profile2[0].comment;
                var rating = profile2[0].rating;
                displayColorStar('editpop', rating);
               
     
                

                document.getElementById('edituserComments').value = comment;
                    
            }
        
        
    
        
        var payload2 = {id: pass, username: username};
    
        getcomment.send(JSON.stringify(payload2));
            
            }
 
    
        var payload = {token: token};
        commentProfile.send(JSON.stringify(payload));
    





    
    document.getElementById("emptyComment").innerHTML = "No review yet. Create one now";
    currentIndex = pass;
    
    document.getElementById("commentBody").textContent = "";

    for (var i = 0; i < comment_array.length; i++) {
      
        if (comment_array[i].product_id == pass) {
            document.getElementById("emptyComment").innerHTML = "";
          
            star = "";
            var html = '<div class="text-center" style="width:100%;">'+                                                           
                            '<div class="card">'+                                                                                 
                                '<div class="card-body">'+ 
                                '<div class="col-12">'+
                                '<img src="'+ comment_array[i].profile_picture+'" class="col-12" style="width: 20%;  border-radius: 50%;">'+    
                                '</div>'+     
                                '<div class="col-12">'+
                                ' <p class="card-text" id="rating' + i + '"></p> '+                                                            
                                '</div>'+ 
                                    '<p  class="mt-5" style= "color: black; font-size: 18px ">' +comment_array[i].comment + '</p>' + 
                                    '<small style= "color: black; font-size: 18px">by ' + comment_array[i].username + " @ " + comment_array[i].date + '</small>'+  
                                '</div>'+                                                                                          
                            '</div>'+                                                                                              
                        '</div>';
            document.getElementById("commentBody").insertAdjacentHTML('beforeend', html);
            var star = "";
            for (var j = 0; j < comment_array[i].rating; j++) {
            
                star += "<img src='images/star.png' style='width:50px' />";
            }

            document.getElementById("rating" + i).insertAdjacentHTML('beforebegin', star + "<br/>");

        }
    }
}


function addComment() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    var pass = urlParams.get("id")
    var comment = new Object();
    comment.product_id = pass; 
    comment.username = document.getElementById("nickname").value; 
    comment.comment = document.getElementById("userComments").value; 
    comment.date = null; 
    comment.rating = rating;

    var postComment = new XMLHttpRequest(); // new HttpRequest instance to send comment

    postComment.open("POST", comment_url2, true); //Use the HTTP POST method to send data to server

    postComment.setRequestHeader("Content-Type", "application/json");
    postComment.onload = function() {
        
            alert("Review Added");
            location.reload();

    };

    postComment.send(JSON.stringify(comment)); 
}
function rateIt(element) {
    var num = element.getAttribute("value");
    var classname = element.getAttribute("class");
    var stars = document.getElementsByClassName(classname);
    var classTarget = "." + classname;
    for (let star of stars){
        star.setAttribute("src", starBWImage);
    }
    changeStarImage(num, classTarget);
}

function changeStarImage(num, classTarget) {

    var cell = ' <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="currentColor" class="bi bi-chat" viewBox="0 0 16 16" style="color: black;" data-toggle="modal" data-target="#commentModal" onclick="showComments()">'+
    '<path d="M2.678 11.894a1 1 0 0 1 .287.801 10.97 10.97 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8.06 8.06 0 0 0 8 14c3.996 0 7-2.807 7-6 0-3.192-3.004-6-7-6S1 4.808 1 8c0 1.468.617 2.83 1.678 3.894zm-.493 3.905a21.682 21.682 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a9.68 9.68 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105z"/>'+
    '</svg></div>';
    switch (eval(num)) {
        case 1:
            document.querySelector(classTarget + "[value='1']").setAttribute("src", starImage);
            rating = 1;
            break;
        case 2:
            document.querySelector(classTarget + "[value='1']").setAttribute("src", starImage);
            document.querySelector(classTarget + "[value='2']").setAttribute("src", starImage);
            rating = 2;
            break;
        case 3:
            document.querySelector(classTarget + "[value='1']").setAttribute("src", starImage);
            document.querySelector(classTarget + "[value='2']").setAttribute("src", starImage);
            document.querySelector(classTarget + "[value='3']").setAttribute("src", starImage);
            rating = 3;
            break;
        case 4:
            document.querySelector(classTarget + "[value='1']").setAttribute("src", starImage);
            document.querySelector(classTarget + "[value='2']").setAttribute("src", starImage);
            document.querySelector(classTarget + "[value='3']").setAttribute("src", starImage);
            document.querySelector(classTarget + "[value='4']").setAttribute("src", starImage);
            rating = 4;
            break;
        case 5:
            document.querySelector(classTarget + "[value='1']").setAttribute("src", starImage);
            document.querySelector(classTarget + "[value='2']").setAttribute("src", starImage);
            document.querySelector(classTarget + "[value='3']").setAttribute("src", starImage);
            document.querySelector(classTarget + "[value='4']").setAttribute("src", starImage);
            document.querySelector(classTarget + "[value='5']").setAttribute("src", starImage);
            rating = 5;
            break;
    }
}

function displayColorStar(classname, num) {
    var pop = document.getElementsByClassName(classname);
    var classTarget = "." + classname;
    for (let p of pop) {
    p.setAttribute("src", starBWImage);
    }
    changeStarImage(num, classTarget);
    }

function updateComment() {
            var response = confirm("Are you sure you want to update this comment?");
            const queryString = window.location.search;
            const urlParams = new URLSearchParams(queryString);
            var pass = urlParams.get("id")
            if (response == true) {
            var commentModal = document.getElementById("editCommentModal");
         
            var updateComment = new XMLHttpRequest(); // new HttpRequest instance to send request to server
            //commentModal.hide();
            updateComment.open("PUT", edit_comment_url, true); //The HTTP method called 'PUT' is used here as we are updating data
            updateComment.setRequestHeader("Content-Type", "application/json");
  
            updateComment.onload = function() {
            
                alert("Update Success")
                location.reload();
            };

            var product_id = pass;
            var username = document.getElementById("editnickname").value;
            var comment = document.getElementById("edituserComments").value;
            var ratings = rating;
            var dates = null;
            var payload2 = { product_id:product_id, comment:comment, rating:ratings, username:username, date:dates}
      
            updateComment.send(JSON.stringify(payload2));
            }
 }
        
 function delete_c()
 {
    var response = confirm("Are you sure you want to delete this comment?");
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    var pass = urlParams.get("id")
    if (response == true) {
     
        var deleteComment = new XMLHttpRequest(); // new HttpRequest instance to send request to server
        
        deleteComment.open("DELETE", delete_url, true); //The HTTP method called 'PUT' is used here as we are updating data
        deleteComment.setRequestHeader("Content-Type", "application/json");

        deleteComment.onload = function() {
            alert("Delete Success")
            location.reload();

        };
        var username = document.getElementById("editnickname").value;
 
        var payload = {id:pass,  username:username}
   
        deleteComment.send(JSON.stringify(payload));
        }  
 }

function newComment() {
    //Initialise each HTML input elements in the modal window with default value.
    rating = 0;
    document.getElementById("userComments").value = "";
    document.getElementById("nickname").value = "";
}