import React, { Component } from 'react'
import Button from 'react-bootstrap/lib/Button'
import Grid from 'react-bootstrap/lib/Grid'
import Row from 'react-bootstrap/lib/Row'
import Modal from 'react-modal'
import Navbar from 'react-bootstrap/lib/Navbar'
import Nav from 'react-bootstrap/lib/Nav'
import NavItem from 'react-bootstrap/lib/NavItem'
import Glyphicon from 'react-bootstrap/lib/Glyphicon'

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

        <Modal
          isOpen={this.state.showModal}
          aria={{
            labelledby: "heading"
          }}>
          <h1 id="heading">Create new post</h1>
          <Button onClick={this.closeModal}>Close</Button>
        </Modal>
      </Grid>
    )
  }
}

export default ReadableNavbar
