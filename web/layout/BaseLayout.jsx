import React, { Component } from "react";
import { renderRoutes } from "react-router-config";
import { Layout } from "antd";

import Header from "./Header";
import Footer from "./Footer";
import SideNav from "./SideNav";

import styles from "./BaseLayout.module.less";

const { Sider, Content } = Layout;

class BaseLayout extends Component {
    constructor(props) {
        super(props);
    }

    state = {
        collapsed: false,
    };

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };

    render() {
        const { routes, menus } = this.props;

        return (
            <Layout className={styles.base_layout}>
                {/* menu */}
                <Sider
                    trigger={null}
                    collapsible
                    collapsed={this.state.collapsed}
                >
                    <SideNav menus={menus} />
                </Sider>

                <Layout className={styles.site_layout}>
                    {/* header */}
                    <Header
                        className={styles.header_wrap}
                        collapsed={this.state.collapsed}
                        toggle={this.toggle}
                    />

                    <Content
                        className={[
                            styles.site_layout_background,
                            styles.site_layout_content,
                        ].join(" ")}
                    >
                        {/* body */}
                        <main>{renderRoutes(routes)}</main>
                        {/* footer */}
                        <Footer />
                    </Content>
                </Layout>
            </Layout>
        );
    }
}

export default BaseLayout;
