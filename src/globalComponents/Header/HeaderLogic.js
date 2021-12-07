import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { setHeaderUnderline } from '../../App/AppSlice.js';
import useStyles from './HeaderStyle.js';

const HeaderLogic = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const verifiedLogin = useSelector(state => state.login.loggedIn.verified);
  const headerSelection = useSelector(state => state.app.headerSelection);
  const [anchorEl, setAnchorEl] = useState(null);

  const userMenuOptions = [
    'Logout'
  ];

  const handleUserMenuSelect = (option) => {
    switch (option) {
      case 'Logout': {
        console.log('Logging out');
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
