const Koa = require('koa')
const app = new Koa()
app.use(async (ctx, next) => {
    ctx.body = "movie index"
})
app.listen(4455)