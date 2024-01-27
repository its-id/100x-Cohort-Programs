import React from "react";

class ClassBasedComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
  }

  incrementCount = () => {
    this.setState({ count: this.state.count + 1 });
  };

  render() {
    return (
      <>
        <p>{this.state.count}</p>
        <button onClick={this.incrementCount}>Increment</button>
      </>
    );
  }
}

export default ClassBasedComponent;
