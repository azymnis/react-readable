import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import Grid from 'react-bootstrap/lib/Grid'
import Row from 'react-bootstrap/lib/Row'
import MenuItem from'react-bootstrap/lib/MenuItem'
import Navbar from 'react-bootstrap/lib/Navbar'
import Nav from 'react-bootstrap/lib/Nav'
import NavItem from 'react-bootstrap/lib/NavItem'
import NavDropdown from 'react-bootstrap/lib/NavDropdown'
import Glyphicon from 'react-bootstrap/lib/Glyphicon'
import PostForm from './PostForm'
import { openNewPost } from '../actions'
import { push } from 'react-router-redux'

const ReadableNavbar = ({categories, redirectToCategory, openNewPost, children}) => {
  return (
    <Grid>
      <Row>
        <Navbar inverse>
          <Navbar.Header>
            <Navbar.Brand>
              <Link to='/'>React-Readable</Link>
            </Navbar.Brand>
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav>
              <NavDropdown eventKey={1} title="Categories" id="categories-nav-dropdown">
                {categories.map((cat, index) =>
                  (<MenuItem
                      key={cat.name}
                      eventKey={1.1 + 0.1 * index}
                      onClick={() => redirectToCategory(cat.path)}>{cat.name}</MenuItem>)
                )}
              </NavDropdown>
            </Nav>
            <Nav pullRight>
              <NavItem eventKey={1} onClick={openNewPost}>Create Post <Glyphicon glyph="pencil" /></NavItem>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </Row>

      {children}

      <PostForm />
    </Grid>
  )
}

function mapStateToProps ({ categories }) {
  return { categories }
}

function mapDispatchToProps (dispatch) {
  return {
    openNewPost: () => dispatch(openNewPost()),
    redirectToCategory: cat => dispatch(push('/' + cat))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReadableNavbar)
