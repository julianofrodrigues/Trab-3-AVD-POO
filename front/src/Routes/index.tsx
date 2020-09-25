import React from 'react';
import { Switch, Route } from 'react-router-dom';
import SiginIn from '../pages/SiginIn';
import SiginUp from '../pages/SiginUp';
import Profile from '../pages/Profile';
import ForgotenPassword from '../pages/ForgotenPassword';


const Routes: React.FC = () => (
    <Switch>
        <Route path="/" exact component={SiginIn} />
        <Route path="/register" component={SiginUp} />
        <Route path="/profile" component={Profile} />
        <Route path="/forgoten" component={ForgotenPassword} />
    </Switch>
)

export default Routes;