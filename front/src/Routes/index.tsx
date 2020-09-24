import React from 'react';
import { Switch, Route } from 'react-router-dom';
import SiginIn from '../pages/SiginIn';
import SiginUp from '../pages/SiginUp';

const Routes: React.FC = () => (
    <Switch>
        <Route path="/" exact component={SiginIn} />
        <Route path="/register" component={SiginUp} />
    </Switch>
)

export default Routes;