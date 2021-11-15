import React from 'react';
import {
  Route,
  Routes
} from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Card,
  Modal,
  Backdrop,
  Zoom
} from '@material-ui/core';

import ProtectedRoute from '../globalComponents/ProtectedRoute/ProtectedRoute.js';
import Header from '../globalComponents/Header/Header.js';
import LoginPrompt from '../pages/LoginPrompt/';
import { Body } from '../pages/Body/Body.js';
import { Login } from '../pages/Login/Login.js';
import { Home } from '../pages/Home/Home.js';
import { About } from '../pages/About';

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
  headerSelection: 0,
  loginModal: {
    Visible: false,
    returnPath: '/Home'
  },
  sqlResults: []
};

const query = 'SELECT id, username, password, email FROM node_login.users';

class App extends React.Component {
  constructor() {
    super();

    this.state = defaultState;
  }

  setResults(results) {
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

    // const savedUser = JSON.parse(localStorage.getItem('ACCESS_TOKEN'));
    // if (savedUser) verifyUser(savedUser.token, (result) => this.props.setVerifiedToken(result));

    return (
      <>
        <Header
            verifiedLogin = { this.props.loggedIn.verified }
            headerSelection = { this.state.headerSelection }
            setHeaderUnderline = { this.setHeaderUnderline }
        />

        <Card elevation={0}>
          <Modal
            open={this.state.loginModal.Visible}
            onClose={() => this.setLoginModalVisible(false)}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{ timeout: 500 }}
          >
            <Zoom in={this.state.loginModal.Visible}>
              <Card variant="elevated">
                <Login
                  returnPath = { this.state.loginModal.returnPath }
                  storeToken = { newUser => this.props.setLoggedIn(newUser) }
                  setLoginModalVisible = { this.setLoginModalVisible }
                />
              </Card>
            </Zoom>
          </Modal>
        </Card>

        <Routes>

          <Route
            exact path={'/'}
            element={<Home />}
          />

          <Route
            path={'/Home'}
            element={<Home />}
          />

          <Route
            path={'/About'}
            element={<About />}
          />

          <Route
            path={'/Private'}
            element={
              <ProtectedRoute
                user={this.props.loggedIn}
                setVerified={ (newStatus) => this.props.setVerifiedToken(newStatus) }
                setLoginModalVisible={this.setLoginModalVisible}
                path={'/Private'}
              >
                <Body
                  query = {query}
                  sqlResults = {this.state.sqlResults}
                  loggedIn={this.props.loggedIn}
                  setVerify = { newStatus => this.props.setVerifiedToken(newStatus) }
                  setSqlResults = { results => this.setResults(results) }
                />
              </ProtectedRoute>
            }
          />

          <Route
            path={'/LoginPrompt'}
            element = {
              <LoginPrompt
                setLoginModalVisible={ this.setLoginModalVisible }
                storeToken = { newUser => this.props.setLoggedIn(newUser) }
              />
            }
          />

        </Routes>

      </>
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
