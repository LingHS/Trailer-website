const Koa = require('koa')
const views = require('koa-views')
const {
    resolve
} = require('path')
const ejs = require('ejs')
const {
    connect,
    initSchemas
} = require('./database/init');

const router = require('./routes');
(async () => {
    await connect()
    initSchemas()
    //require('./tasks/movie')
})()


const app = new Koa()
app.use(router.routes()).use(router.allowedMethods())
app.use(views(resolve(__dirname, './views'), {
    extension: 'ejs'
}))

app.use(async (ctx, next) => {
    await ctx.render('index', {
        you: 'Luke',
        me: 'Scott',
        title: '首页'
    })
})
app.listen(4455)