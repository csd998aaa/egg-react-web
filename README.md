# example



## QuickStart

<!-- add docs here for user -->

see [egg docs][egg] for more detail.

### Development

```bash
$ npm i
$ npm run dev
$ open http://localhost:7001/
```

### Deploy

```bash
$ npm start
$ npm stop
```

### npm scripts

- Use `npm run lint` to check code style.
- Use `npm test` to run unit test.
- Use `npm run autod` to auto detect dependencies upgrade, see [autod](https://www.npmjs.com/package/autod) for more detail.


### package

单页面打包！！
```

# dev package
webpack@4
webpack-cli@3.3.12

babel-loader
@babel/core
@babel/preset-env
@babel/preset-react
@babel/plugin-proposal-class-properties
@babel/plugin-transform-runtime
babel-plugin-root-import
core-js

autoprefixer
css-loader
postcss-loader
less-loader
less

copy-webpack-plugin
clean-webpack-plugin
mini-css-extract-plugin
html-webpack-plugin


# -----------------
配置 antd
npm i antd
npm i -D babel-plugin-import

// 修改babel.config.json
 [
    "import",
    {
       "libraryName": "antd",
       "style": true
    }
],


# ----------------- 20210130
// redux教程：https://juejin.cn/post/6844903815594901512
redux 
react-redux
redux-thunk
redux-actions
// combineReducers 有问题！！
// redux-actions 未试验。

# ----------------- 20210201
删除 redux系列
npm uninstall redux react-redux redux-actions redux-thunk

// 引入mobX
npm i mobx mobx-react
// 引入 decorator 语法支持
npm install --save-dev @babel/plugin-proposal-decorators
.babelrc 配置  [ "@babel/plugin-proposal-decorators", { "legacy": true } ],


// 坑！ mobX@6不更新render，是因为新版本的store不需要手动去标记装饰器@observable @action了，直接在constructor里makeAutoObservable(this)就可以了。

// 修改 懒加载为 react-loadable 
npm i react-loadable 



# ----------------- 20210209
# 引入redis
npm i egg-redis

```


[egg]: https://eggjs.org