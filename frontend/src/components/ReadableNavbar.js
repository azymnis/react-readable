import React, { Component } from 'react'
import Grid from 'react-bootstrap/lib/Grid'
import Row from 'react-bootstrap/lib/Row'
import Navbar from 'react-bootstrap/lib/Navbar'
import Nav from 'react-bootstrap/lib/Nav'
import NavItem from 'react-bootstrap/lib/NavItem'
import Glyphicon from 'react-bootstrap/lib/Glyphicon'
import PostForm from './PostForm'

class ReadableNavbar extends Component {
  state = {
    showModal: false
  }

  openModal = () => {
    this.setState({ showModal: true })
  }

  closeModal = () => {
    this.setState({ showModal: false })
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
                <NavItem eventKey={1} onClick={this.openModal}>Create Post <Glyphicon glyph="pencil" /></NavItem>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </Row>

        {this.props.children}

        <PostForm closeModal={this.closeModal} isOpen={this.state.showModal} />
      </Grid>
    )
  }
}

export default ReadableNavbar
