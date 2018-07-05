import React, { Component } from 'react';
import {HashRouter as Router, Route} from 'react-router-dom';

import SearchForm from './components/SearchForm';
import SearchResults from './components/SearchResults';
import ShowResult from './components/ShowResult';
import Graph from './components/Graph';
import NewGraph from './components/NewGraph';

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      actorIDs: []
    };

    this.updateGraphActors = this.updateGraphActors.bind(this);
  }

  updateGraphActors( actorID ){
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
          <Route path="/actors/:query" render={ (props) => <ShowResult {...props}  addActorCallback={this.updateGraphActors} /> } />
        </div>
        <div className="right">
          {/* <Graph actorIDs={this.state.actorIDs} />  */}
          <Graph actorIDs={this.state.actorIDs} />
          <NewGraph actorIDs={this.state.actorIDs} />
        </div>
      </div>
    </Router>
    );
  }
}

export default App;
