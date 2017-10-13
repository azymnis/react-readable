import React, { Component } from 'react'
import { connect } from 'react-redux'
import { upVoteComment, downVoteComment, deleteComment, editComment } from '../actions'
import Row from 'react-bootstrap/lib/Row'
import Col from 'react-bootstrap/lib/Col'
import { humanize } from '../utils/time'
import Glyphicon from 'react-bootstrap/lib/Glyphicon'
import FormControl from 'react-bootstrap/lib/FormControl'
import FormGroup from 'react-bootstrap/lib/FormGroup'
import Button from 'react-bootstrap/lib/Button'

class Comment extends Component {
  state = {
    editMode: false,
    commentBody: ""
  }

  enableEditMode = () => {
    this.setState({editMode: true, commentBody: this.props.comment.body})
  }

  disableEditMode = () => {
    this.setState({editMode: false, commentBody: ""})
  }

  updateCommentBody = (body) => {
    this.setState({commentBody: body})
  }

  submitForm = () => {
    this.props.editComment(this.props.comment, this.state.commentBody).then( () =>
      this.disableEditMode()
    )
  }

  render() {
    const { comment, upVoteComment, downVoteComment, deleteComment } = this.props
    const { author, body, timestamp, voteScore } = comment
    const { editMode } = this.state
    return (
      <Row>
        <Col xs={1} md={1} lg={1} />
        <Col xs={11} md={11} lg={11}>
          <div className="panel panel-default">
            <div className="panel-heading">
              <h3 className="panel-title comment-title">
                <Glyphicon
                    glyph="triangle-top"
                    className="comment-arrow"
                    onClick={() => upVoteComment(comment) } />
                <Glyphicon
                    glyph="triangle-bottom"
                    className="comment-arrow"
                    onClick={() => downVoteComment(comment) }/> {voteScore} votes
                {!editMode && (<a className="link-edit" onClick={this.enableEditMode}>edit <Glyphicon glyph="pencil" /></a>)}
                <a className="link-delete" onClick={() => deleteComment(comment)}>delete <Glyphicon glyph="remove" /></a>
              </h3>
            </div>
            <div className="panel-body">
              {!editMode && body}
              {editMode && (
                <form>
                  <FormGroup controlId="formCommentBody">
                    <FormControl
                      componentClass="textarea"
                      value={this.state.commentBody}
                      onChange={e => this.updateCommentBody(e.target.value)}
                      rows={3} />
                  </FormGroup>
                  <Button bsStyle="danger" onClick={this.disableEditMode}>Cancel</Button>
                  <Button
                      className="form-submit-button"
                      bsStyle="primary"
                      disabled={this.state.commentBody.length === 0}
                      onClick={() => this.submitForm() }> Update
                  </Button>
                </form>
              )}
            </div>
            <div className="panel-footer">
              posted at {humanize(timestamp)} by {author}
            </div>
          </div>
        </Col>
      </Row>)
  }
}

function mapDispatchToProps (dispatch) {
  return {
    upVoteComment: comment => dispatch(upVoteComment(comment.id)),
    downVoteComment: comment => dispatch(downVoteComment(comment.id)),
    deleteComment: comment => dispatch(deleteComment(comment.id)),
    editComment: (comment, body) => dispatch(editComment({id: comment.id, body}))
  }
}

export default connect(
  null,
  mapDispatchToProps
)(Comment)
