import React, { Component } from "react";
import { Link } from "react-router-dom";
import { inject, observer } from "mobx-react";
import { Layout, Tag, Dropdown, Menu, Popconfirm } from "antd";
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    UserOutlined,
    LockOutlined,
    PoweroffOutlined,
    QuestionCircleOutlined,
} from "@ant-design/icons";

import styles from "./Header.module.less";

const { Header: HeaderLayout } = Layout;

const Trigger = ({ collapsed, toggle }) => {
    return collapsed ? (
        <MenuUnfoldOutlined className={styles.trigger} onClick={toggle} />
    ) : (
        <MenuFoldOutlined className={styles.trigger} onClick={toggle} />
    );
};

const clickLogout = () => {
    window.axios.post("/admin/logout").then((res) => {
        console.log(res);
    });
};

const menu = (
    <Menu>
        <Menu.Item icon={<UserOutlined />}>
            <Link to="/app/user/base">个人中心</Link>
        </Menu.Item>
        <Menu.Item icon={<LockOutlined />}>
            <Link to="/app/user/update">修改密码</Link>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item icon={<PoweroffOutlined />}>
            <a onClick={clickLogout}>退出登录</a>
        </Menu.Item>
    </Menu>
);

const UserState = ({ nickname, avatar }) => {
    return (
        <div className={styles.user_state}>
            <Dropdown overlay={menu} placement="bottomLeft">
                <div className={styles.action}>
                    <img className={styles.logo} src={avatar} />
                    <span>{nickname}</span>
                </div>
            </Dropdown>
            <Popconfirm
                title="确定退出登录？"
                icon={<QuestionCircleOutlined style={{ color: "red" }} />}
                okText="确定"
                cancelText="取消"
                onConfirm={clickLogout}
            >
                <Tag className={styles.quit} color="#f50">
                    退出登录
                </Tag>
            </Popconfirm>
        </div>
    );
};

@inject("loginStore")
@observer
class Header extends Component {
    render() {
        const { collapsed, toggle, loginStore } = this.props;
        console.log(this.props)
        return (
            <HeaderLayout className={styles.site_layout_header}>
                <Trigger collapsed={collapsed} toggle={toggle} />
                <UserState
                    nickname={loginStore.nickname}
                    avatar={loginStore.avatar}
                />
            </HeaderLayout>
        );
    }
}

export default Header;
