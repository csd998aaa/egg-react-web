const crypto = require('crypto');

module.exports = function jsM5d(app) {
    return {

        md5(str) {
            let createMd5 = crypto.createHash('md5');

            createMd5.update(str);
            str = createMd5.digest('hex');
            return str;
        },

        /**
         * md5消息摘要  
         * @param {String} pwd 
         * @param {String} salt 盐值
         */
        md5Pwd(pwd, salt) {
            pwd = pwd + ':' + salt
            let createMd5 = crypto.createHash('md5')
            createMd5.update(pwd)
            pwd = createMd5.digest('hex')
            return pwd
        },

        createSalt() {
            return Math.random().toString().slice(2, 8)
        },

    };
}