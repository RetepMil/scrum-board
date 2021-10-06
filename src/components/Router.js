import React from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";

const AppRouter = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/"></Route>
      </Switch>
    </Router>
  );
};

export default AppRouter;
