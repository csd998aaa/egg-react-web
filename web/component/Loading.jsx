/**
 * 加载页，延迟加载时显示
 */

import React, { Component } from "react";
import { Spin } from "antd";
import styles from "@/page/common.module.less";

const style = {
    width: "100%",
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
};

class Loading extends Component {
    componentDidMount() {
        window.axios.get("/admin/checkToken");
    }

    render() {
        return (
            <div className={styles.base_bg} style={style}>
                <Spin size="large" />
            </div>
        );
    }
}

export default Loading;
