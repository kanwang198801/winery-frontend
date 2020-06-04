import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Wines from './containers/Wines';
import Wine from './containers/Wine';
import NotFoundPage from './containers/NotFoundPage';

const Index = () => (
    <Route render={({ location }) => (
        <Switch location={location}>
            <Route path="/" component={Wines} key="Wines" exact={true} />
            <Route path="/wine/:id" component={Wine} key="Wine" exact={true} />
            <Route path="" component={NotFoundPage} />
        </Switch>
    )} />
);

export default Index;