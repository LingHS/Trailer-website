const Koa = require('koa')
const views = require('koa-views')
const {
    resolve
} = require('path')
const ejs = require('ejs')
const {
    connect,
    initSchemas,
    initAdmin
} = require('./database/init');
const R = require('ramda')
const MIDDLEWARES = ['router', 'parcel'];
const useMiddlewares = (app) => {
    R.map(
        R.compose(
            R.forEachObjIndexed(
                initWith => initWith(app)
            ),
            require,
            name => resolve(__dirname, `./middlewares/${name}`)
        )
    )(MIDDLEWARES)
};
(async () => {
    await connect()
    initSchemas()
    await initAdmin()
    //require('./tasks/movie')
    const app = new Koa()
    await useMiddlewares(app)

    app.listen(4455)
})()





// app.use(views(resolve(__dirname, './views'), {
//     extension: 'ejs'
// }))

// app.use(async (ctx, next) => {
//     await ctx.render('index', {
//         you: 'Luke',
//         me: 'Scott',
//         title: '首页'
//     })
// })