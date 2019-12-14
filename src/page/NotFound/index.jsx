import React, { Component } from 'react';

import { Link, withRouter } from 'react-router-dom';
import styles from './index.less';

class About extends Component {
    render() {
        return (
            <div className={styles.box}>
                <div className={styles['pad-top']}>
                    <h2>  您访问的页面出去玩了! </h2>
                    <h5> 您访问的页面不存在，请点击页底的链接返回</h5>
                    <span id={styles['error-link']}>404</span>
                    <h2>! 访问出错 !</h2>
                </div>
                <Link className={styles.goBakk} to="/">返回首页</Link>
            </div>
        );
    }
}

export default withRouter(About);
