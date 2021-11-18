import { makeStyles } from '@material-ui/core';
import { css } from '@emotion/react';

// The react-spinners module insists on using emotion for styling!!!
// I was going to abandon it but I really like the spinners!
export const spinnerCss = css`
`;

const useStyles = makeStyles({
  root: {
    // border: '2px solid red',
    width: '100%',
    // textAlign: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20vh 0 30vh 0'
  }
});

export default useStyles;
