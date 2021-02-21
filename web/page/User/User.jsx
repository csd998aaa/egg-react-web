import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';

@inject('userStore','homeStore')
@observer
class User extends Component {

    render() {
        console.log(this.props)
        return (
            <>
                This is user component...
            </>
        );
    }
}

export default User;