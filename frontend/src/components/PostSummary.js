import React from 'react'
import { connect } from 'react-redux'
import { upVotePost, downVotePost, deletePost, openEditPost } from '../actions'
import Row from 'react-bootstrap/lib/Row'
import Col from 'react-bootstrap/lib/Col'
import Panel from 'react-bootstrap/lib/Panel'
import Glyphicon from 'react-bootstrap/lib/Glyphicon'
import Button from 'react-bootstrap/lib/Button'
import Badge from 'react-bootstrap/lib/Badge'
import { humanize } from '../utils/time'
import { Link } from 'react-router-dom'
import { push } from 'react-router-redux'

const PostSummary = ({ post, comments, upVotePost, downVotePost, deletePost, openEditPost, redirectAfterDelete, redirectToRoot }) => {
  const numComments = post.comments.filter(c => !comments[c].deleted).length
  return (
    <Row>
      <Col className="vote-element" xs={1} md={1} lg={1}>
        <Panel className="vote-panel">
          <div className="vote-top" onClick={() => upVotePost(post)}><Glyphicon glyph="triangle-top" /></div>
          <div className="vote-badge"><Badge>{post.voteScore}</Badge></div>
          <div className="vote-text"><strong>votes</strong></div>
          <div className="vote-bottom" onClick={() => downVotePost(post)}><Glyphicon glyph="triangle-bottom" /></div>
        </Panel>
      </Col>
      <Col xs={8} md={10} lg={10}>
        <h3><Link to={`/${post.category}/${post.id}`}>{post.title}</Link></h3>
        <h4>posted at <em>{humanize(post.timestamp)}</em> by <strong>{post.author}</strong> with {numComments} comments</h4>
        <Button
            bsStyle="primary"
            onClick={() => openEditPost(post)}>
          Edit <Glyphicon glyph="pencil" /></Button>
        <Button
            bsStyle="danger"
            className="post-delete-button"
            onClick={() => deletePost(post).then(() => redirectAfterDelete && redirectToRoot())}>
          Delete <Glyphicon glyph="remove" /></Button>
      </Col>
    </Row>
  )
}

function mapStateToProps ({ comments }) {
  return { comments }
}

function mapDispatchToProps (dispatch) {
  return {
    upVotePost: post => dispatch(upVotePost(post.id)),
    downVotePost: post => dispatch(downVotePost(post.id)),
    deletePost: post => dispatch(deletePost(post.id)),
    openEditPost: post => dispatch(openEditPost(post.id)),
    redirectToRoot: () => dispatch(push('/'))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostSummary)
