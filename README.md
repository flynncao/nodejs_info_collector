# nodejs爬虫
## 使用方法
	1.`npm install`安装包依赖
	2.`node app.js`建立nodejs服务
	3.基础网络地址为http://localhost:3000/，根据自己需要的功能访问对应的地址

:heart:使用

## 功能 
### 1.爬取我的博客园内容
路由:`http://localhost:3000/cnblog`

### 2.爬取steam热销榜
路由:`http://localhost:3000/steam`

提示：steam在中国大陆已经被墙，因此需要配置代理>>>

如果你的本地VPN工具提供的访问端口为7890，
则需要在`routes/steam.js`修改这一行为
```js
var proxy = process.env.http_proxy || 'http://127.0.0.1:7890';
```
