import React, { Component } from 'react';

export class ErrorButton extends Component {
  state = {
    error: false,
  };

  componentDidCatch(...args) {
    debugger
  }

  invokeError = () => {
    this.setState({
      error: true,
    });
  };

  render() {

    if (this.state.error) this.state.foo.bar = 123;
    return (
      <button
        className='btn btn-danger'
        onClick={ this.invokeError }
      >Trow Error!</button>
    );
  }
}