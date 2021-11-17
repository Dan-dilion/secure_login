import React from 'react';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';


import AppView from './AppView.js';

import { setVerifiedToken } from '../pages/Login/loginSlice.js';
import {
  setLoginModalVisible
} from './AppSlice.js';
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

// const defaultState = {
//   sqlResults: [],
//   headerSelection: 0,
//   loginModal: {
//     visible: false,
//     returnPath: '/Home'
//   }
// };

const query = 'SELECT id, username, password, email FROM node_login.users';

class App extends React.Component {
  constructor() {
    super();

    // this.state = defaultState;
    this.state = {};
  }

  componentDidMount = () => {
    const savedUser = JSON.parse(localStorage.getItem('ACCESS_TOKEN'));
    if (savedUser) verifyUser(savedUser.token, (result) => this.props.setVerifiedToken(result));
  };

  render() {
    return (
      <AppView
        loginModal={this.props.loginModal}
        setLoginModalVisible={this.props.setLoginModalVisible}
        query={query}
      />
    );
  }
}

App.propTypes = {
  loginModal: PropTypes.object.isRequired,
  setVerifiedToken: PropTypes.func,
  setLoginModalVisible: PropTypes.func
};

const mapStateToProps = (state) => {
  return {
    loginModal: state.app.loginModal
  };
};

const mapDispatchToProps = {
  setVerifiedToken,
  setLoginModalVisible
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
