import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';

class Draggable extends Component {

  state = {
    pos: { x: 0, y: 0 },
    dragging: false,
    rel: null
  };

  componentWillMount() {
    if (this.props.pos) {
      this.setState({ pos: this.props.pos });
    }
  }

  componentDidUpdate(props, state) {
    if (this.state.dragging && !state.dragging) {
      document.addEventListener('mousemove', this.onMouseMove)
      document.addEventListener('mouseup', this.onMouseUp)
    } else if (!this.state.dragging && state.dragging) {
      document.removeEventListener('mousemove', this.onMouseMove)
      document.removeEventListener('mouseup', this.onMouseUp)
    }
  }

  onMouseDown = e => {
    // only left mouse button
    if (e.button !== 0) return;

    const element = ReactDOM.findDOMNode(this);
    var pos = { left: element.offsetLeft, top: element.offsetTop };
    this.setState({
      dragging: true,
      rel: {
        x: e.pageX - pos.left,
        y: e.pageY - pos.top
      }
    })
    e.stopPropagation();
    // e.preventDefault();
  };

  onMouseUp = e => {
    this.setState({ dragging: false });
    e.stopPropagation()
    e.preventDefault()
  };

  onMouseMove = e => {
    if (!this.state.dragging) return;
    this.setState({
      pos: {
        x: e.pageX - this.state.rel.x,
        y: e.pageY - this.state.rel.y
      }
    })
    e.stopPropagation()
    e.preventDefault()
  };

  render() {
    return (
      <div
        onMouseDown={this.onMouseDown} 
        style={{
          position: 'absolute',
          left: this.state.pos.x + 'px',
          top: this.state.pos.y + 'px'
        }}
      >
        {this.props.children}
      </div>
    )
  }
};

export default Draggable;
