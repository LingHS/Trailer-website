const Router = require('koa-router')
const mongoose = require('mongoose')
const router = new　 Router()
const {
    controller,
    get,
    post,
    put
} = require('../lib/decorator')
const {
    checkPassword
} = require('../service/admin')

@controller('/api/v0/user')
export class userController {
    @post('/login')
    //@login
    //@admin(['developer'])
    //@log
    async login(ctx, next) {
        const {
            email,
            password
        } = ctx.request.body
        const matchData = await checkPassword(email, password)

        if (!matchData.user) {
            return (ctx.body = {
                success: false
            })
        }
        if (matchData.match) {
            return (ctx.body = {
                success: true
            })
        }
        return (ctx.body = {
            success: false
        })
    }
}


//module.exports = router