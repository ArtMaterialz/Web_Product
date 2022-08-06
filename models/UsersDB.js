"use strict";


var db = require('../db-connection');

class UsersDB{
    registerAccount(register, callback){
        var sql = "INSERT INTO item_review.user_info (username, first_name, last_name, password, gender, address, email, mobile_number, profile_picture) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
        db.query(sql, [register.getUsername(), register.getFirstName(), register.getLastName(), register.getPassword(), 
            register.getGender(), register.getAddress(), register.getEmail(), register.getMobileNumber() ,register.getProfile()], callback);
    }

    updateUser(updateUser, callback){
        var sql = "UPDATE item_review.user_info SET first_name = ?, last_name = ?, gender = ?, address = ?, email = ?, mobile_number = ?, profile_picture = ? WHERE username = ?";
        db.query(sql, [updateUser.getFirstName(), updateUser.getLastName(),updateUser.getGender(), updateUser.getAddress(), updateUser.getEmail(), updateUser.getMobileNumber(), updateUser.getProfile(),updateUser.getUsername()], callback);
    }
    updateSettings(updateUser, callback){
        var sql = "UPDATE item_review.user_info SET settings = ? WHERE username = ?";
        db.query(sql, [updateUser.getSettings(),updateUser.getUsername()], callback);
    }

    deleteUser(deleteUser, callback){
        var sql = "DELETE from item_review.user_info WHERE username = ?";
        return db.query(sql, [deleteUser], callback);
    }

    changePassword(changePassword, callback){
        var sql = "UPDATE item_review.user_info SET password = ? WHERE username= ?";
        db.query(sql, [changePassword.getPassword(), changePassword.getUsername()], callback);
    }

    forgetPassword(forgetPassword, callback){
        var sql = "UPDATE item_review.user_info SET password = ? WHERE username= ?";
        db.query(sql, [forgetPassword.getPassword(), forgetPassword.getUsername()], callback);
    }

    login(username, callback){
        var sql = "SELECT password from item_review.user_info WHERE username= ?";
        db.query(sql, [username], callback);
    }
    getUser(getUser, callback)
    {
        var sql = "SELECT distinct * from item_review.user_info WHERE username=?"
        db.query(sql, [getUser], callback);
    }
    getCurrentUser(user, callback){
        var sql = "select username from item_review.user_info where username=?"
        db.query(sql, [user], callback);
    }
    userCheck(userCheck, callback)
    {
        var sql = "SELECT distinct username from item_review.user_info WHERE username=?"
        db.query(sql, [userCheck], callback);
    }
}

module.exports = UsersDB;
