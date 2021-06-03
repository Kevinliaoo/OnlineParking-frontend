import React from 'react'; 
import { BrowserRouter, Switch, Route, RouteComponentProps } from 'react-router-dom';

import Redirect from './layouts/Redirect/Redirect';

import routes from './utils/routes';
import './styles.css';

const App = () => {

  return (
    <div id="app">
      <BrowserRouter>
        <Switch>
          {
            routes.map((route, index) => {
              return (
                <Route 
                  key={index} 
                  path={route.path}
                  exact={route.exact}
                  render={(props: RouteComponentProps<any>) => (
                    <route.component 
                      {...props}
                      {...route.props}
                    />
                  )}
                />
              )
            })
          }
          <Route component={Redirect} />
        </Switch>
      </BrowserRouter>
    </div>
  )
}

export default App