'use strict';

exports.keys = '_1611109127369_2819';

// customLoader
exports.customLoader = {
  util: {
    directory: 'app/util',
    inject: 'app',
  },

}

// 路由白名单
exports.noAuthRouter = ['/', '/admin/login', /^\/api\//];

// 中间件
exports.middleware = ['auth'];

exports.view = {
  defaultViewEngine: 'nunjucks',
  mapping: {
    '.nj': 'nunjucks'
  },
};

exports.inject = {
  globalData: "Hello"
};

exports.sequelize = {
  define: { // model的全局配置
    // timestamps: true, // 添加create,update,delete时间戳
    paranoid: true, // 添加软删除
    freezeTableName: true,
    underscored: true,
  },

  dialectOptions: { // 让读取date类型数据时返回字符串而不是UTC时间
    dateStrings: true,
    typeCast(field, next) {
      if (field.type === "DATETIME") {
        return field.string();
      }
      return next();
    }
  },

};

exports.onerror = {
  all(err, ctx) {
    // 在此处定义针对所有响应类型的错误处理方法
    // 注意，定义了 config.all 之后，其他错误处理方法不会再生效
    ctx.body = 'error';
    ctx.status = 500;
    ctx.logger.error(err);
  },
}