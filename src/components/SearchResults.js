import React, {Component} from 'react';
import SearchForm from './SearchForm';
import ShowResult from './ShowResult';
import axios from 'axios';

import { Link } from 'react-router-dom';


class SearchResults extends Component {

  constructor(props){
    super(props);

    this.state = {
      data: null,
      error: null,
      results: []
    }
    console.log(this.state);
  }

  getActor(){
    axios.get(`http://localhost:3000/api/v0/people/search/${this.props.match.params.query}`)
    .then(res => this.setState({ results: res.data }) )
    .catch(err => this.setState({error: err}) );
  }

  componentDidMount(){
    // No matches for an EXACT name search, so use the
    // fuzzy (regex) search API instead, to find multiple results?
    this.getActor();
  }

  // make sure we can enter a new search
  componentDidUpdate(prevProps){
    if(prevProps.match.params.query !== this.props.match.params.query){
      this.getActor();
    }
  }

  render(){

    if( this.state.results.length === 0 ){
      return <p>Sorry, no match for: {this.props.match.params.query}</p>;
    }

    //    /actors/THENAME
    console.log(this.state.results);
    const results = this.state.results.map( r => (
      <li>
        <Link to={`/actors/${r.name}`}>{r.name}</Link>
      </li>
    ));

    return(
      <div>
      <p>No exact match, here are some suggestions:</p>
      <ul>
        { results }
      </ul>
      </div>
    );
  }


} // end component



export default SearchResults;
