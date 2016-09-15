import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();
import {Router, Route, hashHistory, browserHistory} from 'react-router';
import BoadContainer from './containers/Boad.jsx';
import App from './components/App.jsx';

ReactDOM.render(
  <Router history={hashHistory}>
    <Route component={App}>
      <Route path="/" component={BoadContainer}></Route>  
    </Route>
  </Router>
  ,
  document.getElementById("mount-point")
);