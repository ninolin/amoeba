const utils = require('../utils/utils');
const express = require('express');
const router = express.Router();
const validator = require('jsonschema').Validator;
const va = new validator();
class Schema {
    get getschema() {
        return {
            "type": "object", 
            "properties": {
                "account": {"type": "string"},
                "password": {"type": "string"}
            }, 
            "required": [
                "account",
                "password"
            ]
        }
    }
}

//login 
router.post('/login', async function(req, res) {
    try {
        const sql = 'SELECT * ' + 
                    'FROM USER ' +
                    'WHERE account = "'+req.body.account+'" AND password= "'+req.body.password+'"';
        const data = await utils.query(sql);
        res.json({ status: "successful", data: data });
    } catch (err) {
        utils.logger().error('[POST:/user/login] ' + err);
        res.json({ status: "failure"});
    }
});

//add
router.post('/', async function(req, res) {
    const valid = va.validate(req.body, new Schema().getschema);
    if(valid.valid) {
        const data = await utils.query('INSERT INTO USER (ACCOUNT, PASSWORD) VALUES ("'+req.body.name+'", "'+req.body.password+'")');
        res.json({ status: "successful"});
    } else {
        res.json({ status: "error", data: valid.errors[0].stack });
    }
});

module.exports = router;
