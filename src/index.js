import React from 'react';

const DefaultOnSSR = () => (<span></span>);

class NoSSR extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      canRender: false
    };
  }

  componentDidMount() {
    this.setState({canRender: true});
  }

  render() {
    const { children, onSSR = <DefaultOnSSR />} = this.props;
    const { canRender } = this.state;

    return canRender ? children : onSSR;
  }
}

export default NoSSR;
