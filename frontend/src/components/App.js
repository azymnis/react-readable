import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as BackendAPI from '../utils/api.js'
import { fetchInitialState } from '../actions'

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
    this.props.fetchInitialState()
  }

  render() {
    return (
      <div>Hello world</div>
    );
  }
}

function mapDispatchToProps (dispatch) {
  return {
    fetchInitialState: data => dispatch(fetchInitialState(data))
  }
}

export default connect(
  null,
  mapDispatchToProps
)(App)
