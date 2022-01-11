var express = require('express');
var router = express.Router();
const superagent = require('superagent')
const cheerio = require('cheerio')
const fs = require('fs');
let targetUrl = 'https://www.cnblogs.com/'
//用来保存解析到的内容和图片地址数据
let content = '';
let imgs = [];
let items = []
//发起请求
router.get('/', function (req, res, next) {
	superagent.get('http://www.cnblogs.com/caozhenfei')
		.end(function (err, sres) {
			if (err) {
				return next(err);
			}
			// sres.text 里面存储着网页的 html 内容，将它传给 cheerio.load 之后
			// 就可以得到一个实现了 jquery 接口的变量，我们习惯性地将它命名为 `$`
			// 剩下就都是 jquery 的内容了
			var $ = cheerio.load(sres.text);
			var items = [];
			$('.day .postTitle2').each(function (index, element) {
				var $element = $(element);
				items.push({
					标题: $element.text(),
					网址: $element.attr('href')
				});
			});
			res.send(items);
		});
});
// superagent.get(targetUrl)
// 	.end((error, sres) => {
// 		if (error) {
// 			console.log(error)
// 			return;
// 		}

// 		const $ = cheerio.load('<h2 class="title">Hello world</h2>');

// 		$('h2.title').text('Hello there!'); //抓取需要的数据
// 		console.log('$.html() :>> ', $.html());
// 		console.log('card-title', $('.card-title'));
// 		$('#post_list .post_item').each((index, element) => {
// 			console.log('element :>> ', element);
// 			let temp = {
// 				'标题': $(element).find('.post-item-title').text()
// 				// '作者': $(element).find('.post_item_foot > a').text(),
// 				// '阅读数': +$(element).find('.article_view a').text().slice(3, -2),
// 				// '推荐数': +$(element).find('.diggnum').text()
// 			}
// 			content += JSON.stringify(temp) + '\n';
// 			//图片地址
// 			// if ($(element).find('img.pfs').length > 0) {
// 			// 	imgs.push($(element).find('img.pfs').attr('src'));
// 			// }
// 		});
// 		res.send(content)
// 		// console.log('content :>> ', content);
// 		// mkdir('./texts', saveContent);
// 		// mkdir('./imgs', downloadImg);

// 	})
//将文字内容存入txt文件中
var saveContent = () => {
	console.log('content :>> ', content);
	let chapters = content
	console.log('chapters :>> ', chapters);

	var ws = fs.createWriteStream('end.txt')
	ws.once('open', function () {
		console.log('文件写入成功')
	})
	ws.once('close', function () {
		console.log('文件写入完毕')
	})
	for (var i = 0; i < chapters.length; i++) {
		ws.write($(chapters[i]).text() + "\n");
		console.log($(chapters[i]).text())
		database.push($(chapters[i]));
	}
	ws.end();
	// fs.writeFile('./content/content.txt', content.toString());

}
//下载爬到的图片
var downloadImg = () => {
	imgs.forEach((imgUrl, index) => {
		//获取图片名  
		let imgName = imgUrl.split('/').pop();

		//下载图片存放到指定目录
		let stream = fs.createWriteStream(`./imgs/${imgName}`);
		let req = request.get('https:' + imgUrl);
		req.pipe(stream);
		console.log(`开始下载图片 https:${imgUrl} --> ./imgs/${imgName}`);
	})
}

function mkdir(_path, callback) {
	console.log('callback :>> ', callback);
	if (fs.existsSync(_path)) {
		console.log(`${_path}目录已存在`)
	} else {
		fs.mkdir(_path, (error) => {
			if (error) {
				return console.log(`创建${_path}目录失败`);
			}
			console.log(`创建${_path}目录成功`)
		})
	}
	callback();
}
module.exports = router;