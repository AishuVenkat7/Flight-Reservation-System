import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import MainPage from './MainPage';
import OtherPage from './OtherPage';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={MainPage} />
        <Route path="/other" component={OtherPage} />
        {/* Add more routes as needed */}
      </Switch>
    </Router>
  );
}

export default App;
