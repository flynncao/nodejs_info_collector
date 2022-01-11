var express = require('express');
var router = express.Router();
const superagent = require('superagent')
const cheerio = require('cheerio')
const fs = require('fs');
let topURL = 'https://store.steampowered.com/search/?filter=topsellers'
let filterURL = 'https://store.steampowered.com/tags/zh-cn/fps#p=1&tab=TopSellers'
require('superagent-proxy')(superagent)
var proxy = process.env.http_proxy || 'http://127.0.0.1:7890';

router.get('/', function (req, res, next) {

	superagent.get(filterURL).proxy(proxy)
		.end(function (err, sres) {
			if (err) {
				return next(err)
			}
			var $ = cheerio.load(sres.text)
			console.log('sres text', sres.text)
			var items = []
			$('#TopSellersTable .tab_item').each(function (index, el) {
				var $el = $(el)
				items.push({
					link: $el.attr('href'),
					imgSrc: $el.find('.tab_item_cap_img').attr('src'),
					title: $el.find('.tab_item_name').text()
				})
			})
			res.send(items)
		})
})


module.exports = router;