const mongodb = require('mongodb').MongoClient;
const mysql = require('mysql');
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
    
    static mysqldb_con () {
        return new Promise((resolve, reject) => {
            mysql.createConnection({
                host: "mysql",
                user: "amoeba",
                password: "amoeba"
            });
        })
    }
    
    static query(sql, arg) {
        return new Promise((resolve, reject) => {
            console.log(this.mysqldb_con());
            this.mysqldb_con().then(v => {
                return v.query(
                    sql,
                    arg,
                    (err, rows, fields) => {
                      if (err) reject(err);
                      else resolve(rows);
                    }
                );
            })
        })
    }
};

module.exports = Utils;