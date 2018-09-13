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
        "age": {"type": "integer"}
    }, 
    "required": "name"
};

class Category {
    
    static list() {
		return router.get('/category', async function(req, res) {
            const db = await utils.db();
            const category = await db.collection('category').find({}).toArray();
            res.json({ status: "successful", data: category });
        });
    }
    
    static create() {
        return router.post('/category', async function(req, res) {
            let valid = va.validate(req.body, schema);
            if(valid.valid) {
                const db = await utils.db();
                db.collection('category').insert(req.body, (v) => {console.log(v)});
                res.json({ status: "successful" });
            } else {
                res.json({ status: "error", data: valid.errors[0].stack });
            }
        });
    }

    static delete() {
        return router.delete('/category/:name', async function(req, res) {
            const db = await utils.db();
            console.log(req.params.name);
            db.collection('category').remove({ 'name': req.params.name });
            res.json({ status: "successful" });
        });
    }

    static update() {
        return router.put('/category/:name', async function(req, res) {
            let valid = va.validate(req.body, schema);
            if(valid.valid) {
                const db = await utils.db();
                db.collection('category').findAndModify({ 'name': req.params.name }, {}, {$set: { 'name': req.body.name }})
                res.json({ status: "successful" });
            } else {
                res.json({ status: "error", data: valid.errors[0].stack });
            }
        });
    }
};

module.exports = Category;
