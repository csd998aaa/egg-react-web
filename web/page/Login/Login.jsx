import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import Footer from "@/layout/Footer";
import { Form, Input, Button, Checkbox, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import qs from "qs";

import styles_common from "@/page/common.module.less";
import styles from "./Login.module.less";

@inject("loginStore")
@observer
class Login extends Component {
    componentDidMount() {
        const search = qs.parse(this.props.history.location.search.substr(1));
        if (search.status == 401) {
            message.warn("登录过期，请重新登录");
        } else if (search.status == 0) {
            message.warn("退出登录成功");
        }
    }

    onFinish = (values) => {
        const { loginStore, history } = this.props;
        // username password
        loginStore.doLogin(values).then((res) => {
            if (res.code == 100) {
                message.success("登录成功");
                setTimeout(() => {
                    history.push("/app/home");
                }, 500);
            } else {
                message.error(res.msg);
            }
        });
    };

    onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };

    render() {
        const { loading } = this.props.loginStore;

        return (
            <div className={[styles_common.base_bg, styles.wrap].join(" ")}>
                <div className={styles.content}>
                    <header className={styles.title}>
                        <h1>Ant Design Pro</h1>
                        <span>一个基于 Ant Design 的后台管理系统</span>
                    </header>
                    <div className={styles.login_way}>账号密码登录</div>
                    <Form
                        className={styles.form}
                        name="basic"
                        initialValues={{ remember: false }}
                        onFinish={this.onFinish}
                        onFinishFailed={this.onFinishFailed}
                    >
                        <Form.Item
                            name="username"
                            rules={[{ required: true, message: "请输入账号" }]}
                        >
                            <Input
                                placeholder="请输入账号"
                                size="large"
                                prefix={
                                    <UserOutlined
                                        style={{ color: "#8f8f8f" }}
                                    />
                                }
                            />
                        </Form.Item>

                        <Form.Item
                            name="password"
                            rules={[{ required: true, message: "请输入密码" }]}
                        >
                            <Input.Password
                                placeholder="请输入密码"
                                size="large"
                                prefix={
                                    <LockOutlined
                                        style={{ color: "#8f8f8f" }}
                                    />
                                }
                            />
                        </Form.Item>

                        <Form.Item
                            wrapperCol={{ span: 24 }}
                            name="remember"
                            valuePropName="checked"
                        >
                            <Checkbox>自动登录</Checkbox>
                        </Form.Item>

                        <Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                size="large"
                                style={{ width: "100%" }}
                                loading={loading}
                            >
                                登录
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
                <Footer />
            </div>
        );
    }
}

export default Login;
