//const mongodb = require('mongodb').MongoClient;
const mysql = require('mysql');
const toml = require('toml');
const log4js = require('log4js');
const fs = require('fs');
const config = toml.parse(fs.readFileSync('config.toml', 'utf8'));

log4js.configure({
    appenders: { amoeba: { type: 'file', filename: 'log/amoeba.log' } },
    categories: { default: { appenders: ['amoeba'], level: 'error' } }
});

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
            }).catch(e => {this.logger().error('[utils] ' + e)})
        })
    }

    static logger () {
        return log4js.getLogger('amoeba')
    }
};

module.exports = Utils;