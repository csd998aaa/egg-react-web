import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { Button } from "antd";
import { renderRoutes } from "react-router-config";
import styles from "./Home.module.less";

@inject("homeStore", "loginStore")
@observer
class Home extends Component {
    constructor(props) {
        super(props);
    }

    state = {
        ip: "",
        pv: "",
    };

    increment = () => {
        this.props.homeStore.increment();
    };

    decrement = () => {
        this.props.homeStore.decrement();
    };

    getBannerList = () => {
        console.log(this.props.homeStore.getBannerList());
    };

    getPV = async () => {
        let res = await window.axios
            .get("/api/getPV")
            .then((res) => res.data);
        this.setState({
            ip: res.ip,
            pv: res.pv,
        });
    };

    render() {
        const { count, loading } = this.props.homeStore;
        const { nickname } = this.props.loginStore;
        console.log(nickname);
        return (
            <>
                {/* {renderRoutes(this.props.route.routes)} */}
                <div>当前登录的角色为：{nickname}</div>
                <div>{count}</div>
                {loading ? <div>Loading...</div> : <div>Done!!</div>}
                <Button type="primary" onClick={this.increment}>
                    {" "}
                    ++++{" "}
                </Button>
                <Button type="primary" onClick={this.decrement}>
                    {" "}
                    -{" "}
                </Button>
                <Button
                    className={styles.button}
                    type="primary"
                    onClick={this.getBannerList}
                    loading={loading}
                >
                    {" "}
                    getData{" "}
                </Button>
                <span>
                    当前IP：{this.state.ip} PV：{this.state.pv}
                </span>
                <Button onClick={this.getPV}>增加PV</Button>
            </>
        );
    }
}

export default Home;
