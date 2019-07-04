import React, { Component } from 'react';

import { Link, withRouter } from 'react-router-dom';
import './index.less';

class About extends Component {
    render() {
        return (
            <div className="box">
                <div className="container">
                    404
	                {/* <img className="png" src={require('../../assets/images/404.png')} />
	                <img className="png msg" src={require('../../assets/images/404_msg.png')} />
	                <p><Link  to="/"><img class="png" src={require('../../assets/images/404_to_index.png')} /></Link> </p> */}
                </div>
                <div className="cloud png"></div>
            </div>
        );
    }
}

export default withRouter(About);
