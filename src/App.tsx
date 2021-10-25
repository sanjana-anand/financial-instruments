import React from 'react';
import Layout from './components/Layout';
import { Route, Switch, Redirect } from 'react-router-dom';
import Instruments from './pages/Instruments';

function App() {
   return (
      <Layout>
        <Switch>
          <Route path="/instruments" component={Instruments} />
          <Redirect from="/" to="/instruments" />
        </Switch>
      </Layout>
  );
}

export default App;
