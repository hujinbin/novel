import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

import getData from '../../common/getData';
import styles from './index.less';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bookList: props.staticContext
        };
    }

    async componentDidMount() {
        this.setState({ bookList: await getData(this.props.match.path) });
    }

    render() {
        const { bookList } = this.state;
        return (
            <div className={styles.box}>
                <div className={styles['App-header']}>
                    <img src={require('./logo.svg')} className={styles['App-logo']} alt="logo" />
                    <Link to="/about">About</Link>
                    <h1>hello koa-react-template</h1>
                    <ul>
                        {bookList && bookList.map((book) =>
                            <li key={book.bookId}>
                                <p>{book.name}</p>
                                <p>{book.auhtor}</p>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        );
    }
}

export default withRouter(Home);
