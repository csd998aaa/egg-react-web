'use strict';

const Controller = require('egg').Controller;

class ApiController extends Controller {
    async getPV() {
        const { ctx, service, app } = this;

        let pv = await app.redis.hget("pv", ctx.ip) || 0
        await app.redis.hset("pv", ctx.ip, ++pv);
        ctx.body = {
            pv,
            ip: ctx.ip
        }
    }
}

module.exports = ApiController;