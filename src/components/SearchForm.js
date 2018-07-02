import React, {Component} from 'react';
import axios from 'axios';


class SearchForm extends Component {
  constructor(){
    super();

    this.state = {
      query: '',
      actorIds: [887, 7399], // button should update this, then call _drawGraph
      graphNodes: [],
      graphLinks: []
    }

    // TEST DATA - person.id: 887 - owen wilson
    // TEST DATA - person.id; 7399 - Ben Stiller
    this._handleInput = this._handleInput.bind(this);
    this._handleSubmit = this._handleSubmit.bind(this);
    this._drawGraph = this._drawGraph.bind(this);
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

  _drawGraph() {
    var nodes = []
    var links = []
    console.log("EGGS");
    console.log(this.state.graphLinks);
    for (var i = 0; i < this.state.actorIds.length; i++) {
      axios.get(`http://localhost:3000/api/v0/people/${this.state.actorIds[i]}?output=d3`)
      .then(res => {
        this.setState({ graphNodes: [...this.state.graphNodes, ...res.data.nodes ] })
        this.setState({ graphLinks: [...this.state.graphLinks, ...res.data.links ] })
      })
    }
  }

  _clearGraph() {
    this.setState({ graphNodes: [] })
    this.setState({ graphLinks: [] })
  }


  render() {
    return(
      <div className="App">
        <h1>Search the Stars</h1>
        <form onSubmit={ this._handleSubmit} >
          <input type="text" placeholder="search the stars" onChange={this._handleInput} />
          <input type="submit" value="Search" /> <br />
          </form>
          GRAPH GOES HERE
          <button onClick={this._drawGraph}>
            TestGraphDraw
          </button>
      </div>
    );
  }
}

export default SearchForm;
