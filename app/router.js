'use strict';

const { Controller } = require("egg");

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;

  function pageRoutes(raw, controller) {
    const { locale } = app.middleware;

    router.get(raw, locale(), controller);
  }

  // pages
  pageRoutes('/', controller.home.index)

  // api
  router.get('/api/about', controller.about.about);

  router.post('/admin/login', controller.auth.doLogin);
  router.post('/admin/logout', controller.auth.doLogout);
  router.get('/admin/checkToken', controller.auth.checkToken);

  router.get("/api/getPV", controller.api.getPV);
};