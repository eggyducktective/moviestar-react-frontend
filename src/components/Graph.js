import React, {Component} from 'react';
import axios from 'axios';
import { Graph as D3Graph } from 'react-d3-graph';


class Graph extends Component {
  constructor(props){
    super(props);
    this.state = {
      // needs to be in App parent
      // actorIds: [887, 7399], // button should update this, then call _drawGraph
      renderedIds: [], // To store our already rendered actors
      graphNodes: [{id: 'Who are you searching for?'}], // Do not delete this. The page breaks
      graphLinks: [],
      firstRender: false
    }
    console.log(this.state.actorId);
  }

  // read from a button. added 'jackie chan' to graph
  _handNewStar(){
    this._addToGraph('18897','people')
  }

  componentWillUpdate(){
    console.log('Graph component updated!');
    // this._drawGraph();
  }

  _drawGraph() {
    var nodes = []
    var links = []
    for (var i = 0; i < this.props.actorIDs.length; i++) {
      console.log(this.props.actorIDs.length);
      if (!( this.props.actorIDs[i] in this.state.renderedIds))
      axios.get(`http://localhost:3000/api/v0/people/${this.props.actorIDs[i]}?output=d3`)
      .then(res => {
        this.setState({ graphNodes: [...this.state.graphNodes, ...res.data.nodes ] })
        this.setState({ graphLinks: [...this.state.graphLinks, ...res.data.links ] })

        if ( this.state.firstRender == false ) {
          this.setState({firstRender: true});
          this.state.graphNodes.shift()
        }
        this.state.renderedIds.push(this.props.actorIDs[i]);
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
      this.props.actorIDs.push(id);
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
          color: 'red',
          size: 100,
          fontSize: 10,
          fontColor: 'grey',
          automaticRearrangeAfterDropNode: true,
          highlightStrokeColor: 'blue',
          labelProperty: 'name',
          strokeColor: 'blue',
          symbolType: 'circle'


      },
      link: {
          highlightColor: 'green',
          linkHightlightBehavior: true
      }
    };
    var data = {nodes: this.state.graphNodes, links: this.state.graphLinks};
    return(
      <div>
        <D3Graph
          id="graph-id" // id is mandatory, if no id is defined rd3g will throw an error
          data={ data }
          config={myConfig}
        />
      </div>
    );
  }
}

export default Graph;
