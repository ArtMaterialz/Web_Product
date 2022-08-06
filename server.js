// "use strict";

var express = require("express");

const port = 3000; 

//Accessing the controller page
var commentController = require('./controllers/commentController');
var userController = require('./controllers/userController');
var searchController = require('./controllers/searchController');
var rateController = require('./controllers/rateController');
var app = express();

app.use(express.static("./public"));
app.use(express.json());


//Search//
app.route('/filterType/:product_type').get(searchController.filterType); 
app.route('/product_info').get(searchController.displayProductInfo); 
app.route('/product_info2').get(searchController.displayProductInfo2); 
app.route('/search').post(searchController.getSearch);  
app.route('/product').get(searchController.product); 
app.route('/location').post(searchController.location);//Find the Lat and Long of the place


//Comment//
app.route('/deleteComment').delete(commentController.deleteComment); //Delete review
app.route('/updateComment').put(commentController.updateComment);//Edit review
app.route('/displayRating').post(commentController.getRating); //Display average rating
app.route('/displayComments').get(commentController.getAllComments); 
app.route('/noOfComment').post(commentController.get_No_Of_Comment);//Display number of comment
app.route('/addComment').post(commentController.addComment); //Add review
app.route('/getCommentUser').post(commentController.userComment); //Get Current Comment
app.route('/checkUser').post(commentController.checkComment); //Check if user have commented 




//User//
app.route('/user').post(userController.getUser);//Register a new account
app.route('/checkcurrent').post(userController.getCurrentUser);//Check if user is valid
app.route('/register').post(userController.registerAccount);//Register a new account
app.route('/login').post(userController.login);//Login 
app.route('/deleteUser').delete(userController.deleteUser);//Delete account
app.route('/updateUser').put(userController.updateUser);//Update user information
app.route('/resetPassword').put(userController.forgetPassword);//Reset password
app.route('/changePassword/:username').put(userController.forgetPassword);//Change password
app.route('/settings').post(userController.updateSettings)//Bot Settings



app.route('/updateRate').post(rateController.updateRate);

//LocalHost HTTP//
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
