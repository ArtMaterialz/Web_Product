"use strict";
var db = require('../db-connection');

class rateDB{
    updateRate(updateRate, callback){
        var sql = "UPDATE item_review.rating SET overall = ? WHERE product_id2 = ?";
        db.query(sql, [updateRate.getOverall(), updateRate.getproduct_id2()], callback);
    }

}
module.exports = rateDB;
