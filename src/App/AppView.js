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

import ProtectedRoute from '../globalComponents/ProtectedRoute/';
import Header from '../globalComponents/Header/';
import LoginPrompt from '../pages/LoginPrompt/';
import Body from '../pages/Body/';
import Login from '../pages/Login/';
import Register from '../pages/Register/';
import Home from '../pages/Home/';
import About from '../pages/About/';

const AppView = props => {
  // De-structure logic
  const {
    classes,
    loginModal,
    setLoginModalVisible,
    setLoginOrRegister
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
              onClose={ () => {
                setLoginModalVisible({ visible: false, returnPath: loginModal.returnPath });
                setTimeout(() => setLoginOrRegister(true), 1000);   // timeout is to allow transition to complete
              }}
              closeAfterTransition
              BackdropComponent={ Backdrop }
              BackdropProps={{ timeout: 500 }}
            >
              <Zoom in={loginModal.visible}>
                <Card className={classes.loginCard} variant="elevation">
                  { loginModal.loginOrRegister ? <Login /> : <Register /> }
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
                  <Body />
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
  setLoginModalVisible: PropTypes.func,
  setLoginOrRegister: PropTypes.func,
  query: PropTypes.string
};

export default AppView;
