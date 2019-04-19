import React, { Component } from 'react';


class Button extends Component {
  render() {
    return (
      <button onClick={this.props.click}>
        {this.props.val}
      </button>
    );
  }
}
export default Button;
