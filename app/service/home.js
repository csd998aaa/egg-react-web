const Service = require('egg').Service

class HomeService extends Service {
    async getBanner(key) {
        return key + '123';
    }
}

module.exports = HomeService