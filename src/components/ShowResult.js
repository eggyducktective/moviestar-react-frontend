import React, {Component} from 'react';
import SearchForm from './SearchForm';
import SearchResults from './SearchResults';
import axios from 'axios';
import {HashRouter as Router, Route} from 'react-router-dom';


import { Link } from 'react-router-dom';



class ShowResult extends Component {
  constructor( props ) {
    super( props );
    this.state = {
      data: null,
    }
  }

  componentDidMount(){
    // FIRST: check for an EXACT match for the search name (case insensitive)
    axios.get(`https://nodeapi4neo.herokuapp.com/api/v0/people/name/${this.props.match.params.query}`)
    .then(res => {
      console.log('showResult', res.data);
      this.setState({ data: res.data  })
    })
    .catch( console.warn );
  }

  componentDidUpdate(prevProps){
    if(prevProps.match.params.query !== this.props.match.params.query) {
      console.log(this.props.location.state)
      axios.get(`https://nodeapi4neo.herokuapp.com/api/v0/people/name/${this.props.match.params.query}`)
      .then(res => {
        console.log('showResult', res.data);
        this.setState({ data: res.data  })
      })
      .catch( console.warn );
    }
  }

  clearGraph() {
    window.location.reload();
  }

  render(){
    // console.log(this.state.data.length);

    if( this.state.data !== null ) {
      const regex = /(<([^>]+)>)/ig;
      let {name, birthplace, actedIn, profileImageUrl, related, biography} = this.state.data;
      biography = biography.replace(regex, '');
      const films = actedIn.map( film => <li key={film.name}>{ film.name }, their role is { film.role } </li>)
      const image = this.state.data.profileImageUrl.length > 0 ? this.state.data.profileImageUrl : 'NoImage.jpg';

      console.log('HEREE IS IMAGE', this.state.data.profileImageUrl.length);
      return(
        <div>
          <h2>Are you ready to look at some stars?</h2>

            <p> Here is your search: <strong>{ name }</strong></p>

            <button className="graphButton" onClick={() => this.props.addActorCallback(this.state.data.id)}>
              Add to Graph
            </button>
            <button className="graphButton" onClick={this.clearGraph}>Refresh Graph</button>

            <figure className="swing"><img src={ image } /></figure>
            <br/>

            <p> <strong>Birthplace:</strong> {birthplace ? birthplace : 'N/A'}</p>
            <p> <strong>Biography:</strong> {biography ? biography : 'N/A'}</p>

        </div>
      );
    } else {
      return <div>LOADING...</div>;
    }
  }
}

export default ShowResult;
