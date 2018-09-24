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
                "name": {"type": "string"}
            }, 
            "required": [
                "name"
            ]
        }
    }
}

//list 
router.get('/', async function(req, res) {
    const data = await utils.query('SELECT * FROM CATEGORY');
    res.json({ status: "successful", data: data });
});

//add
router.post('/', async function(req, res) {
    const valid = va.validate(req.body, new Schema().getschema);
    if(valid.valid) {
        const data = await utils.query('INSERT INTO CATEGORY (NAME) VALUES ("'+req.body.name+'")');
        res.json({ status: "successful"});
    } else {
        res.json({ status: "error", data: valid.errors[0].stack });
    }
});

//update
router.post('/:id', async function(req, res) {
    //增加api資料必要性檢查
    let schema = new Schema().getschema;
    schema.required.push("name");
    const valid = va.validate(req.body, schema);
    if(valid.valid) {
        const sql = ' UPDATE CATEGORY SET ' +
                    '   NAME = "'+req.body.name+'"'+
                    ' WHERE ' + 
                    '   ID = '+req.params.id;
        const data = await utils.query(sql);
        res.json({ status: "successful"});
    } else {
        res.json({ status: "error", data: valid.errors[0].stack });
    }
});

//delete
router.delete('/:id', async function(req, res) {
    const sql = ' DELETE FROM CATEGORY WHERE ID = '+req.params.id;
    const data = await utils.query(sql);
    res.json({ status: "successful"});
});

module.exports = router;
