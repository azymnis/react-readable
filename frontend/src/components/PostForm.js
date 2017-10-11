import React, { Component } from 'react'
import { connect } from 'react-redux'
import Modal from 'react-modal'
import Button from 'react-bootstrap/lib/Button'
import ControlLabel from 'react-bootstrap/lib/ControlLabel'
import FormControl from 'react-bootstrap/lib/FormControl'
import FormGroup from 'react-bootstrap/lib/FormGroup'

class PostForm extends Component {
  state = {
    author: "",
    title: "",
    category: "",
    body: ""

  }

  notEmptyString = s => {
    if (s.length === 0) {
      return "error"
    } else {
      return "success"
    }
  }

  isFormDisabled = () => {
    const { author, title, category, body } = this.state
    return (author.length === 0 ||
      title.length === 0 ||
      category.length === 0 ||
      body.length === 0)
  }

  updateState = (fieldName, value) => {
    this.setState({[fieldName]: value})
  }

  render() {
    const { categories, closeModal, isOpen } = this.props
    const { author, title, category, body } = this.state

    return (
      <Modal
          isOpen={isOpen}
          aria={{
            labelledby: "heading"
          }}>
        <h1 id="heading">Create new post</h1>
        <hr/>
        <form>
          <FormGroup
            controlId="formControlsAuthor"
            validationState={this.notEmptyString(author)}>
            <ControlLabel>Author</ControlLabel>
            <FormControl
              type="text"
              value={author}
              onChange={e => this.updateState("author", e.target.value)}
              placeholder="Enter name of author"
            />
            <FormControl.Feedback/>
          </FormGroup>

          <FormGroup
            controlId="formControlsTitle"
            validationState={this.notEmptyString(title)}>
            <ControlLabel>Title</ControlLabel>
            <FormControl
              type="text"
              value={title}
              onChange={e => this.updateState("title", e.target.value)}
              placeholder="Enter title of post"
            />
            <FormControl.Feedback/>
          </FormGroup>

          <FormGroup
              controlId="formControlsCategorySelect"
              validationState={this.notEmptyString(category)}>
            <ControlLabel>Category</ControlLabel>
            <FormControl
              componentClass="select"
              value={category}
              onChange={e => this.updateState("category", e.target.value)}>
              <option value="">...</option>
              {categories.map(cat =>
                (<option value={cat.name} key={cat.path}>{cat.name}</option>)
              )}
            </FormControl>
          </FormGroup>

          <FormGroup
              controlId="formControlsBody"
              validationState={this.notEmptyString(body)}>
            <ControlLabel>Post Body</ControlLabel>
            <FormControl
              componentClass="textarea"
              value={body}
              placeholder="Enter the content of the post"
              onChange={e => this.updateState("body", e.target.value)}
              rows={10} />
            <FormControl.Feedback/>
          </FormGroup>
        </form>
        <Button bsStyle="danger" onClick={closeModal}>Cancel</Button>
        <Button bsStyle="primary" className="form-submit-button" disabled={this.isFormDisabled()}>Create</Button>
      </Modal>
    )
  }
}

function mapStateToProps ({ posts, categories }) {
  return { posts, categories }
}

export default connect(
  mapStateToProps
)(PostForm)

