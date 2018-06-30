import React, {Component} from 'react';
import SearchForm from './SearchForm';
import SearchResults from './SearchResults';
import axios from 'axios';

import { Link } from 'react-router-dom';




class ShowResult extends Component {
  constructor( props ) {
    super( props );
    this.state = {
      data: null
    }
  }


  render(){

   if( this.state.error ) {
     return <p> No match for "{this.props.match.params.query}"</p>
   }

    if( this.state.data) {
      const {name, born, wrote, actedIn, poster_image, related} = this.state.data;
      const films = actedIn.map( film => <li>{ film.name }, his role is { film.role } </li>)
      const costars = related.map( costar => <li> {costar.name}</li>)
      return(
        <div>
          <h2>Are you ready to look at some star</h2>
            <p> Here is your search: { name }, born in { born }</p>
            <img src={ poster_image }/>
            <ul>{ films }</ul>
            <div>
              <p> List of costars:</p>
              <ul>{ costars }</ul>
            </div>
        </div>
      );
    } else {
      return <div>LOADING...</div>;
    }

  }
}

export default ShowResult;
