const utils = require('../utils/utils');
const express = require('express');
const router = express.Router();
const assert = require('assert');
const validator = require('jsonschema').Validator;
const va = new validator();
const schema = {
    "type": "object", 
    "properties": {
        "name": {"type": "string"},
        "amount": {"type": "integer"},
        "uint": {"type": "string"}
    }, 
    "required": "name"
};

class Account {
    
    static list() {
		return router.get('/account', async function(req, res) {
            const data = await utils.query('SELECT * FROM account');
            res.json({ status: "successful", data: data });
        });
    }
};

module.exports = Account;
