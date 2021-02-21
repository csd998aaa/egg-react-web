exports.sequelize = {
    dialect: 'mysql',
    host: 'localhost',
    port: 3306,
    database: 'teacher_dashboard',
    username: 'root',
    password: 'csd998CSD',
};

exports.redis = {
    client: {
        host: '127.0.0.1',
        port: 6379,
        password: 'csd998CSD',
        db: 0,
    }
}

exports.cors = {
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS',
    credentials: true,
    origin: '*',  // 允许的请求来源（* 表示允许所有的IP的请求 ）
    exposeHeaders: ['Authorization']
}

exports.security = {
    csrf: {
        enable: false
    }
}
