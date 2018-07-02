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

  // pushActor(actorId) {
  //   console.log("eggs on child");
  //   this.props.graphPushActorID(actorId);
  //   console.log("eggs under child");
  // // this.setState({fieldVal: e.target.value});
  // }

  componentDidMount(){
    // FIRST: check for an EXACT match for the search name (case insensitive)
    axios.get(`http://localhost:3000/api/v0/people/name/${this.props.match.params.query}`)
    .then(res => {
      console.log('showResult', res.data);
      this.setState({ data: res.data  })

    })
    .catch( console.warn );

  }

  render(){
    console.log(this.state.data);
   //
   // if( this.state.error ) {
   //   return <p> No match for "{this.props.match.params.query}"</p>
   // }

    if( this.state.data) {
      const {name, birthplace, actedIn, profileImageUrl, related} = this.state.data;
      const films = actedIn.map( film => <li key={film.name}>{ film.name }, their role is { film.role } </li>)

      // const films = actedIn.map((film, index) => {
      //   <li key={index}>{film.name}, their role is {film.role}</li>
      // });
      //
      const costars = related.map( costar => <li key={costar.id}>
        <Link to={`/actors/${costar.name}`}>{costar.name}</Link>, their role is {costar.role}
        </li>)

      // const costars = related.map((costar, key) => {
      //   console.log('costar:', costar.name);
      //   console.log('key:', key);
      //   <li key={key}>
      //   <Link to={`/actors/${costar.name}`}>{costar.name}</Link>, their role is {costar.role}
      //   </li>
      // });



      return(
        <div>
          <h2>Are you ready to look at some stars?</h2>
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
