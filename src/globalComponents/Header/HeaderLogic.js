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

  const handleChange = (routeName) => {
    console.log('Header routeName: ', routeName);
    // The newValue is the numerical location for the tab underline
    // However for consistency I am changing the position with the
    // routName. It's better this way if I need to change the order
    // of the tabs I only have to change it on one place
    // (the setHeaderUnderline() function)
    dispatch(setHeaderUnderline({ routeName: routeName, delay: true }));
    // This variable in the event object conveniently holds the route name
    navigate(`/${routeName}`);
  };

  return {
    classes,
    handleChange,
    verifiedLogin,
    headerSelection
  };
};

export default HeaderLogic;
