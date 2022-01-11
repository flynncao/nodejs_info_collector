var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
	res.send('欢迎来到我的爬虫。');
});

module.exports = router;