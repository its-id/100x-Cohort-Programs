import React from 'react';

class UnderstandingClassBasedMethods extends React.Component {
  componentDidMount() {
    console.log('component mounted');
  }

  componentWillUnmount() {
    console.log('component unmounted');
  }

  render() {
    return <>Check console!</>;
  }
}
UnderstandingClassBasedMethods;
export default UnderstandingClassBasedMethods;
