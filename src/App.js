import React, { Component } from 'react';
// import logo from './logo.svg';
// import './App.css';
import {HashRouter as Router, Route} from 'react-router-dom';

import SearchForm from './components/SearchForm';
import SearchResults from './components/SearchResults';
import ShowResult from './components/ShowResult';
import Graph from './components/Graph';

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      actorIDs: []
    };

    this.drawGraph = this.drawGraph.bind(this);
  }

  drawGraph( actorID ){
    console.warn('drawGraph', actorID);
    // push actor id to an array, cannot change state directly
    this.setState({actorIDs: [...this.state.actorIDs, actorID] });
  }

  render() {
    return (
    <Router>
      <div>
        <div className="left">
          <Route component={ SearchForm } />
          <Route path="/search/:query" component={ SearchResults } />
          <Route path="/actors/:query" render={ (props) => <ShowResult {...props}  addActorCallback={this.drawGraph} /> } />
        </div>
        <div className="right">
          <Graph actorIDs={this.state.actorIDs} />
        </div>
      </div>
    </Router>
    );
  }
}

export default App;
