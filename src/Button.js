import React, { Component } from 'react';


class Button extends Component {
  render() {
    return (
      <button >
        {this.props.val}
      </button>
    );
  }
}
export default Button;
