const { Controller } = require('egg');

class AuthController extends Controller {
    async doLogin() {
        const { ctx, service, app } = this;
        try {
            const { username = '', password = '', remember } = ctx.request.body;

            if (!username || !password) return ctx.body = { code: 10001, msg: "非法登录" };

            const checkAuth = await service.auth.doLogin({ username, password }); // 校验账号密码

            if (checkAuth.code === 0) {
                const isRemeberExp = remember ? (60 * 120 * 7) : (60 * 120);
                const token = app.jwt.sign({
                    data: checkAuth.data,
                    exp: Math.floor(Date.now() / 1000) + isRemeberExp, // 10s 60*60 = 1h;
                }, app.config.secret);

                ctx.set({ 'Authorization': token });
                ctx.body = {
                    code: 100,
                    data: checkAuth.data,
                };

            } else {
                ctx.body = checkAuth;
            }

        } catch (err) {
            ctx.body = { code: 10001, msg: "非法登录" };
        }
    }

    async doLogout() {
        const { ctx } = this
        ctx.status = 401;
        ctx.body = {
            code: 0,
            msg: "ok"
        }
    }

    async checkToken() {
        const { ctx } = this;
        ctx.body = 'ok'
    }

}

module.exports = AuthController;