import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import { HashRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import routes from './router';
import moment from 'moment';
import { ConfigProvider } from 'antd';

import axios from '@/api/axios';
import store from './store';

import 'moment/locale/zh-cn'; // 中文包 moment.js
import 'antd/lib/locale/zh_CN'; // 中文包 antd

moment.locale('zh-cn'); // 将moment.js设置为中文

window.axios = axios;

class App extends Component {
    render() {
        return (
            <Provider {...store}>
                <ConfigProvider locale="zh-CN">
                    <HashRouter>
                        {renderRoutes(routes)}
                    </HashRouter>
                </ConfigProvider>
            </Provider>
        )
    }
};

ReactDOM.render(
    <App />,
    document.querySelector("#root")
);