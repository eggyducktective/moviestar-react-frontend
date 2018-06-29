import React from 'react';
import {HashRouter as Router, Route} from 'react-router-dom';

import SearchForm from './components/SearchForm';
import SearchResults from './components/SearchResults';

const Routes = (
  <Router>
    <div>
      <Route component={ SearchForm } />
      <Route path="/search/:query" component={ SearchResults } />
    </div>
  </Router>
)

export default Routes;
