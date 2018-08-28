require("../utils/utils");

var ctl_Category = class {

	listCategory() {
        //console.log("aaaaaaaa");
        console.log(this.db);
		return router.get('/', function(req, res) {
            this.db.collection('test').insert({ fromBlock: 'abc'}, () => {});
            res.send("hello");
        });
	}
};

module.exports = ctl_Category;