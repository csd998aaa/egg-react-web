const Service = require("egg").Service;

class AuthService extends Service {
    async doLogin(data) {
        const { app, ctx } = this
        const { Admin } = ctx.model

        const query = await Admin.findOne({
            where: {
                username: data.username,
            }
        });

        if (!query) return { code: -1, msg: "账号不存在" };

        const pwd = app.util.jsMd5.md5Pwd(data.password, query.salt); // 加盐摘要

        return query.password === pwd ?
            { code: 0, data: { username: query.username, nickname: query.nickname }, msg: "登录成功" } :
            { code: -1, msg: "密码不正确" };
    }
}

module.exports = AuthService;