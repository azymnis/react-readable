import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchInitialState } from '../actions'
import ReadableNavbar from './ReadableNavbar'
import PostList from './PostList'

class App extends Component {
  componentDidMount() {
    this.props.fetchInitialState()
  }

  render() {
    return (
      <ReadableNavbar>
        <PostList/>
      </ReadableNavbar>
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
