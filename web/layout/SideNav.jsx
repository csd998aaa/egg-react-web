import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { Menu } from "antd";

class SideNav extends Component {
    componentDidMount() {
        this.xhmenu();

        window.addEventListener("hashchange", this.xhmenu);
    }
    componentWillUnmount() {
        window.removeEventListener("hashchange",this.xhmenu);
    }
    state = {
        menuOpenKeys: "",
    };

    xhmenu = () => {
        const { menus, location } = this.props;
        const pathname = location.pathname;

        const matchPath = menus.filter((val) =>
            new RegExp(`^${val.path}`).test(pathname)
        );

        this.setState({
            menuOpenKeys:
                matchPath && matchPath.length != 0 ? matchPath[0].path : "",
        });
    };

    onOpenChange = (openKeys) => {
        if (openKeys.length !== 0) {
            this.setState({ menuOpenKeys: openKeys[1] });
        } else {
            this.setState({ menuOpenKeys: "" });
        }
    };

    render() {
        return (
            <>
                {/* logo */}
                <div
                    style={{
                        height: "32px",
                        background: "rgba(255, 255, 255, 0.3)",
                        margin: "16px",
                    }}
                />

                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={["/app/home"]}
                    selectedKeys={[this.props.location.pathname]}
                    defaultOpenKeys={[this.state.menuOpenKeys]}
                    openKeys={[this.state.menuOpenKeys]}
                    onOpenChange={this.onOpenChange}
                >
                    {this.props.menus.map((item) =>
                        item.children ? (
                            <Menu.SubMenu
                                key={item.path}
                                icon={React.createElement(item.icon)}
                                title={item.title}
                            >
                                {item.children.map((subItem) => (
                                    <Menu.Item key={subItem.to}>
                                        <Link to={subItem.to}>
                                            {subItem.icon &&
                                                React.createElement(
                                                    subItem.icon
                                                )}{" "}
                                            <span>{subItem.title}</span>
                                        </Link>
                                    </Menu.Item>
                                ))}
                            </Menu.SubMenu>
                        ) : (
                            <Menu.Item
                                key={item.to}
                                icon={React.createElement(item.icon)}
                            >
                                <Link to={item.to}>{item.title}</Link>
                            </Menu.Item>
                        )
                    )}
                </Menu>
            </>
        );
    }
}
// export default SideNav;

export default withRouter(SideNav);
