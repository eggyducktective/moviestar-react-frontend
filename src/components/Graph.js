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
    this.expandNode = this.expandNode.bind(this);
  }



  // read from a button. added 'jackie chan' to graph
  _handNewStar(){
    this._addToGraph('18897','people')
  }

  componentDidUpdate(prevProps){
    // only redraw the graph if the prop we care about
    // has been updated (i.e. the array of actor IDs)
    if(prevProps.actorIDs.length !== this.props.actorIDs.length){
      console.log('Change in ActorID length!');
      this._drawGraph();
    }
  }

  _drawGraph() {
    var nodes = []
    var links = []
    for (var i = 0; i < this.props.actorIDs.length; i++) {
      console.log(this.props.actorIDs.length);
      if (!( this.state.renderedIds.includes(this.props.actorIDs[i]))) {
        this.setState({ renderedIds: [...this.state.renderedIds, this.props.actorIDs[i] ] });
        axios.get(`http://localhost:3000/api/v0/people/${this.props.actorIDs[i]}?output=d3`)
        .then(res => {
          this.setState({ graphNodes: [...this.state.graphNodes, ...res.data.nodes ] })
          this.setState({ graphLinks: [...this.state.graphLinks, ...res.data.links ] })

          if ( this.state.firstRender == false ) {
            this.setState({firstRender: true});
            this.state.graphNodes.shift()
          }
        })
      }
    }
  }


  // expand node
  expandNode(event) {
    var nodeId = event;
    var nodeType = '';
    for (var i = 0; i < this.state.graphNodes.length; i++) {
      if ( this.state.graphNodes[i].id == nodeId ) {
        nodeType=this.state.graphNodes[i].label;
      }
    }
    // Fix this so api call correct
    // I labelled this wrong in the node models.
    if ( nodeType == "movie" ) { nodeType="movies"; };
    if ( nodeType == "person" ) { nodeType="people"; }
    console.log("node type " + nodeType);
    console.log("node id" + nodeId)
    var nodes = []
    var links = []
    console.log("Calling");
    console.log(this.state.graphNodes);
    axios.get(`http://localhost:3000/api/v0/${nodeType}/${nodeId}?output=d3`)
      .then(res => {
        for (var i = 0; i < res.data.nodes.length; i++) {
          if ( res.data.nodes[i].id !=  nodeId ) {
            this.setState({ graphNodes: [...this.state.graphNodes, res.data.nodes[i]] });
          }
        }
        // this.setState({ graphNodes: [...this.state.graphNodes, ...res.data.nodes ] });

        this.setState({ graphLinks: [...this.state.graphLinks, ...res.data.links ] });
    })
    this.setState({ renderedIds: [...this.state.renderedIds, nodeId] })
  }

  _clearGraph() {
    this.setState({ graphNodes: [] })
    this.setState({ graphLinks: [] })
    this.setState({ renderedIds: [] })
  }

  render() {
    const myConfig = {
      nodeHighlightBehavior: true,
      automaticRearrangeAfterDropNode: true,
      staticGraph: false,
      strokeColor: 'green',
      node: {
          // color: 'rgb(238, 149, 14)',
          size: 200,
          fontSize: 15,
          fontColor: 'black',
          highlightStrokeColor: 'rgb(245, 217, 100)',
          labelProperty: 'name'
      },
      link: {
          highlightColor: '#2a2727',
          linkHightlightBehavior: false,
          semanticStrokeWidth: false,
          strokeHeight: 5
      }
    };
    var data = {nodes: this.state.graphNodes, links: this.state.graphLinks};
    return(
      <div>
        <D3Graph
          id="graph-id" // id is mandatory, if no id is defined rd3g will throw an error
          data={ data }
          config={myConfig}
          onClickNode={ this.expandNode }
        />
      </div>
    );
  }
}

export default Graph;
