"use strict";
const UsersDB = require('../models/UsersDB');
const User = require('../models/User');
const bcrypt = require('bcrypt'); 
var jwt = require('jsonwebtoken');
const { get } = require('express/lib/response');
const req = require('express/lib/request');
var secret = "somesecretkey";

var usersDB = new UsersDB();

function registerAccount(request, respond){
    usersDB.getCurrentUser(request.body.username, function(error, result){
        if(error){
            respond.json(error);
        }
        else{
            if (result[0] == null) { //username available
                var password = request.body.password;
                password = bcrypt.hashSync(password, 10);
                var user = new User(request.body.username, request.body.first_name, request.body.last_name, password, request.body.gender, request.body.address, request.body.email, request.body.mobile_number, request.body.profile_picture);
                usersDB.registerAccount(user, function(error, result){
                    if(error){
                        respond.json(error);
                    }
                    else{
                        respond.json(result);
                    }
                })
            } else { //username taken
                respond.json({result:"taken"});
            }
        }
    })
}

function updateUser(request, respond){
    var updateUser = new User(request.body.username, request.body.first_name, request.body.last_name, null ,request.body.gender, request.body.address, request.body.email, request.body.mobile_number, request.body.profile_picture);
        usersDB.updateUser(updateUser,function(error, result){
            if(error){
                respond.json(error);
            }
            else{
                respond.json(result); 
            }
        })
}

function updateSettings(request, respond){
    var updateUser = new User(request.body.username, null, null, null ,null, null, null, null, null, request.body.check);
        usersDB. updateSettings(updateUser,function(error, result){
            if(error){
                respond.json(error);
            }
            else{
                respond.json(result); 
            }
        })
}


function  deleteUser(request, respond){
 
    var token = request.body.token;
    try {
        var decoded = jwt.verify(token, secret);
        usersDB.deleteUser(decoded, function(error, result){
            if(error){
                respond.json(error);
            }
            else{
                respond.json(result); 
            }
        })
    }catch (error)
    {
        respond.json({result:"invalid token"});
    }
}

function forgetPassword(request, respond){
    var password = request.body.password;
    password = bcrypt.hashSync(password, 10);
    var forgetPassword = new User (request.body.username, null, null, password, null, null, null);
    usersDB.forgetPassword(forgetPassword, function(error, result){
        if(error){
            respond.json(error);
        }
        else{
            respond.json(result); 
        }
    })
}

function changePassword(request, respond){
    var password = request.body.password;
    password = bcrypt.hashSync(password, 10);
    var forgetPassword = new User (request.params.username, null, null, password, null, null, null);
    usersDB.forgetPassword(forgetPassword, function(error, result){
        if(error){
            respond.json(error);
        }
        else{
            respond.json(result); 
        }
    })
}

function  login(request, respond){    
    var password = request.body.password;
    var username = request.body.username;
    usersDB.login(username, function(error, result){
        if(error){
            respond.json({output1: "error"})
        }
        else{
            if(result[0] == null)
            {
                respond.json({output: "user not found"})
            }
            else
            {
                const hash = result[0].password;
                var flag = bcrypt.compareSync(password, hash);
                if(flag) {
                    var token = jwt.sign(username, secret);
                    respond.json({result:token});
                }
                else {
                    respond.json({result2:"invalid"});
                }
            }
        }
    })
}
function getUser(request, respond)
{
    var token = request.body.token;
    try {
        var decoded = jwt.verify(token, secret);
        usersDB.getUser(decoded, function(error, result){
            if(error){
                respond.json(error);
            }
            else{
                respond.json(result); 
            }
        })
    }catch (error)
    {
        respond.json({result:"invalid token"});
    }
}

function getCurrentUser(request, respond){
    usersDB.getCurrentUser(request.body.username, function(error, result){
        if(error){
            respond.json(error);
        }
        else{
            respond.json(result); 
        }
    })
}

module.exports = {registerAccount, login, updateUser, getCurrentUser, deleteUser, forgetPassword, changePassword, getUser, updateSettings};

