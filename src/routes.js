import React from 'react';
import {HashRouter as Router, Route} from 'react-router-dom';

import SearchForm from './components/SearchForm';
import SearchResults from './components/SearchResults';
import ShowResult from './components/ShowResult';

const Routes = (
  <Router>
    <div>
      <div className="left">
        <Route component={ SearchForm } />
        <Route path="/search/:query" component={ SearchResults } />
        <Route path="/actors/:query" component={ ShowResult } />
      </div>
      <div className="right">
        <Graph/>
      </div>
    </div>
  </Router>
)

export default Routes;
