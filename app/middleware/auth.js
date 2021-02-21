module.exports = (options, app) => {
    const matchRoute = (paths, url) => {
        return paths.some(function (p) {
            return (typeof p === 'string' && p === url) ||
                (p instanceof RegExp && !!p.exec(url));
        });
    };

    return async function auth(ctx, next) {
        if (matchRoute(app.config.noAuthRouter, ctx.url)) {
            // 白名单路由 
            await next();
        } else {
            let decode;
            let token = ctx.headers.authorization ? ctx.headers.authorization : '';
            token = token.substring(7) // 把 Bearer 截取掉

            try {
                await ctx.app.jwt.verify(token, app.config.secret); // 校验 token
            } catch (err) {
                console.log(err.name)
                if (err.name === 'TokenExpiredError') {
                    decode = ctx.app.jwt.decode(token); // 解码
                    // 过期2小时内 签发新的token
                    if (Math.floor(Date.now() / 1000) - decode.exp < 60 * 120) {
                        // console.log('继续签发')
                        token = ctx.app.jwt.sign({
                            data: decode.data,
                            exp: Math.floor(Date.now() / 1000) + (60 * 120), // 10s 60*60 = 1h;
                        }, app.config.secret);

                        ctx.set({ 'Authorization': token });
                    } else {
                        ctx.status = 401;
                        ctx.body = {
                            code: 401,
                            msg: "auth expires"
                        }
                        return;
                    }

                } else {
                    ctx.status = 401;
                    ctx.body = {
                        code: 1,
                        msg: "no authorization",
                    }
                    return;
                }
            }
            await next();
        };
    };
};