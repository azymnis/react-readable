import React, { Component } from 'react';
import * as BackendAPI from '../utils/api.js'

class App extends Component {

  componentDidMount() {
    BackendAPI.getAllCategories().then(data => console.log(data))
    BackendAPI.getAllPosts().then(data => console.log(data))
  }

  render() {
    return (
      <div>Hello world</div>
    );
  }
}

export default App;
