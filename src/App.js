import React, { Component } from 'react';
import Button from './Button';
import * as MyFn from './calculations.js'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      infix: '',
    }
    this.handleChange = this.handleChange.bind(this);
  }
  calculate() {
    console.log(this.state.infix);
    console.log(typeof(this.state.infix));
    const postfix = MyFn.infixToPostfix(this.state.infix);
    console.log(postfix);
    let calValue = MyFn.evalPostfix(postfix);
    console.log(calValue);
    this.setState({infix: calValue});
    console.log(this.state.infix);
  }
  handleChange(event) {
    this.setState({infix: event.target.infix});
  }
  handleClick(i) {
    let newInfix = this.state.infix + i;
    this.setState({infix: newInfix});
  }
  renderButton(i) {
    return <Button val = {i} click = {() => this.handleClick(i)} />
  }
  renderGrid() {
    return (
      <div>
        {this.renderButton('7')}
        {this.renderButton('8')}
        {this.renderButton(9)}
        {this.renderButton('+')}
        {this.renderButton('-')}
        {this.renderButton('*')}
        {this.renderButton('/')}
        <br />
        {this.renderButton(4)}
        {this.renderButton(5)}
        {this.renderButton(6)}
        {this.renderButton('sin')}
        {this.renderButton('cos')}
        {this.renderButton('tan')}
        <br />
        {this.renderButton(1)}
        {this.renderButton(2)}
        {this.renderButton(3)}
        {this.renderButton('.')}
        {this.renderButton('(')}
        {this.renderButton(')')}
        <br />
      </div>
    );
  }
  render() {
    return (
      <div>
        <h1>My Calculator</h1>
          <input type = "text" value = {this.state.infix}
            onChange = {this.handleChange} />
          <button onClick = {() => this.calculate()} >Calulate</button>
        {this.renderGrid()}
      </div>
    );
  }
}

export default App;
// <input type = "text" value = {this.state.value}
//   onChange = {this.handleChange} />
