"use strict";

class rate {
    constructor(idrating, overall, product_id2) {
        this.idrating = idrating;
        this.overall = overall;
        this.product_id2 = product_id2;
    
    }

    getIdRate()
    {
        return this.idrating;
    }
   
    getOverall() {
        return this.overall;
    }
    getproduct_id2() {
        return this.product_id2;
    }
}

module.exports = rate;