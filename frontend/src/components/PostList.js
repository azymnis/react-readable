import React, { Component } from 'react'
import { connect } from 'react-redux'
import { upVotePost, downVotePost, deletePost } from '../actions'
import Row from 'react-bootstrap/lib/Row'
import Col from 'react-bootstrap/lib/Col'
import Panel from 'react-bootstrap/lib/Panel'
import Glyphicon from 'react-bootstrap/lib/Glyphicon'
import Button from 'react-bootstrap/lib/Button'
import Badge from 'react-bootstrap/lib/Badge'

class PostList extends Component {
  render() {
    const posts = this.props.posts
    return Object.keys(posts).length > 0 ? Object.keys(posts).map( (id, index) => (
        <Row key={id}>
          <Col className="vote-element" xs={1} md={1} lg={1}>
            <Panel className="vote-panel">
              <div className="vote-top" onClick={() => this.props.upVotePost(id)}><Glyphicon glyph="triangle-top" /></div>
              <div className="vote-badge"><Badge>{posts[id].voteScore}</Badge></div>
              <div className="vote-text"><strong>votes</strong></div>
              <div className="vote-bottom" onClick={() => this.props.downVotePost(id)}><Glyphicon glyph="triangle-bottom" /></div>
            </Panel>
          </Col>
          <Col xs={8} md={10} lg={10}>
            <h3><a>{posts[id].title}</a></h3>
            <h4>by <em>{posts[id].author}</em> with {posts[id].comments.length} comments</h4>
            <Button bsStyle="primary">Edit <Glyphicon glyph="pencil" /></Button>
            <Button bsStyle="danger" onClick={() => this.props.deletePost(id)}>Delete <Glyphicon glyph="remove" /></Button>
          </Col>
        </Row>
      )) : (<Row>No posts!</Row>)
  }
}

function mapStateToProps ({ posts }) {
  return { posts }
}

function mapDispatchToProps (dispatch) {
  return {
    upVotePost: id => dispatch(upVotePost(id)),
    downVotePost: id => dispatch(downVotePost(id)),
    deletePost: id => dispatch(deletePost(id))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostList)
