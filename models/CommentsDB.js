"use strict";

var db = require('../db-connection');

class CommentsDB{
    getAllComments(callback){
        var sql = "SELECT * from item_review.product_review INNER JOIN item_review.user_info ON item_review.product_review.username = item_review.user_info.username "; 
        db.query(sql, callback);
    }
    get_No_Of_Comment(comment, callback){
        var sql = "SELECT COUNT(comment) AS count from item_review.product_review WHERE product_id= ?"; 
        db.query(sql,[comment.getProductId()], callback);
    }
    getNoOFRatings(comment, callback){
        var sql = "SELECT COUNT(rating) from item_review.product_review WHERE product_id= ?"; 
        db.query(sql,[comment.getProductId()], callback);
    }
    getRating(comment, callback){
    
        var sql = "SELECT CAST(AVG(rating) AS DECIMAL(3,2)) AS average FROM item_review.product_review WHERE product_id = ?";
        db.query(sql, [comment.getProductId()], callback);
    }
    updateComment(comment, callback){
        var sql = "UPDATE item_review.product_review SET comment = ?, rating = ?, date = ? WHERE product_id = ? AND username =?";
        return db.query(sql, [comment.getComment(), comment.getRating(), comment.getDate(), comment.getProductId(), comment.getUsername()], callback);
    }
    userComment(comment, callback){
        var sql = "SELECT distinct * from item_review.product_review WHERE product_id=? AND username = ?";
        return db.query(sql, [comment.getProductId(),comment.getUsername()], callback);
    }

    deleteComment(commentID, callback){
        var sql = "DELETE from item_review.product_review WHERE product_id = ? AND username =?"
        return db.query(sql, [commentID.getProductId(), commentID.getUsername()],callback);
    }

    addComment(comment, callback){
        var sql = "INSERT INTO item_review.product_review (comment, product_id, rating, username, date) VALUES (?, ?, ?, ?, ?)";
        db.query(sql, [comment.getComment(),comment.getProductId(),  comment.getUsername(), comment.getRating(),comment.getDate()], callback);
    }
    checkComment(comment, callback)
    {
        var sql = "SELECT distinct username from item_review.product_review WHERE username=? AND product_id"
        db.query(sql, [, comment.getProductId(), comment.getUsername()], callback);
    }

  
}

module.exports = CommentsDB;

