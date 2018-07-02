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
    console.log(this.state.data);

   if( this.state.error ) {
     return <p> No match for "{this.props.match.params.query}"</p>
   }

    if( this.state.data) {
      const {name, birthplace, actedIn, profileImageUrl, related} = this.state.data;
      const films = actedIn.map( film => <li>{ film.name }, his role is { film.role } </li>)

      return(
        <div>
          <h2>Are you ready to look at some star</h2>
            <p> Here is your search: { name }, born in { birthplace }</p>
            <img src={ profileImageUrl }/>
            <ul>{ films }</ul>

        </div>
      );
    } else {
      return <div>LOADING...</div>;
    }

  }
}

export default ShowResult;
