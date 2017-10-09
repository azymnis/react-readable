import React, { Component } from 'react'
import { connect } from 'react-redux'
import { upVotePost, downVotePost } from '../actions'
import Row from 'react-bootstrap/lib/Row'
import Col from 'react-bootstrap/lib/Col'
import Panel from 'react-bootstrap/lib/Panel'
import Glyphicon from 'react-bootstrap/lib/Glyphicon'
import Button from 'react-bootstrap/lib/Button'

class PostList extends Component {
  render() {
    const posts = this.props.posts
    return Object.keys(posts).map( (id, index) => (
      <Row key={id}>
        <Col xs={1}>
          <Panel>
            <div className="vote-top" onClick={() => this.props.upVotePost(id)}><Glyphicon glyph="triangle-top" /></div>
            <div className="vote-badge"><span className="badge">{posts[id].voteScore}</span></div>
            <div className="vote-text"><strong>votes</strong></div>
            <div className="vote-bottom" onClick={() => this.props.downVotePost(id)}><Glyphicon glyph="triangle-bottom" /></div>
          </Panel>
        </Col>
        <Col xs={11}>
          <h3><a>{posts[id].title}</a></h3>
          <h4>by <em>{posts[id].author}</em> with {posts[id].comments.length} comments</h4>
          <Button bsStyle="primary">Edit <Glyphicon glyph="pencil" /></Button>
          <Button bsStyle="danger">Delete <Glyphicon glyph="remove" /></Button>
        </Col>
      </Row>
    ))
  }
}

function mapStateToProps ({ posts }) {
  return { posts }
}

function mapDispatchToProps (dispatch) {
  return {
    upVotePost: id => dispatch(upVotePost(id)),
    downVotePost: id => dispatch(downVotePost(id))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostList)
