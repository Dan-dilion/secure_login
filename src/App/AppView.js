import React from 'react';
import {
  Route,
  Routes
} from 'react-router-dom';
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

const AppView = props => {
  const {
    state,
    loggedIn,
    setLoggedIn,
    setVerifiedToken,
    setHeaderUnderline,
    setLoginModalVisible,
    setResults,
    query
  } = props;

  return (
    <>
      <Header
          verifiedLogin = { loggedIn.verified }
          headerSelection = { state.headerSelection }
          setHeaderUnderline = { setHeaderUnderline }
      />

      <Card elevation={0}>
        <Modal
          open={state.loginModal.Visible}
          onClose={() => setLoginModalVisible(false)}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{ timeout: 500 }}
        >
          <Zoom in={state.loginModal.Visible}>
            <Card variant="elevated">
              <Login
                returnPath = { state.loginModal.returnPath }
                storeToken = { newUser => setLoggedIn(newUser) }
                setLoginModalVisible = { setLoginModalVisible }
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
              user={loggedIn}
              setVerified={ (newStatus) => setVerifiedToken(newStatus) }
              setLoginModalVisible={setLoginModalVisible}
              path={'/Private'}
            >
              <Body
                query = { query }
                sqlResults = { state.sqlResults }
                loggedIn={ loggedIn }
                setVerify = { newStatus => setVerifiedToken(newStatus) }
                setSqlResults = { results => setResults(results) }
              />
            </ProtectedRoute>
          }
        />

        <Route
          path={'/LoginPrompt'}
          element = {
            <LoginPrompt
              setLoginModalVisible={ setLoginModalVisible }
              storeToken = { newUser => setLoggedIn(newUser) }
            />
          }
        />

      </Routes>

    </>
  );
};

AppView.propTypes = {
  state: PropTypes.object.isRequired,
  loggedIn: PropTypes.object.isRequired,
  setVerifiedToken: PropTypes.func.isRequired,
  setLoggedIn: PropTypes.func.isRequired,
  setHeaderUnderline: PropTypes.func.isRequired,
  setLoginModalVisible: PropTypes.func.isRequired,
  setResults: PropTypes.func.isRequired,
  query: PropTypes.string
};

export default AppView;
