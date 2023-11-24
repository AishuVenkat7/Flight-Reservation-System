import React from "react";

class ErrorBoundaries extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  render() {
    const { hasError } = this.state;
    const { children } = this.props;

    if (hasError) {
      return <h1>{`Something went wrong..`}</h1>;
    }

    return children;
  }
}

export default ErrorBoundaries;
