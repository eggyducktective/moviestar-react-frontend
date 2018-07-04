import React, {Component} from 'react';
import axios from 'axios';
import { Graph as D3Graph } from 'react-d3-graph';

class SearchForm extends Component {
  constructor(){
    super();

    this.state = {
      query: ''
      }

    this._handleInput = this._handleInput.bind(this);
    this._handleSubmit = this._handleSubmit.bind(this);
  }
  _handleInput(event){
    console.log(event.target.value, event);

    this.setState({query: event.target.value});
  }

  _handleSubmit(event){
    event.preventDefault();
    console.log( '_handleSubmit():', this.state.query );


    axios.get(`http://localhost:3000/api/v0/people/match/${ this.state.query }`)
    .then( response => {
      if( response.data.match === true ){
        // found an exact match, so go to show page for this actor
        this.props.history.push({
          pathname:`/actors/${ this.state.query }`,
          state: response.data
        });

      } else {
        // no exact match, go to search results page to perform inexact search
        this.props.history.push(`/search/${ this.state.query }`);
      }
    });
    // this.props.history.push(`/search/${ this.state.query }`)
  }


  render() {
    return(
      <div className="App">
        <h1>Search the Stars</h1>
        <form onSubmit={ this._handleSubmit} >
          <input type="text" placeholder="Search now" onChange={this._handleInput} />

          <input type="submit" value="Begin Your Search" /> <br />
          </form>

      </div>
    );
  }
}

export default SearchForm;
