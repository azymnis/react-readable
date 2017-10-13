import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createComment } from '../actions'
import PostSummary from './PostSummary'
import ReadableNavbar from './ReadableNavbar'
import Row from 'react-bootstrap/lib/Row'
import Col from 'react-bootstrap/lib/Col'
import Well from 'react-bootstrap/lib/Well'
import Comment from './Comment'
import sortBy from 'sort-by'
import FormControl from 'react-bootstrap/lib/FormControl'
import FormGroup from 'react-bootstrap/lib/FormGroup'
import ControlLabel from 'react-bootstrap/lib/ControlLabel'
import Panel from 'react-bootstrap/lib/Panel'
import Button from 'react-bootstrap/lib/Button'
import { CSSTransitionGroup } from 'react-transition-group'

class PostDetails extends Component {
  state = {
    commentBody: "",
    commentAuthor: ""
  }

  updateCommentBody = (body) => {
    this.setState({commentBody: body})
  }

  updateCommentAuthor = (author) => {
    this.setState({commentAuthor: author})
  }

  isFormDisabled = () => {
    return this.state.commentBody.length === 0 || this.state.commentAuthor.length === 0
  }

  submitComment = () => {
    const comment = {
      body: this.state.commentBody,
      author: this.state.commentAuthor,
      parentId: this.props.match.params.postId
    }
    this.props.createComment(comment).then(() =>
      this.setState({
        commentBody: "",
        commentAuthor: ""
      })
    )
  }

  render() {
    const category = this.props.match.params.category
    const postId = this.props.match.params.postId
    const post = this.props.posts[postId]
    const postIsValid = (post !== undefined) && !post.deleted && (post.category === category)
    if (postIsValid) {
      const validComments = post.comments.map(c => this.props.comments[c]).filter(c => !c.deleted)
      validComments.sort(sortBy("-timestamp"))
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
          <Row>
            <Col xs={1} md={1} lg={1} />
            <Col xs={11} md={11} lg={11}>
              <Panel>
                <form>
                  <FormGroup
                    controlId="formNewCommentAuthor">
                    <ControlLabel>Author</ControlLabel>
                    <FormControl
                      type="text"
                      value={this.state.commentAuthor}
                      onChange={e => this.updateCommentAuthor(e.target.value)}
                      placeholder="Enter name of author"
                    />
                    <FormControl.Feedback/>
                  </FormGroup>
                  <FormGroup controlId="formNewCommentBody">
                    <ControlLabel>Body</ControlLabel>
                    <FormControl
                      componentClass="textarea"
                      value={this.state.commentBody}
                      placeholder="Enter comment body"
                      onChange={e => this.updateCommentBody(e.target.value)}
                      rows={3} />
                  </FormGroup>
                  <Button
                      bsStyle="primary"
                      disabled={this.isFormDisabled()}
                      onClick={() => this.submitComment() }> Post comment
                  </Button>
                </form>
              </Panel>
            </Col>
          </Row>
          <CSSTransitionGroup
              transitionName="content-list-animation"
              transitionEnterTimeout={500}
              transitionLeaveTimeout={300}>
            {validComments.map(comment =>
              (<Comment comment={comment} key={comment.id}/>)
            )}
          </CSSTransitionGroup>
        </ReadableNavbar>
      )
    } else {
      return (
        <ReadableNavbar>
          <Row><Col xs={12} md={12} lg={12}><h1>Post not found!</h1></Col></Row>
        </ReadableNavbar>
      )
    }
  }
}

function mapStateToProps ({ posts, comments }) {
  return { posts, comments }
}

function mapDispatchToProps (dispatch) {
  return {
    createComment: comment => dispatch(createComment(comment))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostDetails)
