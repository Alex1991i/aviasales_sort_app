import { Component } from 'react';

export default class ErrorBoundry extends Component {
  state = {
    error: false,
  };

  componentDidCatch() {
    this.setState({
      error: true,
    });
  }

  render() {
    if (this.state.error) {
      return <h1>Error</h1>;
    }

    return this.props.children;
  }
}
