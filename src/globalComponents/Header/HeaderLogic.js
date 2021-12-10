import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useSnackbar } from 'notistack';
import { Slide } from '@material-ui/core';

import { signOut, deleteUser } from '../../server_requests/securityRequests.js';
import { setHeaderUnderline } from '../../App/AppSlice.js';
import useStyles from './HeaderStyle.js';

const HeaderLogic = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const verifiedLogin = useSelector(state => state.login.loggedIn.verified);
  const jwt = useSelector(state => state.login.loggedIn.jwt);
  const userId = useSelector(state => state.login.loggedIn.user.id);
  const headerSelection = useSelector(state => state.app.headerSelection);
  const [anchorEl, setAnchorEl] = useState(null);
  const { enqueueSnackbar } = useSnackbar();

  const userMenuOptions = [
    'Logout',
    'Delete Account'
  ];

  const handleUserMenuSelect = async (option) => {
    switch (option) {
      case 'Logout': {
        console.log('Logging out');
        signOut();
        break;
      }
      case 'Delete Account': {
        if (confirm('You sure you want to delete this user?')) {
          await deleteUser(jwt, userId)
            .then(response => {
              console.log('Response Here: ', response);
              response.error || !response.verified
                ? enqueueSnackbar(response.message, {
                  variant: 'error',
                  anchorOrigin: {
                    vertical: 'bottom',
                    horizontal: 'center'
                  },
                  TransitionComponent: Slide
                })
                : enqueueSnackbar(response.message, {
                  variant: 'success',
                  anchorOrigin: {
                    vertical: 'bottom',
                    horizontal: 'center'
                  },
                  TransitionComponent: Slide
                });
            });
          // .catch(response => {
          //   enqueueSnackbar(response.msg, {
          //     variant: 'error',
          //     anchorOrigin: {
          //       vertical: 'bottom',
          //       horizontal: 'center'
          //     },
          //     TransitionComponent: Slide
          //   });
          // });
        }
        break;
      }
      default: break;
    }
    setAnchorEl(null);
  };

  const handleChange = (routeName) => {
    console.log('Header routeName: ', routeName);
    // The newValue is the numerical location for the tab underline
    // However I am changing the position with the routName via the
    // setHeaderUnderline() function.
    dispatch(setHeaderUnderline({ routeName: routeName, delay: true }));
    navigate(`/${routeName}`);
  };

  return {
    classes,
    dispatch,
    anchorEl,
    setAnchorEl,
    handleChange,
    verifiedLogin,
    headerSelection,
    userMenuOptions,
    handleUserMenuSelect
  };
};

export default HeaderLogic;
