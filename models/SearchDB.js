"use strict";

const { request } = require('express');
var db = require('../db-connection');

class SearchDB{
    getSearch(keyword, callback){
        var sql = "SELECT product_name AS name FROM item_review.product_info WHERE product_name = ?"; 
        db.query(sql,[keyword.getProduct_name()] ,callback);
    }

    filterType(keyword, callback){
        var sql = "SELECT * FROM item_review.product_info WHERE product_type = ?"
        db.query(sql,[keyword.getProduct_type()],callback);
    }
    displayProductInfo(callback){
        var sql = "SELECT * FROM item_review.product_info INNER JOIN item_review.rating ON item_review.product_info.product_id = item_review.rating.product_id2 "; 
        db.query(sql,callback);
      
    }
    displayProductInfo2(callback){
        var sql = "SELECT * FROM item_review.product_info INNER JOIN item_review.rating ON item_review.product_info.product_id = item_review.rating.product_id2 "; 
        db.query(sql,callback);
      
    }
 
    product(callback){
        var sql = "SELECT * FROM item_review.product_info INNER JOIN item_review.rating ON item_review.product_info.product_id = item_review.rating.product_id2 ";
        db.query(sql, callback);
    }
    location(getLocation ,callback){
        var sql = "SELECT * FROM item_review.product_info WHERE product_name = ? ";
        db.query(sql,[getLocation.getProduct_name()], callback);
    }
} 

module.exports = SearchDB;

