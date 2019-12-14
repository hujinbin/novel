/**
 * 返回一个基本的App
 */
import React from 'react';
import { Route, Switch } from 'react-router-dom';

import routes from './routes'

class RoutesIndex extends React.Component {
    render() {
        const { ...props } = this.props;
        return (
            <div className="app-container">
                <Switch>
                    {routes.map((item, index) => (
                        <Route key={index} path={item.path} exact render={() => <item.component {...props} />} />
                    ))}
                </Switch>
            </div>
        );
    }
}

export { RoutesIndex, routes };
