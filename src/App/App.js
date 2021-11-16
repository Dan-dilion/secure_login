import React from 'react';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';


import AppView from './AppView.js';

import { setLoggedIn, setVerifiedToken } from '../pages/Login/loginSlice.js';
import { verifyUser } from '../server_requests/securityRequests.js';


// const history = useHistory();

// const defaultState = () => {
//   let user = {};
//   if (savedUser) {
//     console.log('access token exists: ', savedUser);
//     user = {
//       loggedIn: {
//         verified: savedUser.loginSuccess,
//         jwt: savedUser.token,
//         user: savedUser.user
//       },
//       sqlResults: []
//     };
//   } else {
//     user = {
//       loggedIn: {
//         verified: false,
//         jwt: '',
//         user: {
//           datecreated: '',
//           datelastlogin: '',
//           email: '',
//           id: null,
//           password: '',
//           username: ''
//         }
//       },
//       sqlResults: []
//     };
//   }
//   console.log('state: ', user);
//   return user;
// };

const defaultState = {
  sqlResults: [],
  headerSelection: 0,
  loginModal: {
    Visible: false,
    returnPath: '/Home'
  }
};

const query = 'SELECT id, username, password, email FROM node_login.users';

class App extends React.Component {
  constructor() {
    super();

    this.state = defaultState;
  }

  setResults = (results) => {
    this.setState({
      sqlResults: results
    });
  }

  setHeaderUnderline = (routeName, delay = false) => {
    const imposeDelay = (callback) => {
      setTimeout(() => {
        callback();
      }, (delay ? 2500 : 0));
    };

    if (delay) this.setState({ headerSelection: null });

    switch (routeName) {
      case 'home':
      case 'Home':
      case '': imposeDelay(() => this.setState({ headerSelection: 0 })); break;
      case 'about':
      case 'About': imposeDelay(() => this.setState({ headerSelection: 1 })); break;
      case 'private':
      case 'Private': imposeDelay(() => this.setState({ headerSelection: 2 })); break;
      default: break;
    }
  };

  setLoginModalVisible = (newState, returnPath = '/Home') => {
    this.setState({
      loginModal: { Visible: newState, returnPath: returnPath }
    });
  }

  render() {

    // Load access token from local storage
    const savedUser = JSON.parse(localStorage.getItem('ACCESS_TOKEN'));
    if (savedUser) verifyUser(savedUser.token, (result) => this.props.setVerifiedToken(result));

    return (
      <AppView
        state={this.state}
        loggedIn={this.props.loggedIn}
        setLoggedIn={this.props.setLoggedIn}
        setVerifiedToken={this.props.setVerifiedToken}
        setHeaderUnderline={this.setHeaderUnderline}
        setLoginModalVisible={this.setLoginModalVisible}
        setResults={this.setResults}
        query={query}
      />
    );
  }
}

App.propTypes = {
  loggedIn: PropTypes.object,
  setVerifiedToken: PropTypes.func,
  setLoggedIn: PropTypes.func
};

const mapStateToProps = (state) => {
  return {
    loggedIn: state.login.loggedIn
  };
};

const mapDispatchToProps = { setLoggedIn, setVerifiedToken };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
