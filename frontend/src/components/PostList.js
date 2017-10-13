import React, { Component } from 'react'
import { connect } from 'react-redux'
import sortBy from 'sort-by'
import PostSummary from './PostSummary'
import Row from 'react-bootstrap/lib/Row'
import Col from 'react-bootstrap/lib/Col'
import ReadableNavbar from './ReadableNavbar'
import ControlLabel from 'react-bootstrap/lib/ControlLabel'
import FormControl from 'react-bootstrap/lib/FormControl'
import FormGroup from 'react-bootstrap/lib/FormGroup'
import Form from 'react-bootstrap/lib/Form'
import { CSSTransitionGroup } from 'react-transition-group'

// These are the supported sort orders
const TIME_DESCENDING = "TIME_DESCENDING"
const TIME_ASCENDING  = "TIME_ASCENDING"
const VOTE_COUNT      = "VOTE_COUNT"

class PostList extends Component {
  state = {
    sortOrder: VOTE_COUNT
  }

  getSortOrder = () => {
    switch (this.state.sortOrder) {
      case TIME_DESCENDING:
        return sortBy("-timestamp")
      case TIME_ASCENDING:
        return sortBy("timestamp")
      case VOTE_COUNT:
        return sortBy("-voteScore", "-timestamp")
      default:
        throw new Error("unrecognized sort order")
    }
  }

  updateSortOrder = order => {
    this.setState({sortOrder: order})
  }

  render() {
    const posts = Object.keys(this.props.posts).map(id => this.props.posts[id])
    const category =  this.props.match.params.category

    const filteredPosts = posts.filter(post =>
      !post.deleted && (!category || post.category === category)
    )

    filteredPosts.sort(this.getSortOrder())

    return (
      <ReadableNavbar>
        <Row>
          <Col xs={12} md={12} lg={12}>
            {!category && (<h1>Showing all posts</h1>)}
            {category && (<h1>Showing posts for category: {category}</h1>)}
          </Col>
        </Row>
        <Row>
          <Col xs={2} md={2} lg={2}>
            <Form>
              <FormGroup controlId="formSortOrderSelect">
                <ControlLabel>Sort posts by</ControlLabel>
                <FormControl
                  componentClass="select"
                  value={this.state.sortOrder}
                  onChange={e => this.updateSortOrder(e.target.value)}>
                  <option value={TIME_DESCENDING}>Newest first</option>
                  <option value={TIME_ASCENDING}>Oldest first</option>
                  <option value={VOTE_COUNT}>Vote count</option>
                </FormControl>
              </FormGroup>
            </Form>
          </Col>
        </Row>

        {filteredPosts.length > 0 ? (
          <CSSTransitionGroup
              transitionName="content-list-animation"
              transitionEnterTimeout={500}
              transitionLeaveTimeout={300}>
            {filteredPosts.map( post => (
              <PostSummary key={post.id} post={post} />
            ))}
          </CSSTransitionGroup>
        ) : (<Row><Col xs={12} md={12} lg={12}><h1>No posts!</h1></Col></Row>)}
      </ReadableNavbar>
    )
  }
}

function mapStateToProps ({ posts }) {
  return { posts }
}

export default connect(
  mapStateToProps
)(PostList)
