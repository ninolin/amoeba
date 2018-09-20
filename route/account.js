const utils = require('../utils/utils');
const express = require('express');
const router = express.Router();
const validator = require('jsonschema').Validator;
const va = new validator();
const schema = {
    "type": "object", 
    "properties": {
        "acc_code": {"type": "string"},
        "acc_name": {"type": "string"},
        "bill_date": {"type": "string"},
        "bill_pic": {"type": "string"},
        "addr_name": {"type": "string"},
        "address1": {"type": "string"},
        "address2": {"type": "string"},
        "address3": {"type": "string"},
        "address4": {"type": "string"},
        "zone_c": {"type": "string"},
        "prefix": {"type": "string"},
        "city": {"type": "string"}
    }, 
    "required": "acc_name"
};

class Account {
    
    static list() {
		return router.get('/account', async function(req, res) {
            const data = await utils.query('SELECT * FROM account');
            res.json({ status: "successful", data: data });
        });
    }

    static add() {
        return router.post('/account', async function(req, res) {
            const valid = va.validate(req.body, schema);
            if(valid.valid) {
                const data = await utils.query('INSERT INTO account (ACC_CODE, ACC_NAME) VALUES ("'+req.body.acc_code+'", "'+req.body.acc_name+'")');
                res.json({ status: "successful"});
            } else {
                res.json({ status: "error", data: valid.errors[0].stack });
            }
            
        });
    }
};

module.exports = Account;
