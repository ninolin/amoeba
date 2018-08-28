const os = require('os');
const fs = require('fs');
const path = require('path');
const url = require('url');
const toml = require('toml');
const mongodb = require('mongodb').MongoClient;

class Utils {

  static readConfig() {
    const configPath = path.resolve(__dirname, 'config.toml');
    return new Promise((resolve, reject) => {
        fs.readFile(configPath, (err, data) => {
          if(err) {
            return reject(err);
          } else {
            return resolve(toml.parse(data));
          }
        });
    });
  }

  static initialDB() {
    return new Promise((resolve, reject) => {
        this.readConfig().then(v => {
            //const dbPath = v.database.protocol + "//" + v.database.hostname + ":" + v.database.port + "/" + v.database.db;
            const dbPath = 'mongodb://localhost:27017/animals';
            console.log(dbPath);
            mongodb.connect('mongodb://localhost:27017/CCR', (e, d) => {
                if(e) {
                  resolve(false);
                } else {
                  const db = d.db();
                  db.close = d.close;
                  resolve(db);
                }
            });
        });
    });
  }
}

module.exports = Utils;