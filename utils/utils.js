//const mongodb = require('mongodb').MongoClient;
const mysql = require('mysql');
const toml = require('toml');
const fs = require('fs');
const config = toml.parse(fs.readFileSync('config.toml', 'utf8'));

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
            console.log(config.mysql);
            var connection = mysql.createConnection({
                host: config.mysql.host,
                port: config.mysql.port,
                user: config.mysql.user,
                password: config.mysql.password,
                database: config.mysql.database
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
                        reject(err);
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