import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchInitialState } from '../actions'
import PostList from './PostList'

class App extends Component {
  componentDidMount() {
    this.props.fetchInitialState()
  }

  render() {
    return (
      <div className="app">
        <Route exact path='/' component={PostList}/>
      </div>
    )
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
