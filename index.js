const Koa = require('koa')
const path = require('path')
const static = require('koa-static')
const fs = require('fs')
const app = new Koa()
const Router = require('koa-router')
const staticPath = './static'
app.use(static(
  path.join(__dirname, staticPath)
))
let list = JSON.parse(fs.readFileSync('./db.json'))

// 路由/shopowner/withdrawCash/v1
let router = new Router()
router.get('/', (ctx, next) => {
  ctx.body = 'hello world!'+list
}).get('/transactionCodelist', (ctx) => {
  //let id = ctx.request.body.id || 0;
  ctx.type = 'json'
  ctx.body = list.news
}).get('/transactionRecord', (ctx) => {
  ctx.type = 'json'
  ctx.body = list.comments
}).get('/404', (ctx) => {
  ctx.body = '404 page!'
})
// 加载路由中间件
app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(8080, () => {
  console.log('[demo] route-use-middleware is starting at port 8080')
})