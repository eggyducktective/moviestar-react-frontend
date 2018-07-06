import React, {Component} from 'react';
import axios from 'axios';
import { ForceGraph2D, ForceGraph3D, ForceGraphVR } from 'react-force-graph';

class NewGraph extends Component {
  constructor(props){
    super(props);
    this.state = {
      renderedIds: [], // To store our already rendered actors/movies
      graphNodes: [{id: 'Who are you searching for?'}], // Do not delete this. The page breaks
      graphLinks: [],
      firstRender: false
    }
    this.expandNode = this.expandNode.bind(this);
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

      // make sure we don't double submit "actor" to Graph.
      if (!( this.state.renderedIds.includes(this.props.actorIDs[i] ))) {
        this.setState({ renderedIds: [...this.state.renderedIds, this.props.actorIDs[i] ] });
        axios.get(`https://nodeapi4neo.herokuapp.com/api/v0/people/${this.props.actorIDs[i]}?output=d3`)
        // axios.get(`http://localhost:3000/api/v0/people/${this.props.actorIDs[i]}?output=d3`)

        .then(res => {
          this.setState({ graphNodes: [...this.state.graphNodes, ...res.data.nodes ] })
          this.setState({ graphLinks: [...this.state.graphLinks, ...res.data.links ] })

          if ( this.state.firstRender == false ) {
            this.setState({firstRender: true});
            this.state.graphNodes.shift()
          }

        }) //end .then
      } // end if - includes
    } // end for
  } // end _drawGraph


  // expand node, find related nodes.
  expandNode(event) {
    var nodeId = event;
    var nodeType = '';

    // find nodetype (person or movie) to determine what API to call.
    for (var i = 0; i < this.state.graphNodes.length; i++) {
      if ( this.state.graphNodes[i].id == nodeId ) {
        nodeType=this.state.graphNodes[i].label;
      }
    }
    // Correct in node model LATER.
    if ( nodeType == "movie" ) { nodeType="movies"; };
    if ( nodeType == "person" ) { nodeType="people"; }
    var nodes = []
    var links = []
    // axios.get(`http://localhost:3000/api/v0/${nodeType}/${nodeId}?output=d3`)
    axios.get(`https://nodeapi4neo.herokuapp.com/api/v0/${nodeType}/${nodeId}?output=d3`)
      .then(res => {
        for (var i = 0; i < res.data.nodes.length; i++) {

          // make sure we don't double enter the "node" into state.
          if ( res.data.nodes[i].id !=  nodeId ) {
            this.setState({ graphNodes: [...this.state.graphNodes, res.data.nodes[i]] });
          }
        }
        this.setState({ graphLinks: [...this.state.graphLinks, ...res.data.links ] });
    })
    this.setState({ renderedIds: [...this.state.renderedIds, nodeId] })
  }

  // _clearGraph() {
  //   this.setState({ graphNodes: [] })
  //   this.setState({ graphLinks: [] })
  //   this.setState({ renderedIds: [] })
  // }

  render() {
    const myConfig = {
      nodeHighlightBehavior: true,
      automaticRearrangeAfterDropNode: true,
      staticGraph: false,
      strokeColor: 'green',
      highlightDegree: 2,
      panAndZoom: true,
      node: {
          size: 300,
          fontSize: 20,
          fontColor: 'black',
          highlightStrokeColor: 'rgb(245, 217, 100)',
          labelProperty: 'name',
          opacity: 0.9
      },
      link: {
          highlightColor: '#2a2727',
          highlightColor: 'red',
          linkHightlightBehavior: false,
          semanticStrokeWidth: false
      }
    };
      var data = {nodes: this.state.graphNodes, links: this.state.graphLinks};
    return(
      <div className="newGraph">
      <ForceGraph3D
      id="graph-id"
         graphData={data}
         nodeAutoColorBy="group"
         backgroundColor="lightgrey"
         linkColor="#000000"

         config={myConfig}
         onClickNode={ this.expandNode }
       />

      </div>
    );
  }
}

export default NewGraph;
