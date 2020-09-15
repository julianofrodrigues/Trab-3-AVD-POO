import React from 'react';
import { Switch, Route } from 'react-router-dom';
import SiginIn from '../pages/SiginIn';

const Routes: React.FC = () => (
    <Switch>
        <Route path="/" exact component={SiginIn} />
    </Switch>
)

export default Routes;