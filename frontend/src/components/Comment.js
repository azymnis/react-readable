import React from 'react'
import { connect } from 'react-redux'
import { upVoteComment, downVoteComment, deleteComment } from '../actions'
import Row from 'react-bootstrap/lib/Row'
import Col from 'react-bootstrap/lib/Col'
import { humanize } from '../utils/time'
import Glyphicon from 'react-bootstrap/lib/Glyphicon'

const Comment = ({ comment, upVoteComment, downVoteComment }) => {
  const { author, body, timestamp, voteScore } = comment
  return (
    <Row>
      <Col xs={1} md={1} lg={1} />
      <Col xs={11} md={11} lg={11}>
        <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title">
              <Glyphicon
                  glyph="triangle-top"
                  className="comment-arrow"
                  onClick={() => upVoteComment(comment) } />
              <Glyphicon
                  glyph="triangle-bottom"
                  className="comment-arrow"
                  onClick={() => downVoteComment(comment) }/> {voteScore} votes
            </h3>
          </div>
          <div className="panel-body">
            {body}
          </div>
          <div className="panel-footer">
            posted at {humanize(timestamp)} by {author}
          </div>
        </div>
      </Col>
    </Row>
  )
}

function mapDispatchToProps (dispatch) {
  return {
    upVoteComment: comment => dispatch(upVoteComment(comment.id)),
    downVoteComment: comment => dispatch(downVoteComment(comment.id)),
    deleteComment: comment => dispatch(deleteComment(comment.id))
  }
}

export default connect(
  null,
  mapDispatchToProps
)(Comment)
