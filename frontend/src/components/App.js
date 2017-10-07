import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as BackendAPI from '../utils/api.js'
import { initializeState } from '../actions'

class App extends Component {
  state = {
    categories: null
  }

  componentDidMount() {
    BackendAPI.getAllCategories().then(categories => {
      this.setState(() => {
        return { categories }
      })
    })
    BackendAPI.getInitialState().then(data => this.props.initializeState(data))
  }

  render() {
    return (
      <div>Hello world</div>
    );
  }
}

function mapDispatchToProps (dispatch) {
  return {
    initializeState: data => dispatch(initializeState(data))
  }
}

export default connect(
  null,
  mapDispatchToProps
)(App)
