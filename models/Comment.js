"use strict";

class Comment {
    constructor(product_id, comment, username, rating, date) {
        this.product_id = product_id;
        this.comment = comment;
        this.username = username;
        this.rating = rating;
        this.date = date;
    }

    
    getProductId() {
        return this.product_id;
    }
    getComment() {
        return this.comment;
    }

    getUsername() {
        return this.username;
    }

    getRating() {
        return this.rating;
    }

    getDate() {
        return this.date;
    }

    setProductId(product_id) {
        this.product_id = product_id;
    }

    setComment(comment) {
        this.comment = comment;
    }

    setUsername(username) {
        this.username = username;
    }

    setRating(rating) {
        this.rating = rating;
    }

    setDatePosted(date) {
        this.date = date;
    }
}

module.exports = Comment;