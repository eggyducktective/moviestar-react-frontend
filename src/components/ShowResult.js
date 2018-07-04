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
      data: null
    }
  }

  componentDidMount(){
    // FIRST: check for an EXACT match for the search name (case insensitive)
    axios.get(`http://localhost:3000/api/v0/people/name/${this.props.match.params.query}`)
    .then(res => {
      console.log('showResult', res.data);
      this.setState({ data: res.data  })
    })
    .catch( console.warn );
  }

  componentDidUpdate(prevProps){
    if(prevProps.match.params.query !== this.props.match.params.query) {
      console.log(this.props.location.state)
      axios.get(`http://localhost:3000/api/v0/people/name/${this.props.match.params.query}`)
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
    console.log(this.state.data);
   //


    if( this.state.data ) {
      const regex = /(<([^>]+)>)/ig;
      let {name, birthplace, actedIn, profileImageUrl, related, biography} = this.state.data;
      biography = biography.replace(regex, '');
      const films = actedIn.map( film => <li key={film.name}>{ film.name }, their role is { film.role } </li>)
      return(
        <div>
          <h2>Are you ready to look at some stars?</h2>

            <p> Here is your search: <strong>{ name }</strong></p>

            <img src={ profileImageUrl }/>
            <br/>
            <button onClick={() => this.props.addActorCallback(this.state.data.id)}>
              Add to Graph!
            </button>
            <button onClick={this.clearGraph}>Refresh the Graph</button>
            <p> {birthplace ? 'Birthplace:' + birthplace : ''}</p>
            <p>{biography ? 'Biography:' + biography : ''}</p>

        </div>
      );
    } else {
      return <div>LOADING...</div>;
    }
  }
}

export default ShowResult;
