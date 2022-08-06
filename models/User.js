"use strict";

class User {
    constructor(username, first_name, last_name, password, gender, address, email, mobile_number, profile, settings) {
        this.username = username;
        this.first_name = first_name;
        this.last_name = last_name;
        this.password = password;
        this.gender = gender;
        this.address = address;
        this.email = email;
        this.mobile_number = mobile_number;
        this.profile = profile;
        this.settings = settings;
    }

    getSettings()
    {
        return this.settings;
    }
   
    getProfile() {
        return this.profile;
    }
    getUsername() {
        return this.username;
    }
    getFirstName() {
        return this.first_name;
    }
    getLastName() {
        return this.last_name;
    }
    getPassword() {
        return this.password;
    }
    getGender() {
        return this.gender;
    }
    getAddress() {
        return this.address;
    }
    getEmail() {
        return this.email;
    }
    getMobileNumber() {
        return this.mobile_number;
    }
    setDatePosted(date) {
        this.date = date;
    }
    

}

module.exports = User;