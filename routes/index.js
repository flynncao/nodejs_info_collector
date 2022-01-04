var express = require('express');
var router = express.Router();

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

router.get('/', function (req, res, next) {
	var htp = require('http')
	var url = "http://www.baidu.com/";
	htp.get(url, function (re) {
		var html = ''
		//监听返回请求体
		re.on('data', function (data) {
			var icon = require('iconv-lite')
			var change_data = icon.decode(data, 'gb2312')
			html += change_data;
			console.log(html)
		})
		re.on('end', function () {
			var cheerio = require('cheerio');
			var $ = cheerio.load(html)
			var chapters = $('a')
			var database = []
			var fs = require('fs')
			var ws = fs.createWriteStream('end.txt')
			ws.once('open', function () {
				console.log('文件写入成功')
			})
			ws.once('close', function () {
				console.log('文件写入完毕')
			})
			console.log(chapters.length)
			for (var i = 0; i < chapters.length; i++) {
				ws.write($(chapters[i]).text() + "\n");
				console.log($(chapters[i]).text())
				database.push($(chapters[i]));
			}
			ws.end();
			res.render("index", {
				title: "hello my crawler",
				data: database
			})

		}).on("error", function () {
			console.log("不好意思，爬取程序出错了");
		})

	})

})

module.exports = router;