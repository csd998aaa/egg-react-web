import React, { Component } from "react";
import BaseLayout from "@/layout/BaseLayout";
import { inject, observer } from "mobx-react";

import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    UserOutlined,
    VideoCameraOutlined,
    UploadOutlined,
    DashboardOutlined,
    DatabaseOutlined,
    BarChartOutlined,
    IdcardOutlined,
    RobotOutlined
} from "@ant-design/icons";
import { observe } from "mobx";

const menu = [
    {
        title: "Dashboard",
        icon: DashboardOutlined,
        path: "/app/dashboard",
        children: [
            {
                title: "总况分析",
                to: "/app/dashboard/analysis",
                icon:BarChartOutlined
            },
            {
                title: "负载监控",
                to: "/app/dashboard/user",
                icon:DatabaseOutlined
            },
        ],
    },

    {
        title: "其他页",
        icon: UserOutlined,
        to: "/app/about",
    },

    {
        title: "个人中心",
        icon: UserOutlined,
        path: "/app/user",
        children: [
            {
                title: "基础信息",
                to: "/app/user/base",
                icon: IdcardOutlined
            },
            {
                title: "其他",
                to: "/app/user/update",
                icon: RobotOutlined
            },
        ],
    },
];

@inject("loginStore")
class App extends Component {
    componentDidMount() {
        this.props.loginStore.getLoginBaseState();
        // 页面刷新时 保存登录状态
        window.addEventListener("beforeunload", () => {
            this.props.loginStore.setLoginBaseState();
        });
    }

    render() {
        const { route } = this.props;
        return <BaseLayout routes={route.routes} menus={menu}></BaseLayout>;
    }
}

export default App;
