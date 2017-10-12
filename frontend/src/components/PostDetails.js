import React, { Component } from 'react'
import { connect } from 'react-redux'
import PostSummary from './PostSummary'
import ReadableNavbar from './ReadableNavbar'
import Row from 'react-bootstrap/lib/Row'
import Col from 'react-bootstrap/lib/Col'
import Well from 'react-bootstrap/lib/Well'
import Comment from './Comment'

class PostDetails extends Component {
  render() {
    const category = this.props.match.params.category
    const postId = this.props.match.params.postId
    const post = this.props.posts[postId]
    const postIsValid = (post !== undefined) && !post.deleted && (post.category === category)
    if (postIsValid) {
      const validComments = post.comments.map(c => this.props.comments[c]).filter(c => !c.deleted)
      return (
        <ReadableNavbar>
          <PostSummary post={post} />
          <Row>
            <Col xs={12} md={12} lg={12}><h3>Post content:</h3></Col>
          </Row>
          <Row>
            <Col xs={12} md={12} lg={12}>
              <Well>{post.body}</Well>
            </Col>
          </Row>
          <Row>
            <Col xs={12} md={12} lg={12}><h3>Comments:</h3></Col>
          </Row>
          {validComments.map(comment =>
            (<Comment comment={comment} key={comment.id}/>)
          )}
        </ReadableNavbar>
      )
    } else {
      return (
        <ReadableNavbar>
          <Row><h1>Post not found!</h1></Row>
        </ReadableNavbar>
      )
    }
  }
}

function mapStateToProps ({ posts, comments }) {
  return { posts, comments }
}

export default connect(
  mapStateToProps
)(PostDetails)
