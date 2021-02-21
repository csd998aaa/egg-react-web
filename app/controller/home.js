'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx, service, app } = this;

    await ctx.render('index.nj')
  }

}

module.exports = HomeController;