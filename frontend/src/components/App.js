import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchInitialState } from '../actions'
import Grid from 'react-bootstrap/lib/Grid'
import Row from 'react-bootstrap/lib/Row'
import Navbar from 'react-bootstrap/lib/Navbar'
import Nav from 'react-bootstrap/lib/Nav'
import NavItem from 'react-bootstrap/lib/NavItem'
import Glyphicon from 'react-bootstrap/lib/Glyphicon'
import PostList from './PostList'

class App extends Component {
  componentDidMount() {
    this.props.fetchInitialState()
  }

  render() {
    return (
      <Grid>
        <Row>
          <Navbar inverse>
            <Navbar.Header>
              <Navbar.Brand>
                <a href="/">React-Readable</a>
              </Navbar.Brand>
            </Navbar.Header>
            <Navbar.Collapse>
              <Nav pullRight>
                <NavItem eventKey={1} href="#">Create Post <Glyphicon glyph="pencil" /></NavItem>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </Row>
        <PostList/>
      </Grid>
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
