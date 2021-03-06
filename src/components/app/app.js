import React, { Component } from 'react';

import Header from '../header';
import RandomPlanet from '../random-planet';
import ErrorBoundry from '../error-boundry';
import SwapiService from '../../services/swapi-service';

import {
  PeoplePage,
  PlanetsPage,
  StarshipsPage } from '../pages';

import { SwapiServiceProvider } from '../swapi-service-context';

import './app.css';

import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import StarshipDetails from '../sw-components/starship-details';

export default class App extends Component {

  state = {
    swapiService: new SwapiService()
  };

  render() {

    return (
      <ErrorBoundry>
        <SwapiServiceProvider value={this.state.swapiService} >
          <Router>
            <div className="stardb-app">
              <Header />
              <RandomPlanet />

              <Switch>
                <Route path="/"
                       render={() => <h2>Welcome to StarDB</h2>}
                       exact />
                <Route path="/people/:id?" component={PeoplePage} />
                <Route path="/planets" component={PlanetsPage} />
                <Route path="/starships" exact component={StarshipsPage} />
                <Route path="/starships/:id"
                       render={({ match }) => {
                         const { id } = match.params;
                         return <StarshipDetails itemId={id} />
                       }}/>

                <Route render={() => <h2>Page not found</h2>} />
              </Switch>

            </div>
          </Router>
        </SwapiServiceProvider>
      </ErrorBoundry>
    );
  }
}
