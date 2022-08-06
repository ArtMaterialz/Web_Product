"use strict";
const SearchDB = require('../models/SearchDB');
const Search = require('../models/Search');
const e = require('express');

var searchDB = new SearchDB();

function getSearch(request, respond){
    // var search = request.body.search;
    var search = new Search(null, null,  request.body.search, null,null, null, null, null,null, null, null );
    searchDB.getSearch(search, function(error, result){
        if(error){
            respond.json({test:"error"})
        }
        else{
            if(result[0] == null)
            {
                respond.json({test2:"error"})
            }
            else
            {
                respond.json(result);
            }
         
        }
    });
}

function filterType(request, respond){
    var search = new Search(null, null, null, null, null, null, null, request.params.product_type, null, null,null, null, null, null,null, null, null,null );
    searchDB.filterType(search, function(error, result){
        if(error){
            respond.json(error);
        }
        else{
            respond.json(result);
        }
    });
}
function displayProductInfo(request, respond){
    searchDB.displayProductInfo(function(error, result){
        if(error){
            respond.json(error);
        }
        else{
            respond.json(result);
        }
    });
}
function displayProductInfo2(request, respond){
    searchDB.displayProductInfo2(function(error, result){
        if(error){
            respond.json(error);
        }
        else{
            respond.json(result);
        }
    });
}


function product(request, respond){
    searchDB.product(function(error, result){
        if(error){
            respond.json(error);
        }
        else{
            respond.json(result);
        }
    });
}

function location(request, respond){
    var search = new Search(null, null, request.body.name , null, null, null, null, null, null, null,null, null, null, null,null, null, null,null );
 
    searchDB.location(search, function(error, result){
        if(error){
            respond.json(error);
        }
        else{
            respond.json(result);
        }
    });
}




module.exports = { filterType, displayProductInfo, displayProductInfo2, getSearch, product, location};

