const mongodb = require('mongodb').MongoClient;

var Utils = class {

	static db () {
        return new Promise((resolve, reject) => {
            mongodb.connect('mongodb://localhost:27017/Amoeba', (e, d) => {
                if(e) {
                    reject(e); 
                } else {
                    d.close;
                    resolve(d);
                }
            });
        })
	}
};

module.exports = Utils;