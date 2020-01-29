var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

    console.log("NESTO")
    return res.status(200)

});

module.exports = router;



/*

}*/
