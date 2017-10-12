import React, { Component } from 'react'
import { connect } from 'react-redux'
import sortBy from 'sort-by'
import { upVotePost, downVotePost, deletePost, openEditPost } from '../actions'
import Row from 'react-bootstrap/lib/Row'
import Col from 'react-bootstrap/lib/Col'
import Panel from 'react-bootstrap/lib/Panel'
import Glyphicon from 'react-bootstrap/lib/Glyphicon'
import Button from 'react-bootstrap/lib/Button'
import Badge from 'react-bootstrap/lib/Badge'
import ReadableNavbar from './ReadableNavbar'
import ControlLabel from 'react-bootstrap/lib/ControlLabel'
import FormControl from 'react-bootstrap/lib/FormControl'
import FormGroup from 'react-bootstrap/lib/FormGroup'
import Form from 'react-bootstrap/lib/Form'
import moment from 'moment'

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
      !category || post.category === category
    )

    filteredPosts.sort(this.getSortOrder())

    return (
      <ReadableNavbar>
        <Row>
          <Col className="vote-element" xs={2} md={2} lg={2}>
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

        {filteredPosts.length > 0 ? filteredPosts.map( post => (
          <Row key={post.id}>
            <Col className="vote-element" xs={1} md={1} lg={1}>
              <Panel className="vote-panel">
                <div className="vote-top" onClick={() => this.props.upVotePost(post)}><Glyphicon glyph="triangle-top" /></div>
                <div className="vote-badge"><Badge>{post.voteScore}</Badge></div>
                <div className="vote-text"><strong>votes</strong></div>
                <div className="vote-bottom" onClick={() => this.props.downVotePost(post)}><Glyphicon glyph="triangle-bottom" /></div>
              </Panel>
            </Col>
            <Col xs={8} md={10} lg={10}>
              <h3><a>{post.title}</a></h3>
              <h4>posted at <em>{moment(post.timestamp).format('MMMM Do YYYY, h:mm:ss a')}</em> by <strong>{post.author}</strong> with {post.comments.length} comments</h4>
              <Button bsStyle="primary" onClick={() => this.props.openEditPost(post)}>Edit <Glyphicon glyph="pencil" /></Button>
              <Button bsStyle="danger" onClick={() => this.props.deletePost(post)}>Delete <Glyphicon glyph="remove" /></Button>
            </Col>
          </Row>
        )) : (<Row><h1>No posts!</h1></Row>)}
      </ReadableNavbar>
    )
  }
}

function mapStateToProps ({ posts }) {
  return { posts }
}

function mapDispatchToProps (dispatch) {
  return {
    upVotePost: post => dispatch(upVotePost(post.id)),
    downVotePost: post => dispatch(downVotePost(post.id)),
    deletePost: post => dispatch(deletePost(post.id)),
    openEditPost: post => dispatch(openEditPost(post.id))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostList)
