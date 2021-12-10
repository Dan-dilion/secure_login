import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';

import AppView from './AppView.js';
import AppStyle from './AppStyle.js';

import { setLoggedIn } from '../pages/Login/loginSlice.js';
import {
  setLoginModalVisible,
  setLoginOrRegister,
  setHeaderUnderline
} from './AppSlice.js';

class App extends React.Component {
  constructor(props) {
    super();

    // Find saved ACCESS_TOKEN in local storage and login if present
    const savedUser = JSON.parse(localStorage.getItem('ACCESS_TOKEN'));
    console.log('App - Saved User: ', savedUser);
    if (savedUser) props.setLoggedIn(savedUser);

    this.state = {};
  }

  // When page is refreshed set the header underline
  componentDidMount = () => {
    const routeName = window.location.pathname.endsWith('/')
      ? window.location.pathname.split('/').reverse()[1]      // Don't select '/' if path
      : window.location.pathname.split('/').reverse()[0];     // has a '/' at the end
    this.props.setHeaderUnderline({ routeName: routeName });
  };

  render() {
    console.log('App - The theme: ', this.props.theme);

    return (
      <AppView
        classes={this.props.classes}
        loginModal={this.props.loginModal}
        setLoginModalVisible={this.props.setLoginModalVisible}
      />
    );
  }
}

App.propTypes = {
  loginModal: PropTypes.object.isRequired,
  setLoggedIn: PropTypes.func,
  setLoginModalVisible: PropTypes.func,
  setLoginOrRegister: PropTypes.func,
  setHeaderUnderline: PropTypes.func,
  theme: PropTypes.object,
  classes: PropTypes.object
};

const mapStateToProps = (state) => {
  return {
    loginModal: state.app.loginModal
  };
};

const mapDispatchToProps = {
  setLoggedIn,
  setLoginModalVisible,
  setLoginOrRegister,
  setHeaderUnderline
};

export default (withStyles(AppStyle, { withTheme: true })(connect(
  mapStateToProps,
  mapDispatchToProps
)(App)));
