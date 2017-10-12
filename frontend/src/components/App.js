import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchInitialState } from '../actions'
import PostList from './PostList'
import PostDetails from './PostDetails'
import { withRouter } from 'react-router'

class App extends Component {
  componentDidMount() {
    this.props.fetchInitialState()
  }

  render() {
    return (
      <Switch>
        <Route exact path='/' component={PostList}/>
        <Route path='/:category/:postId' component={PostDetails}/>
        <Route path='/:category' component={PostList}/>
      </Switch>
    )
  }
}

function mapDispatchToProps (dispatch) {
  return {
    fetchInitialState: data => dispatch(fetchInitialState(data))
  }
}

export default withRouter(connect(
  null,
  mapDispatchToProps
)(App))
