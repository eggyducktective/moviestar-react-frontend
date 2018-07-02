import React, {Component} from 'react';
import SearchForm from './SearchForm';
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
  }

  componentDidMount(){
    // FIRST: check for an EXACT match for the search name (case insensitive)
    axios.get(`http://localhost:3000/api/v0/people/name/${this.props.match.params.query}`)
    .then(res => {
      // Redirect to the show page for this actor
      this.props.history.push(`/actors/${ this.props.match.params.query }`)
    })
    .catch(err => {
      console.log('no exact match!');
      // No matches for an EXACT name search, so use the
      // fuzzy (regex) search API instead, to find multiple results?
      axios.get(`http://localhost:3000/api/v0/people/search/${this.props.match.params.query}`)
      .then(res => this.setState({ results: res.data }) )
      .catch(err => this.setState({error: err}) );
    });

  } // componentDidMount


// http://localhost:3000/api/v0/people/search/john

  render(){

    if( this.state.results.length === 0 ){
      return <p>Loading...</p>;
    }

    //    /actors/THENAME
    const results = this.state.results.map( r => (
      <li>
        <Link to={`/actors/${r.name}`}>{r.name}</Link>
      </li>
    ));

    return(
      <div>
      <p>Testing</p>
      <ul>
        { results }
      </ul>
      </div>
    );
  }


} // end component



export default SearchResults;
