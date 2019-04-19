import React, { Component } from 'react';

import Button from './Button'
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      infix: '',
    }
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    this.setState({infix: event.target.infix});
  }
  renderButton(i) {
    return <Button val = {i} />
  }
  renderGrid() {
    return (
      <div>
        {this.renderButton(7)}
        {this.renderButton(8)}
        {this.renderButton(9)}
        <br />
        {this.renderButton(4)}
        {this.renderButton(5)}
        {this.renderButton(6)}
        <br />
        {this.renderButton(1)}
        {this.renderButton(2)}
        {this.renderButton(3)}
        <br />
      </div>
    );
  }
  render() {
    return (
      <div>
        <h1>My Calculator</h1>
        <form onSubmit = {this.handleSubmit}>
          <input type = "text" value = {this.state.infix}
            onChange = {this.handleChange} />
          <input type = "submit" value = "Calculate" />
        </form>
        {this.renderGrid()}
      </div>
    );
  }
}

export default App;
// <input type = "text" value = {this.state.value}
//   onChange = {this.handleChange} />
