//const mongodb = require('mongodb').MongoClient;
const mysql = require('mysql');
const toml = require('toml');
const fs = require('fs');
const config = fs.readFileSync('config.toml', 'utf8');


var Utils = class {

	static mongodb () {
        return new Promise((resolve, reject) => {
            mongodb.connect('mongodb://mongo:27017/amoeba', (e, d) => {
                if(e) {
                    reject(e); 
                } else {
                    d.close;
                    resolve(d);
                }
            });
        })
    }
    
    static mysqldb () {
        return new Promise((resolve, reject) => {
            var connection = mysql.createConnection({
                host: config.database.host,
                port: config.database.port,
                user: config.database.user,
                password: config.database.password,
                database: config.database.database
            });

            connection.connect(function(err) {
                if (err) {
                    reject('connect error');
                } else {
                    resolve(connection);
                }
            });
        })
    }

    static query (sql) {
        return new Promise((resolve, reject) => {
            this.mysqldb().then(v => {
                v.query(sql, function (err, result) {
                    if (err) {
                        reject('connect error');
                    } else {
                        console.log(result);
                        resolve(result);
                    }
                });
            })
        })
    }
};

module.exports = Utils;