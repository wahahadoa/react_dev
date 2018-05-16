import React from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Home from '../pages/home'

export default () => {
  const routes = (
    <Router>
      <Switch>
        <Route exec path="*" component={Home} />
      </Switch>
    </Router>
  )
  return routes
}