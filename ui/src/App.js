import React from 'react';
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom';

import {AppMenu} from './components/app-menu/AppMenu';
import {PATHS, PATHS_CONFIG} from './config/route-config';

import './scss/overrides.scss';
import './scss/App.scss';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.routes = Object.entries(PATHS_CONFIG).map(([path, component]) => (
      <Route key={`${path}`} path={path} component={component} />
    ));
  }

  render() {
    return (
      <Router>
        <div className="App">
          <AppMenu />
          <main className="content-routed">
            <Switch>
              <Route exact path="/" render={() => (
                <Redirect to={PATHS.homepage} />
              )} />
              {this.routes}
            </Switch>
          </main>
        </div>
      </Router>
    );
  }
}

export default App;
