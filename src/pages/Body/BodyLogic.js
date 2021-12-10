import { useSelector, useDispatch } from 'react-redux';
import { useSnackbar } from 'notistack';
import { Slide } from '@material-ui/core';

import useStyles from './BodyStyle.js';
import { setVerifiedToken } from '../Login/loginSlice.js';
import { setSqlResults } from '../../App/AppSlice.js';

const BodyLogic = ({ query }) => {
  const classes = useStyles();
  const loggedIn = useSelector(state => state.login.loggedIn);
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const pressMeCallBack = results => {
    if (results.verified) {
      if (results.error) {
        dispatch(setSqlResults([{ Error: results.message }]));
        enqueueSnackbar(results.message, {
          variant: 'error',
          anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'center'
          },
          TransitionComponent: Slide
        });
      } else dispatch(setSqlResults(results.results));
    } else {
      dispatch(setVerifiedToken(results.verified));
      enqueueSnackbar(results.message, {
        variant: 'error',
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'center'
        },
        TransitionComponent: Slide
      });
    }
  };

  return {
    classes,
    loggedIn,
    pressMeCallBack
  };
};

export default BodyLogic;
