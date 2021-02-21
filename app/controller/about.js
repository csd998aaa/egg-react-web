'use strict';

const Controller = require('egg').Controller;

class AboutController extends Controller {
  async about() {
    const { ctx, service, app } = this;

    ctx.logger.info('some request data: %j', ctx.query);

    let data = await service.home.getBanner('csd');
    
    ctx.body = {
      code: 200,
      msg: 'ok',
      data,
    }
    // await ctx.render('page/react.nj', {
    //   entryKey: 'page/about/About'
    // })
  }
}

module.exports = AboutController;