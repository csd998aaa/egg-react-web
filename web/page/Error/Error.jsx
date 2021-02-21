import React from 'react'
import { Result, Button } from 'antd';
import { Link } from 'react-router-dom';
import styles from '@/page/common.module.less'

const Error = () => {
    return (
        <div className={styles.base_bg}>
            <Result
                status="404"
                title="404"
                style={{
                    background: 'none',
                    height: '100vh'
                }}
                subTitle="Sorry, the page you visited does not exist."
                extra={
                    <Link to="/">
                        <Button type="primary">返回首页</Button>
                    </Link>
                }
            />
        </div>
    )
};

export default Error;