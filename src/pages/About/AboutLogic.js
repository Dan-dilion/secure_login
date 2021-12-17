import useStyles from './AboutStyle.js';
import { useMediaQuery, useTheme } from '@material-ui/core';


const AboutLogic = ({ ...props }) => {
  const classes = useStyles();
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down(theme.breakpoints.values.sm), { noSsr: true });


  return {
    classes,
    isSmall
  };
};

export default AboutLogic;
