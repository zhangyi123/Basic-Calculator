import React, { Component } from 'react';
import Button from './Button';
import * as MyFn from './calculations.js'
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      infix: '',
    }
    this.handleChange = this.handleChange.bind(this);
  }
  calculate() {
    const postfix = MyFn.infixToPostfix(this.state.infix);
    if(postfix === '' || postfix.includes('(') === true){
      alert("Invalid input try again pls~");
    }else{
      let calValue = MyFn.evalPostfix(postfix);
      this.setState({infix: calValue.toString()});
    }
  }
  handleChange(event) {
    this.setState({infix: event.target.value});
  }
  handleClick(i) {
    let newInfix;
    if(i === 'Del'){
        newInfix = this.state.infix.slice(0, -1);
    }
    else{
      newInfix = this.state.infix + i.toString();
      if(i === 'sin' || i === 'cos' || i === 'tan') newInfix += '(';
    }

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
        {this.renderButton(0)}
        {this.renderButton('Del')}
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
