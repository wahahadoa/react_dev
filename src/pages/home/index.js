import React from 'react';
import PropTypes from 'prop-types';
import { withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';

@withRouter
export class Home extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div className="container">
        I am home
      </div>
    );
  }
}

Home.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

function mapStateToProps(state, ownProps = {}) {
  return {
    
  }
};

function mapDispatchToProps(dispatch, ownProps = {}) {
  return {
    dispatch,
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(Home);
