import React, {PropTypes} from 'react';

class Placeholder extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  componentDidMount() {
  }

  componentWillUnmount() {

  }

  render() {
    return <div
      className={"PlaceholderContainer"}
    ></div>
  }
}

Placeholder.defaultProps = {
};

Placeholder.propTypes = {
};

export default Placeholder;
