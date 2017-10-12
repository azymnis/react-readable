import React from 'react'
import Row from 'react-bootstrap/lib/Row'
import Col from 'react-bootstrap/lib/Col'
import Panel from 'react-bootstrap/lib/Panel'
import { humanize } from '../utils/time'

const Comment = ({ comment }) => {
  const { author, body, timestamp } = comment
  return (
    <Row>
      <Col xs={1} md={1} lg={1} />
      <Col xs={11} md={11} lg={11}>
        <Panel footer={`posted at ${humanize(timestamp)} by ${author}`}>
          {body}
        </Panel>
      </Col>
    </Row>
  )
}

export default Comment
