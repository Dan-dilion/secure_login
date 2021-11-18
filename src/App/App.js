import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';

import AppView from './AppView.js';
import AppStyle from './AppStyle.js';

import { setLoggedIn } from '../pages/Login/loginSlice.js';
import { setLoginModalVisible } from './AppSlice.js';


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
  constructor(props) {
    super();

    // Find saved ACCESS_TOKEN in local storage and login if present
    const savedUser = JSON.parse(localStorage.getItem('ACCESS_TOKEN'));
    console.log('App - Saved User: ', savedUser);
    if (savedUser) props.setLoggedIn(savedUser);

    // this.state = defaultState;
    this.state = {};
  }


  // componentDidMount = () => {
  //   const savedUser = JSON.parse(localStorage.getItem('ACCESS_TOKEN'));
  //   // console.log('App - Saved User: ', savedUser);
  //   if (savedUser) this.props.setLoggedIn(savedUser);
  // };

  render() {
    console.log('App - The theme: ', this.props.theme);

    return (
      <AppView
        classes={this.props.classes}
        loginModal={this.props.loginModal}
        setLoginModalVisible={this.props.setLoginModalVisible}
        query={query}
      />
    );
  }
}

App.propTypes = {
  loginModal: PropTypes.object.isRequired,
  setLoggedIn: PropTypes.func,
  setLoginModalVisible: PropTypes.func,
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
  setLoginModalVisible
};

export default (withStyles(AppStyle, { withTheme: true })(connect(
  mapStateToProps,
  mapDispatchToProps
)(App)));
