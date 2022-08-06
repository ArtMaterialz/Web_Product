"use strict";
const CommentsDB = require('../models/CommentsDB');
const Comment = require('../models/Comment');
const bcrypt = require('bcrypt'); 
var jwt = require('jsonwebtoken');
const e = require('express');
var secret = "somesecretkey";

var commentsDB = new CommentsDB();

function getAllComments(request, respond){
    commentsDB.getAllComments(function(error, result){
        if(error){
            respond.json(error);
        }
        else{
            respond.json(result);
        }
    });

}
function get_No_Of_Comment(request, respond){
    var comment = new Comment(request.body.id);
    commentsDB.get_No_Of_Comment(comment, function(error, result){
        if(error){
            respond.json(error);
        }
        else{
            respond.json(result);
        }
    });

}
function deleteComment(request, respond){
    var comment = new Comment(request.body.id, null,request.body.username)
    commentsDB.deleteComment(comment, function(error, result){
            if(error)
            {
                respond.json(error);
            }
            else
            {
                respond.json(result); 
            }
        })
 
}
function getRating(request, respond){
    var comment = new Comment(request.body.rid);
   
    commentsDB.getRating(comment, function(error, result){
        if(error){
            respond.json(error);
        }
        else{
            respond.json(result);
         
        }
    })
}
function updateComment(request, respond){
    var now = new Date().toISOString().slice(0, 10);
    var comment = new Comment(request.body.product_id, request.body.comment,  request.body.username,request.body.rating,  now, null);
  
        commentsDB.updateComment(comment, function(error, result){
            if(error){
                respond.json(error);
            }
            else{
                respond.json(result); 
            }
        })

}

function addComment(request, respond){
    var now = new Date().toISOString().slice(0, 10);
    var comment = new Comment( request.body.product_id, request.body.comment, request.body.rating, request.body.username, now.toString(),null);
        commentsDB.addComment(comment, function(error, result){
            if(error){
                respond.json(error);
            }
            else{
                respond.json(result); 
            }
        })

}
function getNoOFRatings(request, respond){
      var comment = new Comment(request.params.id);
    commentsDB.getNoOFRatings(comment, function(error, result){
        if(error){
            respond.json(error);
        }
        else{
            respond.json(result);
        }
    })
}

function userComment(request, respond)
{
        var comment = new Comment(request.body.id, null, request.body.username);
      
        commentsDB.userComment(comment, function(error, result){
            if(error){
                respond.json(error);
            }
            else{
                if(result == "")
                {
                    respond.json({result2:"invalid"});    
                }
                else
                {
                    respond.json(result); 
                }
           
            }
        })
  
}
function checkComment(request, respond){
    var comment = new Comment(request.body.id, null, request.body.username)
  
    commentsDB.checkComment(comment, function(error, result){
        if(error){
            respond.json(error);
        }
        else{
            respond.json(result); 
        }
    })
}



module.exports = {getAllComments, updateComment,addComment, getRating, deleteComment, get_No_Of_Comment, getNoOFRatings, userComment, checkComment};

