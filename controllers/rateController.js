"use strict";
const RateDB = require('../models/rateDB');
const rate = require('../models/rate');

var rateDB = new RateDB();
function updateRate(request, respond){

    var rating = new rate(null, request.body.overall, request.body.id);
    rateDB.updateRate(rating, function(error, result){
        if(error){
            respond.json(error);
        }
        else{
            respond.json(result);
        }
    });
}


module.exports = { updateRate};

