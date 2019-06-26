import React, { Component } from 'react';

import { Link, withRouter } from 'react-router-dom';

class About extends Component {
    render() {
        return (
            <div>
                <p>
                    <Link to="/">404</Link>
                </p>
            </div>
        );
    }
}

export default withRouter(About);
