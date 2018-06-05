const Router = require('koa-router')
const mongoose = require('mongoose')
const router = new　 Router()

router.get('/movies/all', async (ctx, next) => {
    const Movie = mongoose.model('Movie')
    const movies = await Movie.find({}).sort({
        'meta.createsAt': -1
    })
    ctx.body = {
        movies
    }
})
router.get('/movies/detail/:id', async (ctx, next) => {
    const Movie = mongoose.model('Movie')
    const id = ctx.params.id
    const movies = await Movie.findOne({
        doubanId: id
    })
    ctx.body = {
        movies
    }
})
module.exports = router