import React from 'react';
import {HashRouter as Router, Route} from 'react-router-dom';

import SearchForm from './components/SearchForm';
import SearchResults from './components/SearchResults';
import ShowResult from './components/ShowResult';

const Routes = (
  <Router>
    <div>
      <Route component={ SearchForm } />
      <Route path="/search/:query" component={ SearchResults } />
      <Route path="/actors/:query" component={ ShowResult } />

    </div>
  </Router>
)

export default Routes;
