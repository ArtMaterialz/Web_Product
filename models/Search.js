"use strict";

class Search {
    constructor(product_id, description, product_name, telephone, opening_hours, location, is_halal, product_type, 
        beverage_name, beverage_price, beverage_description, beverage_id, dishes_name, dishes_price, dishes_description, dishes_id ) {
        this.product_id = product_id;
        this.description = description;
        this.product_name = product_name;
        this.telephone = telephone;
        this.opening_hours = opening_hours;
        this.location = location;
        this.is_halal = is_halal;
        this.product_type = product_type;
        this.beverage_name = beverage_name;
        this.beverage_price = beverage_price;
        this.beverage_description = beverage_description;
        this.beverage_id = beverage_id;
        this.dishes_name = dishes_name;
        this.dishes_price = dishes_price;
        this.dishes_description = dishes_description;
        this.dishes_id = dishes_id;
    }
   
    getProduct_id_info() {
        return this.product_id_info;
    }
    getDescription() {
        return this.description;
    }
    getProduct_name() {
        return this.product_name;
    }
    getTelephone() {
        return this.telephone;
    }
    getOpening_hours() {
        return this.opening_hours;
    }
    getLocation() {
        return this.location;
    }
    getIs_halal() {
        return this.is_halal;
    }
    getProduct_type() {
        return this.product_type;
    }
    getBeverage_name() {
        return this.beverage_name;
    }
    setBeverage_price() {
        return this.beverage_price;
    }
    getBeverage_description() {
        return this.beverage_description;
    }
    getBeverage_id() {
        return this.beverage_id;
    }
    getDishes_name() {
        return this.dishes_name;
    }
    getDishes_price() {
        return this.dishes_price;
    }
    getDishes_description() {
        return this.dishes_description;
    }
    getDishes_id() {
        return this.dishes_id;
    }

}

module.exports = Search;