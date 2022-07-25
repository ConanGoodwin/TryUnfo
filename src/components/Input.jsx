import React from 'react';
import PropTypes from 'prop-types';

class Input extends React.Component {
  render() {
    const { type } = this.props;

    return (
      <input type={ type } />
    );
  }
}

Input.propTypes = {
  type: PropTypes.string.isRequired,
};

export default Input;
