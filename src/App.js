import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { theme } from './MuiTheme.js';
import { ProtectedRoute } from './components/ProtectedRoute/ProtectedRoute.js';
import { Header } from './components/Header/Header.js';
import { Body } from './pages/Body/Body.js';
import { Login } from './pages/Login/Login.js';
import { Home } from './pages/Home/Home.js';

import { setLoggedIn, setVerifiedToken } from './pages/Login/loginSlice.js';
import { verifyUser } from './server_requests/securityRequests.js';

import './App.css';

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

  render() {

    const savedUser = JSON.parse(localStorage.getItem('ACCESS_TOKEN'));
    if (savedUser) verifyUser(savedUser.token, (result) => this.props.setVerifiedToken(result));

    return (
      <MuiThemeProvider theme={theme}>
        <Router basename = {process.env.PUBLIC_URL}>

          { this.props.loggedIn.verified ? (<Redirect to="/" />) : null }
          { this.props.loggedIn.verified ? (<Header verifiedLogin = { this.props.loggedIn.verified } />) : null }

          <div className="app">
            <Switch onChange={ () => { console.log('Route Changed!'); } }>

              <ProtectedRoute
                exact path={'/'}
                component={Home}
                user={this.props.loggedIn}
                setVerified={ (newStatus) => this.props.setVerifiedToken(newStatus) }
              />

              <ProtectedRoute
                path={'/Home'}
                component={Home}
                user={this.props.loggedIn}
                setVerified={ (newStatus) => this.props.setVerifiedToken(newStatus) }
              />

              <ProtectedRoute
                path={'/Users'}
                component={Body}
                user={this.props.loggedIn}
                setVerified={ (newStatus) => this.props.setVerifiedToken(newStatus) }
                query = {query}
                sqlResults = {this.state.sqlResults}
                loggedIn={this.props.loggedIn}
                setVerify = { newStatus => this.props.setVerifiedToken(newStatus) }
                setSqlResults = { results => this.setResults(results) }
              />

              <Route
                path={'/Login'}
                render = { props => <Login
                  storeToken = { newUser => this.props.setLoggedIn(newUser) }
                /> }
              />

            </Switch>
          </div>

        </Router>
      </MuiThemeProvider>
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
