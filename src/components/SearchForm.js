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
    this.props.history.push(`/search/${ this.state.query }`)
  }


  render() {
    return(
      <div className="App">
        <h1>Search the Stars</h1>
        <form onSubmit={ this._handleSubmit} >
          <input type="text" placeholder="search the stars" onChange={this._handleInput} />
          <input type="submit" value="Search" /> <br />
          </form>


      </div>
    );
  }
}

export default SearchForm;
