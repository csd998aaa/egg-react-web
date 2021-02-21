import React, { Component } from 'react';
import styles from './About.module';

import img from "@/assets/images/img.png"

class About extends Component {


    addUser = () => {
        // this.props.addUser();
    }


    render() {
        const { name, children } = this.props
       
        return (
            <>
                <div className={styles.wrap}>
                    About Page 123 232 <span>name is {name}</span>
                    <div>user:{this.props.user}</div>
                    <div>children content is {children}</div>
                    <button onClick={this.addUser}> + </button>
                </div>
            </>
        )
    }
}

export default About;