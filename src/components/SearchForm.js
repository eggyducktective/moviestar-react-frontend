import React, {Component} from 'react';
import axios from 'axios';
import { Graph } from 'react-d3-graph';

class SearchForm extends Component {
  constructor(){
    super();

    this.state = {
      query: '',
      actorIds: [887, 7399], // button should update this, then call _drawGraph
      renderedIds: [], // To store our already rendered actors
      graphNodes: [{id: 'Who are you searching for?'}], // Dont delete this. The page breaks
      graphLinks: [],
      firstRender: false
      }

    // TEST DATA - person.id: 887 - owen wilson
    // TEST DATA - person.id; 7399 - Ben Stiller
    this._handleInput = this._handleInput.bind(this);
    this._handleSubmit = this._handleSubmit.bind(this);
    this._drawGraph = this._drawGraph.bind(this);
    this._handNewStar = this._handNewStar.bind(this);
  }
  _handleInput(event){
    console.log(event.target.value, event);

    this.setState({query: event.target.value});
  }

  _handleSubmit(event){
    event.preventDefault();
    console.log( '_handleSubmit():', this.state.query );
    this.props.history.push(`/search/${ this.state.query }`)
  }


  // This should probably read from a button or something
  _handNewStar(){
    this._addToGraph('18897','people')
  }

  _drawGraph() {
    var nodes = []
    var links = []
    for (var i = 0; i < this.state.actorIds.length; i++) {
      if (!( this.state.actorIds[i] in this.state.renderedIds))
      axios.get(`http://localhost:3000/api/v0/people/${this.state.actorIds[i]}?output=d3`)
      .then(res => {
        this.setState({ graphNodes: [...this.state.graphNodes, ...res.data.nodes ] })
        this.setState({ graphLinks: [...this.state.graphLinks, ...res.data.links ] })
        if ( this.state.firstRender == false ) {
          this.setState({firstRender: true});
          this.state.graphNodes.shift()
        }
        this.state.renderedIds.push(this.state.actorIds[i]);
      })
    }
  }

// type is person or movie
  _addToGraph(id, type) {
  var nodes = []
  var links = []
  console.log('egg');
  if (!( id in this.state.renderedIds)) {
    axios.get(`http://localhost:3000/api/v0/${type}/${id}?output=d3`)
    .then(res => {
      this.setState({ graphNodes: [...this.state.graphNodes, ...res.data.nodes ] })
      this.setState({ graphLinks: [...this.state.graphLinks, ...res.data.links ] })
      if ( this.state.firstRender == false ) {
        this.setState({firstRender: true});
        this.state.graphNodes.shift()
      }
      this.state.renderedIds.push(id);
      this.state.actorIds.push(id);
    })
  }
}

  _clearGraph() {
    this.setState({ graphNodes: [] })
    this.setState({ graphLinks: [] })
    this.setState({ renderedIds: [] })
  }

  render() {
    const myConfig = {
      nodeHighlightBehavior: true,
      node: {
          color: 'lightgreen',
          size: 120,
          highlightStrokeColor: 'blue',
          labelProperty: 'name'
      },
      link: {
          highlightColor: 'lightblue'
      }
    };
    var data = {nodes: this.state.graphNodes, links: this.state.graphLinks};
    return(
      <div className="App">
        <h1>Search the Stars</h1>
        <form onSubmit={ this._handleSubmit} >
          <input type="text" placeholder="search the stars" onChange={this._handleInput} />
          <input type="submit" value="Search" /> <br />
          </form>
          <button onClick={this._drawGraph}>
            demo step 1: Test _drawGraph /w ben still & own wilson
          </button>
          <button onClick={this._handNewStar}>
            demo step 2: Test _handNewStar, _addToGraph /w jackie chan
          </button>

          <Graph
            id="graph-id" // id is mandatory, if no id is defined rd3g will throw an error
            data={ data }
            config={myConfig}
            />

      </div>
    );
  }
}

export default SearchForm;
