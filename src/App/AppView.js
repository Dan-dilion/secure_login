import React from 'react';
import {
  Route,
  Routes
} from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Container,
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
    classes,
    loginModal,
    setLoginModalVisible,
    query
  } = props;

  return (
    <Container className={classes.root} maxWidth={false}>
      <Header />

      <Container className={classes.pageArea} maxWidth={false}>
        <Card className={classes.mainCard} variant="elevation" elevation={3}>
          <Card>
            <Modal
              className={classes.modal}
              open={loginModal.visible}
              onClose={ () => setLoginModalVisible({ visible: false, returnPath: loginModal.returnPath }) }
              closeAfterTransition
              BackdropComponent={ Backdrop }
              BackdropProps={{ timeout: 500 }}
            >
              <Zoom in={loginModal.visible}>
                <Card className={classes.loginCard} variant="elevation">
                  <Login />
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
                  path={'/Private'}
                >
                  <Body
                    query = { query }
                  />
                </ProtectedRoute>
              }
            />

            <Route
              path={'/LoginPrompt'}
              element = {
                <LoginPrompt />
              }
            />

          </Routes>
        </Card>
      </Container>
    </Container>
  );
};

AppView.propTypes = {
  classes: PropTypes.object,
  loginModal: PropTypes.object,
  setLoginModalVisible: PropTypes.func.isRequired,
  query: PropTypes.string
};

export default AppView;
