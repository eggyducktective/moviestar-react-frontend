import React, {Component} from 'react';
import SearchForm from './SearchForm';
import axios from 'axios';

import { Link } from 'react-router-dom';

// const actorURL = 'http://localhost:3000/api/v0/people/name/Laurence%20Fishburne';

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
      // this.setState({ data: res.data  })
      this.props.history.push(`/actors/${ this.props.match.params.query }`)
    })
    .catch(err => {

      // No matches for an EXACT name search, so use the
      // fuzzy (regex) search API instead, to find multiple results?
      axios.get(`http://localhost:3000/api/v0/people/search/${ this.props.match.params.query}`)
      .then(res => this.setState({ results: res.data  }) )
      .catch(err => this.setState({error: err}) );
    })
  } // componentDidMount


// http://localhost:3000/api/v0/people/search/john

  render(){
    return(
      <div>  </div>
    );
  }


} // end component



export default SearchResults;
