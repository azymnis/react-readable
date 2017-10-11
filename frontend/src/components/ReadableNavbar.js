import React, { Component } from 'react'
import { connect } from 'react-redux'
import Grid from 'react-bootstrap/lib/Grid'
import Row from 'react-bootstrap/lib/Row'
import Navbar from 'react-bootstrap/lib/Navbar'
import Nav from 'react-bootstrap/lib/Nav'
import NavItem from 'react-bootstrap/lib/NavItem'
import Glyphicon from 'react-bootstrap/lib/Glyphicon'
import PostForm from './PostForm'
import { openNewPost } from '../actions'

class ReadableNavbar extends Component {
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
                <NavItem eventKey={1} onClick={this.props.openNewPost}>Create Post <Glyphicon glyph="pencil" /></NavItem>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </Row>

        {this.props.children}

        <PostForm />
      </Grid>
    )
  }
}

function mapDispatchToProps (dispatch) {
  return {
    openNewPost: () => dispatch(openNewPost())
  }
}

export default connect(null, mapDispatchToProps)(ReadableNavbar)
